import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as ftp from 'basic-ftp';
import { Readable, Writable } from 'stream';
import { envs } from '../../config/envs';

export interface FtpUploadFile {
  originalName: string;
  buffer: Buffer;
}

export interface FtpDownloadFile {
  fileName: string;
  buffer: Buffer;
}

interface FtpConnectionConfig {
  host: string;
  port: number;
  user: string;
  password: string;
}

@Injectable()
export class FtpService {
  private async withClient<T>(
    config: FtpConnectionConfig,
    operation: (client: ftp.Client) => Promise<T>,
  ): Promise<T> {
    const client = new ftp.Client();
    client.ftp.verbose = false;

    try {
      await client.access({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        secure: false,
      });

      return await operation(client);
    } catch (error) {
      throw new InternalServerErrorException(
        `No fue posible conectar o transferir archivos al FTP: ${(error as Error).message}`,
      );
    } finally {
      client.close();
    }
  }

  async uploadFilesToFolder(
    relativeFolderPath: string,
    files: FtpUploadFile[],
  ): Promise<string> {
    if (files.length === 0) {
      throw new InternalServerErrorException(
        'No se recibieron archivos para cargar al FTP.',
      );
    }

    const normalizedFolder = relativeFolderPath
      .replace(/\\/g, '/')
      .trim()
      .replace(/\/$/, '');

    await this.withClient(
      {
        host: envs.ftpHost,
        port: envs.ftpPort,
        user: envs.ftpUser,
        password: envs.ftpPassword,
      },
      async (client) => {
        await client.ensureDir(normalizedFolder);

        for (const file of files) {
          const safeName = this.sanitizeFileName(file.originalName);
          const stream = Readable.from(file.buffer);
          await client.uploadFrom(stream, safeName);
        }
      },
    );

    return normalizedFolder;
  }

  async downloadComprobanteFile(remotePath: string): Promise<Buffer> {
    return this.withClient(
      {
        host: envs.ftpComprobantesHost,
        port: envs.ftpComprobantesPort,
        user: envs.ftpComprobantesUser,
        password: envs.ftpComprobantesPassword,
      },
      async (client) => {
        const chunks: Buffer[] = [];

        const writable = new Writable({
          write(chunk: Buffer, _encoding, callback) {
            chunks.push(Buffer.from(chunk));
            callback();
          },
        });

        await client.downloadTo(writable, remotePath);

        return Buffer.concat(chunks);
      },
    );
  }

  private sanitizeFileName(name: string): string {
    const baseName = name.split(/[/\\]/).pop() ?? 'archivo';
    return baseName.replace(/[^\w.\-() ]/g, '_');
  }
}