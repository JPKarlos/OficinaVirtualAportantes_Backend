import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClaseAportante } from '../entities';
import { QueryClaseAportanteDto } from '../dto';

@Injectable()
export class ListClaseAportanteUseCase {
  constructor(
    @InjectRepository(ClaseAportante, 'dbSIRIS_EPS')
    private readonly claseAportanteRepository: Repository<ClaseAportante>,
  ) {}

  async execute(query: QueryClaseAportanteDto): Promise<ClaseAportante[]> {
    const qb = this.claseAportanteRepository
      .createQueryBuilder('claseAportante')
      .orderBy('claseAportante.descripcion', 'ASC');

    if (query.search) {
      qb.andWhere(
        '(claseAportante.descripcion LIKE :search OR claseAportante.clase LIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    return qb.getMany();
  }
}
