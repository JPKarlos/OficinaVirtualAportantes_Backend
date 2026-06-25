import { LicenciaAportanteItemDto } from '../dto/licencia-aportante-response.dto';

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

export function mapLicenciaAportanteFromSqlRow(
  row: Record<string, unknown>,
  index: number,
): LicenciaAportanteItemDto {
  const apellido1 = readString(row, 'apellido1');
  const apellido2 = readString(row, 'apellido2');
  const nombre1 = readString(row, 'nombre1');
  const nombre2 = readString(row, 'nombre2');

  return {
    rowKey: [
      readString(row, 'Radicacion'),
      readString(row, 'documento'),
      readDate(row, 'FechaInicio'),
      readDate(row, 'Fecha_radicacion'),
      readString(row, 'NroComprobante'),
      index,
    ]
      .map((part) => part ?? '')
      .join('|'),
    codigoEps: readString(row, 'Codigo_EPS'),
    fechaRadicacion: readDate(row, 'Fecha_radicacion'),
    tipoDocumento: readString(row, 'TipoDocumento'),
    documento: readString(row, 'documento'),
    apellido1,
    apellido2,
    nombre1,
    nombre2,
    nombreCompleto: buildNombreCompleto({ apellido1, apellido2, nombre1, nombre2 }),
    tipoDocumentoAportante: readString(row, 'Tipo_documentoaportante'),
    documentoAportante: readString(row, 'Documento_aportante'),
    nombreRazonSocial: readString(row, 'NombreRazonSocial'),
    salario: readNumber(row, 'Salario'),
    tipoSalario: readString(row, 'Tipo_salario'),
    fechaInicio: readDate(row, 'FechaInicio'),
    fechaFinLicencia: readDate(row, 'FechaFinLicencia'),
    diasReconocer: readNumber(row, 'Dias_Reconocer'),
    fechaPago: readDate(row, 'FechaPago'),
    pagada: readString(row, 'Pagada'),
    vrAPagar: readNumber(row, 'Vr_a_pagar'),
    radicacion: readString(row, 'Radicacion'),
    tipoPrestacionEconomica: readString(row, 'Tipo_prestacioneconomica'),
    tipoLicencia: readString(row, 'Tipo_licencia'),
    diasGestacion: readNumber(row, 'DiasGestacion'),
    diasPrematuro: readNumber(row, 'Dias_Prematuro'),
    fechaParto: readDate(row, 'Fecha_parto'),
    fechaPp: readDate(row, 'FechaPP'),
    estadoNovedad: readString(row, 'EstadoNovedad'),
    nroComprobante: readString(row, 'NroComprobante'),
    aportanteId: readNumber(row, 'Aportante_id'),
  };
}

export const LICENCIAS_APORTANTE_SQL = `
  SELECT
    [Codigo_EPS],
    [Fecha_radicacion],
    [TipoDocumento],
    [documento],
    [apellido1],
    [apellido2],
    [nombre1],
    [nombre2],
    [Tipo_documentoaportante],
    [Documento_aportante],
    [NombreRazonSocial],
    [Salario],
    [Tipo_salario],
    [FechaInicio],
    [FechaFinLicencia],
    [Dias_Reconocer],
    [FechaPago],
    [Pagada],
    [Vr_a_pagar],
    [Radicacion],
    [Tipo_prestacioneconomica],
    [Tipo_licencia],
    [DiasGestacion],
    [Dias_Prematuro],
    [Fecha_parto],
    [FechaPP],
    [EstadoNovedad],
    [NroComprobante],
    [Aportante_id]
  FROM [SIRIS_EPS].[OficinaVirtualAportantes].[V_Licencias_Aportante]
  WHERE [Aportante_id] = @0
  ORDER BY [Fecha_radicacion] DESC, [apellido1] ASC, [nombre1] ASC
`;
