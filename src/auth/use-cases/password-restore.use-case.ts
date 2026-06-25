import { UnauthorizedException } from '@nestjs/common';
import { Injectable, Logger } from '@nestjs/common';
import { PasswordRestoreDto } from '../dto/password-restore-dto';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { envs } from 'src/config/envs';
import { MailjetService } from 'src/common/mailjet/mailjet.service';

@Injectable()
export class PasswordRestoreUseCase {
  private readonly logger = new Logger('PasswordRestoreUseCase');

  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
    private readonly mailjetService: MailjetService,
  ) {}

  async execute(passwordRestoreDto: PasswordRestoreDto) {
    const { username, email } = passwordRestoreDto;
    const queryBuilder = this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userRoles', 'userRoles')
      .leftJoinAndSelect('userRoles.role', 'role');

    const user = await queryBuilder.where({ userName: username }).getOne();

    if (!user) throw new UnauthorizedException('Usuario NO Válido');

    if (user.email !== email)
      throw new UnauthorizedException(
        'Correo no se encuentra registrado para el usuario.',
      );

    if (!user.activo) throw new UnauthorizedException('Usuario Inactivo.');

    if (!user.userRoles.find((i) => i.role.name === envs.roleApp))
      throw new UnauthorizedException(
        'El Usuario no tiene los permisos suficientes para acceder a la plataforma.',
      );

    const token = this.jwtService.sign(
      { id: user.id },
      {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRES_RESET_PASSWORD,
      },
    );

    try {
      const resetPasswordUrl = `${envs.frontendUrl}/#/auth/reset-password/${token}`;

      await this.mailjetService.sendEmail(
        [{ Email: email }],
        'Restauración de contraseña - Plataforma de Radicaciones MALLAMAS EPS-I',
        '',
        `
          <h3>Restaurar contraseña - Plataforma de Radicaciones MALLAMAS EPS-I</h3>
          <br>
          <p>Para restaurar la contraseña diríjase al siguiente link: ${resetPasswordUrl}</p>
          `,
        [
          // {
          //   ContentType: 'image/png',
          //   Filename: 'imagen.png',
          //   Base64Content: 'iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==', // Ejemplo de imagen en base64
          // }
        ],
      );

      return {
        message: `Se envió el link de restauración de contraseña al correo: ${email}`,
      };
    } catch (error) {
      this.logger.error(error);
    }
  }
}
