const c = require('/Users/time4you/viralpeps/src/data/compounds.json');
let t=0,f=0,o=0,n=0;
for (const comp of c) for (const s of (comp.sources||[])) {
  n++;
  const v=s.inStock;
  if (v===true) t++; else if (v===false) f++; else o++;
}
console.log('true',t,'false',f,'missing',o,'total',n);
