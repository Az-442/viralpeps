const fs = require('fs');
const data = JSON.parse(fs.readFileSync('src/data/compounds.json', 'utf-8'));
console.log('Valid JSON -', data.length, 'compounds');

// Check Regen Peptides sources
let regenCount = 0;
data.forEach(c => {
  c.sources.forEach(s => {
    if (s.vendor === 'Regen Peptides') regenCount++;
  });
});
console.log('Regen Peptides sources:', regenCount);
