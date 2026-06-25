import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as ftp from 'basic-ftp';
import { Readable } from 'stream';
import { envs } from '../../config/envs';

export interface FtpUploadFile {
  originalName: string;
  buffer: Buffer;
}

@Injectable()
export class FtpService {
  private async withClient<T>(operation: (client: ftp.Client) => Promise<T>): Promise<T> {
    const client = new ftp.Client();
    client.ftp.verbose = false;

    try {
      await client.access({
        host: envs.ftpHost,
        port: envs.ftpPort,
        user: envs.ftpUser,
        password: envs.ftpPassword,
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

    const normalizedFolder = relativeFolderPath.replace(/\\/g, '/');

    await this.withClient(async (client) => {
      await client.ensureDir(normalizedFolder);

      for (const file of files) {
        const safeName = this.sanitizeFileName(file.originalName);
        const stream = Readable.from(file.buffer);
        await client.uploadFrom(stream, `${normalizedFolder}/${safeName}`);
      }
    });

    return normalizedFolder;
  }

  private sanitizeFileName(name: string): string {
    const baseName = name.split(/[/\\]/).pop() ?? 'archivo';
    return baseName.replace(/[^\w.\-() ]/g, '_');
  }
}
