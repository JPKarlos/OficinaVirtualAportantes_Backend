import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Aportante } from '../entities/aportantes.entity';
import { V_ReporteCarteraUgppDetalladoNuevoProceso } from '../entities/v_reporte-cartera-ugpp-detallado-nuevo-proceso.entity';
import {
  buildCertificadoMoraFileName,
  buildDocumentoCotizante,
  buildNombreCompletoCotizante,
  generateCertificadoMoraDocx,
} from '../utils/certificado-mora-docx.generator';
import {
  formatFechaCertificadoEspanol,
  formatIdentificacionAportante,
} from '../utils/date-spanish.util';
import { getNombreCoordinadorMovilidad } from '../utils/docx.util';

export interface CertificadoMoraResult {
  buffer: Buffer;
  fileName: string;
}

@Injectable()
export class GenerateCertificadoMoraUseCase {
  private readonly logger = new Logger(GenerateCertificadoMoraUseCase.name);

  constructor(
    @InjectRepository(Aportante, 'dbSIRIS_EPS')
    private readonly aportanteRepository: Repository<Aportante>,
    @InjectRepository(V_ReporteCarteraUgppDetalladoNuevoProceso, 'dbSIRIS_EPS')
    private readonly moraDetalleRepository: Repository<V_ReporteCarteraUgppDetalladoNuevoProceso>,
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(
    aportanteId: number,
    authenticatedUserId: string,
  ): Promise<CertificadoMoraResult> {
    const authUser = await this.userRepository.findOne({
      where: { id: authenticatedUserId },
    });

    if (!authUser?.esAportante) {
      throw new ForbiddenException(
        'Solo los usuarios aportantes pueden generar este certificado.',
      );
    }

    if (!authUser.aportanteId || authUser.aportanteId !== aportanteId) {
      throw new ForbiddenException(
        'No está autorizado para generar el certificado de este aportante.',
      );
    }

    const aportante = await this.aportanteRepository.findOne({
      where: { aportanteId },
    });

    if (!aportante) {
      throw new NotFoundException(
        `No existe un aportante con ID ${aportanteId}.`,
      );
    }

    let rows: V_ReporteCarteraUgppDetalladoNuevoProceso[];

    try {
      rows = await this.moraDetalleRepository
        .createQueryBuilder('mora')
        .where('mora.aportanteId = :aportanteId', { aportanteId })
        .orderBy('mora.anio', 'DESC')
        .addOrderBy('mora.numMes', 'DESC')
        .addOrderBy('mora.apellido1', 'ASC')
        .addOrderBy('mora.nombre1', 'ASC')
        .setLock('dirty_read')
        .getMany();
    } catch (error) {
      if (this.isQueryTimeout(error)) {
        this.logger.error(
          `Timeout al consultar detalle de mora para aportante ${aportanteId}`,
          error,
        );
        throw new RequestTimeoutException(
          'La consulta de mora está tardando más de lo esperado. Intente nuevamente en unos momentos.',
        );
      }

      throw error;
    }

    if (rows.length === 0) {
      throw new BadRequestException(
        'No es posible generar el certificado de mora sin registros de morosidad.',
      );
    }

    const referencia = rows[0];
    const identificacion = formatIdentificacionAportante(
      referencia.tipo,
      referencia.idenAportante ?? aportante.idenAportante,
      referencia.dvAportante ?? aportante.dvAportante,
    );
    const razonSocial =
      referencia.nombreRazonSocial?.trim() ??
      aportante.nombreRazonSocial?.trim() ??
      '';

    const detalle = rows.map((row) => ({
      anio: String(row.anio),
      mes: String(row.numMes),
      documento: buildDocumentoCotizante(row.tipoDocCotizante, row.documento),
      cotizante: buildNombreCompletoCotizante(row),
    }));

    const buffer = generateCertificadoMoraDocx({
      razonSocial,
      identificacion,
      detalle,
      fechaEmision: formatFechaCertificadoEspanol(new Date()),
      nombreCoordinador: getNombreCoordinadorMovilidad(),
    });

    return {
      buffer,
      fileName: buildCertificadoMoraFileName(identificacion),
    };
  }

  private isQueryTimeout(error: unknown): boolean {
    if (!(error instanceof QueryFailedError)) {
      return false;
    }

    const driverError = error.driverError as { code?: string };
    return driverError?.code === 'ETIMEOUT' || error.message.includes('Timeout');
  }
}
