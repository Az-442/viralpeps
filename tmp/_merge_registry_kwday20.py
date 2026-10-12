#!/usr/bin/env python3
"""Insert the three Day-20 registry entries into the research.ts `guides` array.

Anchor (verified this run, matches once):
    '  },' + NL + '];' + NL + NL + 'export const compoundList'
Replacement re-emits the consumed '  },' and drops the anchor's own:
    '  },' + NL + <blocks> + '];' + NL + NL + 'export const compoundList'
"""
import os
import re

os.chdir('/Users/time4you/viralpeps')
NL = '\n'
ANCHOR = '  },' + NL + '];' + NL + NL + 'export const compoundList'

rt = open('src/data/research.ts', encoding='utf-8').read()
print('anchor matches:', rt.count(ANCHOR))
assert rt.count(ANCHOR) == 1

blocks = """  {
    title: "P21 vs Semax: Neurogenesis Hypothesis vs Clinical History",
    desc: "A head-to-head comparison of P21 (P021), a CNTF-derived neurotrophic peptide with a single-laboratory evidence base, and Semax, a synthetic ACTH(4-10) analogue with decades of Russian clinical use. Mechanism, evidence quality, and the UK supply and price picture for both.",
    category: "Articles",
    section: "comparisons",
    compound: "P21",
    slug: "p21-vs-semax",
    image: "p21-vs-semax",
    tags: ["p21", "p021", "semax", "cognitive", "neuroprotection", "neurogenesis", "comparison"],
  },
  {
    title: "Weight Loss Peptide Suppliers UK: GLP-1, Dual and Triple Agonists",
    desc: "A group supplier guide to the UK weight-loss peptide market: which vendors stock semaglutide, tirzepatide, retatrutide and the investigational incretins, what the 70-vendor landscape looks like, and the four traps that separate a verified research reagent from a licensed-brand lookalike.",
    category: "Guide",
    section: "research-hub",
    slug: "weight-loss-peptide-suppliers-uk",
    image: "weight-loss-peptide-suppliers-uk",
    tags: ["weight-loss", "glp-1", "tirzepatide", "semaglutide", "retatrutide", "suppliers", "uk"],
  },
  {
    title: "Cheapest Peptides UK: What the Price Floor Actually Tells You",
    desc: "The cheapest listings across the entire UK peptide catalogue: 106 vendors, 3,443 listings and 146 priced compounds. Why GHK-Cu at GBP 6.48 is the cheapest real peptide, why bacteriostatic water tops most lists by mistake, and why price is a poor quality signal in both directions.",
    category: "Guide",
    section: "research-hub",
    slug: "cheapest-peptides-uk",
    image: "cheapest-peptides-uk",
    tags: ["cheapest", "price", "value", "uk", "directory", "ghk-cu", "pillar"],
  },
"""

replacement = '  },' + NL + blocks + '];' + NL + NL + 'export const compoundList'
out = rt.replace(ANCHOR, replacement)
open('src/data/research.ts', 'w', encoding='utf-8').write(out)

# verify: each new slug sits before compoundList
idx_cp = out.find('export const compoundList')
for slug in ['p21-vs-semax', 'weight-loss-peptide-suppliers-uk', 'cheapest-peptides-uk']:
    i = out.find('slug: "%s"' % slug)
    print(slug, 'pos', i, 'before compoundList:', i != -1 and i < idx_cp)
print('guides entries now:', out.count('title: "'))
print('double comma:', len(re.findall(r',\s*,', out)))
