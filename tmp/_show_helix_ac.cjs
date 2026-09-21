const v = JSON.parse(require('fs').readFileSync('src/data/vendors.json', 'utf8'));
const hc = v.find((x) => x.slug === 'helix-core');
console.log(JSON.stringify(hc._autoChecks, null, 2));
