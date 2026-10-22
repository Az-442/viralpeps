#!/usr/bin/env python3
"""kw27: merge the three article fragments into research-content.ts and research.ts."""
import re
import sys

WT = "/Users/time4you/viralpeps/.wt/kw27"
NL = chr(10)
CONTENT = WT + "/src/data/research-content.ts"
REG = WT + "/src/data/research.ts"

FRAGS = ["/tmp/kw27_art1.txt", "/tmp/kw27_art2.txt", "/tmp/kw27_art3.txt"]

REGISTRY = """  {
    title: "Survodutide Suppliers UK: Five Vendors, a 4x Price Spread and the Verification Problem",
    desc: "A supplier guide to survodutide in the UK \\u2014 5 tracked vendors and 5 listings, from GBP 39.00 to GBP 160.00 for an identical 10 mg vial. Why the thinnest supply line in the incretin market cannot discipline its own prices, what five vendors costs the buyer in substitution and feedback, the five specification checks that separate a real listing from a relabelled one, and why the phase 3 evidence says nothing about the vial.",
    category: "Articles",
    section: "research-hub",
    compound: "Survodutide",
    slug: "survodutide-suppliers-uk",
    image: "survodutide-suppliers-uk",
    minutes: 11,
    tags: ["survodutide", "suppliers", "uk", "sourcing", "verification", "coa", "gcgr", "glp-1", "incretin", "bi-456906", "price-comparison", "research-hub"],
  },
  {
    title: "Buy Epitalon UK: Cost Per Milligram, Vial Size and the Five Buying Traps",
    desc: "A purchasing guide to epitalon in the UK \\u2014 57 vendors, 69 listings and a GBP 10.99 floor, with the headline 18x spread reduced to a far narrower 4.1x once quantity is held constant. Why 17 listings state no vial size at all, which presentation is actually the best value, the five recurring traps from cosmetic serums to near-duplicate vendor names, and the line-by-line certificate checklist.",
    category: "Guide",
    section: "research-hub",
    compound: "Epitalon",
    slug: "buy-epitalon-uk",
    image: "buy-epitalon-uk",
    minutes: 10,
    tags: ["epitalon", "epithalon", "aedg", "buy", "uk", "sourcing", "certificate-of-analysis", "longevity", "telomerase", "price-comparison", "research-hub"],
  },
  {
    title: "Follistatin 344 for Muscle Growth: The Brake, and the Letter Nobody Mentions",
    desc: "Follistatin does not build muscle \\u2014 it removes the myostatin brake. A goal article on what the mechanism actually is, why every successful hypertrophy experiment used genetic manipulation rather than injected protein, the ACE-083 work showing the effect is local, and the one human trial whose functional result was formally contested in Molecular Therapy. Plus the 7.6x UK price spread and what a protein-appropriate certificate has to contain.",
    category: "Articles",
    section: "goals",
    compound: "Follistatin 344",
    slug: "follistatin-344-for-muscle-growth",
    image: "follistatin-344-for-muscle-growth",
    minutes: 12,
    tags: ["follistatin-344", "fst-344", "myostatin", "muscle-growth", "goals", "gdf-8", "activin", "ibm", "gene-therapy", "ace-083", "recombinant-protein", "sourcing"],
  },"""


def blocks():
    out = []
    for f in FRAGS:
        t = open(f, encoding="utf-8").read().rstrip()
        if not t.endswith(","):
            t += ","
        out.append(t)
    return out


def merge_content():
    src = open(CONTENT, encoding="utf-8").read()
    cands = [
        "  ]," + NL + "}," + NL + NL + "};" + NL + "export default content;",
        "  ]," + NL + "  }," + NL + NL + "};" + NL + "export default content;",
        "]," + NL + "}," + NL + NL + "};" + NL + "export default content;",
    ]
    counts = [(c.count(src), c) for c in cands]
    for n, c in counts:
        print("seam candidate count=%d len=%d" % (n, len(c)))
    good = [c for n, c in counts if n == 1]
    if not good:
        sys.exit("NO UNIQUE SEAM")
    seam = max(good, key=len)
    print("USING seam len", len(seam))
    ins = (NL + NL).join(blocks())
    repl = "  ]," + NL + "}," + NL + NL + ins + NL + NL + "};" + NL + "export default content;"
    assert src.count(seam) == 1
    src = src.replace(seam, repl)
    open(CONTENT, "w", encoding="utf-8").write(src)
    print("content merged")


def merge_registry():
    src = open(REG, encoding="utf-8").read()
    anchor = "  }," + NL + "];" + NL + NL + "export const compoundList"
    n = src.count(anchor)
    print("registry anchor count:", n)
    if n != 1:
        alt = "  }" + NL + "];" + NL + NL + "export const compoundList"
        print("alt anchor count:", src.count(alt))
        if src.count(alt) != 1:
            sys.exit("NO REGISTRY ANCHOR")
        anchor = alt
        repl = "  }," + NL + NL + REGISTRY + NL + "];" + NL + NL + "export const compoundList"
    else:
        repl = "  }," + NL + NL + REGISTRY + NL + "];" + NL + NL + "export const compoundList"
    src = src.replace(anchor, repl)
    open(REG, "w", encoding="utf-8").write(src)
    print("registry merged")


if __name__ == "__main__":
    merge_content()
    merge_registry()
    c = open(CONTENT, encoding="utf-8").read()
    for s in ["survodutide-suppliers-uk", "buy-epitalon-uk", "follistatin-344-for-muscle-growth"]:
        print(s, "keys:", len(re.findall(r'["\']' + s + r'["\']\s*:', c)))
    r = open(REG, encoding="utf-8").read()
    print("registry compoundList at", r.find("export const compoundList"))
    for s in ["survodutide-suppliers-uk", "buy-epitalon-uk", "follistatin-344-for-muscle-growth"]:
        i = r.find('"' + s + '"')
        print(" ", s, "at", i, "INSIDE guides" if 0 < i < r.find("export const compoundList") else "!!! OUTSIDE")
