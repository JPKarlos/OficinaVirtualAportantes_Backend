const fs = require('fs');
const PizZip = require('pizzip');

const templatePath =
  'D:/ProyectosMallamas/OficinaVirtualAportantes/OficinaVirtualAportantes_Backend/src/aportantes/templates/paz-y-salvo.docx';

const buf = fs.readFileSync(templatePath);
const zip = new PizZip(buf);
const xml = zip.file('word/document.xml').asText();
const matches = [...xml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)]
  .map((m) => m[1])
  .filter((t) => /[_\[]/.test(t));

console.log('matches:', matches.length);
for (const match of matches) {
  console.log(JSON.stringify(match));
}
