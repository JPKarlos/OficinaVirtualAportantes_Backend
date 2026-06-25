const fs = require('fs');
const PizZip = require('pizzip');

const buf = fs.readFileSync(
  'D:/ProyectosMallamas/OficinaVirtualAportantes/OficinaVirtualAportantes_Backend/src/aportantes/templates/certificado-mora.docx',
);
const xml = new PizZip(buf).file('word/document.xml').asText();
const idx = xml.indexOf('Identificaci');
console.log(xml.slice(idx, idx + 300));
