#!/usr/bin/env python3
"""Generate efficient tab content for one compound and add it to compound-tabs.tsx."""

import json, sys, os, re, subprocess
from pathlib import Path

PROJECT = Path("/Users/time4you/viralpeps")
TABS_FILE = PROJECT / "src/data/compound-tabs.tsx"

def get_existing_slugs():
    with open(TABS_FILE) as f:
        content = f.read()
    return set(re.findall(r"slug['\"\s:=]+['\"]([^'\"]+)['\"]", content))

def add_compound_tabs(slug, name, content_block):
    """Append a compound entry to the tabs file, inserting before the export line."""
    with open(TABS_FILE) as f:
        content = f.read()
    
    # Insert before `export default compoundTabs;`
    marker = "export default compoundTabs;"
    new_entry = f"\n  '{slug}': {content_block},\n"
    
    if marker in content:
        content = content.replace(marker, new_entry + marker)
    else:
        # Fallback: append before last line
        lines = content.strip().split('\n')
        if lines:
            lines.insert(-1, new_entry)
            content = '\n'.join(lines)
    
    with open(TABS_FILE, 'w') as f:
        f.write(content)

def run(cmd):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, timeout=60)
    return result.stdout.strip()

# Compounds remaining to process, with their research-friendly name
COMPOUNDS = [
    ("5-amino-1mq", "5-Amino-1MQ (MN-001)"),
    ("ace-031", "ACE-031"),
    ("acth-1-39", "ACTH 1-39 (Adrenocorticotropic Hormone)"),
    ("adamax", "Adamax (Semax Amidate)"),
    ("adipotide", "Adipotide (FTPP)"),
    ("ahk-cu", "AHK-Cu Copper Peptide"),
    ("aicar", "AICAR (Acadesine)"),
    ("aod-9604", "AOD-9604"),
    ("ara-290", "ARA-290 (Erythropoietin Fragment)"),
    ("b7-33", "B7-33 (Relaxin Analogue)"),
    ("bronchogen", "Bronchogen"),
    ("cartalax", "Cartalax"),
    ("cerebrolysin", "Cerebrolysin"),
    ("chonliten", "Chonliten"),
    ("cjc-1295", "CJC-1295 (with DAC)"),
    ("cjc-1295-with-dac", "CJC-1295 with DAC"),
    ("cortagen", "Cortagen"),
    ("dermorphin", "Dermorphin"),
    ("dihexa", "Dihexa"),
    ("dsip", "DSIP (Delta Sleep-Inducing Peptide)"),
    ("epitalon", "Epitalon"),
    ("fgl", "FGL Peptide"),
    ("follistatin", "Follistatin 344"),
    ("foxo4-dr1", "FOXO4-DR1"),
    ("fragment-176-191", "HGH Fragment 176-191"),
    ("gdf-8", "GDF-8 (Myostatin)"),
    ("ghrh-analog-amide", "GHRH (1-44) Analog Amide"),
    ("glow", "Glow Blend (GHK-Cu/BPC-157/TB-500)"),
    ("gnrh-triptorelin", "GnRH Triptorelin"),
    ("gonadorelin", "Gonadorelin"),
    ("hcg", "HCG (Human Chorionic Gonadotropin)"),
    ("hgh-191aa", "HGH 191AA (Somatropin)"),
    ("hgh-97", "HGH-97"),
    ("igf-1-des", "IGF-1 DES"),
    ("igf-1-lr3", "IGF-1 LR3"),
    ("klow", "KLOW Blend"),
    ("l-carnitine", "L-Carnitine"),
    ("lipo-c", "Lipo-C"),
    ("ll-37", "LL-37 (Cathelicidin)"),
    ("matrixyl-3000", "Matrixyl 3000"),
    ("melatonin", "Melatonin"),
    ("mgf", "MGF (Mechano Growth Factor)"),
    ("mk-677", "MK-677 (Ibutamoren)"),
    ("mt-1", "MT-1 (Melanotan 1)"),
    ("mt-2", "MT-2 (Melanotan 2)"),
    ("myostatin", "Myostatin"),
    ("ovagen", "Ovagen"),
    ("oxytocin", "Oxytocin"),
    ("p21", "P21"),
    ("pal-ghk", "Pal-GHK"),
    ("pancragen", "Pancragen"),
    ("pe-22-28", "PE-22-28"),
    ("peg-mgf", "PEG-MGF"),
    ("phenylpiracetam", "Phenylpiracetam"),
    ("pinealon", "Pinealon"),
    ("pnc-27", "PNC-27"),
    ("pramipexole", "Pramipexole"),
    ("slu-pp-332", "SLU-PP-332"),
    ("snap-8", "SNAP-8 (Acetyl Hexapeptide-8)"),
    ("survodutide", "Survodutide (BI 456906)"),
    ("tesofensine", "Tesofensine"),
    ("testagen", "Testagen"),
    ("thymalin", "Thymalin"),
    ("tp2", "TP-2"),
    ("vesugen", "Vesugen"),
    ("vilon", "Vilon"),
    ("vip", "VIP (Vasoactive Intestinal Peptide)"),
    ("vitamin-b12", "Vitamin B12"),
    ("bpc-157-oral", "BPC-157 (Oral)"),
]

if __name__ == "__main__":
    existing = get_existing_slugs()
    remaining = [(s, n) for s, n in COMPOUNDS if s not in existing]
    print(f"Existing: {len(existing)}, Remaining to process: {len(remaining)}")
    if len(sys.argv) > 1:
        idx = int(sys.argv[1])
        if idx < len(remaining):
            print(f"Next: {remaining[idx][0]} - {remaining[idx][1]}")
        else:
            print("All done!")
            sys.exit(0)
    else:
        print("Pass compound index as argument")
