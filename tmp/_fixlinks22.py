import re, os

ROOT = '/Users/time4you/viralpeps'
P = os.path.join(ROOT, 'src/data/research-content.ts')
src = open(P).read()

new_slugs = ['buy-kpv-uk','aod-9604-vs-mots-c','recovery-peptide-suppliers-uk']
positions = []
for s in new_slugs:
    m = re.search(r"['\"]%s['\"]:\s*\{" % re.escape(s), src)
    positions.append(m.start())
positions.append(len(src))

repl = {
    '/research/choosing-supplier': '/research/choosing-a-uk-supplier',
    '/research/bpc-157-suppliers-uk': '/research/bpc-157-for-recovery',
}

out = src
# rebuild from the end to preserve offsets
for i in range(len(new_slugs)-1, -1, -1):
    start = positions[i]
    end = positions[i+1]
    seg = out[start:end]
    orig = seg
    for k,v in repl.items():
        seg = seg.replace(k, v)
    out = out[:start] + seg + out[end:]
    print(new_slugs[i], "changed:", orig != seg)

open(P,'w').write(out)
print("done. delta", len(out)-len(src))
