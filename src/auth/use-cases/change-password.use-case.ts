import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { ChangePasswordDto } from '../dto/change-password-dto';
import * as passwordHasher from 'aspnet-identity-pw';

@Injectable()
export class ChangePasswordUseCase {
  private readonly logger = new Logger('ChangePasswordUseCase');

  constructor(
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(changePasswordDto: ChangePasswordDto, userId: string) {
    const { currentPassword, newPassword } = changePasswordDto;

    try {
      // Obtener el usuario actual
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new UnauthorizedException('Usuario no encontrado');
      }

      if (!user.activo) {
        throw new UnauthorizedException('Usuario inactivo');
      }

      // Validar la contraseña actual
      if (!passwordHasher.validatePassword(currentPassword, user.passwordHash)) {
        throw new UnauthorizedException('La contraseña actual es incorrecta');
      }

      // Verificar que la nueva contraseña sea diferente a la actual
      if (passwordHasher.validatePassword(newPassword, user.passwordHash)) {
        throw new BadRequestException('La nueva contraseña debe ser diferente a la actual');
      }

      // Generar hash de la nueva contraseña
      const newPasswordHash = passwordHasher.hashPassword(newPassword);

      // Actualizar la contraseña en la base de datos
      await this.userRepository.update(userId, {
        passwordHash: newPasswordHash,
        lastPasswordChangedDate: new Date(),
      });

      return {
        ok: true,
        message: 'Contraseña cambiada exitosamente',
      };
    } catch (error) {
      this.logger.error(`Error Change Password: ${error.message}`);
      throw error;
    }
  }
} 