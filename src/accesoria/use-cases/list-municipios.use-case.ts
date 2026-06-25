import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Municipio } from '../entities';
import { QueryMunicipiosDto } from '../dto';

@Injectable()
export class ListMunicipiosUseCase {
  constructor(
    @InjectRepository(Municipio, 'dbSIRIS_EPS')
    private readonly municipioRepository: Repository<Municipio>,
  ) {}

  async execute(query: QueryMunicipiosDto): Promise<Municipio[]> {
    const qb = this.municipioRepository
      .createQueryBuilder('municipio')
      .leftJoinAndSelect('municipio.departamento', 'departamento')
      .orderBy('municipio.descripcion', 'ASC');

    if (query.search) {
      qb.andWhere(
        '(municipio.descripcion LIKE :search OR municipio.codigo LIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    if (query.departamentoIde) {
      qb.andWhere('municipio.departamentoIde = :departamentoIde', {
        departamentoIde: query.departamentoIde,
      });
    }

    return qb.getMany();
  }
}
