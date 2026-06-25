const fs = require('fs');
const PizZip = require('pizzip');

const buf = fs.readFileSync(
  'D:/ProyectosMallamas/OficinaVirtualAportantes/OficinaVirtualAportantes_Backend/src/aportantes/templates/paz-y-salvo.docx',
);
const xml = new PizZip(buf).file('word/document.xml').asText();

for (const match of xml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)) {
  const value = match[1];
  if (value.includes('_') || value.includes('mes')) {
    console.log(JSON.stringify(value));
  }
}
