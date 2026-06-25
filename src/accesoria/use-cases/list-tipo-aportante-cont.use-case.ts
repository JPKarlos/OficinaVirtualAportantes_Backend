import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoAportanteCont } from '../entities';
import { QueryTipoAportanteContDto } from '../dto';

@Injectable()
export class ListTipoAportanteContUseCase {
  constructor(
    @InjectRepository(TipoAportanteCont, 'dbSIRIS_EPS')
    private readonly tipoAportanteContRepository: Repository<TipoAportanteCont>,
  ) {}

  async execute(query: QueryTipoAportanteContDto): Promise<TipoAportanteCont[]> {
    const qb = this.tipoAportanteContRepository
      .createQueryBuilder('tipoAportanteCont')
      .orderBy('tipoAportanteCont.descripcion', 'ASC');

    if (query.search) {
      qb.andWhere(
        '(tipoAportanteCont.descripcion LIKE :search OR tipoAportanteCont.ta LIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    return qb.getMany();
  }
}
