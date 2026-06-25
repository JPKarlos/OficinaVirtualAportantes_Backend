import { IncapacidadAportanteItemDto } from '../dto/incapacidad-aportante-response.dto';

function formatDateValue(value: unknown): string | null {
  if (value === null || value === undefined || value === '') {
    return null;
  }

  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return date.toISOString().slice(0, 10);
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

function readDate(row: Record<string, unknown>, key: string): string | null {
  return formatDateValue(readRowValue(row, key));
}

function buildNombreCompleto(parts: {
  apellido1: string | null;
  apellido2: string | null;
  nombre1: string | null;
  nombre2: string | null;
}): string {
  return [parts.apellido1, parts.apellido2, parts.nombre1, parts.nombre2]
    .filter(Boolean)
    .join(' ');
}

export function mapIncapacidadAportanteFromSqlRow(
  row: Record<string, unknown>,
  index: number,
): IncapacidadAportanteItemDto {
  const apellido1 = readString(row, 'Apellido1');
  const apellido2 = readString(row, 'Apellido2');
  const nombre1 = readString(row, 'Nombre1');
  const nombre2 = readString(row, 'Nombre2');

  return {
    rowKey: [
      readNumber(row, 'Incapacidad_id'),
      readNumber(row, 'Afiliado_id'),
      readString(row, 'Documento'),
      readDate(row, 'FechaInicio'),
      readDate(row, 'FechaRadicado'),
      readString(row, 'Comprobante'),
      readString(row, 'BarCode'),
      index,
    ]
      .map((part) => part ?? '')
      .join('|'),
    incapacidadId: readNumber(row, 'Incapacidad_id') ?? 0,
    afiliadoId: readNumber(row, 'Afiliado_id'),
    tipoDocumento: readString(row, 'Tipo_Documento'),
    documento: readString(row, 'Documento'),
    apellido1,
    apellido2,
    nombre1,
    nombre2,
    nombreCompleto: buildNombreCompleto({ apellido1, apellido2, nombre1, nombre2 }),
    genero: readString(row, 'Genero'),
    fechaInicio: readDate(row, 'FechaInicio'),
    fechaFin: readDate(row, 'FechaFin'),
    fechaRadicado: readDate(row, 'FechaRadicado'),
    barCode: readString(row, 'BarCode'),
    codDiagnostico: readString(row, 'Cod_Diagnostico'),
    diagnostico: readString(row, 'Diagnostico'),
    estadoNovedad: readString(row, 'Estado_Novedad'),
    observacionesRegistro: readString(row, 'ObservacionesRegistro'),
    nombreRazonSocial: readString(row, 'NombreRazonSocial'),
    tipoIncapacidad: readString(row, 'TipoIncapacidad'),
    fechaPago: readDate(row, 'FechaPago'),
    pagoPor: readString(row, 'PagoPor'),
    comprobante: readString(row, 'Comprobante'),
    estadoPago: readString(row, 'Estado_Pago'),
    aportanteId: readNumber(row, 'Aportante_id'),
    tipoDocAportante: readString(row, 'TipoDoc_aportante'),
    documentoAportante: readString(row, 'DocumentoAportante'),
    dvAportante: readString(row, 'DVAportante'),
  };
}

export const INCAPACIDADES_APORTANTE_SQL = `
  SELECT
    [Incapacidad_id],
    [Afiliado_id],
    [Tipo_Documento],
    [Documento],
    [Apellido1],
    [Apellido2],
    [Nombre1],
    [Nombre2],
    [Genero],
    [FechaInicio],
    [FechaFin],
    [FechaRadicado],
    [BarCode],
    [Cod_Diagnostico],
    [Diagnostico],
    [Estado_Novedad],
    [ObservacionesRegistro],
    [TipoIncapacidad],
    [FechaPago],
    [PagoPor],
    [Comprobante],
    [Estado_Pago],
    [Aportante_id],
    [TipoDoc_aportante],
    [DocumentoAportante],
    [DVAportante],
    [NombreRazonSocial]
  FROM [SIRIS_EPS].[OficinaVirtualAportantes].[V_Incapacidades_Aportante]
  WHERE [Aportante_id] = @0
  ORDER BY [FechaRadicado] DESC, [Apellido1] ASC, [Nombre1] ASC
`;
