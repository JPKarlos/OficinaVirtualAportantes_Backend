const fs = require('fs');
const PizZip = require('pizzip');

const buf = fs.readFileSync(
  'D:/ProyectosMallamas/OficinaVirtualAportantes/OficinaVirtualAportantes_Backend/src/aportantes/templates/certificado-mora.docx',
);
const xml = new PizZip(buf).file('word/document.xml').asText();

const tblStart = xml.indexOf('<w:tbl>');
const tblEnd = xml.indexOf('</w:tbl>', tblStart) + 8;
const tableXml = xml.slice(tblStart, tblEnd);
const rows = [...tableXml.matchAll(/<w:tr[\s\S]*?<\/w:tr>/g)].map((m) => m[0]);

fs.writeFileSync('scripts/mora-template-data-row.xml', rows[2], 'utf8');
console.log('saved row 2, length', rows[2].length);
console.log('rows count', rows.length);

console.log('\nintro nodes:');
const intro = xml.slice(0, tblStart);
for (const value of [...intro.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)].map((m) => m[1])) {
  if (/[_\[]/.test(value)) console.log(JSON.stringify(value));
}
