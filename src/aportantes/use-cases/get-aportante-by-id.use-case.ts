import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Aportante } from '../entities/aportantes.entity';

@Injectable()
export class GetAportanteByIdUseCase {
  constructor(
    @InjectRepository(Aportante, 'dbSIRIS_EPS')
    private readonly aportanteRepository: Repository<Aportante>,
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(
    aportanteId: number,
    authenticatedUserId: string,
  ): Promise<Aportante> {
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
        'No está autorizado para consultar este aportante.',
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

    return aportante;
  }
}
