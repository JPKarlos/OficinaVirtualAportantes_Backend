import {
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ResetPasswordDto } from '../dto/reset-password-dto';
import * as passwordHasher from 'aspnet-identity-pw';

@Injectable()
export class ResetPasswordUseCase {
  private readonly logger = new Logger('ResetPasswordUseCase');

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(resetPasswordDto: ResetPasswordDto) {
    const { newPassword, token } = resetPasswordDto;

    try {
      this.jwtService.verify(token);

      const payload = this.jwtService.decode(token);
      const { id } = payload;
      if (id) {
        const queryBuilder = this.userRepository.createQueryBuilder('user');
        const user = await queryBuilder.where({ id: id }).getOne();

        if (!user) throw new UnauthorizedException('Token NO Válido');

        if (!user.activo) throw new UnauthorizedException('Usuario Inactivo.');

        const passwordHash = passwordHasher.hashPassword(newPassword);

        await this.userRepository.update(id, {
          passwordHash,
          lastPasswordChangedDate: new Date(),
        });

        return {
          ok: true,
        };
      } else {
        throw new UnauthorizedException('Token NO Válido');
      }
    } catch (error) {
      this.logger.error(`Error Reset Password: ${error.message}`);
      throw new BadRequestException(error.message);
    }
  }
}
