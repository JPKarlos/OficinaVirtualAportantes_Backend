import { Injectable } from '@nestjs/common';
import {
  QueryCiiuClaseDto,
  QueryClaseAportanteDto,
  QueryDepartamentosDto,
  QueryMunicipiosDto,
  QueryNaturalezaAportanteDto,
  QueryTipoIdenContDto,
  QueryTipoPersonaDto,
  QueryTipoAccionDto,
  QueryTipoAportanteContDto,
  QueryFormaPresentacionDto,
} from './dto';
import {
  ListCiiuClaseUseCase,
  ListClaseAportanteUseCase,
  ListDepartamentosUseCase,
  ListMunicipiosUseCase,
  ListNaturalezaAportanteUseCase,
  ListTipoIdenContUseCase,
  ListTipoPersonaUseCase,
  ListTipoAccionUseCase,
  ListTipoAportanteContUseCase,
  ListFormaPresentacionUseCase,
} from './use-cases';

@Injectable()
export class AccesoriaService {
  constructor(
    private readonly listMunicipiosUseCase: ListMunicipiosUseCase,
    private readonly listDepartamentosUseCase: ListDepartamentosUseCase,
    private readonly listCiiuClaseUseCase: ListCiiuClaseUseCase,
    private readonly listTipoIdenContUseCase: ListTipoIdenContUseCase,
    private readonly listClaseAportanteUseCase: ListClaseAportanteUseCase,
    private readonly listNaturalezaAportanteUseCase: ListNaturalezaAportanteUseCase,
    private readonly listTipoPersonaUseCase: ListTipoPersonaUseCase,
    private readonly listTipoAccionUseCase: ListTipoAccionUseCase,
    private readonly listTipoAportanteContUseCase: ListTipoAportanteContUseCase,
    private readonly listFormaPresentacionUseCase: ListFormaPresentacionUseCase,
  ) {}

  listMunicipios(query: QueryMunicipiosDto) {
    return this.listMunicipiosUseCase.execute(query);
  }

  listDepartamentos(query: QueryDepartamentosDto) {
    return this.listDepartamentosUseCase.execute(query);
  }

  listCiiuClase(query: QueryCiiuClaseDto) {
    return this.listCiiuClaseUseCase.execute(query);
  }

  listTipoIdenCont(query: QueryTipoIdenContDto) {
    return this.listTipoIdenContUseCase.execute(query);
  }

  listClaseAportante(query: QueryClaseAportanteDto) {
    return this.listClaseAportanteUseCase.execute(query);
  }

  listNaturalezaAportante(query: QueryNaturalezaAportanteDto) {
    return this.listNaturalezaAportanteUseCase.execute(query);
  }

  listTipoPersona(query: QueryTipoPersonaDto) {
    return this.listTipoPersonaUseCase.execute(query);
  }

  listTipoAccion(query: QueryTipoAccionDto) {
    return this.listTipoAccionUseCase.execute(query);
  }

  listTipoAportanteCont(query: QueryTipoAportanteContDto) {
    return this.listTipoAportanteContUseCase.execute(query);
  }

  listFormaPresentacion(query: QueryFormaPresentacionDto) {
    return this.listFormaPresentacionUseCase.execute(query);
  }
}
