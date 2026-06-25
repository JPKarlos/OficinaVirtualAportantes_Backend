import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Aportante } from '../entities/aportantes.entity';
import { V_AportanteAfiliados } from '../entities/v_aportante_afiliados.entity';
import { V_ReporteCarteraUgppAfiliadoResumen } from '../entities/v_reporte-cartera-ugpp-afiliado-resumen.entity';
import {
  formatFechaCertificadoEspanol,
  formatIdentificacionAportante,
} from '../utils/date-spanish.util';
import { getNombreCoordinadorMovilidad } from '../utils/docx.util';
import {
  buildPazYSalvoFileName,
  generatePazYSalvoDocx,
} from '../utils/paz-y-salvo-docx.generator';

export interface CertificadoPazYSalvoResult {
  buffer: Buffer;
  fileName: string;
}

@Injectable()
export class GenerateCertificadoPazYSalvoUseCase {
  constructor(
    @InjectRepository(Aportante, 'dbSIRIS_EPS')
    private readonly aportanteRepository: Repository<Aportante>,
    @InjectRepository(V_ReporteCarteraUgppAfiliadoResumen, 'dbSIRIS_EPS')
    private readonly moraRepository: Repository<V_ReporteCarteraUgppAfiliadoResumen>,
    @InjectRepository(V_AportanteAfiliados, 'dbSIRIS_EPS')
    private readonly aportanteAfiliadosRepository: Repository<V_AportanteAfiliados>,
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(
    aportanteId: number,
    authenticatedUserId: string,
  ): Promise<CertificadoPazYSalvoResult> {
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

    const moraCount = await this.moraRepository.count({
      where: { aportanteId },
    });

    if (moraCount > 0) {
      throw new BadRequestException(
        'No es posible generar el certificado de paz y salvo mientras existan registros de mora.',
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

    const afiliadoReferencia = await this.aportanteAfiliadosRepository.findOne({
      where: { aportanteId },
      order: { historicoId: 'ASC' },
    });

    const identificacion = formatIdentificacionAportante(
      afiliadoReferencia?.tipoApt ?? afiliadoReferencia?.tipo,
      aportante.idenAportante,
      aportante.dvAportante,
    );

    const razonSocial = aportante.nombreRazonSocial?.trim() ?? '';
    const hoy = new Date();
    const fechaCorte = formatFechaCertificadoEspanol(hoy);
    const fechaEmision = formatFechaCertificadoEspanol(hoy);
    const nombreCoordinador = getNombreCoordinadorMovilidad();

    const buffer = generatePazYSalvoDocx({
      razonSocial,
      identificacion,
      fechaCorte,
      fechaEmision,
      nombreCoordinador,
    });

    return {
      buffer,
      fileName: buildPazYSalvoFileName(identificacion),
    };
  }
}
