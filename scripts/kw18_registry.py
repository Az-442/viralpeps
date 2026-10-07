import re
p = '/Users/time4you/viralpeps/src/data/research.ts'
raw = open(p).read()

anchor = "  },\n];\n\nexport const compoundList"
assert raw.count(anchor) == 1, f"anchor count = {raw.count(anchor)}"

blocks = """  {
    title: "Epitalon Suppliers UK: 55 Vendors, a \\u00a310.99 Floor and an Evidence Problem",
    desc: "Epitalon is the cheapest longevity compound in the UK catalogue and the one whose telomerase reputation most outruns its literature. What the Khavinson 2003 fibroblast study actually showed, why the 2025 Brunel replication both confirms and complicates the telomere claim, the single-mouse-strain lifespan data, and the honest state of the human evidence. Plus the market: 55 vendors, 67 listings from \\u00a310.99, and the five verification traps that matter more than price on a molecule this cheap.",
    category: "Guide",
    section: "research-hub",
    compound: "Epitalon",
    slug: "epitalon-suppliers-uk",
    image: "epitalon-suppliers-uk",
    minutes: 12,
    tags: ["epitalon", "epithalon", "aedg", "suppliers", "uk", "longevity", "telomerase", "telomere", "anti-aging", "pineal", "vendors", "khavinson"],
  },
  {
    title: "CJC-1295 With DAC vs Without DAC: One Linker, Two Very Different Molecules",
    desc: "The two compounds sold as CJC-1295 share the same modified GHRH(1-29) backbone. The with-DAC form carries a maleimidopropionic acid linker that bonds covalently to albumin Cys34, taking the half-life from about thirty minutes to 5.8 to 8.1 days. Why pulsatile GH survives the continuous stimulus, why IGF-1 outlasts GH by three days, and the honest caveat that neither trial measured an outcome. Plus the two UK markets: 23 vendors at \\u00a316.95 and 33 vendors at \\u00a39.95.",
    category: "Guide",
    section: "comparisons",
    compound: "CJC-1295 (With DAC)",
    slug: "cjc-1295-with-dac-vs-without-dac",
    image: "cjc-1295-with-dac-vs-without-dac",
    minutes: 12,
    tags: ["cjc-1295", "cjc-1295-dac", "cjc-1295-no-dac", "ghrh", "growth-hormone", "dac", "albumin", "half-life", "comparison", "vs", "uk"],
  },
  {
    title: "Research Peptides Guide: How to Verify a Reagent in a 104-Vendor Market",
    desc: "A research peptide is a regulatory category, not a chemical one \\u2014 and the difference determines what quality assurance you can expect. The UK market holds 104 vendors, 158 compounds and 3,409 priced listings, skewed so a handful of compounds hold most of the supply. The four independent verification checks \\u2014 mass-spectrometry identity, HPLC purity with a stated method, batch matching, and presentation \\u2014 plus the storage and stability rules and the plain regulatory position under the Human Medicines Regulations 2012.",
    category: "Guide",
    section: "research-hub",
    slug: "research-peptides-guide",
    image: "research-peptides-guide",
    minutes: 13,
    tags: ["research-peptides", "guide", "uk", "verification", "coa", "purity", "quality", "regulatory", "pillar", "research-use-only"],
  },
"""

new = raw.replace(anchor, blocks + anchor, 1)
open(p, 'w').write(new)

# verify slugs land inside guides array
gstart = new.find("export const guides")
gend = new.find("export const compoundList")
for slug in ["epitalon-suppliers-uk", "cjc-1295-with-dac-vs-without-dac", "research-peptides-guide"]:
    pos = new.find(f'slug: "{slug}"')
    print(f"{slug}: pos={pos} inside_guides={gstart < pos < gend}")
print("compoundList at", gend, "| guides at", gstart)
