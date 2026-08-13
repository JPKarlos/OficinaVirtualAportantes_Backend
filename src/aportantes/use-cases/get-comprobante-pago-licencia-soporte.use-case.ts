import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { FtpService } from '../../common/ftp/ftp.service';
import { envs } from '../../config/envs';
import { ComprobantePagoSoporteDto } from '../dto/comprobante-pago-soporte-response.dto';
import { ComprobantePagoLicencia } from '../entities/comprobante-pago-licencia.entity';

const COMPROBANTE_PAGO_LICENCIA_MAX_ARCHIVO_SQL = `
  SELECT TOP 1 [Archivo]
  FROM [SIRIS_EPS].[Contributivo].[ComprobantesPagoLicencias]
  WHERE [Afiliado_id] = @0 AND [LicenciasMaternidad_id] = @1
  ORDER BY [ComprobantesPagoLicencias_id] DESC
`;

@Injectable()
export class GetComprobantePagoLicenciaSoporteUseCase {
  constructor(
    @InjectRepository(ComprobantePagoLicencia, 'dbSIRIS_EPS')
    private readonly comprobantePagoLicenciaRepository: Repository<ComprobantePagoLicencia>,
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
    private readonly ftpService: FtpService,
  ) {}

  async execute(
    aportanteId: number,
    afiliadoId: number,
    licenciasMaternidadId: number,
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
      await this.comprobantePagoLicenciaRepository.manager.query(
        COMPROBANTE_PAGO_LICENCIA_MAX_ARCHIVO_SQL,
        [afiliadoId, licenciasMaternidadId],
      );

    if (!rows.length) {
      throw new NotFoundException(
        'No se encontró un comprobante de pago para esta licencia.',
      );
    }

    const archivo = String(rows[0].Archivo ?? '').trim();
    if (!archivo) {
      throw new NotFoundException(
        'El comprobante de pago no tiene un archivo asociado.',
      );
    }

    const basePath = envs.ftpPathComprobantesLicencias.trim().replace(/\\/g, '/').replace(/\/$/, '');
    const buffer = await this.ftpService.downloadComprobanteFile(`${basePath}/${archivo}`);

    return {
      fileName: archivo,
      buffer,
    };
  }
}