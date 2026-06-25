import { readFileSync } from 'fs';
import { join } from 'path';
import PizZip from 'pizzip';
import { FechaCertificadoEspanol } from './date-spanish.util';
import {
  escapeXmlText,
  replacePlainText,
  replaceWtText,
} from './docx.util';

export interface CertificadoMoraDetalleRow {
  anio: string;
  mes: string;
  documento: string;
  cotizante: string;
}

export interface CertificadoMoraDocxData {
  razonSocial: string;
  identificacion: string;
  detalle: CertificadoMoraDetalleRow[];
  fechaEmision: FechaCertificadoEspanol;
  nombreCoordinador: string;
}

const TEMPLATE_FILE = 'certificado-mora.docx';
const DATA_CELL_PLACEHOLDER = '<w:t>\u00a0</w:t>';

function resolveTemplatePath(): string {
  return join(__dirname, '..', 'templates', TEMPLATE_FILE);
}

function buildDataRow(
  templateRowXml: string,
  row: CertificadoMoraDetalleRow,
): string {
  let result = templateRowXml;
  const values = [row.anio, row.mes, row.documento, row.cotizante];

  for (const value of values) {
    result = result.replace(
      DATA_CELL_PLACEHOLDER,
      `<w:t>${escapeXmlText(value)}</w:t>`,
    );
  }

  return result;
}

function fillTable(xml: string, data: CertificadoMoraDocxData): string {
  const tableStart = xml.indexOf('<w:tbl>');
  const tableEnd = xml.indexOf('</w:tbl>', tableStart) + 8;

  if (tableStart === -1 || tableEnd <= tableStart) {
    throw new Error('No se encontró la tabla del certificado de mora.');
  }

  const tableXml = xml.slice(tableStart, tableEnd);
  const rows = [...tableXml.matchAll(/<w:tr[\s\S]*?<\/w:tr>/g)].map(
    (match) => match[0],
  );

  if (rows.length < 3) {
    throw new Error('La plantilla del certificado de mora no tiene filas válidas.');
  }

  const headerAportanteRow = replacePlainText(
    rows[0],
    '______________________________',
    data.razonSocial,
  );
  const headerColumnsRow = rows[1];
  const dataRowTemplate = rows[2];
  const dataRows = data.detalle.map((row) =>
    buildDataRow(dataRowTemplate, row),
  );

  const gridEnd = tableXml.indexOf('</w:tblGrid>') + '</w:tblGrid>'.length;
  const rowsEnd = tableXml.lastIndexOf('</w:tr>') + '</w:tr>'.length;
  const newTableXml =
    tableXml.slice(0, gridEnd) +
    headerAportanteRow +
    headerColumnsRow +
    dataRows.join('') +
    tableXml.slice(rowsEnd);

  return xml.slice(0, tableStart) + newTableXml + xml.slice(tableEnd);
}

function removeSingleUnderscoreRun(xml: string): string {
  return xml.replace(/<w:t(?:\s+xml:space="preserve")?>_<\/w:t>/, '');
}

function fillDocumentXml(xml: string, data: CertificadoMoraDocxData): string {
  const { fechaEmision } = data;
  let result = fillTable(xml, data);

  result = replacePlainText(
    result,
    '_______________________',
    data.razonSocial,
  );
  result = removeSingleUnderscoreRun(result);
  result = replaceWtText(result, '_____________', data.identificacion);
  result = replaceWtText(result, 'los _', 'los ');
  result = replaceWtText(
    result,
    '__________ del mes de ________ del __________.',
    `${fechaEmision.dia} del mes de ${fechaEmision.mes} del ${fechaEmision.anio}.`,
  );
  result = replacePlainText(
    result,
    '[NOMBRE DEL COORDINADOR DE MOVILIDAD]',
    data.nombreCoordinador,
  );

  return result;
}

export function generateCertificadoMoraDocx(
  data: CertificadoMoraDocxData,
): Buffer {
  const templatePath = resolveTemplatePath();
  const templateBuffer = readFileSync(templatePath);
  const zip = new PizZip(templateBuffer);
  const documentXml = zip.file('word/document.xml')?.asText();

  if (!documentXml) {
    throw new Error('No se encontró el contenido del documento Word.');
  }

  const filledXml = fillDocumentXml(documentXml, data);
  zip.file('word/document.xml', filledXml);

  return zip.generate({ type: 'nodebuffer', compression: 'DEFLATE' });
}

export function buildCertificadoMoraFileName(identificacion: string): string {
  const safeId = identificacion.replace(/[^\dA-Za-z-]/g, '_') || 'aportante';
  return `certificado_mora_${safeId}.docx`;
}

export function buildNombreCompletoCotizante(parts: {
  apellido1?: string | null;
  apellido2?: string | null;
  nombre1?: string | null;
  nombre2?: string | null;
}): string {
  return [parts.apellido1, parts.apellido2, parts.nombre1, parts.nombre2]
    .map((value) => value?.trim())
    .filter(Boolean)
    .join(' ');
}

export function buildDocumentoCotizante(
  tipoDocCotizante?: string | null,
  documento?: string | null,
): string {
  const doc = documento?.trim() ?? '';
  const tipo = tipoDocCotizante?.trim() ?? '';

  if (!doc) {
    return '';
  }

  return tipo ? `${tipo} ${doc}` : doc;
}
