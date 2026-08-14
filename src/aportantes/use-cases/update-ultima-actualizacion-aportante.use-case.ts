import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAportanteDto } from '../dto/create-aportante.dto';
import { envs } from '../../config/envs';
import { FtpService } from '../../common/ftp/ftp.service';
import { generateCarpetaSoportesAportante } from '../mappers/soportes.mapper';
import {
  UpdateAportanteResult,
  UpdateAportanteUseCase,
} from './update-aportante.use-case';

const MAX_SOPORTES = 10;

@Injectable()
export class UpdateUltimaActualizacionAportanteUseCase {
  constructor(
    private readonly updateAportanteUseCase: UpdateAportanteUseCase,
    private readonly ftpService: FtpService,
  ) {}

  async execute(
    aportanteId: number,
    updateAportanteDto: CreateAportanteDto,
    files: Express.Multer.File[],
    authenticatedUserId: string,
  ): Promise<UpdateAportanteResult> {
    const soportes = await this.validateAndPrepareSoportes(aportanteId, files);

    return this.updateAportanteUseCase.execute(
      aportanteId,
      updateAportanteDto,
      authenticatedUserId,
      soportes,
    );
  }

  private async validateAndPrepareSoportes(
    aportanteId: number,
    files: Express.Multer.File[],
  ): Promise<{ rutaSoportes: string; cantidadDocumentosCargados: number }> {
    const soportes = files?.filter((file) => !!file?.buffer) ?? [];

    if (soportes.length === 0) {
      throw new BadRequestException(
        'Debe cargar al menos un documento de soporte en formato PDF.',
      );
    }

    if (soportes.length > MAX_SOPORTES) {
      throw new BadRequestException(
        `Solo se permiten hasta ${MAX_SOPORTES} documentos de soporte.`,
      );
    }

    for (const file of soportes) {
      const fileName = file.originalname ?? '';
      if (!fileName.toLowerCase().endsWith('.pdf')) {
        throw new BadRequestException(
          'Todos los documentos de soporte deben estar en formato PDF.',
        );
      }
    }

    const carpeta = generateCarpetaSoportesAportante(aportanteId);
    const basePath = envs.ftpPathSoportesAportante
      .trim()
      .replace(/\\/g, '/')
      .replace(/\/$/, '');
    const rutaSoportes = `${basePath}/${carpeta}`;

    await this.ftpService.uploadFilesToFolder(
      rutaSoportes,
      soportes.map((file) => ({
        originalName: file.originalname,
        buffer: file.buffer,
      })),
    );

    return {
      rutaSoportes,
      cantidadDocumentosCargados: soportes.length,
    };
  }
}