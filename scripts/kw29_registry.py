"""Insert registry entries into the guides array of research.ts."""
REPO = '/Users/time4you/viralpeps'
P = f'{REPO}/src/data/research.ts'
NL = chr(10)
src = open(P, encoding='utf-8').read()

ANCHOR = '  },' + NL + '];' + NL + NL + 'export const compoundList'
assert src.count(ANCHOR) == 1, f"anchor count {src.count(ANCHOR)}"

ENTRIES = """  },
  {
    title: "MOTS-c Suppliers UK: 93 Vendors and a Price List That Ranks the Wrong Vial First",
    desc: "MOTS-c is one of the best-supplied peptides in the UK \\u2014 93 vendors, 127 listings \\u2014 and the cheapest sticker price in the market is a 5 mg vial that costs more per milligram than most 40 mg listings. A supplier guide to the presentation bands, the 27.4%-style unstated-size problem, the four specification checks that matter on a mitochondrial-encoded peptide, and how to short-list 93 vendors in ten minutes.",
    category: "Guide",
    section: "research-hub",
    compound: "MOTS-c",
    slug: "mots-c-suppliers-uk",
    image: "mots-c-suppliers-uk",
    minutes: 11,
    tags: ["mots-c", "suppliers", "uk", "sourcing", "price-comparison", "cost-per-milligram", "certificate-of-analysis", "mitochondrial", "ampk", "research-hub", "vial-size"],
  },
  {
    title: "Buy Research Peptides UK: The Eight-Step Procurement Sequence",
    desc: "Most guides tell you what a bad listing looks like. This one is the fixed order of decisions that takes you from a requirement to a vial that matches its certificate \\u2014 write the requirement, drop the 27.4% of listings with no stated quantity, normalise to cost per milligram, choose the presentation, short-list three vendors, and decide on a batch-matched certificate whose mass reconciles with the sequence.",
    category: "Guide",
    section: "research-hub",
    slug: "buy-research-peptides-uk",
    image: "buy-research-peptides-uk",
    minutes: 12,
    tags: ["buy", "research-peptides", "uk", "procurement", "sourcing", "certificate-of-analysis", "cost-per-milligram", "price-comparison", "research-use-only", "mhra", "research-hub"],
  },
  {
    title: "The Staircase of Vial Sizes: Why the Cheapest Peptide Is Almost Never the Cheapest Peptide",
    desc: "Across 3,580 listings and 67 testable compounds, the cheapest sticker price is not the cheapest per milligram on 49 of them \\u2014 a median penalty of 2.0x, and 13x on GHK-Cu. The economics of filling a vial, why cheap peptides are distorted most, why multi-vial packs are the most misread format in the market, and the 27.4% of listings you cannot price at all.",
    category: "Guide",
    section: "research-hub",
    slug: "staircase-of-vial-sizes",
    image: "staircase-of-vial-sizes",
    minutes: 10,
    tags: ["price-comparison", "cost-per-milligram", "vial-size", "peptide-prices", "uk", "market-structure", "ghk-cu", "mots-c", "bpc-157", "tb-500", "research-hub"],
  },
"""

out = src.replace(ANCHOR, ENTRIES + '];' + NL + NL + 'export const compoundList', 1)
open(P, 'w', encoding='utf-8').write(out)

idx = out.find('export const compoundList')
print("export const compoundList at", idx, "of", len(out))
for s in ['mots-c-suppliers-uk', 'buy-research-peptides-uk', 'staircase-of-vial-sizes']:
    pos = out.find(f'slug: "{s}"')
    print(f'  {s}: slug at {pos} -> {"INSIDE guides" if 0 < pos < idx else "OUTSIDE/BROKEN"}')
print("grown", len(src), "->", len(out))
