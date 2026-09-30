const ROOT = '/Users/time4you/viralpeps';
const c = require(ROOT + '/src/data/compounds.json');
const v = require(ROOT + '/src/data/vendors.json');

console.log('vendors:', v.length, '| compounds:', c.length);

// Kings BioLabs restored?
const k = v.find(x => x.name === 'Kings BioLabs');
console.log('Kings BioLabs in vendors.json:', !!k, k ? `(slug=${k.slug}, labTested=${k.labTested}, email=${k.email})` : '');
console.log('Kings BioLabs profile URL: https://www.viralpeps.co.uk/vendors/kings-bio-labs');

for (const name of ['PeptX', 'Claripep', 'VialVerse', 'Kings BioLabs']) {
  const comps = new Set();
  let n = 0;
  for (const x of c) for (const s of x.sources || []) if (s.vendor === name) { n++; comps.add(x.slug); }
  console.log(`  ${name.padEnd(14)} ${n} sources across ${comps.size} compounds`);
}

// dosage completeness for Kings
console.log('\nKings BioLabs entries:');
for (const x of c) for (const s of x.sources || []) {
  if (s.vendor === 'Kings BioLabs') {
    console.log(`  ${x.slug.padEnd(28)} ${s.price.padEnd(9)} ${(s.dosage||'-').padEnd(8)} ${s.image}`);
  }
}

// tirzepatide / l-carnitine fixes
console.log('\nPeptX dose fixes:');
for (const slug of ['tirzepatide', 'l-carnitine']) {
  const x = c.find(y => y.slug === slug);
  const s = x.sources.find(s => s.vendor === 'PeptX');
  console.log(`  ${slug.padEnd(16)} ${s.price} ${s.dosage} ${s.url}`);
}
