import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import * as passwordHasher from 'aspnet-identity-pw';
import { Repository } from 'typeorm';
import { LoginUserDto } from '../dto';
import { GetJwtTokenUseCase } from './get-jwt-token.use-case';
import { UserDataService } from '../services/user-data.service';
import { GetUltimaActualizacionAportanteByIdUseCase } from '../../aportantes/use-cases';
import { ActualizacionAportanteStatus } from '../interfaces/actualizacion-aportante-status.interface';

const MESES_LIMITE_ACTUALIZACION = 6;

@Injectable()
export class LoginUseCase {
  private readonly logger = new Logger('LoginUseCase');

  constructor(
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,

    private readonly getJwtTokenUseCase: GetJwtTokenUseCase,
    private readonly userDataService: UserDataService,
    private readonly getUltimaActualizacionAportanteByIdUseCase: GetUltimaActualizacionAportanteByIdUseCase,
  ) {}

  async execute(loginUserDto: LoginUserDto) {
    const { username, password } = loginUserDto;

    try {
      const user = await this.userRepository.findOne({
        where: { userName: username },
      });

      if (!user) {
        throw new UnauthorizedException('Usuario y contraseña NO Válidos');
      }

      if (!passwordHasher.validatePassword(password, user.passwordHash)) {
        throw new UnauthorizedException('Usuario y contraseña NO Válidos');
      }

      const userData = await this.userDataService.getUserDataByUsername(username);
      const estadoActualizacion = await this.buildEstadoActualizacion(user.aportanteId);

      return {
        token: this.getJwtTokenUseCase.execute({ id: user.id }),
        user: userData,
        estadoActualizacion,
      };
    } catch (error) {
      const httpStatus = error.status || HttpStatus.INTERNAL_SERVER_ERROR;
      this.logger.error(error.message);
      throw new HttpException(error.message, httpStatus);
    }
  }

  private async buildEstadoActualizacion(
    aportanteId?: number | null,
  ): Promise<ActualizacionAportanteStatus> {
    if (!aportanteId) {
      return {
        tieneAportante: false,
        tieneUltimaActualizacion: false,
        aportanteId: null,
        estado: 'SIN_APORTANTE',
        mesesDesdeUltimaActualizacion: null,
        fechaUltimaActualizacion: null,
        nombreRazonSocial: null,
        idenAportante: null,
      };
    }

    const ultimaActualizacion =
      await this.getUltimaActualizacionAportanteByIdUseCase.findByAportanteId(
        aportanteId,
      );

    if (!ultimaActualizacion) {
      return {
        tieneAportante: true,
        tieneUltimaActualizacion: false,
        aportanteId,
        estado: 'SIN_ULTIMA_ACTUALIZACION',
        mesesDesdeUltimaActualizacion: null,
        fechaUltimaActualizacion: null,
        nombreRazonSocial: null,
        idenAportante: null,
      };
    }

    const meses = ultimaActualizacion.mesesDesdeUltimaActualizacion;
    const estado =
      meses < MESES_LIMITE_ACTUALIZACION ? 'MENOR_6_MESES' : 'MAYOR_6_MESES';

    return {
      tieneAportante: true,
      tieneUltimaActualizacion: true,
      aportanteId,
      estado,
      mesesDesdeUltimaActualizacion: meses,
      fechaUltimaActualizacion: ultimaActualizacion.fechaUltimaActualizacion,
      nombreRazonSocial: ultimaActualizacion.nombreRazonSocial,
      idenAportante: ultimaActualizacion.idenAportante,
    };
  }
}
