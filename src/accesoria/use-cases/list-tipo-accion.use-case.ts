import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoAccion } from '../entities';
import { QueryTipoAccionDto } from '../dto';

@Injectable()
export class ListTipoAccionUseCase {
  constructor(
    @InjectRepository(TipoAccion, 'dbSIRIS_EPS')
    private readonly tipoAccionRepository: Repository<TipoAccion>,
  ) {}

  async execute(query: QueryTipoAccionDto): Promise<TipoAccion[]> {
    const qb = this.tipoAccionRepository
      .createQueryBuilder('tipoAccion')
      .orderBy('tipoAccion.descripcion', 'ASC');

    if (query.search) {
      qb.andWhere(
        '(tipoAccion.descripcion LIKE :search OR tipoAccion.ta LIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    return qb.getMany();
  }
}
