import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FormaPresentacion } from '../entities';
import { QueryFormaPresentacionDto } from '../dto';

@Injectable()
export class ListFormaPresentacionUseCase {
  constructor(
    @InjectRepository(FormaPresentacion, 'dbSIRIS_EPS')
    private readonly formaPresentacionRepository: Repository<FormaPresentacion>,
  ) {}

  async execute(query: QueryFormaPresentacionDto): Promise<FormaPresentacion[]> {
    const qb = this.formaPresentacionRepository
      .createQueryBuilder('formaPresentacion')
      .orderBy('formaPresentacion.descripcion', 'ASC');

    if (query.search) {
      qb.andWhere(
        '(formaPresentacion.descripcion LIKE :search OR formaPresentacion.fp LIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    return qb.getMany();
  }
}
