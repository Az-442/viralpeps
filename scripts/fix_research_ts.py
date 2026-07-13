"""Fix the research.ts merge issue - entries went after compoundList instead of in guides array."""

with open("/Users/time4you/viralpeps/src/data/research.ts") as f:
    text = f.read()

# The correct insertion point: find the ] that closes the guides array,
# which is after the last Tirzepatide entry and before export const compoundList
old_last_entry = '    tags: ["glp-1", "metabolic", "weight-loss"],\n  },\n];'
new_insert = '''    tags: ["glp-1", "metabolic", "weight-loss"],
  },
  {
    title: "GHK-Cu Research Summary",
    desc: "Overview of GHK-Cu, a naturally occurring copper peptide complex that modulates gene expression, promotes tissue repair, and supports skin health research.",
    category: "Compound Profiles",
    section: "peptides",
    compound: "GHK-Cu",
    slug: "ghkcu-research-summary",
    image: "ghkcu-summary",
    tags: ["copper", "skin", "collagen", "wound-healing"],
  },
  {
    title: "Retatrutide Research Summary",
    desc: "Overview of Retatrutide (LY3437943), a first-in-class triple GLP-1/GIP/glucagon receptor agonist for metabolic and obesity research.",
    category: "Compound Profiles",
    section: "peptides",
    compound: "Retatrutide",
    slug: "retatrutide-research-summary",
    image: "retatrutide-summary",
    tags: ["glp-1", "metabolic", "obesity", "triple-agonist"],
  },
  {
    title: "Semax Research Summary",
    desc: "Overview of Semax, a synthetic ACTH(4-10) analog that upregulates BDNF and NGF for neuroprotection, cognitive enhancement, and stroke recovery research.",
    category: "Compound Profiles",
    section: "peptides",
    compound: "Semax",
    slug: "semax-research-summary",
    image: "semax-summary",
    tags: ["nootropic", "neuroprotection", "bdnf", "cognitive"],
  },
  {
    title: "Selank Research Summary",
    desc: "Overview of Selank (TP-7), a synthetic heptapeptide tuftsin analog with anxiolytic and nootropic properties for neuropeptide research.",
    category: "Compound Profiles",
    section: "peptides",
    compound: "Selank",
    slug: "selank-research-summary",
    image: "selank-summary",
    tags: ["anxiolytic", "nootropic", "gaba", "neuropeptide"],
  },
];'''

if old_last_entry in text:
    text = text.replace(old_last_entry, new_insert, 1)
    with open("/Users/time4you/viralpeps/src/data/research.ts", "w") as f:
        f.write(text)
    print("Fixed research.ts - entries now in guides array")
else:
    print("ERROR: Could not find insertion point")
    print("Searching for partial match...")
    # Debug: find what's around the insertion point
    idx = text.find("weight-loss\"],")
    if idx > 0:
        print(f"Found at {idx}: ...{text[idx-20:idx+200]}...")
