const fs = require('fs');
const PizZip = require('pizzip');

const buf = fs.readFileSync(
  'D:/ProyectosMallamas/OficinaVirtualAportantes/OficinaVirtualAportantes_Backend/scripts/paz-y-salvo-test.docx',
);
const zip = new PizZip(buf);
const xml = zip.file('word/document.xml').asText();
const text = [...xml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)]
  .map((m) => m[1])
  .join('');

console.log(text);
