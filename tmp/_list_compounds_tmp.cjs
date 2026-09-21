const c = require('/Users/time4you/viralpeps/src/data/compounds.json');
const names = c.map(x => ({
  id: x.id,
  name: x.name,
  slug: x.slug,
  aliases: Array.isArray(x.aliases) ? x.aliases : [],
  cat: x.category
}));
console.log(JSON.stringify(names, null, 1));
