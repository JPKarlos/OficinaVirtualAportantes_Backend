import { Injectable } from '@nestjs/common';
import {
  GetUltimaActualizacionAportanteByIdUseCase,
  CreateAportanteUseCase,
  GetAportanteByIdUseCase,
  UpdateUltimaActualizacionAportanteUseCase,
  UpdateMisDatosAportanteUseCase,
  GetAportanteAfiliadosByAportanteIdUseCase,
  GetMoraByAportanteIdUseCase,
  GenerateCertificadoPazYSalvoUseCase,
  GenerateCertificadoMoraUseCase,
  GetIncapacidadesByAportanteIdUseCase,
  GetLicenciasByAportanteIdUseCase,
  GetSolicitudesByAportanteIdUseCase,
  CreateSolicitudUseCase,
  GetComprobantePagoSoporteUseCase,
  GetComprobantePagoLicenciaSoporteUseCase,
} from './use-cases';
import { CreateAportanteDto } from './dto/create-aportante.dto';

@Injectable()
export class AportantesService {
  constructor(
    private readonly createAportanteUseCase: CreateAportanteUseCase,
    private readonly getUltimaActualizacionAportanteByIdUseCase: GetUltimaActualizacionAportanteByIdUseCase,
    private readonly getAportanteByIdUseCase: GetAportanteByIdUseCase,
    private readonly updateUltimaActualizacionAportanteUseCase: UpdateUltimaActualizacionAportanteUseCase,
    private readonly updateMisDatosAportanteUseCase: UpdateMisDatosAportanteUseCase,
    private readonly getAportanteAfiliadosByAportanteIdUseCase: GetAportanteAfiliadosByAportanteIdUseCase,
    private readonly getMoraByAportanteIdUseCase: GetMoraByAportanteIdUseCase,
    private readonly generateCertificadoPazYSalvoUseCase: GenerateCertificadoPazYSalvoUseCase,
    private readonly generateCertificadoMoraUseCase: GenerateCertificadoMoraUseCase,
    private readonly getIncapacidadesByAportanteIdUseCase: GetIncapacidadesByAportanteIdUseCase,
    private readonly getLicenciasByAportanteIdUseCase: GetLicenciasByAportanteIdUseCase,
    private readonly getSolicitudesByAportanteIdUseCase: GetSolicitudesByAportanteIdUseCase,
    private readonly createSolicitudUseCase: CreateSolicitudUseCase,
    private readonly getComprobantePagoSoporteUseCase: GetComprobantePagoSoporteUseCase,
    private readonly getComprobantePagoLicenciaSoporteUseCase: GetComprobantePagoLicenciaSoporteUseCase,
  ) {}

  create(
    createAportanteDto: CreateAportanteDto,
    files: Express.Multer.File[],
    authenticatedUserId: string,
  ) {
    return this.createAportanteUseCase.execute(
      createAportanteDto,
      files,
      authenticatedUserId,
    );
  }

  findUltimaActualizacion(aportanteId: number) {
    return this.getUltimaActualizacionAportanteByIdUseCase.execute(aportanteId);
  }

  getAportanteById(aportanteId: number, authenticatedUserId: string) {
    return this.getAportanteByIdUseCase.execute(
      aportanteId,
      authenticatedUserId,
    );
  }

  update(
    aportanteId: number,
    updateAportanteDto: CreateAportanteDto,
    files: Express.Multer.File[],
    authenticatedUserId: string,
  ) {
    return this.updateUltimaActualizacionAportanteUseCase.execute(
      aportanteId,
      updateAportanteDto,
      files,
      authenticatedUserId,
    );
  }

  updateMisDatos(
    aportanteId: number,
    updateAportanteDto: CreateAportanteDto,
    files: Express.Multer.File[],
    authenticatedUserId: string,
  ) {
    return this.updateMisDatosAportanteUseCase.execute(
      aportanteId,
      updateAportanteDto,
      files,
      authenticatedUserId,
    );
  }

  getAfiliadosByAportanteId(aportanteId: number, authenticatedUserId: string) {
    return this.getAportanteAfiliadosByAportanteIdUseCase.execute(
      aportanteId,
      authenticatedUserId,
    );
  }

  getMoraByAportanteId(aportanteId: number, authenticatedUserId: string) {
    return this.getMoraByAportanteIdUseCase.execute(
      aportanteId,
      authenticatedUserId,
    );
  }

  generateCertificadoPazYSalvo(
    aportanteId: number,
    authenticatedUserId: string,
  ) {
    return this.generateCertificadoPazYSalvoUseCase.execute(
      aportanteId,
      authenticatedUserId,
    );
  }

  generateCertificadoMora(aportanteId: number, authenticatedUserId: string) {
    return this.generateCertificadoMoraUseCase.execute(
      aportanteId,
      authenticatedUserId,
    );
  }

  getIncapacidadesByAportanteId(
    aportanteId: number,
    authenticatedUserId: string,
  ) {
    return this.getIncapacidadesByAportanteIdUseCase.execute(
      aportanteId,
      authenticatedUserId,
    );
  }

  getLicenciasByAportanteId(
    aportanteId: number,
    authenticatedUserId: string,
  ) {
    return this.getLicenciasByAportanteIdUseCase.execute(
      aportanteId,
      authenticatedUserId,
    );
  }

  getSolicitudesByAportanteId(
    aportanteId: number,
    authenticatedUserId: string,
  ) {
    return this.getSolicitudesByAportanteIdUseCase.execute(
      aportanteId,
      authenticatedUserId,
    );
  }

  createSolicitud(
    aportanteId: number,
    authenticatedUserId: string,
    tipoNovedadId: number,
    observacion: string,
    files: Express.Multer.File[],
  ) {
    return this.createSolicitudUseCase.execute({
      aportanteId,
      authenticatedUserId,
      tipoNovedadId,
      observacion,
      files,
    });
  }

  getComprobantePagoSoporte(
    aportanteId: number,
    afiliadoId: number,
    incapacidadId: number,
    authenticatedUserId: string,
  ) {
    return this.getComprobantePagoSoporteUseCase.execute(
      aportanteId,
      afiliadoId,
      incapacidadId,
      authenticatedUserId,
    );
  }

  getComprobantePagoLicenciaSoporte(
    aportanteId: number,
    afiliadoId: number,
    licenciasMaternidadId: number,
    authenticatedUserId: string,
  ) {
    return this.getComprobantePagoLicenciaSoporteUseCase.execute(
      aportanteId,
      afiliadoId,
      licenciasMaternidadId,
      authenticatedUserId,
    );
  }
}
