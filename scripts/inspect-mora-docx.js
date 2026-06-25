const fs = require('fs');
const PizZip = require('pizzip');

const buf = fs.readFileSync(
  'D:/ProyectosMallamas/OficinaVirtualAportantes/OficinaVirtualAportantes_Backend/src/aportantes/templates/certificado-mora.docx',
);
const zip = new PizZip(buf);
const xml = zip.file('word/document.xml').asText();
const textNodes = [...xml.matchAll(/<w:t[^>]*>([^<]*)<\/w:t>/g)].map((m) => m[1]);

console.log('=== NODES WITH _ OR [ ===');
for (const value of textNodes) {
  if (/[_\[]/.test(value)) {
    console.log(JSON.stringify(value));
  }
}

console.log('\n=== FULL TEXT ===');
console.log(textNodes.join(''));
