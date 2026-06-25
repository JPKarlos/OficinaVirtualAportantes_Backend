import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import {
  IncapacidadAportanteItemDto,
  IncapacidadesAportanteListResponseDto,
} from '../dto/incapacidad-aportante-response.dto';
import { V_IncapacidadesAportante } from '../entities/v_incapacidades_aportante.entity';
import {
  INCAPACIDADES_APORTANTE_SQL,
  mapIncapacidadAportanteFromSqlRow,
} from '../mappers/incapacidad-aportante.mapper';

@Injectable()
export class GetIncapacidadesByAportanteIdUseCase {
  constructor(
    @InjectRepository(V_IncapacidadesAportante, 'dbSIRIS_EPS')
    private readonly incapacidadesRepository: Repository<V_IncapacidadesAportante>,
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(
    aportanteId: number,
    authenticatedUserId: string,
  ): Promise<IncapacidadesAportanteListResponseDto> {
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
        'No está autorizado para consultar las incapacidades de este aportante.',
      );
    }

    const rows: Record<string, unknown>[] =
      await this.incapacidadesRepository.manager.query(
        INCAPACIDADES_APORTANTE_SQL,
        [aportanteId],
      );

    const incapacidades: IncapacidadAportanteItemDto[] = rows.map(
      (row, index) => mapIncapacidadAportanteFromSqlRow(row, index),
    );

    return {
      aportanteId,
      total: incapacidades.length,
      incapacidades,
    };
  }
}
