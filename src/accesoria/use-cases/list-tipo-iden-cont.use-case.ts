import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TipoIdenCont } from '../entities';
import { QueryTipoIdenContDto } from '../dto';

@Injectable()
export class ListTipoIdenContUseCase {
  constructor(
    @InjectRepository(TipoIdenCont, 'dbSIRIS_EPS')
    private readonly tipoIdenContRepository: Repository<TipoIdenCont>,
  ) {}

  async execute(query: QueryTipoIdenContDto): Promise<TipoIdenCont[]> {
    const qb = this.tipoIdenContRepository
      .createQueryBuilder('tipoIdenCont')
      .orderBy('tipoIdenCont.tipo', 'ASC');

    if (query.search) {
      qb.andWhere('tipoIdenCont.tipo LIKE :search', {
        search: `%${query.search}%`,
      });
    }

    return qb.getMany();
  }
}
