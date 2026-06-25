const fs = require('fs');
const PizZip = require('pizzip');

const buf = fs.readFileSync(
  'D:/ProyectosMallamas/OficinaVirtualAportantes/OficinaVirtualAportantes_Backend/src/aportantes/templates/certificado-mora.docx',
);
const xml = new PizZip(buf).file('word/document.xml').asText();

const tblStart = xml.indexOf('<w:tbl>');
const tblEnd = xml.indexOf('</w:tbl>', tblStart) + 8;
console.log('TABLE XML LENGTH:', tblEnd - tblStart);
console.log(xml.slice(tblStart, tblStart + 4000));

console.log('\n=== TABLE ROW COUNT ===');
console.log((xml.match(/<w:tr[ >]/g) || []).length);

console.log('\n=== SNIPPET emission date ===');
const idx = xml.indexOf('__________ del mes de');
console.log(xml.slice(idx - 100, idx + 250));
