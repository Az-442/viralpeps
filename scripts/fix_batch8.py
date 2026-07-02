#!/usr/bin/env python3
"""Fix new batch entries missing residues."""
FILE = "src/data/compound-tabs.tsx"
with open(FILE, 'r') as f:
    content = f.read()

fixes = {
    'diagramTitle: "Pancragen", diagramSubtitle: "Pancreatic bioregulator" }': ', diagramTitle: "Pancragen", diagramSubtitle: "Pancreatic bioregulator", residues: [{x:20,y:50,label:"Pc",color:"#8b5cf6",name:"Pancragen"}], legend: "Pancreatic bioregulator" }',
    'diagramTitle: "Testagen", diagramSubtitle: "Testicular bioregulator" }': ', diagramTitle: "Testagen", diagramSubtitle: "Testicular bioregulator", residues: [{x:20,y:50,label:"Ts",color:"#8b5cf6",name:"Testagen"}], legend: "Testicular bioregulator" }',
    'diagramTitle: "Vilon", diagramSubtitle: "Lys-Glu dipeptide bioregulator" }': ', diagramTitle: "Vilon", diagramSubtitle: "Lys-Glu dipeptide bioregulator", residues: [{x:20,y:50,label:"KE",color:"#8b5cf6",name:"Lys-Glu"}], legend: "KE=Lys-Glu dipeptide" }',
    'diagramTitle: "TP-2", diagramSubtitle: "Thymic peptide bioregulator" }': ', diagramTitle: "TP-2", diagramSubtitle: "Thymic peptide bioregulator", residues: [{x:20,y:50,label:"TP",color:"#8b5cf6",name:"TP-2"}], legend: "Thymic peptide bioregulator" }',
    'diagramTitle: "Cardiogen", diagramSubtitle: "Cardiac bioregulator" }': ', diagramTitle: "Cardiogen", diagramSubtitle: "Cardiac bioregulator", residues: [{x:20,y:50,label:"Cg",color:"#8b5cf6",name:"Cardiogen"}], legend: "Cardiac bioregulator" }',
    'diagramTitle: "Mod GRF 1-29", diagramSubtitle: "29-mer . GHRH analogue" }': ', diagramTitle: "Mod GRF 1-29", diagramSubtitle: "29-mer . GHRH analogue", residues: [{x:20,y:50,label:"GRF",color:"#8b5cf6",name:"GRF 1-29"}], legend: "GHRH analogue 1-29" }',
}

for old, new in fixes.items():
    if old in content:
        content = content.replace(old, new)
        print(f"Fixed one")
    else:
        print(f"NOT FOUND: {old[:60]}")

with open(FILE, 'w') as f:
    f.write(content)
print("Done")
