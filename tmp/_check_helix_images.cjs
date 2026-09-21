const fs = require('fs');
const path = require('path');
const c = JSON.parse(fs.readFileSync('src/data/compounds.json', 'utf8'));
let missing = [];
for (const comp of c) {
  if (!comp.sources) continue;
  for (const s of comp.sources) {
    if (s.vendor === 'HelixCore') {
      const local = 'public/' + s.image.replace(/^\//, '');
      if (!fs.existsSync(local)) missing.push(local);
    }
  }
}
if (missing.length) { console.log('MISSING IMAGE FILES:'); missing.forEach((m) => console.log('  ' + m)); }
else console.log('All HelixCore source images exist on disk (' +
  fs.readdirSync('public/images/products/helix-core').length + ' files).');
