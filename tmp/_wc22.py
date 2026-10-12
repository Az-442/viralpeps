import re
ROOT='/Users/time4you/viralpeps'
rc = open(ROOT+'/src/data/research-content.ts').read()
new_slugs = ['buy-kpv-uk','aod-9604-vs-mots-c','recovery-peptide-suppliers-uk']
positions = []
for s in new_slugs:
    m = re.search(r"['\"]%s['\"]:\s*\{" % re.escape(s), rc)
    positions.append(m.start())
positions.append(len(rc))

def wc(t):
    t = re.sub(r"\\n", " ", t)
    t = re.sub(r"[#*\[\]()>`]", " ", t)
    return len([w for w in re.split(r"\s+", t) if w])

for i, s in enumerate(new_slugs):
    seg = rc[positions[i]:positions[i+1]]
    # gather text field values
    total = 0
    for m in re.finditer(r"(?:^|\n)\s*(title|body|pullQuote|question|answer|value|label|desc):\s*'((?:[^'\\]|\\.)*)'", seg):
        total += wc(m.group(2))
    # subsections titles included above; tables rows
    for m in re.finditer(r"header:\s*\[([^\]]*)\]", seg):
        total += wc(m.group(1))
    for m in re.finditer(r"rows:\s*\[(.*?)\]\s*,\s*\}?", seg, re.S):
        total += wc(m.group(1))
    print(s, "->", total, "words (content fields)")
