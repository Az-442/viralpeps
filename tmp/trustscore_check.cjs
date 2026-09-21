const path = require('path');
const vendors = require('/Users/time4you/viralpeps/src/data/vendors.json');
const { getTrustScore } = require('/Users/time4you/viralpeps/src/lib/trust-score.ts');

for (const name of ['PeptX', 'Claripep', 'VialVerse']) {
  const v = vendors.find((x) => x.name === name);
  if (!v) { console.log(name, 'NOT FOUND'); continue; }
  const d = getTrustScore(v.name);
  console.log(`${name}: ${d.score}/${d.max}  ticks=${JSON.stringify(d.ticks)}`);
}
