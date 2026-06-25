export function escapeXmlText(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function replaceWtText(
  xml: string,
  searchText: string,
  replacement: string,
  replaceAll = false,
): string {
  const escapedSearch = searchText.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedReplacement = escapeXmlText(replacement);
  const regex = new RegExp(
    `(<w:t(?:\\s+xml:space="preserve")?>)${escapedSearch}(</w:t>)`,
    replaceAll ? 'g' : '',
  );

  return xml.replace(regex, `$1${escapedReplacement}$2`);
}

export function replacePlainText(
  xml: string,
  searchText: string,
  replacement: string,
): string {
  return xml.replace(searchText, escapeXmlText(replacement));
}

export function getNombreCoordinadorMovilidad(): string {
  return process.env.COORDINADOR_MOVILIDAD_NOMBRE?.trim() || 'ANDRES PAGUAY';
}
