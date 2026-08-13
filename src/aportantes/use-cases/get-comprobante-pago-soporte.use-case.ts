import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { FtpService } from '../../common/ftp/ftp.service';
import { envs } from '../../config/envs';
import { ComprobantePagoSoporteDto } from '../dto/comprobante-pago-soporte-response.dto';
import { ComprobantePago } from '../entities/comprobante-pago.entity';

const COMPROBANTE_PAGO_MAX_ARCHIVO_SQL = `
  SELECT TOP 1 [Archivo]
  FROM [SIRIS_EPS].[Contributivo].[ComprobantesPago]
  WHERE [Afiliado_id] = @0 AND [Incapacidad_id] = @1
  ORDER BY [ComprobantesPago_id] DESC
`;

@Injectable()
export class GetComprobantePagoSoporteUseCase {
  constructor(
    @InjectRepository(ComprobantePago, 'dbSIRIS_EPS')
    private readonly comprobantePagoRepository: Repository<ComprobantePago>,
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
    private readonly ftpService: FtpService,
  ) {}

  async execute(
    aportanteId: number,
    afiliadoId: number,
    incapacidadId: number,
    authenticatedUserId: string,
  ): Promise<ComprobantePagoSoporteDto> {
    const authUser = await this.userRepository.findOne({
      where: { id: authenticatedUserId },
    });

    if (!authUser?.esAportante) {
      throw new ForbiddenException(
        'Solo los usuarios aportantes pueden consultar esta información.',
      );
    }

    if (!authUser.aportanteId || authUser.aportanteId !== aportanteId) {
      throw new ForbiddenException(
        'No está autorizado para consultar el soporte de pago de este aportante.',
      );
    }

    const rows: Record<string, unknown>[] =
      await this.comprobantePagoRepository.manager.query(
        COMPROBANTE_PAGO_MAX_ARCHIVO_SQL,
        [afiliadoId, incapacidadId],
      );

    if (!rows.length) {
      throw new NotFoundException(
        'No se encontró un comprobante de pago para esta incapacidad.',
      );
    }

    const archivo = String(rows[0].Archivo ?? '').trim();
    if (!archivo) {
      throw new NotFoundException(
        'El comprobante de pago no tiene un archivo asociado.',
      );
    }

    const basePath = envs.ftpPathComprobantes
      .trim()
      .replace(/\\/g, '/')
      .replace(/\/$/, '');
    const remotePath = `${basePath}/${archivo}`;

    const buffer = await this.ftpService.downloadComprobanteFile(remotePath);

    return {
      fileName: archivo,
      buffer,
    };
  }
}
