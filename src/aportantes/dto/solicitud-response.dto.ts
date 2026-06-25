export class SolicitudItemDto {
  solicitudesId: number;
  radicacion: string | null;
  fechaRadicacion: string | null;
  estadoSolicitud: string | null;
  observacion: string | null;
  rutaSoportes: string | null;
  cantidadDocumentosCargados: number | null;
  tipoNovedad: string;
  nombreRazonSocial: string | null;
  aportanteId: number | null;
}

export class SolicitudesListResponseDto {
  aportanteId: number;
  total: number;
  solicitudes: SolicitudItemDto[];
}

export class CreateSolicitudResponseDto {
  solicitud: SolicitudItemDto;
}
