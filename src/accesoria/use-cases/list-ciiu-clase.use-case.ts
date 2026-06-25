import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CiiuClase } from '../entities';
import { QueryCiiuClaseDto } from '../dto';

@Injectable()
export class ListCiiuClaseUseCase {
  constructor(
    @InjectRepository(CiiuClase, 'dbSIRIS_EPS')
    private readonly ciiuClaseRepository: Repository<CiiuClase>,
  ) {}

  async execute(query: QueryCiiuClaseDto): Promise<CiiuClase[]> {
    const qb = this.ciiuClaseRepository
      .createQueryBuilder('ciiuClase')
      .orderBy('ciiuClase.descripcion', 'ASC');

    if (query.search) {
      qb.andWhere(
        '(ciiuClase.descripcion LIKE :search OR ciiuClase.codigo LIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    if (query.ciiuGrupoId) {
      qb.andWhere('ciiuClase.ciiuGrupoId = :ciiuGrupoId', {
        ciiuGrupoId: query.ciiuGrupoId,
      });
    }

    return qb.getMany();
  }
}
