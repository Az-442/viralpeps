const c = require('/Users/time4you/viralpeps/src/data/compounds.json');
for (const comp of c) {
  if (!/^retatrutide/.test(comp.slug||'')) continue;
  const srcs = (comp.sources||[]);
  console.log('=== compound', comp.slug, comp.name, 'srcs:', srcs.length);
  srcs.slice(0,60).forEach(s => console.log('   ', s.vendor, '|', s.price, '|', s.dosage||'-', '|', (s.url||'').replace(/^https?:\/\/(www\.)?/,'')));
}
