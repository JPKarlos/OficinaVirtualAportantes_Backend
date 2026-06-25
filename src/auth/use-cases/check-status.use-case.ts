import { Injectable, Logger } from '@nestjs/common';
import { GetJwtTokenUseCase } from './get-jwt-token.use-case';
import { User } from '../entities/user.entity';

@Injectable()
export class CheckAuthStatusUseCase {
  private readonly logger = new Logger('CheckAuthStatusUseCase');

  constructor(private readonly getJwtTokenUseCase: GetJwtTokenUseCase) {}

  execute(user: User) {
    try {
      return {
        token: this.getJwtTokenUseCase.execute({ id: user.id }),
        user,
      };
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error al verificar el estado de autenticación');
    }
  }
}
