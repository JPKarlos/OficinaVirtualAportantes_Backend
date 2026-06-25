import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, IsNull, Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { UpdateUserAportanteIdUseCase } from '../../auth/use-cases/update-user-aportante-id.use-case';
import { ActualizacionAportanteStatus } from '../../auth/interfaces/actualizacion-aportante-status.interface';
import {
  CreateAportanteDto,
  mapCreateAportanteDtoToPayload,
} from '../dto/create-aportante.dto';
import { Aportante } from '../entities/aportantes.entity';
import { UltimaActualizacionAportantes } from '../entities/ultima-actualizacion-aportantes.entity';

export interface CreateAportanteResult {
  aportanteId: number;
  ultimaActualizacionId: number;
  estadoActualizacion: ActualizacionAportanteStatus;
}

@Injectable()
export class CreateAportanteUseCase {
  private readonly logger = new Logger(CreateAportanteUseCase.name);

  constructor(
    @InjectDataSource('dbSIRIS_EPS')
    private readonly dataSource: DataSource,
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
    private readonly updateUserAportanteIdUseCase: UpdateUserAportanteIdUseCase,
  ) {}

  async execute(
    createAportanteDto: CreateAportanteDto,
    authenticatedUserId: string,
  ): Promise<CreateAportanteResult> {
    const authUser = await this.userRepository.findOne({
      where: { id: authenticatedUserId },
    });

    if (!authUser) {
      throw new ForbiddenException('Usuario autenticado no encontrado.');
    }

    if (!authUser.esAportante) {
      throw new ForbiddenException(
        'Solo los usuarios aportantes pueden registrar un aportante.',
      );
    }

    if (authUser.aportanteId) {
      throw new BadRequestException(
        'El usuario autenticado ya tiene un aportante asociado.',
      );
    }

    const payload = mapCreateAportanteDtoToPayload(createAportanteDto);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let savedAportante: Aportante;
    let savedUltimaActualizacion: UltimaActualizacionAportantes;

    try {
      const existingAportante = await queryRunner.manager.findOne(Aportante, {
        where: {
          idenAportante: payload.idenAportante,
          dvAportante:
            payload.dvAportante === null ? IsNull() : payload.dvAportante,
        },
      });

      if (existingAportante) {
        throw new BadRequestException(
          `Ya existe un aportante con identificación "${payload.idenAportante}"${payload.dvAportante ? ` y DV "${payload.dvAportante}"` : ''}.`,
        );
      }

      const aportanteToSave = queryRunner.manager.create(Aportante, {
        ...payload,
      } as DeepPartial<Aportante>);
      savedAportante = await queryRunner.manager.save(aportanteToSave);

      const ultimaToSave = queryRunner.manager.create(
        UltimaActualizacionAportantes,
        {
          ...payload,
          aportanteId: savedAportante.aportanteId,
          fechaActualizacion: new Date(),
          usuario: authUser.userName,
        } as DeepPartial<UltimaActualizacionAportantes>,
      );
      savedUltimaActualizacion = await queryRunner.manager.save(ultimaToSave);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (
        error instanceof BadRequestException ||
        error instanceof ForbiddenException
      ) {
        throw error;
      }

      this.logger.error('Error al crear el aportante', error);
      throw new BadRequestException('Error al crear el aportante.');
    } finally {
      await queryRunner.release();
    }

    try {
      await this.updateUserAportanteIdUseCase.execute(
        authUser.id,
        authUser.userName,
        savedAportante!.aportanteId,
      );
    } catch (error) {
      this.logger.error(
        `Aportante ${savedAportante!.aportanteId} creado pero no se pudo vincular al usuario ${authUser.id}`,
        error,
      );
      throw new BadRequestException(
        'El aportante fue creado, pero no fue posible vincularlo al usuario autenticado. Contacte al administrador.',
      );
    }

    return {
      aportanteId: savedAportante!.aportanteId,
      ultimaActualizacionId: savedUltimaActualizacion!.ultimaActualizacionId,
      estadoActualizacion: this.buildEstadoActualizacion(
        savedAportante!,
        savedUltimaActualizacion!,
      ),
    };
  }

  private buildEstadoActualizacion(
    aportante: Aportante,
    ultimaActualizacion: UltimaActualizacionAportantes,
  ): ActualizacionAportanteStatus {
    return {
      tieneAportante: true,
      tieneUltimaActualizacion: true,
      aportanteId: aportante.aportanteId,
      estado: 'MENOR_6_MESES',
      mesesDesdeUltimaActualizacion: 0,
      fechaUltimaActualizacion: ultimaActualizacion.fechaActualizacion,
      nombreRazonSocial: aportante.nombreRazonSocial,
      idenAportante: aportante.idenAportante,
    };
  }
}
