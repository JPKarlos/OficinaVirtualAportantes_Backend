import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { V_UltimaactualizacionAportantes } from '../entities';

@Injectable()
export class GetUltimaActualizacionAportanteByIdUseCase {
  constructor(
    @InjectRepository(V_UltimaactualizacionAportantes, 'dbSIRIS_EPS')
    private readonly ultimaActualizacionAportanteRepository: Repository<V_UltimaactualizacionAportantes>,
  ) {}

  async execute(aportanteId: number): Promise<V_UltimaactualizacionAportantes> {
    const ultimaActualizacion = await this.findByAportanteId(aportanteId);

    if (!ultimaActualizacion) {
      throw new NotFoundException(`No existe ultmima actualización para aportante con ID ${aportanteId}`);
    }

    return ultimaActualizacion;
  }

  async findByAportanteId(
    aportanteId: number,
  ): Promise<V_UltimaactualizacionAportantes | null> {
    return this.ultimaActualizacionAportanteRepository.findOne({
      where: { aportanteId },
    });
  }
}