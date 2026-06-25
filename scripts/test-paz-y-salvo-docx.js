const fs = require('fs');
const path = require('path');
const {
  formatFechaCertificadoEspanol,
  formatIdentificacionAportante,
} = require('../dist/aportantes/utils/date-spanish.util');
const {
  generatePazYSalvoDocx,
} = require('../dist/aportantes/utils/paz-y-salvo-docx.generator');

const hoy = new Date();
const fecha = formatFechaCertificadoEspanol(hoy);

const buffer = generatePazYSalvoDocx({
  razonSocial: 'EMPRESA DE PRUEBA S.A.S.',
  identificacion: formatIdentificacionAportante('NI', '900123456', '7'),
  fechaCorte: fecha,
  fechaEmision: fecha,
  nombreCoordinador: 'JUAN PÉREZ GÓMEZ',
});

const outputPath = path.join(__dirname, 'paz-y-salvo-test.docx');
fs.writeFileSync(outputPath, buffer);
console.log('Generated:', outputPath);
