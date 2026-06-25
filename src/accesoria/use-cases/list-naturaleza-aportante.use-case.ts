import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NaturalezaAportante } from '../entities';
import { QueryNaturalezaAportanteDto } from '../dto';

@Injectable()
export class ListNaturalezaAportanteUseCase {
  constructor(
    @InjectRepository(NaturalezaAportante, 'dbSIRIS_EPS')
    private readonly naturalezaAportanteRepository: Repository<NaturalezaAportante>,
  ) {}

  async execute(query: QueryNaturalezaAportanteDto): Promise<NaturalezaAportante[]> {
    const qb = this.naturalezaAportanteRepository
      .createQueryBuilder('naturalezaAportante')
      .orderBy('naturalezaAportante.descripcion', 'ASC');

    if (query.search) {
      qb.andWhere(
        '(naturalezaAportante.descripcion LIKE :search OR naturalezaAportante.nj LIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    return qb.getMany();
  }
}
