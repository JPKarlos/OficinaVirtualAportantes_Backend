import {
  ForbiddenException,
  Injectable,
  Logger,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import {
  MoraAportanteItemDto,
  MoraAportanteListResponseDto,
} from '../dto/mora-aportante-response.dto';
import { V_ReporteCarteraUgppAfiliadoResumen } from '../entities/v_reporte-cartera-ugpp-afiliado-resumen.entity';
import { mapMoraAportanteToDto } from '../mappers/mora-aportante.mapper';

@Injectable()
export class GetMoraByAportanteIdUseCase {
  private readonly logger = new Logger(GetMoraByAportanteIdUseCase.name);

  constructor(
    @InjectRepository(V_ReporteCarteraUgppAfiliadoResumen, 'dbSIRIS_EPS')
    private readonly moraRepository: Repository<V_ReporteCarteraUgppAfiliadoResumen>,
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(
    aportanteId: number,
    authenticatedUserId: string,
  ): Promise<MoraAportanteListResponseDto> {
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
        'No está autorizado para consultar la mora de este aportante.',
      );
    }

    let rows: V_ReporteCarteraUgppAfiliadoResumen[];

    try {
      rows = await this.moraRepository
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
          `Timeout al consultar mora para aportante ${aportanteId}`,
          error,
        );
        throw new RequestTimeoutException(
          'La consulta de mora está tardando más de lo esperado. Intente nuevamente en unos momentos.',
        );
      }

      throw error;
    }

    const registros: MoraAportanteItemDto[] = rows.map(mapMoraAportanteToDto);

    return {
      aportanteId,
      total: registros.length,
      registros,
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
