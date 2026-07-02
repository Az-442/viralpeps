#!/usr/bin/env python3
"""Fix specific entries missing residues/legend in molecular blocks."""
FILE = "src/data/compound-tabs.tsx"
with open(FILE, 'r') as f:
    content = f.read()

# Find and fix specific entries missing residues
fixes = {
    "hgh-97": 'molecular: { items: [{label:"Type",value:"HGH fragment peptide"},{label:"Alt Names",value:"HGH-97, growth hormone fragment"}], diagramTitle: "HGH-97", diagramSubtitle: "GH fragment peptide" }',
    "pinealon": 'molecular: { items: [{label:"Type",value:"Peptide bioregulator | CNS"},{label:"Alt Names",value:"Pinealon peptide, Khavinson CNS peptide"}], diagramTitle: "Pinealon", diagramSubtitle: "Neural peptide bioregulator" }',
    "lipo-c": 'molecular: { items: [{label:"Type",value:"Lipotropic compound"}], diagramTitle: "Lipo-C", diagramSubtitle: "Fat metabolism support" }',
    "pnc-27": 'molecular: { items: [{label:"Type",value:"p53-HDM-2 targeted peptide"},{label:"Mechanism",value:"p53 reactivation via HDM-2 binding"},{label:"Alt Names",value:"PNC-27, p53 penetrating peptide"}], diagramTitle: "PNC-27", diagramSubtitle: "p53-HDM-2 targeted peptide" }',
    "pe-22-28": 'molecular: { items: [{label:"Type",value:"Amyloid precursor peptide fragment"}], diagramTitle: "PE-22-28", diagramSubtitle: "APP fragment peptide" }',
}

replacements = {
    'molecular: { items: [{label:"Type",value:"HGH fragment peptide"},{label:"Alt Names",value:"HGH-97, growth hormone fragment"}], diagramTitle: "HGH-97", diagramSubtitle: "GH fragment peptide" }': 'molecular: { items: [{label:"Type",value:"HGH fragment peptide"},{label:"Alt Names",value:"HGH-97, growth hormone fragment"}], diagramTitle: "HGH-97", diagramSubtitle: "GH fragment peptide", residues: [{x:20,y:50,label:"GH",color:"#8b5cf6",name:"GH fragment"}], legend: "GH=Growth hormone fragment" }',
    'molecular: { items: [{label:"Type",value:"Peptide bioregulator | CNS"},{label:"Alt Names",value:"Pinealon peptide, Khavinson CNS peptide"}], diagramTitle: "Pinealon", diagramSubtitle: "Neural peptide bioregulator" }': 'molecular: { items: [{label:"Type",value:"Peptide bioregulator | CNS"},{label:"Alt Names",value:"Pinealon peptide, Khavinson CNS peptide"}], diagramTitle: "Pinealon", diagramSubtitle: "Neural peptide bioregulator", residues: [{x:20,y:50,label:"PN",color:"#8b5cf6",name:"Pinealon"}], legend: "PN=Pinealon" }',
    'molecular: { items: [{label:"Type",value:"Lipotropic compound"}], diagramTitle: "Lipo-C", diagramSubtitle: "Fat metabolism support" }': 'molecular: { items: [{label:"Type",value:"Lipotropic compound"}], diagramTitle: "Lipo-C", diagramSubtitle: "Fat metabolism support", residues: [{x:20,y:50,label:"LC",color:"#8b5cf6",name:"Lipo-C"}], legend: "LC=Lipo-C" }',
    'molecular: { items: [{label:"Type",value:"p53-HDM-2 targeted peptide"},{label:"Mechanism",value:"p53 reactivation via HDM-2 binding"},{label:"Alt Names",value:"PNC-27, p53 penetrating peptide"}], diagramTitle: "PNC-27", diagramSubtitle: "p53-HDM-2 targeted peptide" }': 'molecular: { items: [{label:"Type",value:"p53-HDM-2 targeted peptide"},{label:"Mechanism",value:"p53 reactivation via HDM-2 binding"},{label:"Alt Names",value:"PNC-27, p53 penetrating peptide"}], diagramTitle: "PNC-27", diagramSubtitle: "p53-HDM-2 targeted peptide", residues: [{x:20,y:50,label:"P53",color:"#8b5cf6",name:"p53 peptide"},{x:100,y:50,label:"CPP",color:"#0891b2",name:"CPP"}], legend: "P53=p53 domain  CPP=Cell-penetrating peptide" }',
    'molecular: { items: [{label:"Type",value:"Amyloid precursor peptide fragment"}], diagramTitle: "PE-22-28", diagramSubtitle: "APP fragment peptide" }': 'molecular: { items: [{label:"Type",value:"Amyloid precursor peptide fragment"}], diagramTitle: "PE-22-28", diagramSubtitle: "APP fragment peptide", residues: [{x:20,y:50,label:"PE",color:"#8b5cf6",name:"APP fragment"}], legend: "PE=PE-22-28" }',
}

for old, new in replacements.items():
    if old in content:
        content = content.replace(old, new)
        print(f"Fixed {old[:50]}...")
    else:
        print(f"NOT FOUND: {old[:50]}...")

with open(FILE, 'w') as f:
    f.write(content)
print("Done")
