import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import {
  LicenciaAportanteItemDto,
  LicenciasAportanteListResponseDto,
} from '../dto/licencia-aportante-response.dto';
import { V_LicenciasAportante } from '../entities/v_licencias_aportante.entity';
import {
  LICENCIAS_APORTANTE_SQL,
  mapLicenciaAportanteFromSqlRow,
} from '../mappers/licencia-aportante.mapper';

@Injectable()
export class GetLicenciasByAportanteIdUseCase {
  constructor(
    @InjectRepository(V_LicenciasAportante, 'dbSIRIS_EPS')
    private readonly licenciasRepository: Repository<V_LicenciasAportante>,
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(
    aportanteId: number,
    authenticatedUserId: string,
  ): Promise<LicenciasAportanteListResponseDto> {
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
        'No está autorizado para consultar las licencias de este aportante.',
      );
    }

    const rows: Record<string, unknown>[] =
      await this.licenciasRepository.manager.query(
        LICENCIAS_APORTANTE_SQL,
        [aportanteId],
      );

    const licencias: LicenciaAportanteItemDto[] = rows.map(
      (row, index) => mapLicenciaAportanteFromSqlRow(row, index),
    );

    return {
      aportanteId,
      total: licencias.length,
      licencias,
    };
  }
}
