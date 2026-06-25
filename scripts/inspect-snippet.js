const fs = require('fs');
const PizZip = require('pizzip');

const buf = fs.readFileSync(
  'D:/ProyectosMallamas/OficinaVirtualAportantes/OficinaVirtualAportantes_Backend/src/aportantes/templates/paz-y-salvo.docx',
);
const xml = new PizZip(buf).file('word/document.xml').asText();
const idx = xml.indexOf(' __________');
console.log(xml.slice(idx - 80, idx + 120));
