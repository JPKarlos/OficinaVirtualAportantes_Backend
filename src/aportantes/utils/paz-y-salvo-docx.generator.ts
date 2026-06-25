import { readFileSync } from 'fs';
import { join } from 'path';
import PizZip from 'pizzip';
import { FechaCertificadoEspanol } from './date-spanish.util';
import { escapeXmlText, replaceWtText } from './docx.util';

export interface PazYSalvoDocxData {
  razonSocial: string;
  identificacion: string;
  fechaCorte: FechaCertificadoEspanol;
  fechaEmision: FechaCertificadoEspanol;
  nombreCoordinador: string;
}

const TEMPLATE_FILE = 'paz-y-salvo.docx';

function resolveTemplatePath(): string {
  return join(__dirname, '..', 'templates', TEMPLATE_FILE);
}

function fillDocumentXml(xml: string, data: PazYSalvoDocxData): string {
  const razonSocial = data.razonSocial;
  const identificacion = data.identificacion;
  const nombreCoordinador = data.nombreCoordinador;
  const { fechaCorte, fechaEmision } = data;

  let result = xml;

  result = result.replace(
    '________________________, con número de Identificación\u00a0_____________ ',
    `${escapeXmlText(razonSocial)}, con número de Identificación ${escapeXmlText(identificacion)} `,
  );

  result = replaceWtText(result, 'l mes de ___________', `l mes de ${fechaCorte.mes}`);
  result = replaceWtText(result, ' __________', ` ${fechaEmision.mes}`);
  result = replaceWtText(result, 'l ___________', `l ${fechaCorte.anio}`);
  result = replaceWtText(result, 'l____________', `l ${fechaEmision.anio}`);
  result = replaceWtText(result, '___________', fechaCorte.dia);
  result = replaceWtText(result, '_________', fechaEmision.dia);
  result = replaceWtText(result, '___', fechaEmision.diaEnLetras);
  result = replaceWtText(result, '_ (', ' (');

  result = result.replace(
    '[NOMBRE DEL COORDINADOR DE MOVILIDAD]',
    escapeXmlText(nombreCoordinador),
  );

  return result;
}

export function generatePazYSalvoDocx(data: PazYSalvoDocxData): Buffer {
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

export function buildPazYSalvoFileName(identificacion: string): string {
  const safeId = identificacion.replace(/[^\dA-Za-z-]/g, '_') || 'aportante';
  return `certificado_paz_y_salvo_${safeId}.docx`;
}
