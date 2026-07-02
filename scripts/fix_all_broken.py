#!/usr/bin/env python3
"""Fix all broken molecular blocks - add back diagramTitle/diagramSubtitle and fix comma."""
FILE = "src/data/compound-tabs.tsx"
with open(FILE, 'r') as f:
    content = f.read()

fixes = {
    # HMG
    'molecular: { items: [{label:"Type",value:"Gonadotropin preparation"},{label:"Components",value:"FSH + LH (equal activity)"}], , residues: [{x:20,y:50,label:"FSH",color:"#8b5cf6",name:"FSH"},{x:100,y:50,label:"LH",color:"#0891b2",name:"LH"}], legend: "FSH + LH preparation" },': 
    'molecular: { items: [{label:"Type",value:"Gonadotropin preparation"},{label:"Components",value:"FSH + LH (equal activity)"}], diagramTitle: "HMG", diagramSubtitle: "FSH + LH preparation", residues: [{x:20,y:50,label:"FSH",color:"#8b5cf6",name:"FSH"},{x:100,y:50,label:"LH",color:"#0891b2",name:"LH"}], legend: "FSH + LH preparation" },',
    
    # Triptorelin
    'molecular: { items: [{label:"MW",value:"~1,312 Da"},{label:"Sequence",value:"Modified GnRH decapeptide"},{label:"Type",value:"GnRH agonist"},{label:"Half-Life",value:"~3-4 hours"},{label:"Alt Names",value:"Triptorelin, GnRH agonist"}], , residues: [{x:20,y:50,label:"TR",color:"#8b5cf6",name:"Triptorelin"}], legend: "GnRH agonist" },':
    'molecular: { items: [{label:"MW",value:"~1,312 Da"},{label:"Sequence",value:"Modified GnRH decapeptide"},{label:"Type",value:"GnRH agonist"},{label:"Half-Life",value:"~3-4 hours"},{label:"Alt Names",value:"Triptorelin, GnRH agonist"}], diagramTitle: "Triptorelin", diagramSubtitle: "GnRH agonist . ~1.3 kDa", residues: [{x:20,y:50,label:"TR",color:"#8b5cf6",name:"Triptorelin"}], legend: "GnRH agonist" },',
    
    # Myostatin
    'molecular: { items: [{label:"MW",value:"~25 kDa (dimer)"},{label:"Type",value:"TGF-beta superfamily | Growth factor"},{label:"Receptor",value:"ActRIIB"}], , residues: [{x:20,y:50,label:"MSTN",color:"#8b5cf6",name:"Myostatin"}], legend: "GDF-8 / Myostatin" },':
    'molecular: { items: [{label:"MW",value:"~25 kDa (dimer)"},{label:"Type",value:"TGF-beta superfamily | Growth factor"},{label:"Receptor",value:"ActRIIB"}], diagramTitle: "Myostatin", diagramSubtitle: "~25 kDa . GDF-8 . Negative muscle regulator", residues: [{x:20,y:50,label:"MSTN",color:"#8b5cf6",name:"Myostatin"}], legend: "GDF-8 / Myostatin" },',
    
    # NA-Semax-Amidate
    'molecular: { items: [{label:"Type",value:"Nootropic peptide | Semax analog"},{label:"Modifications",value:"N-acetylated + C-terminal amidated"}], , residues: [{x:20,y:50,label:"Semax",color:"#8b5cf6",name:"NA-Semax-Amidate"}], legend: "Stabilised Semax analog" },':
    'molecular: { items: [{label:"Type",value:"Nootropic peptide | Semax analog"},{label:"Modifications",value:"N-acetylated + C-terminal amidated"}], diagramTitle: "NA-Semax-Amidate", diagramSubtitle: "Stabilised Semax analogue", residues: [{x:20,y:50,label:"Semax",color:"#8b5cf6",name:"NA-Semax-Amidate"}], legend: "Stabilised Semax analog" },',
    
    # NA-Selank-Amidate
    'molecular: { items: [{label:"Type",value:"Anxiolytic peptide | Selank analog"},{label:"Modifications",value:"N-acetylated + C-terminal amidated"}], , residues: [{x:20,y:50,label:"Selank",color:"#8b5cf6",name:"NA-Selank-Amidate"}], legend: "Stabilised Selank analog" },':
    'molecular: { items: [{label:"Type",value:"Anxiolytic peptide | Selank analog"},{label:"Modifications",value:"N-acetylated + C-terminal amidated"}], diagramTitle: "NA-Selank-Amidate", diagramSubtitle: "Stabilised Selank analogue", residues: [{x:20,y:50,label:"Selank",color:"#8b5cf6",name:"NA-Selank-Amidate"}], legend: "Stabilised Selank analog" },',
}

for old, new in fixes.items():
    if old in content:
        content = content.replace(old, new)
        print(f"Fixed one entry")
    else:
        print(f"NOT FOUND pattern")

with open(FILE, 'w') as f:
    f.write(content)
print("Done")
