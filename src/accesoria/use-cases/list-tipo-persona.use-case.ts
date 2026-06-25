import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoPersona } from '../entities';
import { QueryTipoPersonaDto } from '../dto';

@Injectable()
export class ListTipoPersonaUseCase {
  constructor(
    @InjectRepository(TipoPersona, 'dbSIRIS_EPS')
    private readonly tipoPersonaRepository: Repository<TipoPersona>,
  ) {}

  async execute(query: QueryTipoPersonaDto): Promise<TipoPersona[]> {
    const qb = this.tipoPersonaRepository
      .createQueryBuilder('tipoPersona')
      .orderBy('tipoPersona.descripcion', 'ASC');

    if (query.search) {
      qb.andWhere(
        '(tipoPersona.descripcion LIKE :search OR tipoPersona.tp LIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    return qb.getMany();
  }
}
