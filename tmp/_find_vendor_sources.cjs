const c = require('/Users/time4you/viralpeps/src/data/compounds.json');
const target = process.argv[2] || 'APEX Biolabs';
for (const comp of c) {
  const hits = (comp.sources||[]).filter(s => (s.vendor||'').toLowerCase().includes(target.toLowerCase()));
  if (hits.length) {
    hits.forEach(h => console.log(JSON.stringify({compound:comp.slug||comp.id, vendor:h.vendor, price:h.price, dosage:h.dosage||null, image:(h.image||'').slice(0,70), url:(h.url||'').slice(0,90)})));
  }
}
