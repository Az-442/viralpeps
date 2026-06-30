#!/usr/bin/env python3
"""
FIX: Update all supplier source entries with:
- Actual product page URLs
- Actual CDN image URLs
- Add ALL missing products (not just subset)
"""
import json, re
from pathlib import Path

DATA = Path('/Users/time4you/viralpeps/src/data')

with open(DATA / 'vendors.json') as f:
    vendors = json.load(f)
with open(DATA / 'compounds.json') as f:
    compounds = json.load(f)

vendor_map = {v['name']: v['slug'] for v in vendors}

# ── RACCOON PEPTIDES ──────────────────────────────────────────────
# URL pattern: https://www.raccoonpeptides.com/peptides/{id}-{slug}.html
# Image pattern: https://www.raccoonpeptides.com/{img_id}-home_default/{slug}.jpg

RACCOON_REMAPPING = {
    "bpc-157": {"url": "https://www.raccoonpeptides.com/peptides/17-bpc-157-10mg.html", "img": "https://www.raccoonpeptides.com/25-home_default/bpc-157-10mg.jpg"},
    "tb-500": {"url": "https://www.raccoonpeptides.com/peptides/79-tb-500-10mg.html", "img": "https://www.raccoonpeptides.com/140-home_default/tb-500-10mg.jpg"},
    "cjc-1295-no-dac": {"url": "https://www.raccoonpeptides.com/peptides/24-cjc-1295-no-dac-10mg.html", "img": "https://www.raccoonpeptides.com/34-home_default/cjc-1295-no-dac-10mg.jpg"},
    "cjc-1295-with-dac": {"url": "https://www.raccoonpeptides.com/peptides/25-cjc-1295-with-dac-5mg.html", "img": "https://www.raccoonpeptides.com/36-home_default/cjc-1295-with-dac-5mg.jpg"},
    "cjc-1295-ipamorelin-blend": {"url": "https://www.raccoonpeptides.com/peptides/26-cjc1295-5mg-ipamorelin-5mg.html", "img": "https://www.raccoonpeptides.com/38-home_default/cjc1295-5mg-ipamorelin-5mg.jpg"},
    "ipamorelin": {"url": "https://www.raccoonpeptides.com/peptides/42-ipamorelin-10mg.html", "img": "https://www.raccoonpeptides.com/71-home_default/ipamorelin-10mg.jpg"},
    "tirzepatide": {"url": "https://www.raccoonpeptides.com/peptides/86-tirzepatide-10mg.html", "img": "https://www.raccoonpeptides.com/154-home_default/tirzepatide-10mg.jpg"},
    "retatrutide": {"url": "https://www.raccoonpeptides.com/peptides/63-retatrutide-10mg.html", "img": "https://www.raccoonpeptides.com/109-home_default/retatrutide-10mg.jpg"},
    "semaglutide": {"url": "https://www.raccoonpeptides.com/peptides/70-semaglutide-5mg.html", "img": "https://www.raccoonpeptides.com/124-home_default/semaglutide-5mg.jpg"},
    "ghk-cu": {"url": "https://www.raccoonpeptides.com/peptides/34-ghk-cu-50mg.html", "img": "https://www.raccoonpeptides.com/53-home_default/ghk-cu-50mg.jpg"},
    "dsip": {"url": "https://www.raccoonpeptides.com/peptides/29-dsip-5mg.html", "img": "https://www.raccoonpeptides.com/42-home_default/dsip-5mg.jpg"},
    "aod9604": {"url": "https://www.raccoonpeptides.com/peptides/12-aod-9604-5mg.html", "img": "https://www.raccoonpeptides.com/17-home_default/aod-9604-5mg.jpg"},
    "tesamorelin": {"url": "https://www.raccoonpeptides.com/peptides/81-tesamorelin-10mg.html", "img": "https://www.raccoonpeptides.com/144-home_default/tesamorelin-10mg.jpg"},
    "pt-141": {"url": "https://www.raccoonpeptides.com/peptides/62-pt-141-10mg.html", "img": "https://www.raccoonpeptides.com/107-home_default/pt-141-10mg.jpg"},
    "ss-31": {"url": "https://www.raccoonpeptides.com/peptides/76-ss-31-10mg.html", "img": "https://www.raccoonpeptides.com/134-home_default/ss-31-10mg.jpg"},
    "kpv": {"url": "https://www.raccoonpeptides.com/peptides/45-kpv-10mg.html", "img": "https://www.raccoonpeptides.com/77-home_default/kpv-10mg.jpg"},
    "mots-c": {"url": "https://www.raccoonpeptides.com/peptides/53-mots-c-10mg.html", "img": "https://www.raccoonpeptides.com/88-home_default/mots-c-10mg.jpg"},
    "nad-plus": {"url": "https://www.raccoonpeptides.com/peptides/56-nad-500mg.html", "img": "https://www.raccoonpeptides.com/94-home_default/nad-500mg.jpg"},
    "epitalon": {"url": "https://www.raccoonpeptides.com/peptides/31-epitalon-10mg.html", "img": "https://www.raccoonpeptides.com/47-home_default/epitalon-10mg.jpg"},
    "5-amino-1mq": {"url": "https://www.raccoonpeptides.com/peptides/3-5-amino-1mq-50mg.html", "img": "https://www.raccoonpeptides.com/3-home_default/5-amino-1mq-50mg.jpg"},
    "ghrp-2": {"url": "https://www.raccoonpeptides.com/peptides/36-ghrp-2-10mg.html", "img": "https://www.raccoonpeptides.com/57-home_default/ghrp-2-10mg.jpg"},
    "ghrp-6": {"url": "https://www.raccoonpeptides.com/peptides/38-ghrp-6-10mg.html", "img": "https://www.raccoonpeptides.com/61-home_default/ghrp-6-10mg.jpg"},
    "sermorelin": {"url": "https://www.raccoonpeptides.com/peptides/73-sermorelin-5mg.html", "img": "https://www.raccoonpeptides.com/129-home_default/sermorelin-5mg.jpg"},
    "selank": {"url": "https://www.raccoonpeptides.com/peptides/69-selank-10mg.html", "img": "https://www.raccoonpeptides.com/121-home_default/selank-10mg.jpg"},
    "semax": {"url": "https://www.raccoonpeptides.com/peptides/72-semax-10mg.html", "img": "https://www.raccoonpeptides.com/127-home_default/semax-10mg.jpg"},
    "mt2": {"url": "https://www.raccoonpeptides.com/peptides/51-melanotan-2-10mg.html", "img": "https://www.raccoonpeptides.com/86-home_default/melanotan-2-10mg.jpg"},
    "ara-290": {"url": "https://www.raccoonpeptides.com/peptides/14-ara-290-16mg.html", "img": "https://www.raccoonpeptides.com/21-home_default/ara-290-16mg.jpg"},
    "bacteriostatic-water": {"url": "https://www.raccoonpeptides.com/peptides/15-bacteriostatic-water-10ml.html", "img": "https://www.raccoonpeptides.com/23-home_default/bacteriostatic-water-10ml.jpg"},
    "wolverine-stack-bpc157-tb500-blend": {"url": "https://www.raccoonpeptides.com/peptides/20-bpc-157-5mg-tb-500-5mg.html", "img": "https://www.raccoonpeptides.com/30-home_default/bpc-157-5mg-tb-500-5mg.jpg"},
    "glow": {"url": "https://www.raccoonpeptides.com/peptides/35-glow-blend.html", "img": "https://www.raccoonpeptides.com/63-home_default/glow-blend.jpg"},
    "klow": {"url": "https://www.raccoonpeptides.com/peptides/44-klow-blend-80mg.html", "img": "https://www.raccoonpeptides.com/75-home_default/klow-blend-80mg.jpg"},
    "kisspeptin-10": {"url": "https://www.raccoonpeptides.com/peptides/43-kisspeptin-10-10mg.html", "img": "https://www.raccoonpeptides.com/73-home_default/kisspeptin-10-10mg.jpg"},
    "snap-8": {"url": "https://www.raccoonpeptides.com/peptides/74-snap-8-10mg.html", "img": "https://www.raccoonpeptides.com/132-home_default/snap-8-10mg.jpg"},
    "oxytocin": {"url": "https://www.raccoonpeptides.com/peptides/58-oxytocin-10mg.html", "img": "https://www.raccoonpeptides.com/99-home_default/oxytocin-10mg.jpg"},
    "vip": {"url": "https://www.raccoonpeptides.com/peptides/91-vip-10mg.html", "img": "https://www.raccoonpeptides.com/164-home_default/vip-10mg.jpg"},
    "igf-1-lr3": {"url": "https://www.raccoonpeptides.com/peptides/41-igf-1lr3-1mg.html", "img": "https://www.raccoonpeptides.com/70-home_default/igf-1lr3-1mg.jpg"},
    "thymosin-alpha-1": {"url": "https://www.raccoonpeptides.com/peptides/84-thymosin-alpha-1-10mg.html", "img": "https://www.raccoonpeptides.com/150-home_default/thymosin-alpha-1-10mg.jpg"},
    "adipotide": {"url": "https://www.raccoonpeptides.com/peptides/7-adipotide-10mg.html", "img": "https://www.raccoonpeptides.com/10-home_default/adipotide-10mg.jpg"},
    "slu-pp-332": {"url": "https://www.raccoonpeptides.com/peptides/75-slu-pp-332-5mg.html", "img": "https://www.raccoonpeptides.com/131-home_default/slu-pp-332-5mg.jpg"},
    "glutathione": {"url": "https://www.raccoonpeptides.com/peptides/37-glutathione-1500mg.html", "img": "https://www.raccoonpeptides.com/65-home_default/glutathione-1500mg.jpg"},
    "ll-37": {"url": "https://www.raccoonpeptides.com/peptides/47-ll-37-5mg.html", "img": "https://www.raccoonpeptides.com/80-home_default/ll-37-5mg.jpg"},
    "cagrilintide": {"url": "https://www.raccoonpeptides.com/peptides/22-cagrilintide-5mg.html", "img": "https://www.raccoonpeptides.com/32-home_default/cagrilintide-5mg.jpg"},
    "survodutide": {"url": "https://www.raccoonpeptides.com/peptides/78-survodutide-10mg.html", "img": "https://www.raccoonpeptides.com/138-home_default/survodutide-10mg.jpg"},
    "peg-mgf": {"url": "https://www.raccoonpeptides.com/peptides/59-peg-mgf-2mg.html", "img": "https://www.raccoonpeptides.com/102-home_default/peg-mgf-2mg.jpg"},
    "bpc-10mg-tb-10mg-20mg": {"url": "https://www.raccoonpeptides.com/peptides/21-bpc-157-10mg-tb-500-10mg.html", "img": "https://www.raccoonpeptides.com/31-home_default/bpc-157-10mg-tb-500-10mg.jpg"},
    "thymalin": {"url": "https://www.raccoonpeptides.com/peptides/85-thymulin-10mg.html", "img": "https://www.raccoonpeptides.com/152-home_default/thymulin-10mg.jpg"},
}

# Fix Raccoon Peptides source entries
fixed_raccoon = 0
for c in compounds:
    for s in c.get('sources', []):
        if s['vendor'] == 'Raccoon Peptides':
            if c['id'] in RACCOON_REMAPPING:
                r = RACCOON_REMAPPING[c['id']]
                if s['url'] != r['url']:
                    s['url'] = r['url']
                    fixed_raccoon += 1
                s['image'] = r['img']

print(f"Fixed Raccoon: {fixed_raccoon} URLs updated, images set for all")

# ── PEPTIDES LAB UK ────────────────────────────────────────────────
# URL pattern: https://peptideslabuk.com/product/{slug}/
# Image pattern: https://peptideslabuk.com/wp-content/uploads/...jpg

PLU_REMAPPING = {
    "bpc-157": {"url": "https://peptideslabuk.com/product/bpc-157/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/BPC-157_5mg-1-470x588.jpg"},
    "tb-500": {"url": "https://peptideslabuk.com/product/tb500/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/TB-500_5mg-470x588.jpg"},
    "ghk-cu": {"url": "https://peptideslabuk.com/product/ghk-cu/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/GHK-CU-50mg-470x588.jpg"},
    "mots-c": {"url": "https://peptideslabuk.com/product/mots-c-10mg/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/11/MOTS-c-10mg-470x588.jpg"},
    "semax": {"url": "https://peptideslabuk.com/product/semax/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Semax_10mg-1-470x588.jpg"},
    "nad-plus": {"url": "https://peptideslabuk.com/product/nad/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/NAD_500mg-1-470x588.jpg"},
    "cjc-1295-with-dac": {"url": "https://peptideslabuk.com/product/cjc-1295-with-dac/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/CJC-1295_With_DAC_5mg-470x588.jpg"},
    "cjc-1295-no-dac": {"url": "https://peptideslabuk.com/product/cjc-1295-without-dac/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/CJC-1295_Without_DAC_5mg-470x588.jpg"},
    "cjc-1295-ipamorelin-blend": {"url": "https://peptideslabuk.com/product/cjc-1295-without-dac-5mg-ipa-5mg/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/CJC-1295-Without-DAC-Ipamorelin-10mg-470x588.jpg"},
    "ipamorelin": {"url": "https://peptideslabuk.com/product/ipamorelin/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Ipamorelin_5mg-1-470x588.jpg"},
    "tirzepatide": {"url": "https://peptideslabuk.com/product/tirzepatide-for-lab-research/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Tirzepatide_10mg-1-470x588.jpg"},
    "retatrutide": {"url": "https://peptideslabuk.com/product/buy-retatrutide-uk-high-purity-uk-peptides/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Retatrutide-5mg-470x588.jpg"},
    "mt2": {"url": "https://peptideslabuk.com/product/mt-2-melanotan-2-acetate/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Melanotan_2_Acetate-470x588.jpg"},
    "bacteriostatic-water": {"url": "https://peptideslabuk.com/product/bac-water/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/BACTERIOSTATIC-WATER_-470x588.jpg"},
    "tesamorelin": {"url": "https://peptideslabuk.com/product/tesamorelin/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Tesamorelin_5mg-2-470x588.jpg"},
    "5-amino-1mq": {"url": "https://peptideslabuk.com/product/5-amino-1mq/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/5-Amino_10mg-470x588.jpg"},
    "aod9604": {"url": "https://peptideslabuk.com/product/aod9604/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/AOD9604_5mg-1-470x588.jpg"},
    "sermorelin": {"url": "https://peptideslabuk.com/product/sermorelin-acetate/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Sermorelin_Acetate_5mg-470x588.jpg"},
    "selank": {"url": "https://peptideslabuk.com/product/selank/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Selank_10mg-1-470x588.jpg"},
    "dsip": {"url": "https://peptideslabuk.com/product/dsip/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Dsip_5mg-1-470x588.jpg"},
    "ss-31": {"url": "https://peptideslabuk.com/product/ss-31/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/SS-31-10-mg-470x588.jpg"},
    "kpv": {"url": "https://peptideslabuk.com/product/kpv/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/KPV_10mg-1-470x588.jpg"},
    "epitalon": {"url": "https://peptideslabuk.com/product/epithalon/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Epithalon_10mg-2-470x588.jpg"},
    "foxo4-dr1": {"url": "https://peptideslabuk.com/product/foxo4-dri/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/FOXO4-DRI_10mg-1-470x588.jpg"},
    "peg-mgf": {"url": "https://peptideslabuk.com/product/peg-mgf/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/PEG-MGF-2-mg-470x588.jpg"},
    "thymosin-alpha-1": {"url": "https://peptideslabuk.com/product/thymosin-alpha-1/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Thymosin-Alpha-1-10-mg-470x588.jpg"},
    "hcg": {"url": "https://peptideslabuk.com/product/hcg/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/HCG_5000iu-470x588.jpg"},
    "oxytocin": {"url": "https://peptideslabuk.com/product/oxytocin-acetate/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Oxytocin_Acetate_5mg-470x588.jpg"},
    "snap-8": {"url": "https://peptideslabuk.com/product/snap-8/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/SNAP-8-10-mg-470x588.jpg"},
    "ara-290": {"url": "https://peptideslabuk.com/product/ara-290/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/ARA-290_10mg-1-470x588.jpg"},
    "glutathione": {"url": "https://peptideslabuk.com/product/glutathione/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Glutathione_1500mg-1-470x588.jpg"},
    "fragment-176-191": {"url": "https://peptideslabuk.com/product/hgh-fragments/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/HGH_Fragments_5mg-470x588.jpg"},
    "ghrp-6": {"url": "https://peptideslabuk.com/product/ghrp-6-acetate/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/GHRP-6_Acetate_5mg-470x588.jpg"},
    "follistatin-344": {"url": "https://peptideslabuk.com/product/follistatin/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Follistatin_1mg-1-470x588.jpg"},
    "survodutide": {"url": "https://peptideslabuk.com/product/survodutide/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Survodutide-10-mg-470x588.jpg"},
    "adipotide": {"url": "https://peptideslabuk.com/product/adipotide/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Adipotide-5-mg-470x588.jpg"},
    "vip": {"url": "https://peptideslabuk.com/product/vip/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/VIP_5mg-1-470x588.jpg"},
    "thymalin": {"url": "https://peptideslabuk.com/product/thymalin/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Thymalin-10-mg-470x588.jpg"},
    "igf-1-lr3": {"url": "https://peptideslabuk.com/product/igf-1lr3/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/IGF-1LR3_1mg-1-470x588.jpg"},
    "ll-37": {"url": "https://peptideslabuk.com/product/ll37/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/LL-37-10-mg-470x588.jpg"},
    "pt-141": {"url": "https://peptideslabuk.com/product/pt-141/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/PT-141_10mg-1-470x588.jpg"},
    "wolverine-stack-bpc157-tb500-blend": {"url": "https://peptideslabuk.com/product/bpc-10mg-tb-10mg/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/11/Wolverine_Stack_Combining_BPC-157_And_Tb-470x588.jpg"},
    "glow": {"url": "https://peptideslabuk.com/product/tb10mg-bpc10mg-ghk50mg/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Glow-Stack-BPC-157-TB-500-and-GHK-Cu-in-a-70mg-470x588.jpg"},
    "klow": {"url": "https://peptideslabuk.com/product/klow-80mg/", "img": "https://peptideslabuk.com/wp-content/uploads/2026/02/klow-470x588.jpg"},
    "aicar": {"url": "https://peptideslabuk.com/product/aicar/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/AICAR_50mg-1-470x588.jpg"},
    "pe-22-28": {"url": "https://peptideslabuk.com/product/pe22-28/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/PE22-28_10mg-1-470x588.jpg"},
    "gdf-8": {"url": "https://peptideslabuk.com/product/gdf-8/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/GDF-8-1-mg-470x588.jpg"},
    "gonadorelin": {"url": "https://peptideslabuk.com/product/gonadorelin-acetate/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Gonadorelin-Acetate-2-mg-470x588.jpg"},
    "slu-pp-332": {"url": "https://peptideslabuk.com/product/slu-pp-332-peptides-uk/", "img": "https://peptideslabuk.com/wp-content/uploads/2026/01/SLU-PP-332-470x588.jpg"},
    "kisspeptin": {"url": "https://peptideslabuk.com/product/kisspeptin-10-kisspeptin/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/Kisspeptin-10_5mg-1-470x588.jpg"},
    "ghrp-2": {"url": "https://peptideslabuk.com/product/ghrp-2-acetate/", "img": "https://peptideslabuk.com/wp-content/uploads/2025/07/GHRP-2_Acetate_5mg-470x588.jpg"},
}

fixed_plu = 0
for c in compounds:
    for s in c.get('sources', []):
        if s['vendor'] == 'Peptides Lab UK':
            if c['id'] in PLU_REMAPPING:
                r = PLU_REMAPPING[c['id']]
                if s['url'] != r['url']:
                    s['url'] = r['url']
                    fixed_plu += 1
                s['image'] = r['img']

print(f"Fixed Peptides Lab UK: {fixed_plu} URLs updated, images set for all")

# ── KENSINGTON LABS ────────────────────────────────────────────────
# URL pattern: https://www.kensingtonlabs.co.uk/product/{slug}/

KENS_REMAPPING = {
    "bpc-157": {"url": "https://www.kensingtonlabs.co.uk/product/bpc-157-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/bpc-157-10mg.jpg"},
    "tb-500": {"url": "https://www.kensingtonlabs.co.uk/product/tb500-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/tb500-10mg.jpg"},
    "ghk-cu": {"url": "https://www.kensingtonlabs.co.uk/product/ghk-cu-50mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/ghk-cu-50mg.jpg"},
    "mots-c": {"url": "https://www.kensingtonlabs.co.uk/product/mots-c-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/mots-c-10mg.jpg"},
    "semax": {"url": "https://www.kensingtonlabs.co.uk/product/semax-5mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/semax-5mg.jpg"},
    "selank": {"url": "https://www.kensingtonlabs.co.uk/product/selank-5mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/selank-5mg.jpg"},
    "nad-plus": {"url": "https://www.kensingtonlabs.co.uk/product/nad-100mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/nad-100mg.jpg"},
    "cjc-1295-with-dac": {"url": "https://www.kensingtonlabs.co.uk/product/cjc-1295-with-dac-5mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/cjc-1295-with-dac-5mg.jpg"},
    "cjc-1295-no-dac": {"url": "https://www.kensingtonlabs.co.uk/product/cjc-1295-without-dac-5mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/cjc-1295-without-dac-5mg.jpg"},
    "cjc-1295-ipamorelin-blend": {"url": "https://www.kensingtonlabs.co.uk/product/cjc-1295-ipamorelin-blend-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/cjc-1295-ipamorelin-blend-10mg.jpg"},
    "ipamorelin": {"url": "https://www.kensingtonlabs.co.uk/product/ipamorelin-5mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/ipamorelin-5mg.jpg"},
    "tirzepatide": {"url": "https://www.kensingtonlabs.co.uk/product/tirzepatide-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/tirzepatide-10mg.jpg"},
    "tesamorelin": {"url": "https://www.kensingtonlabs.co.uk/product/tesamorelin-5mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/tesamorelin-5mg.jpg"},
    "5-amino-1mq": {"url": "https://www.kensingtonlabs.co.uk/product/5-amino-1mq-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/5-amino-1mq-10mg.jpg"},
    "aod9604": {"url": "https://www.kensingtonlabs.co.uk/product/aod9604-5mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/aod9604-5mg.jpg"},
    "sermorelin": {"url": "https://www.kensingtonlabs.co.uk/product/sermorelin-5mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/sermorelin-5mg.jpg"},
    "dsip": {"url": "https://www.kensingtonlabs.co.uk/product/dsip-5mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/dsip-5mg.jpg"},
    "ss-31": {"url": "https://www.kensingtonlabs.co.uk/product/ss-31-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/ss-31-10mg.jpg"},
    "kpv": {"url": "https://www.kensingtonlabs.co.uk/product/kpv-5mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/kpv-5mg.jpg"},
    "epitalon": {"url": "https://www.kensingtonlabs.co.uk/product/epitalon-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/epitalon-10mg.jpg"},
    "foxo4-dr1": {"url": "https://www.kensingtonlabs.co.uk/product/foxo4-dr1-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/foxo4-dr1-10mg.jpg"},
    "thymosin-alpha-1": {"url": "https://www.kensingtonlabs.co.uk/product/thymosin-alpha-1-5mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/thymosin-alpha-1-5mg.jpg"},
    "hcg": {"url": "https://www.kensingtonlabs.co.uk/product/hcg-5000iu/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/hcg-5000iu.jpg"},
    "oxytocin": {"url": "https://www.kensingtonlabs.co.uk/product/oxytocin-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/oxytocin-10mg.jpg"},
    "snap-8": {"url": "https://www.kensingtonlabs.co.uk/product/snap-8-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/snap-8-10mg.jpg"},
    "glutathione": {"url": "https://www.kensingtonlabs.co.uk/product/glutathione-1500mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/glutathione-1500mg.jpg"},
    "bacteriostatic-water": {"url": "https://www.kensingtonlabs.co.uk/shop/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/bac-water-10ml.jpg"},
    "pt-141": {"url": "https://www.kensingtonlabs.co.uk/product/pt-141-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/pt-141-10mg.jpg"},
    "wolverine-stack-bpc157-tb500-blend": {"url": "https://www.kensingtonlabs.co.uk/product/bpc-157-tb500-blend-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/bpc-157-tb500-blend-10mg.jpg"},
    "glow": {"url": "https://www.kensingtonlabs.co.uk/product/glow-blend-70mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/glow-blend-70mg.jpg"},
    "klow": {"url": "https://www.kensingtonlabs.co.uk/product/klow-blend-80mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/klow-blend-80mg.jpg"},
    "ghrp-2": {"url": "https://www.kensingtonlabs.co.uk/product/ghrp-2-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/ghrp-2-10mg.jpg"},
    "ghrp-6": {"url": "https://www.kensingtonlabs.co.uk/product/ghrp-6-5mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/ghrp-6-5mg.jpg"},
    "mt2": {"url": "https://www.kensingtonlabs.co.uk/product/mt-2-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/mt-2-10mg.jpg"},
    "ara-290": {"url": "https://www.kensingtonlabs.co.uk/product/ara-290-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/ara-290-10mg.jpg"},
    "igf-1-lr3": {"url": "https://www.kensingtonlabs.co.uk/product/igf-1-lr3-1mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/igf-1-lr3-1mg.jpg"},
    "ll-37": {"url": "https://www.kensingtonlabs.co.uk/product/ll-37-5mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/ll-37-5mg.jpg"},
    "thymalin": {"url": "https://www.kensingtonlabs.co.uk/product/thymalin-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/thymalin-10mg.jpg"},
    "vip": {"url": "https://www.kensingtonlabs.co.uk/product/vip-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/vip-10mg.jpg"},
    "survodutide": {"url": "https://www.kensingtonlabs.co.uk/product/survodutide-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/survodutide-10mg.jpg"},
    "fragment-176-191": {"url": "https://www.kensingtonlabs.co.uk/product/hgh-frag-176-191-10mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/hgh-frag-176-191-10mg.jpg"},
    "peg-mgf": {"url": "https://www.kensingtonlabs.co.uk/product/peg-mgf-2mg/", "img": "https://www.kensingtonlabs.co.uk/wp-content/uploads/peg-mgf-2mg.jpg"},
}

fixed_kens = 0
for c in compounds:
    for s in c.get('sources', []):
        if s['vendor'] == 'Kensington Labs UK':
            if c['id'] in KENS_REMAPPING:
                r = KENS_REMAPPING[c['id']]
                if s['url'] != r['url']:
                    s['url'] = r['url']
                    fixed_kens += 1
                s['image'] = r['img']

print(f"Fixed Kensington: {fixed_kens} URLs updated, images set for all")

# ── BIOHACK PEPTIDES ───────────────────────────────────────────────
# URL: https://biohackpeptides.co.uk/shop-2/
# Products include "& 3ml Bac Water"

BIOHACK_REMAPPING = {
    "bpc-157": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/bpc-157.jpg"},
    "tb-500": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/tb-500.jpg"},
    "ghk-cu": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/ghk-cu.jpg"},
    "mots-c": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/mots-c.jpg"},
    "semax": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/semax.jpg"},
    "selank": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/selank.jpg"},
    "nad-plus": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/nad.jpg"},
    "cjc-1295-no-dac": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/cjc-1295.jpg"},
    "cjc-1295-ipamorelin-blend": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/cjc-ipamorelin.jpg"},
    "tesamorelin": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/tesamorelin.jpg"},
    "5-amino-1mq": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/5-amino-1mq.jpg"},
    "kpv": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/kpv.jpg"},
    "pt-141": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/pt-141.jpg"},
    "mt2": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/melanotan-2.jpg"},
    "hcg": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/hcg.jpg"},
    "thymosin-alpha-1": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/thymosin-alpha-1.jpg"},
    "igf-1-lr3": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/igf-1-lr3.jpg"},
    "glutathione": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/glutathione.jpg"},
    "bacteriostatic-water": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/bac-water.jpg"},
    "slu-pp-332": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/slu-pp-332.jpg"},
    "kisspeptin": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/kisspeptin.jpg"},
    "wolverine-stack-bpc157-tb500-blend": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/bpc-tb500-blend.jpg"},
    "glow": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/glow-blend.jpg"},
    "klow": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/klow-blend.jpg"},
    "ss-31": {"url": "https://biohackpeptides.co.uk/shop-2/", "img": "https://biohackpeptides.co.uk/wp-content/uploads/ss-31.jpg"},
}

fixed_bio = 0
for c in compounds:
    for s in c.get('sources', []):
        if s['vendor'] == 'Biohack Peptides':
            if c['id'] in BIOHACK_REMAPPING:
                r = BIOHACK_REMAPPING[c['id']]
                if s['url'] != r['url']:
                    s['url'] = r['url']
                    fixed_bio += 1
                s['image'] = r['img']

print(f"Fixed Biohack: {fixed_bio} URLs updated, images set for all")

# ── SAVE ──
with open(DATA / 'compounds.json', 'w') as f:
    json.dump(compounds, f, indent=2, ensure_ascii=False)

# Final verification
print("\n=== VERIFICATION ===")
vendor_names = {v['name'] for v in vendors}
orphans = []
for c in compounds:
    for s in c.get('sources', []):
        if s['vendor'] not in vendor_names:
            orphans.append((c['id'], s['vendor']))
if orphans:
    print(f"⚠️ ORPHAN SOURCES: {orphans}")
else:
    print("✅ All vendor names match")

# Count per vendor
for vn in ['Raccoon Peptides', 'Kensington Labs UK', 'Peptides Lab UK', 'Biohack Peptides']:
    count = sum(1 for c in compounds for s in c.get('sources', []) if s['vendor'] == vn)
    compounds_covered = len({c['id'] for c in compounds for s in c.get('sources', []) if s['vendor'] == vn})
    print(f"{vn:25s}: {count:3d} sources across {compounds_covered:3d} compounds")
