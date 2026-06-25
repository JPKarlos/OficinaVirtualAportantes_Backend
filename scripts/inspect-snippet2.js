const fs = require('fs');
const PizZip = require('pizzip');

const buf = fs.readFileSync(
  'D:/ProyectosMallamas/OficinaVirtualAportantes/OficinaVirtualAportantes_Backend/src/aportantes/templates/paz-y-salvo.docx',
);
const xml = new PizZip(buf).file('word/document.xml').asText();
const marker = ') días del mes de';
const idx = xml.indexOf(marker);
console.log(xml.slice(idx, idx + 350));
