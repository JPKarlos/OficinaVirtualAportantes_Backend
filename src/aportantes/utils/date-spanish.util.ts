const MESES = [
  'enero',
  'febrero',
  'marzo',
  'abril',
  'mayo',
  'junio',
  'julio',
  'agosto',
  'septiembre',
  'octubre',
  'noviembre',
  'diciembre',
] as const;

const DIAS_EN_LETRAS: Record<number, string> = {
  1: 'uno',
  2: 'dos',
  3: 'tres',
  4: 'cuatro',
  5: 'cinco',
  6: 'seis',
  7: 'siete',
  8: 'ocho',
  9: 'nueve',
  10: 'diez',
  11: 'once',
  12: 'doce',
  13: 'trece',
  14: 'catorce',
  15: 'quince',
  16: 'dieciséis',
  17: 'diecisiete',
  18: 'dieciocho',
  19: 'diecinueve',
  20: 'veinte',
  21: 'veintiuno',
  22: 'veintidós',
  23: 'veintitrés',
  24: 'veinticuatro',
  25: 'veinticinco',
  26: 'veintiséis',
  27: 'veintisiete',
  28: 'veintiocho',
  29: 'veintinueve',
  30: 'treinta',
  31: 'treinta y uno',
};

export interface FechaCertificadoEspanol {
  dia: string;
  mes: string;
  anio: string;
  diaEnLetras: string;
}

export function formatFechaCertificadoEspanol(date: Date): FechaCertificadoEspanol {
  const day = date.getDate();
  const monthIndex = date.getMonth();

  return {
    dia: String(day),
    mes: MESES[monthIndex] ?? '',
    anio: String(date.getFullYear()),
    diaEnLetras: DIAS_EN_LETRAS[day] ?? String(day),
  };
}

export function formatIdentificacionAportante(
  tipo: string | null | undefined,
  idenAportante: string | null | undefined,
  dvAportante: string | null | undefined,
): string {
  const iden = idenAportante?.trim();
  if (!iden) {
    return '';
  }

  const dv = dvAportante?.trim();
  const numero = dv ? `${iden}-${dv}` : iden;
  const tipoTrim = tipo?.trim();

  return tipoTrim ? `${tipoTrim} ${numero}` : numero;
}
