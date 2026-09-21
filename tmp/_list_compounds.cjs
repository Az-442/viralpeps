const c = require('/Users/time4you/viralpeps/src/data/compounds.json');
const slugs = [];
for (const x of c) slugs.push(x.slug);
console.log(slugs.join('\n'));
