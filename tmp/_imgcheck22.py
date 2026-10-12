import re, os
ROOT='/Users/time4you/viralpeps'
rt = open(os.path.join(ROOT,'src/data/research.ts')).read()
imgs = re.findall(r"image:\s*['\"]([^'\"]+)['\"]", rt)
missing = []
for im in imgs:
    p = os.path.join(ROOT, 'public/images/guides', im + '.png')
    if not os.path.exists(p):
        missing.append(im)
print("total image refs:", len(imgs), "missing:", len(missing))
print(missing[:20])
# specifically the 3 new
for im in ['buy-kpv-uk','aod-9604-vs-mots-c','recovery-peptide-suppliers-uk']:
    print(im, os.path.exists(os.path.join(ROOT,'public/images/guides',im+'.png')))
