const fs = require('fs');
const c = JSON.parse(fs.readFileSync('src/data/compounds.json', 'utf8'));
const v = JSON.parse(fs.readFileSync('src/data/vendors.json', 'utf8'));
console.log('compounds OK total compounds =', c.length);
console.log('vendors OK total vendors =', v.length);
const hc = v.find((x) => x.slug === 'helix-core');
console.log('helix-core vendor present:', !!hc, '| name', hc && hc.name);
// count helix-core source occurrences across compounds
let n = 0;
for (const comp of c) {
  if (comp.sources) {
    for (const s of comp.sources) {
      if (s.vendor === 'HelixCore') {
        n++;
        if (n <= 4) console.log('  src:', comp.slug, '->', JSON.stringify({ url: s.url, price: s.price, dosage: s.dosage, image: s.image }));
      }
    }
  }
}
console.log('total HelixCore source entries =', n);
