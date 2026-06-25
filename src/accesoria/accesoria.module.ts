import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccesoriaController } from './accesoria.controller';
import { AccesoriaService } from './accesoria.service';
import {
  CiiuClase,
  ClaseAportante,
  Departamento,
  Municipio,
  NaturalezaAportante,
  TipoIdenCont,
  TipoPersona,
  TipoAccion,
  TipoAportanteCont,
  FormaPresentacion,
} from './entities';
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

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        Municipio,
        Departamento,
        CiiuClase,
        TipoIdenCont,
        ClaseAportante,
        NaturalezaAportante,
        TipoPersona,
        TipoAccion,
        TipoAportanteCont,
        FormaPresentacion,
      ],
      'dbSIRIS_EPS',
    ),
  ],
  controllers: [AccesoriaController],
  providers: [
    AccesoriaService,
    ListMunicipiosUseCase,
    ListDepartamentosUseCase,
    ListCiiuClaseUseCase,
    ListTipoIdenContUseCase,
    ListClaseAportanteUseCase,
    ListNaturalezaAportanteUseCase,
    ListTipoPersonaUseCase,
    ListTipoAccionUseCase,
    ListTipoAportanteContUseCase,
    ListFormaPresentacionUseCase,
  ],
  exports: [
    AccesoriaService,
    ListMunicipiosUseCase,
    ListDepartamentosUseCase,
    ListCiiuClaseUseCase,
    ListTipoIdenContUseCase,
    ListClaseAportanteUseCase,
    ListNaturalezaAportanteUseCase,
    ListTipoPersonaUseCase,
    ListTipoAccionUseCase,
    ListTipoAportanteContUseCase,
    ListFormaPresentacionUseCase,
  ],
})
export class AccesoriaModule {}
