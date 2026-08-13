export function generateCarpetaSoportesAportante(
  aportanteId: number,
): string {
  const datePart = new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, '');
  return `${aportanteId}_${datePart}`;
}