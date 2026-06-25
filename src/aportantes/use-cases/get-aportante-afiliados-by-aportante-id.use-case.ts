import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import {
  AportanteAfiliadoItemDto,
  AportanteAfiliadosListResponseDto,
} from '../dto/aportante-afiliado-response.dto';
import { V_AportanteAfiliados } from '../entities/v_aportante_afiliados.entity';
import { mapAportanteAfiliadoToDto } from '../mappers/aportante-afiliado.mapper';

@Injectable()
export class GetAportanteAfiliadosByAportanteIdUseCase {
  constructor(
    @InjectRepository(V_AportanteAfiliados, 'dbSIRIS_EPS')
    private readonly aportanteAfiliadosRepository: Repository<V_AportanteAfiliados>,
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(
    aportanteId: number,
    authenticatedUserId: string,
  ): Promise<AportanteAfiliadosListResponseDto> {
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
        'No está autorizado para consultar los afiliados de este aportante.',
      );
    }

    const rows = await this.aportanteAfiliadosRepository.find({
      where: { aportanteId },
      order: { apellido1: 'ASC', nombre1: 'ASC' },
    });

    const afiliados: AportanteAfiliadoItemDto[] = rows.map(mapAportanteAfiliadoToDto);

    return {
      aportanteId,
      total: afiliados.length,
      afiliados,
    };
  }
}
