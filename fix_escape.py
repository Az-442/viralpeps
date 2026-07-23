#!/usr/bin/env python3
"""Fix all multi-line broken string literals in research-content.ts."""
import re

with open('src/data/research-content.ts', 'r') as f:
    content = f.read()

# Fix Article 5: semaglutide-vs-tirzepatide
# Find the broken multi-line string and collapse it
old = '''      body: "Semaglutide and tirzepatide represent the two most advanced incretin-based therapies available today, but they are far from identical. Semaglutide (marketed as Ozempic for type 2 diabetes and Wegovy for obesity) is a selective GLP-1 receptor agonist developed by Novo Nordisk. Tirzepatide (marketed as Mounjaro for diabetes and Zepbound for obesity) is a first-in-class dual GIP/GLP-1 receptor agonist from Eli Lilly. While both target the GLP-1 pathway — promoting insulin secretion, slowing gastric emptying, and suppressing appetite — the introduction of GIP (glucose-dependent insulinotropic polypeptide) agonism in tirzepatide marks a fundamental mechanistic divergence. This difference has translated into measurable distinctions in efficacy, tolerability, and clinical evidence depth. Both drugs are administered as once-weekly subcutaneous injections and have received FDA approval for type 2 diabetes and chronic weight management, making them the two most prescribed metabolic pharmacotherapies globally. Understanding their differences is critical for researchers, clinicians, and patients navigating an increasingly crowded treatment landscape.
      
[**Compare Semaglutide prices from UK suppliers →**](/compounds/semaglutide)
[**Compare Tirzepatide prices from UK suppliers →**](/compounds/tirzepatide)"'''

new = '''      body: "Semaglutide and tirzepatide represent the two most advanced incretin-based therapies available today, but they are far from identical. Semaglutide (marketed as Ozempic for type 2 diabetes and Wegovy for obesity) is a selective GLP-1 receptor agonist developed by Novo Nordisk. Tirzepatide (marketed as Mounjaro for diabetes and Zepbound for obesity) is a first-in-class dual GIP/GLP-1 receptor agonist from Eli Lilly. While both target the GLP-1 pathway — promoting insulin secretion, slowing gastric emptying, and suppressing appetite — the introduction of GIP (glucose-dependent insulinotropic polypeptide) agonism in tirzepatide marks a fundamental mechanistic divergence. This difference has translated into measurable distinctions in efficacy, tolerability, and clinical evidence depth. Both drugs are administered as once-weekly subcutaneous injections and have received FDA approval for type 2 diabetes and chronic weight management, making them the two most prescribed metabolic pharmacotherapies globally. Understanding their differences is critical for researchers, clinicians, and patients navigating an increasingly crowded treatment landscape.\\n\\n[**Compare Semaglutide prices from UK suppliers →**](/compounds/semaglutide)\\n[**Compare Tirzepatide prices from UK suppliers →**](/compounds/tirzepatide)"'''

if old in content:
    content = content.replace(old, new)
    print("Article 5 fixed")
else:
    print("Article 5: NOT FOUND")
    # Debug: find nearby
    idx = content.find('most advanced incretin-based')
    if idx >= 0:
        # Check what's after the string
        snippet = content[idx:idx+650]
        print(repr(snippet))

with open('src/data/research-content.ts', 'w') as f:
    f.write(content)
print("Done")
