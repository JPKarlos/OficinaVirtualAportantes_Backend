import { Injectable, Logger } from '@nestjs/common';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GetJwtTokenUseCase {
  private readonly logger = new Logger('GetJwtTokenUseCase');

  constructor(private readonly jwtService: JwtService) {}

  execute(payload: JwtPayload) {
    try {
      const token = this.jwtService.sign(payload);
      return token;
    } catch (error) {
      this.logger.error(error);
      throw new Error('Error al generar el token JWT');
    }
  }
}
