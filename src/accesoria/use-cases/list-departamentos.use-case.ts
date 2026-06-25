import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Departamento } from '../entities';
import { QueryDepartamentosDto } from '../dto';

@Injectable()
export class ListDepartamentosUseCase {
  constructor(
    @InjectRepository(Departamento, 'dbSIRIS_EPS')
    private readonly departamentoRepository: Repository<Departamento>,
  ) {}

  async execute(query: QueryDepartamentosDto): Promise<Departamento[]> {
    const qb = this.departamentoRepository
      .createQueryBuilder('departamento')
      .orderBy('departamento.descripcion', 'ASC');

    if (query.search) {
      qb.andWhere(
        '(departamento.descripcion LIKE :search OR departamento.codigo LIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    return qb.getMany();
  }
}
