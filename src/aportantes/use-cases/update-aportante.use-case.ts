import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, DeepPartial, Repository } from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { ActualizacionAportanteStatus } from '../../auth/interfaces/actualizacion-aportante-status.interface';
import {
  CreateAportanteDto,
  mapCreateAportanteDtoToPayload,
} from '../dto/create-aportante.dto';
import { Aportante } from '../entities/aportantes.entity';
import { UltimaActualizacionAportantes } from '../entities/ultima-actualizacion-aportantes.entity';
import { mapAportanteEntityToPayload } from '../mappers/aportante-payload.mapper';

export interface UpdateAportanteResult {
  aportanteId: number;
  ultimaActualizacionId: number;
  estadoActualizacion: ActualizacionAportanteStatus;
}

@Injectable()
export class UpdateAportanteUseCase {
  private readonly logger = new Logger(UpdateAportanteUseCase.name);

  constructor(
    @InjectDataSource('dbSIRIS_EPS')
    private readonly dataSource: DataSource,
    @InjectRepository(User, 'dbAuth')
    private readonly userRepository: Repository<User>,
  ) {}

  async execute(
    aportanteId: number,
    updateAportanteDto: CreateAportanteDto,
    authenticatedUserId: string,
  ): Promise<UpdateAportanteResult> {
    const authUser = await this.userRepository.findOne({
      where: { id: authenticatedUserId },
    });

    if (!authUser) {
      throw new ForbiddenException('Usuario autenticado no encontrado.');
    }

    if (!authUser.esAportante) {
      throw new ForbiddenException(
        'Solo los usuarios aportantes pueden actualizar esta información.',
      );
    }

    if (!authUser.aportanteId || authUser.aportanteId !== aportanteId) {
      throw new ForbiddenException(
        'No está autorizado para actualizar este aportante.',
      );
    }

    const newPayload = mapCreateAportanteDtoToPayload(updateAportanteDto);
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    let savedHistorial: UltimaActualizacionAportantes;
    let updatedAportante: Aportante | null = null;

    try {
      const currentAportante = await queryRunner.manager.findOne(Aportante, {
        where: { aportanteId },
        lock: { mode: 'pessimistic_write' },
      });

      if (!currentAportante) {
        throw new NotFoundException(
          `No existe un aportante con ID ${aportanteId}.`,
        );
      }

      if (currentAportante.aportanteId !== aportanteId) {
        throw new BadRequestException(
          'Inconsistencia al consultar el aportante para actualizar.',
        );
      }

      const historialPayload = mapAportanteEntityToPayload(currentAportante);
      const historialToSave = queryRunner.manager.create(
        UltimaActualizacionAportantes,
        {
          ...historialPayload,
          aportanteId: currentAportante.aportanteId,
          fechaActualizacion: new Date(),
          usuario: authUser.userName,
        } as DeepPartial<UltimaActualizacionAportantes>,
      );
      savedHistorial = await queryRunner.manager.save(historialToSave);

      queryRunner.manager.merge(
        Aportante,
        currentAportante,
        newPayload as DeepPartial<Aportante>,
      );
      updatedAportante = await queryRunner.manager.save(
        Aportante,
        currentAportante,
      );

      if (!updatedAportante || updatedAportante.aportanteId !== aportanteId) {
        throw new BadRequestException(
          'No fue posible verificar la actualización del aportante.',
        );
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();

      if (
        error instanceof BadRequestException ||
        error instanceof ForbiddenException ||
        error instanceof NotFoundException
      ) {
        throw error;
      }

      this.logger.error(
        `Error al actualizar el aportante ${aportanteId}`,
        error,
      );
      throw new BadRequestException('Error al actualizar el aportante.');
    } finally {
      await queryRunner.release();
    }

    return {
      aportanteId: updatedAportante!.aportanteId,
      ultimaActualizacionId: savedHistorial!.ultimaActualizacionId,
      estadoActualizacion: this.buildEstadoActualizacion(
        updatedAportante!,
        savedHistorial!,
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
