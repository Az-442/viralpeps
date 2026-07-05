#!/usr/bin/env python3
"""Fix supplier product URLs for CMSR Labs, Proforma Peptides, XL Peptides, Chroma Peptides"""
import json, sys

# ============================================================
# REAL URL MAPS (extracted from each supplier's actual website)
# ============================================================

# XL Peptides (xlpeptides.com) — 30 sources, mapping compound slugs to real product URLs
# URL pattern: /product/{slug}/
XL_URLS = {
    "5-amino-1mq": "https://xlpeptides.com/product/5-amino-1mq/",
    "aod-9604": "https://xlpeptides.com/product/aod-9604/",
    "bacteriostatic-water": "https://xlpeptides.com/product/bacteriostatic-water-10ml/",
    "bpc-157": "https://xlpeptides.com/product/bpc-157-5mg/",
    "cjc-1295-no-dac": "https://xlpeptides.com/product/cjc-1295-5mg/",
    "dsip": "https://xlpeptides.com/product/dsip/",
    "epitalon": "https://xlpeptides.com/product/epitalon-10mg/",
    "foxo4-dri": "https://xlpeptides.com/product/foxo4-dri/",
    "ghk-cu": "https://xlpeptides.com/product/ghk-cu-50mg/",
    "ghrp-2": "https://xlpeptides.com/product/ghrp-2/",
    "ghrp-6": "https://xlpeptides.com/product/ghrp-6-10mg/",
    "glow": "https://xlpeptides.com/product/glow-peptide-blend/",
    "hgh-frag-176-191": "https://xlpeptides.com/product/hgh-frag-176-191-5mg/",
    "igf-1-lr3": "https://xlpeptides.com/product/igf-1-lr3-1mg/",
    "ipamorelin": "https://xlpeptides.com/product/ipamorelin/",
    "kpv": "https://xlpeptides.com/product/kpv-10mg/",
    "melanotan-i": "https://xlpeptides.com/product/melanotan-1-10mg/",
    "melanotan-ii": "https://xlpeptides.com/product/melanotan-2-10mg/",
    "mots-c": "https://xlpeptides.com/product/mots-c-10mg/",
    "nad": "https://xlpeptides.com/product/nad-500mg/",
    "oxytocin": "https://xlpeptides.com/product/oxytocin-2mg/",
    "pt-141": "https://xlpeptides.com/product/pt-141-10mg/",
    "selank": "https://xlpeptides.com/product/selank-10mg/",
    "semax": "https://xlpeptides.com/product/semax-10mg/",
    "ss-31": "https://xlpeptides.com/product/ss-31-10mg/",
    "tb-500": "https://xlpeptides.com/product/tb-500-5mg/",
    "tesamorelin": "https://xlpeptides.com/product/tesamorelin-5mg/",
    "thymulin": "https://xlpeptides.com/product/thymulin-10mg/",
}

# Chroma Peptides (chromapeptides.co.uk) — 57 sources
CHROMA_URLS = {
    "5-amino-1mq": "https://chromapeptides.co.uk/product/5-amino-1mq/",
    "aod-9604": "https://chromapeptides.co.uk/product/aod-9604/",
    "bacteriostatic-water": "https://chromapeptides.co.uk/product/bacteriostatic-water/",
    "bpc-157": "https://chromapeptides.co.uk/product/bpc-157/",
    "cartalax": "https://chromapeptides.co.uk/product/cartalax/",
    "cjc-1295-dac": "https://chromapeptides.co.uk/product/cjc-1295-dac/",
    "cjc-1295-no-dac": "https://chromapeptides.co.uk/product/cjc-1295-no-dac/",
    "dihexa": "https://chromapeptides.co.uk/product/dihexa/",
    "dmso": "https://chromapeptides.co.uk/product/dmso/",
    "dsip": "https://chromapeptides.co.uk/product/dsip/",
    "epitalon": "https://chromapeptides.co.uk/product/epithalon/",
    "ghk-cu": "https://chromapeptides.co.uk/product/ghk-cu/",
    "ghrp-2": "https://chromapeptides.co.uk/product/ghrp-2-5-mg/",
    "ghrp-6": "https://chromapeptides.co.uk/product/ghrp-6-5-mg/",
    "glutathione": "https://chromapeptides.co.uk/product/glutathione/",
    "hexarelin": "https://chromapeptides.co.uk/product/hexarelin/",
    "hgh-frag-176-191": "https://chromapeptides.co.uk/product/hgh-fragment-176-191/",
    "igf-1-lr3": "https://chromapeptides.co.uk/product/igf-1-lr3/",
    "ipamorelin": "https://chromapeptides.co.uk/product/ipamorelin/",
    "kisspeptin": "https://chromapeptides.co.uk/product/kisspeptin/",
    "kpv": "https://chromapeptides.co.uk/product/kpv/",
    "melanotan-i": "https://chromapeptides.co.uk/product/melanotan-i-mt-1/",
    "melanotan-ii": "https://chromapeptides.co.uk/product/melanotan-2-mt-ii/",
    "mots-c": "https://chromapeptides.co.uk/product/mots-c/",
    "nad": "https://chromapeptides.co.uk/product/nad/",
    "pt-141": "https://chromapeptides.co.uk/product/pt-141-bremelanotide/",
    "selank": "https://chromapeptides.co.uk/product/selank/",
    "semax": "https://chromapeptides.co.uk/product/semax/",
    "sermorelin": "https://chromapeptides.co.uk/product/sermorelin/",
    "slu-pp-332": "https://chromapeptides.co.uk/product/slu-pp-332/",
    "ss-31": "https://chromapeptides.co.uk/product/ss-31/",
    "tb-500": "https://chromapeptides.co.uk/product/tb-500/",
    "tesamorelin": "https://chromapeptides.co.uk/product/tesamorelin/",
    "thymosin-alpha-1": "https://chromapeptides.co.uk/product/thymosin-alpha-1/",
}

# CMSR Labs (cmsrlabs.co)
CMSR_URLS = {
    "bact-water": "https://cmsrlabs.co/product/bacteriostatic-water-10ml/",
    "bacteriostatic-water": "https://cmsrlabs.co/product/bacteriostatic-water-10ml/",
    "cagrilintide": "https://cmsrlabs.co/product/cagrilintide-10mg/",
    "melanotan-ii": "https://cmsrlabs.co/product/melanotan-ii/",
    "pt-141": "https://cmsrlabs.co/product/pt-141-10mg/",
    "retatrutide": "https://cmsrlabs.co/product/retatrutide-10mg/",
    "selank": "https://cmsrlabs.co/product/selank-5mg/",
    "semaglutide": "https://cmsrlabs.co/product/semaglutide-10mg/",
    "semax": "https://cmsrlabs.co/product/semax-5mg/",
    "tesamorelin": "https://cmsrlabs.co/product/tesamorelin-5mg/",
    "tirzepatide": "https://cmsrlabs.co/product/tirzepatide-10mg/",
    "ara-290": "https://cmsrlabs.co/product/ara-290-10mg/",
    "hcg": "https://cmsrlabs.co/product/hcg-10000iu/",
}

# Proforma Peptides (proformapeptides.co.uk)
PROFORMA_URLS = {
    "5-amino-1mq": "https://www.proformapeptides.co.uk/product/5-amino-1-mq-5mg/",
    "aod-9604": "https://www.proformapeptides.co.uk/product/aod9604/",
    "ara-290": "https://www.proformapeptides.co.uk/product/ara-290-10mg/",
    "bpc-157": "https://www.proformapeptides.co.uk/product/bpc-5/",
    "cjc-1295-dac": "https://www.proformapeptides.co.uk/product/cjc-with-dac-5mg/",
    "cjc-1295-no-dac": "https://www.proformapeptides.co.uk/product/cjc-without-dac-10mg/",
    "dsip": "https://www.proformapeptides.co.uk/product/dsip-5mg/",
    "epitalon": "https://www.proformapeptides.co.uk/product/epitalon-10mg/",
    "ghk-cu": "https://www.proformapeptides.co.uk/product/ghk-cu-50mg/",
    "ghrp-2": "https://www.proformapeptides.co.uk/product/ghrp-2-10mg/",
    "glow": "https://www.proformapeptides.co.uk/product/glow-blend-70mg/",
    "igf-1-des": "https://www.proformapeptides.co.uk/product/igf-1-des-1mg/",
    "igf-1-lr3": "https://www.proformapeptides.co.uk/product/igf-1-lr3-10x100mcg/",
    "ipamorelin": "https://www.proformapeptides.co.uk/product/ipamorelin-10mg/",
    "kisspeptin": "https://www.proformapeptides.co.uk/product/kisspeptin-10-10mg/",
    "kpv": "https://www.proformapeptides.co.uk/product/kpv-10mg/",
    "melanotan-ii": "https://www.proformapeptides.co.uk/product/mt2/",
    "mots-c": "https://www.proformapeptides.co.uk/product/mots-10/",
    "nad": "https://www.proformapeptides.co.uk/product/nad-500mg/",
    "nattokinase": "https://www.proformapeptides.co.uk/product/nattokinase-100mg-5000fu/",
    "pt-141": "https://www.proformapeptides.co.uk/product/pt-141-10mg/",
    "selank": "https://www.proformapeptides.co.uk/product/selank-10mg/",
    "semax": "https://www.proformapeptides.co.uk/product/semax-5mg/",
    "sermorelin": "https://www.proformapeptides.co.uk/product/sermorelin/",
    "ss-31": "https://www.proformapeptides.co.uk/product/ss31-10mg-2/",
    "tb-500": "https://www.proformapeptides.co.uk/product/tb500-5mg/",
    "tesamorelin": "https://www.proformapeptides.co.uk/product/tesamorelin-10mg/",
    "thymosin-alpha-1": "https://www.proformapeptides.co.uk/product/thymosin-alpha-1-5mg/",
    "bacteriostatic-water": "https://www.proformapeptides.co.uk/product/bac-water-10ml/",
    "ghrp-6": "https://www.proformapeptides.co.uk/product/ghrp-6/",
}

def update_sources(compounds, vendor_name, url_map):
    """Update source URLs for a given vendor by matching on compound slug"""
    updated = 0
    for compound in compounds:
        slug = compound.get("slug", "")
        if slug in url_map:
            new_url = url_map[slug]
            for s in compound.get("sources", []):
                if s.get("vendor") == vendor_name:
                    if s.get("url") != new_url:
                        s["url"] = new_url
                        updated += 1
    return updated


# Load compounds.json
with open("src/data/compounds.json") as f:
    compounds = json.load(f)

print(f"Loaded {len(compounds)} compounds")

# Update each vendor
vendors_to_update = [
    ("XL Peptides", XL_URLS),
    ("Chroma Peptides", CHROMA_URLS),
    ("CMSR Labs", CMSR_URLS),
    ("Proforma Peptides", PROFORMA_URLS),
]

total = 0
for name, url_map in vendors_to_update:
    count = update_sources(compounds, name, url_map)
    total += count
    print(f"  {name}: {count} URLs updated")

# Save
with open("src/data/compounds.json", "w") as f:
    json.dump(compounds, f, indent=2, ensure_ascii=False)

print(f"\nTotal: {total} URLs updated and saved to compounds.json")
print("Done!")
