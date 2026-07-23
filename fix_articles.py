#!/usr/bin/env python3
"""Fix the escape sequences in the research articles."""

with open('src/data/research-content.ts', 'r') as f:
    content = f.read()

# Fix Article 1: cjc1295-vs-tesamorelin
old1 = '''      "body": "CJC-1295 and Tesamorelin are both growth-hormone-releasing hormone (GHRH) analogues that bind the GHRH receptor on anterior pituitary somatotroph cells to stimulate growth hormone (GH) synthesis and release. Despite converging on the same receptor, they represent fundamentally different design philosophies — one engineered for extreme half-life extension via albumin binding, the other stabilised for once-daily dosing and backed by FDA registration. This comparison unpacks their structural differences, pharmacokinetic profiles, clinical evidence bases, and practical utility so researchers can make an informed choice for their specific experimental context.
      
[**Compare CJC-1295 prices from UK suppliers \u2192**](/compounds/cjc-1295)
[**Compare Tesamorelin prices from UK suppliers \u2192**](/compounds/tesamorelin)"'''

new1 = '''      "body": "CJC-1295 and Tesamorelin are both growth-hormone-releasing hormone (GHRH) analogues that bind the GHRH receptor on anterior pituitary somatotroph cells to stimulate growth hormone (GH) synthesis and release. Despite converging on the same receptor, they represent fundamentally different design philosophies — one engineered for extreme half-life extension via albumin binding, the other stabilised for once-daily dosing and backed by FDA registration. This comparison unpacks their structural differences, pharmacokinetic profiles, clinical evidence bases, and practical utility so researchers can make an informed choice for their specific experimental context.\\n\\n[**Compare CJC-1295 prices from UK suppliers \u2192**](/compounds/cjc-1295)\\n[**Compare Tesamorelin prices from UK suppliers \u2192**](/compounds/tesamorelin)"'''

if old1 in content:
    content = content.replace(old1, new1)
    print("Article 1 fixed")
else:
    print("Article 1: NOT FOUND")

# Fix Article 4: retatrutide-vs-semaglutide
old4 = '''      body: "Retatrutide (LY3437943) and semaglutide represent two distinct generations of incretin-based therapies for obesity and metabolic disease. Semaglutide, developed by Novo Nordisk and marketed as Ozempic and Wegovy, is a selective GLP-1 receptor agonist that has become the standard-bearer for modern weight-loss pharmacotherapy. It is backed by the landmark STEP clinical programme and the SELECT cardiovascular outcomes trial, which demonstrated a 20% reduction in major adverse cardiovascular events (MACE). Retatrutide, developed by Eli Lilly, is a first-in-class triple agonist targeting the GLP-1, GIP, and glucagon receptors. In Phase 2 trials reported in the New England Journal of Medicine (Jastreboff et al., 2023), retatrutide produced mean weight reductions of up to 24.2% at 48 weeks — substantially higher than semaglutide's ~14.9% at 68 weeks in STEP 1. However, retatrutide remains investigational and lacks the long-term safety and cardiovascular outcome data that define semaglutide's clinical profile. This article provides a detailed, evidence-based comparison of these two compounds across mechanism, efficacy, safety, and practical considerations for UK patients and practitioners.

[**Compare Semaglutide prices from UK suppliers \u2192**](/compounds/semaglutide)
[**Compare Retatrutide prices from UK suppliers \u2192**](/compounds/retatrutide)"'''

new4 = '''      body: "Retatrutide (LY3437943) and semaglutide represent two distinct generations of incretin-based therapies for obesity and metabolic disease. Semaglutide, developed by Novo Nordisk and marketed as Ozempic and Wegovy, is a selective GLP-1 receptor agonist that has become the standard-bearer for modern weight-loss pharmacotherapy. It is backed by the landmark STEP clinical programme and the SELECT cardiovascular outcomes trial, which demonstrated a 20% reduction in major adverse cardiovascular events (MACE). Retatrutide, developed by Eli Lilly, is a first-in-class triple agonist targeting the GLP-1, GIP, and glucagon receptors. In Phase 2 trials reported in the New England Journal of Medicine (Jastreboff et al., 2023), retatrutide produced mean weight reductions of up to 24.2% at 48 weeks — substantially higher than semaglutide's ~14.9% at 68 weeks in STEP 1. However, retatrutide remains investigational and lacks the long-term safety and cardiovascular outcome data that define semaglutide's clinical profile. This article provides a detailed, evidence-based comparison of these two compounds across mechanism, efficacy, safety, and practical considerations for UK patients and practitioners.\\n\\n[**Compare Semaglutide prices from UK suppliers \u2192**](/compounds/semaglutide)\\n[**Compare Retatrutide prices from UK suppliers \u2192**](/compounds/retatrutide)"'''

if old4 in content:
    content = content.replace(old4, new4)
    print("Article 4 fixed")
else:
    print("Article 4: NOT FOUND")
    idx = content.find('Retatrutide (LY3437943)')
    if idx >= 0:
        print(f"  Found at index {idx}")
        print(f"  Context: {repr(content[idx:idx+800])}")

with open('src/data/research-content.ts', 'w') as f:
    f.write(content)

print("Done")
