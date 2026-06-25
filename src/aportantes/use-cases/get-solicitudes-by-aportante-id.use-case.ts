import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { SolicitudesListResponseDto } from '../dto/solicitud-response.dto';
import { V_Solicitudes } from '../entities/v_solicitudes.entity';
import {
  SOLICITUDES_EN_TRAMITE_SQL,
  mapSolicitudFromSqlRow,
} from '../mappers/solicitud.mapper';

const ESTADO_EN_TRAMITE = 'En Trámite';

@Injectable()
export class GetSolicitudesByAportanteIdUseCase {
  constructor(
    @InjectRepository(V_Solicitudes, 'dbSIRIS_EPS')
    private readonly solicitudesRepository: Repository<V_Solicitudes>,
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(
    aportanteId: number,
    authenticatedUserId: string,
  ): Promise<SolicitudesListResponseDto> {
    await this.assertAportanteAuthorized(aportanteId, authenticatedUserId);

    const rows: Record<string, unknown>[] =
      await this.solicitudesRepository.manager.query(
        SOLICITUDES_EN_TRAMITE_SQL,
        [aportanteId, ESTADO_EN_TRAMITE],
      );

    const solicitudes = rows.map((row) => mapSolicitudFromSqlRow(row));

    return {
      aportanteId,
      total: solicitudes.length,
      solicitudes,
    };
  }

  private async assertAportanteAuthorized(
    aportanteId: number,
    authenticatedUserId: string,
  ): Promise<void> {
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
        'No está autorizado para consultar las solicitudes de este aportante.',
      );
    }
  }
}
