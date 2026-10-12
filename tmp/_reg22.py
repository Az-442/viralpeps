import os
ROOT = '/Users/time4you/viralpeps'
RT = os.path.join(ROOT, 'src/data/research.ts')
NL = chr(10)

src = open(RT, 'rb').read().decode('utf-8')

ANCHOR = '  },' + NL + NL + '];' + NL + NL + 'export const compoundList'
n = src.count(ANCHOR)
print("anchor count:", n)
assert n == 1, n

entries = [
    {
        "title": "Where to Buy KPV in the UK: What a Tripeptide Should Cost",
        "desc": "A purchase-decision guide to buying KPV in the UK — why a three-amino-acid peptide spans £12.75 to £199.99, what a batch-specific COA must show, and the five verification questions to ask before ordering.",
        "category": "Guide",
        "section": "research-hub",
        "compound": "KPV",
        "slug": "buy-kpv-uk",
        "image": "buy-kpv-uk",
        "minutes": 11,
        "tags": ["kpv", "buy", "uk", "tripeptide", "coa", "suppliers", "price"],
    },
    {
        "title": "AOD-9604 vs MOTS-c: Two Metabolic Fragments Compared",
        "desc": "AOD-9604 is a fragment of human growth hormone; MOTS-c is encoded in mitochondrial DNA. A head-to-head comparison of mechanism, evidence base, and UK price — and why neither is anchored to a licensed product.",
        "category": "Articles",
        "section": "comparisons",
        "compound": "AOD-9604",
        "slug": "aod-9604-vs-mots-c",
        "image": "aod-9604-vs-mots-c",
        "minutes": 12,
        "tags": ["aod-9604", "mots-c", "comparison", "metabolism", "ampk", "lipolysis", "fragment"],
    },
    {
        "title": "Recovery Peptide Suppliers UK: BPC-157, TB-500, GHK-Cu & KPV",
        "desc": "The UK recovery peptide market by the numbers — BPC-157, TB-500, GHK-Cu and KPV listing counts, price floors, and the verification sequence that lets you pay the floor without trading away batch testing.",
        "category": "Guide",
        "section": "research-hub",
        "slug": "recovery-peptide-suppliers-uk",
        "image": "recovery-peptide-suppliers-uk",
        "minutes": 11,
        "tags": ["recovery", "suppliers", "uk", "bpc-157", "tb-500", "ghk-cu", "kpv"],
    },
]

def block(e):
    lines = ['  {']
    lines.append('    title: %s,' % repr(e['title']).replace('"', '"').replace("'", "'"))
    return e

# Build TS text manually to keep quoting style consistent (single quotes)
def ts_str(s):
    return "'" + s.replace("\\", "\\\\").replace("'", "\\'") + "'"

blocks = []
for e in entries:
    b = []
    b.append('  {')
    b.append("    title: %s," % ts_str(e['title']))
    b.append("    desc: %s," % ts_str(e['desc']))
    b.append("    category: %s," % ts_str(e['category']))
    b.append("    section: %s," % ts_str(e['section']))
    if e.get('compound'):
        b.append("    compound: %s," % ts_str(e['compound']))
    b.append("    slug: %s," % ts_str(e['slug']))
    b.append("    image: %s," % ts_str(e['image']))
    b.append("    minutes: %d," % e['minutes'])
    b.append("    tags: [%s]," % ", ".join(ts_str(t) for t in e['tags']))
    b.append('  },')
    blocks.append(NL.join(b))

insert = NL.join(blocks)
new = src.replace(ANCHOR, '  },' + NL + NL + insert + NL + NL + '];' + NL + NL + 'export const compoundList')

open(RT, 'w').write(new)
print("registry merged. delta:", len(new)-len(src))
i2 = new.find('export const compoundList')
for k in ['buy-kpv-uk','aod-9604-vs-mots-c','recovery-peptide-suppliers-uk']:
    pos = new.find(ts_str(k))
    print(k, "pos", pos, "before compoundList:", pos < i2)
