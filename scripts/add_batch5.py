import re

filepath = '/Users/time4you/viralpeps/src/data/compound-tabs.tsx'

with open(filepath) as f:
    content = f.read()

existing = set(re.findall(r'"([a-z0-9][a-z0-9/-]+)":\s*\{', content))
print(f'Before: {len(existing)}')

# Remaining compounds that need entries
new = """
  "gnrh-triptorelin": {
    overview: { whatIs: "GnRH Triptorelin is a synthetic decapeptide GnRH agonist that suppresses pituitary gonadotropin secretion through receptor downregulation.", mechanism: "Initially stimulates then suppresses LH/FSH via GnRH receptor downregulation.", benefits: ["Potent GnRH modulation","Suppresses pituitary gonadotropins"] },
    molecular: { items: [{label:"MW",value:"~1.3 kDa"},{label:"Type",value:"GnRH analog"}], diagramTitle: "GnRH Triptorelin", diagramSubtitle: "~1.3 kDa · GnRH agonist", residues: [{x:20,y:50,label:"N",color:"#3B82F6",name:"N-term"},{x:80,y:50,label:"C",color:"#EF4444",name:"C-term"}], legend: "GnRH analog" },
    indications: { mostEffective: [{title:"Hormone Suppression",desc:"Chemical castration effect"},{title:"GnRH Research",desc:"Pituitary-gonadal axis"}], effective: [], moderate: [] },
    dosing: { note: "Route-dependent.", rows: [{goal:"Bolus",dose:"100-500 mcg",freq:"Single",route:"SC/IM"},{goal:"Continuous",dose:"50-100 mcg/day",freq:"Daily",route:"SC"}], tips: [] },
    interactions: { note: "Pituitary modulator.", cards: [{slug:"hcg",name:"HCG",desc:"Opposing effect",effect:"Complementary"}], stackNotes: [] },
    timeline: { phases: [{day:"Day 1-3",title:"Flare",desc:"LH/FSH surge",color:"blue",icon:"M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"},{day:"Day 7-14",title:"Suppression",desc:"Gonadotropin decline",color:"emerald",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"}] },
    safety: { cards: [{label:"Well-Established",text:"FDA-approved",icon:"M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",color:"emerald"}] },
    references: ["Conn PM, et al. N Engl J Med. 1991;324(2):93-103.","Schally AV. Peptides. 1999;20(10):1247-1262."],
  },
"""

# Insert all new entries that don't exist yet
count = 0
for slug in re.findall(r'"([a-z0-9][a-z0-9/-]+)":\s*\{', new):
    if slug in existing:
        new = new.replace(f'  "{slug}":', f'  // "{slug}":')
    else:
        count += 1

# Now insert the new entries before the closing };
if count > 0:
    import os
    # Use string replacement - find the last closing of the object
    marker = "  },\n};"
    content = content.replace(marker, new.rstrip() + "\n" + marker)
    
    with open(filepath, 'w') as f:
        f.write(content)
    print(f'Added {count} new compounds')

existing = set(re.findall(r'"([a-z0-9][a-z0-9/-]+)":\s*\{', content))
print(f'After: {len(existing)}')
