import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { envs } from 'src/config/envs';

export interface UserDataResponse {
  id: string;
  nombre: string;
  email: string;
  phoneNumber: string;
  IDE_PRESTADOR?:number;
  Aportante_id?:number;
  roles: Array<{
    id: string;
    name: string;
    description: string | null;
  }>;
}

@Injectable()
export class UserDataService {
  private readonly logger = new Logger('UserDataService');

  constructor(
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
  ) {}

  /**
   * Valida que el usuario tenga los permisos necesarios
   */
  private validateUserPermissions(user: User): void {
  
    if (!user.activo) {
      throw new UnauthorizedException('Usuario Inactivo.');
    }

    if (user.lockoutEnabled) {
      throw new UnauthorizedException('Usuario bloqueado.');
    }

     // NUEVA VALIDACIÓN: Solo aportantes pueden acceder
      if (!user.esAportante) {
    throw new UnauthorizedException(
      'El acceso está restringido solo para usuarios aportantes.',
    );
  }

    const roleApp = user.userRoles.find((i) => i.role.name === envs.roleApp);
    if (!roleApp) {
      throw new UnauthorizedException(
        'El Usuario no tiene los permisos suficientes para acceder a la plataforma.',
      );
    }
  }

  /**
   * Procesa y limpia los roles del usuario
   */
  private processUserRoles(user: User) {
    const roleApp = user.userRoles.find((i) => i.role.name === envs.roleApp);
    if (!roleApp) {
      throw new UnauthorizedException(
        'El Usuario no tiene los permisos suficientes para acceder a la plataforma.',
      );
    }
    
    const { aplicacion_id } = roleApp.role;

    const userRoles = user.userRoles.filter(
      (i) =>
        i.role.aplicacion_id === aplicacion_id &&
        i.role.name !== envs.roleApp,
    );

    const roles = userRoles.map((userRole) => userRole.role);

    return roles.map((role) => ({
      id: role.id,
      name: role.name,
      description: role.description,
    }));
  }

  /**
   * Construye la respuesta de datos del usuario
   */
  private buildUserResponse(user: User): UserDataResponse {
    const rolesCleaned = this.processUserRoles(user);

    return {
      id: user.id,
      nombre: user.nombres,
      email: user.email,
      phoneNumber: user.phoneNumber,
      IDE_PRESTADOR:user.idePrestador,
      Aportante_id:user.aportanteId,
      roles: rolesCleaned,
    };
  }

  /**
   * Obtiene y procesa los datos del usuario por ID
   */
  async getUserDataById(userId: string): Promise<UserDataResponse> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const user = await queryBuilder
      .where({ id: userId })
      .leftJoinAndSelect('user.userRoles', 'userRoles')
      .leftJoinAndSelect('userRoles.role', 'role')
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    this.validateUserPermissions(user);
    return this.buildUserResponse(user);
  }

  /**
   * Obtiene y procesa los datos del usuario por nombre de usuario
   */
  async getUserDataByUsername(username: string): Promise<UserDataResponse> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    const user = await queryBuilder
      .leftJoinAndSelect('user.userRoles', 'userRoles')
      .leftJoinAndSelect('userRoles.role', 'role')
      .where({ userName: username })
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Usuario no encontrado');
    }

    this.validateUserPermissions(user);
    return this.buildUserResponse(user);
  }
} 