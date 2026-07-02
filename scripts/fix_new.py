#!/usr/bin/env python3
"""Fix new entries missing residues/legend."""
FILE = "src/data/compound-tabs.tsx"
with open(FILE, 'r') as f:
    content = f.read()

fixes = {
    'diagramTitle: "Survodutide", diagramSubtitle: "Dual GLP-1/glucagon agonist" }': ', residues: [{x:20,y:50,label:"Surv",color:"#8b5cf6",name:"Survodutide"}], legend: "Dual GLP-1/glucagon agonist" }',
    'diagramTitle: "HMG", diagramSubtitle: "FSH + LH preparation" }': ', residues: [{x:20,y:50,label:"FSH",color:"#8b5cf6",name:"FSH"},{x:100,y:50,label:"LH",color:"#0891b2",name:"LH"}], legend: "FSH + LH preparation" }',
    'diagramTitle: "Triptorelin", diagramSubtitle: "GnRH agonist . ~1.3 kDa" }': ', residues: [{x:20,y:50,label:"TR",color:"#8b5cf6",name:"Triptorelin"}], legend: "GnRH agonist" }',
    'diagramTitle: "Myostatin", diagramSubtitle: "~25 kDa . GDF-8 . Negative muscle regulator" }': ', residues: [{x:20,y:50,label:"MSTN",color:"#8b5cf6",name:"Myostatin"}], legend: "GDF-8 / Myostatin" }',
    'diagramTitle: "NA-Semax-Amidate", diagramSubtitle: "Stabilised Semax analogue" }': ', residues: [{x:20,y:50,label:"Semax",color:"#8b5cf6",name:"NA-Semax-Amidate"}], legend: "Stabilised Semax analog" }',
    'diagramTitle: "NA-Selank-Amidate", diagramSubtitle: "Stabilised Selank analogue" }': ', residues: [{x:20,y:50,label:"Selank",color:"#8b5cf6",name:"NA-Selank-Amidate"}], legend: "Stabilised Selank analog" }',
}

for old, new in fixes.items():
    if old in content:
        content = content.replace(old, new)
        print(f"Fixed: {old[:60]}...")
    else:
        print(f"NOT FOUND: {old[:60]}...")

with open(FILE, 'w') as f:
    f.write(content)
print("Done")
