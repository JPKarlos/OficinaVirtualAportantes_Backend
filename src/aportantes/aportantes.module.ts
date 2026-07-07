import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AportantesService } from './aportantes.service';
import {
  AportantesCreateController,
  UltimaActualizacionController,
} from './aportantes.controller';
import {
  Aportante,
  UltimaActualizacionAportantes,
  V_UltimaactualizacionAportantes,
  V_AportanteAfiliados,
  V_ReporteCarteraUgppAfiliadoResumen,
  V_ReporteCarteraUgppDetalladoNuevoProceso,
  V_IncapacidadesAportante,
  V_LicenciasAportante,
  Solicitud,
  V_Solicitudes,
} from './entities';
import { User } from '../auth/entities/user.entity';
import { FtpModule } from '../common/ftp/ftp.module';
import {
  GetUltimaActualizacionAportanteByIdUseCase,
  CreateAportanteUseCase,
  GetAportanteByIdUseCase,
  UpdateAportanteUseCase,
  UpdateMisDatosAportanteUseCase,
  GetAportanteAfiliadosByAportanteIdUseCase,
  GetMoraByAportanteIdUseCase,
  GenerateCertificadoPazYSalvoUseCase,
  GenerateCertificadoMoraUseCase,
  GetIncapacidadesByAportanteIdUseCase,
  GetLicenciasByAportanteIdUseCase,
  GetSolicitudesByAportanteIdUseCase,
  CreateSolicitudUseCase,
} from './use-cases';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [V_UltimaactualizacionAportantes, V_AportanteAfiliados, V_ReporteCarteraUgppAfiliadoResumen, V_ReporteCarteraUgppDetalladoNuevoProceso, V_IncapacidadesAportante, V_LicenciasAportante, Solicitud, V_Solicitudes, Aportante, UltimaActualizacionAportantes],
      'dbSIRIS_EPS',
    ),
    TypeOrmModule.forFeature([User], 'dbAuth'),
    FtpModule,
    forwardRef(() => AuthModule),
  ],
  controllers: [AportantesCreateController, UltimaActualizacionController],
  providers: [
    AportantesService,
    GetUltimaActualizacionAportanteByIdUseCase,
    CreateAportanteUseCase,
    GetAportanteByIdUseCase,
    UpdateAportanteUseCase,
    UpdateMisDatosAportanteUseCase,
    GetAportanteAfiliadosByAportanteIdUseCase,
    GetMoraByAportanteIdUseCase,
    GenerateCertificadoPazYSalvoUseCase,
    GenerateCertificadoMoraUseCase,
    GetIncapacidadesByAportanteIdUseCase,
    GetLicenciasByAportanteIdUseCase,
    GetSolicitudesByAportanteIdUseCase,
    CreateSolicitudUseCase,
  ],
  exports: [AportantesService, GetUltimaActualizacionAportanteByIdUseCase],
})
export class AportantesModule {}
