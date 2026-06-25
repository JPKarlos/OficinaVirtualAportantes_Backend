const fs = require('fs');
const {
  formatFechaCertificadoEspanol,
} = require('../dist/aportantes/utils/date-spanish.util');
const {
  generateCertificadoMoraDocx,
} = require('../dist/aportantes/utils/certificado-mora-docx.generator');

const buffer = generateCertificadoMoraDocx({
  razonSocial: 'EMPRESA DE PRUEBA S.A.S.',
  identificacion: 'NI 900123456-7',
  detalle: [
    {
      anio: '2025',
      mes: '12',
      documento: 'CC 1234567890',
      cotizante: 'PEREZ GOMEZ JUAN CARLOS',
    },
    {
      anio: '2025',
      mes: '11',
      documento: 'CC 9876543210',
      cotizante: 'LOPEZ RODRIGUEZ MARIA',
    },
  ],
  fechaEmision: formatFechaCertificadoEspanol(new Date()),
  nombreCoordinador: 'ANDRES PAGUAY',
});

const outputPath = 'scripts/certificado-mora-test.docx';
fs.writeFileSync(outputPath, buffer);

const PizZip = require('pizzip');
const xml = new PizZip(buffer).file('word/document.xml').asText();
const text = [...xml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)]
  .map((m) => m[1])
  .join('');
console.log('Generated:', outputPath);
console.log(text);
