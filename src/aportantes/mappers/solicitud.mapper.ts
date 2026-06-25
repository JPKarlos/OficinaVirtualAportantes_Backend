import { SolicitudItemDto } from '../dto/solicitud-response.dto';

function formatDateValue(value: unknown): string | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString();
}

function readString(row: Record<string, unknown>, key: string): string | null {
  const value = readRowValue(row, key);
  if (value === null) {
    return null;
  }

  return String(value);
}

function readNumber(row: Record<string, unknown>, key: string): number | null {
  const value = readRowValue(row, key);
  if (value === null) {
    return null;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? null : parsed;
}

function readRowValue(row: Record<string, unknown>, key: string): unknown {
  if (row[key] !== undefined && row[key] !== null && row[key] !== '') {
    return row[key];
  }

  const lowerKey = key.toLowerCase();
  for (const [rowKey, value] of Object.entries(row)) {
    if (rowKey.toLowerCase() === lowerKey && value !== null && value !== '') {
      return value;
    }
  }

  return null;
}

export function mapSolicitudFromSqlRow(
  row: Record<string, unknown>,
): SolicitudItemDto {
  return {
    solicitudesId: readNumber(row, 'solicitudes_Id') ?? 0,
    radicacion: readString(row, 'radicacion'),
    fechaRadicacion: formatDateValue(readRowValue(row, 'fechaRadicacion')),
    estadoSolicitud: readString(row, 'estado_Solicitud'),
    observacion: readString(row, 'observacion'),
    rutaSoportes: readString(row, 'rutaSoportes'),
    cantidadDocumentosCargados: readNumber(row, 'cantidadDocumentosCargados'),
    tipoNovedad: readString(row, 'tipo_Novedad') ?? '',
    nombreRazonSocial: readString(row, 'NombreRazonSocial'),
    aportanteId: readNumber(row, 'aportante_Id'),
  };
}

export const SOLICITUDES_EN_TRAMITE_SQL = `
  SELECT
    [solicitudes_Id],
    [radicacion],
    [fechaRadicacion],
    [estado_Solicitud],
    [observacion],
    [rutaSoportes],
    [cantidadDocumentosCargados],
    [tipo_Novedad],
    [NombreRazonSocial],
    [aportante_Id]
  FROM [SIRIS_EPS].[OficinaVirtualAportantes].[V_Solicitudes]
  WHERE [aportante_Id] = @0
    AND [estado_Solicitud] = @1
  ORDER BY [fechaRadicacion] DESC, [solicitudes_Id] DESC
`;

export const SOLICITUD_BY_RADICACION_SQL = `
  SELECT
    [solicitudes_Id],
    [radicacion],
    [fechaRadicacion],
    [estado_Solicitud],
    [observacion],
    [rutaSoportes],
    [cantidadDocumentosCargados],
    [tipo_Novedad],
    [NombreRazonSocial],
    [aportante_Id]
  FROM [SIRIS_EPS].[OficinaVirtualAportantes].[V_Solicitudes]
  WHERE [radicacion] = @0
`;

export function generateRadicacion(): string {
  const datePart = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '');
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `RAD-${datePart}-${randomPart}`;
}

export function generateCarpetaSoportes(documentoAportante: string): string {
  const doc = documentoAportante.replace(/[^\dA-Za-z]/g, '') || 'aportante';
  const datePart = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '');
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `${doc}_${datePart}_${randomPart}`;
}
