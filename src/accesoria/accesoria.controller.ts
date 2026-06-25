import { Controller, Get, Query } from '@nestjs/common';
import { Auth } from '../auth/decorators';
import { AccesoriaService } from './accesoria.service';
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

@Auth()
@Controller('accesoria')
export class AccesoriaController {
  constructor(private readonly accesoriaService: AccesoriaService) {}

  @Get('municipios/list')
  listMunicipios(@Query() query: QueryMunicipiosDto) {
    return this.accesoriaService.listMunicipios(query);
  }

  @Get('departamentos/list')
  listDepartamentos(@Query() query: QueryDepartamentosDto) {
    return this.accesoriaService.listDepartamentos(query);
  }

  @Get('ciiu-clase/list')
  listCiiuClase(@Query() query: QueryCiiuClaseDto) {
    return this.accesoriaService.listCiiuClase(query);
  }

  @Get('tipo-iden-cont/list')
  listTipoIdenCont(@Query() query: QueryTipoIdenContDto) {
    return this.accesoriaService.listTipoIdenCont(query);
  }

  @Get('clase-aportante/list')
  listClaseAportante(@Query() query: QueryClaseAportanteDto) {
    return this.accesoriaService.listClaseAportante(query);
  }

  @Get('naturaleza-aportante/list')
  listNaturalezaAportante(@Query() query: QueryNaturalezaAportanteDto) {
    return this.accesoriaService.listNaturalezaAportante(query);
  }

  @Get('tipo-persona/list')
  listTipoPersona(@Query() query: QueryTipoPersonaDto) {
    return this.accesoriaService.listTipoPersona(query);
  }

  @Get('tipo-accion/list')
  listTipoAccion(@Query() query: QueryTipoAccionDto) {
    return this.accesoriaService.listTipoAccion(query);
  }

  @Get('tipo-aportante-cont/list')
  listTipoAportanteCont(@Query() query: QueryTipoAportanteContDto) {
    return this.accesoriaService.listTipoAportanteCont(query);
  }

  @Get('forma-presentacion/list')
  listFormaPresentacion(@Query() query: QueryFormaPresentacionDto) {
    return this.accesoriaService.listFormaPresentacion(query);
  }
}
