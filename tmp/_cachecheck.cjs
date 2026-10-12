const c = require('/Users/time4you/viralpeps/src/data/trustscore-autocheck.json');
console.log('cache keys:', Object.keys(c).length);
console.log('has peptide-global:', !!c['peptide-global']);
for (const s of ['spx-labs','pyrox-labs','allmypeptides','apex-pharma','everything-peptides']) {
  console.log(s, '->', JSON.stringify(c[s] || 'MISSING').slice(0, 130));
}
