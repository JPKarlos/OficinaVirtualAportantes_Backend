import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UpdateUserAportanteIdUseCase {
  constructor(
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(userId: string, userName: string, aportanteId: number): Promise<void> {
    const result = await this.userRepository.update(
      {
        id: userId,
        userName,
        esAportante: true,
      },
      { aportanteId },
    );

    if (!result.affected) {
      throw new BadRequestException(
        'No fue posible vincular el aportante al usuario autenticado.',
      );
    }
  }
}
