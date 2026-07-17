"""Update Octagon Peptides image fields in compounds.json"""
import json

with open('src/data/compounds.json') as f:
    compounds = json.load(f)

# Map compound slug -> image filename
IMAGE_MAP = {
    "bpc-157": "bpc-157.png",
    "tb-500": "tb-500.png",
    "aod-9604": "aod-9604.png",
    "cjc-1295": "cjc-1295.png",
    "cjc-1295-no-dac": "cjc-1295-no-dac.png",
    "ghk-cu": "ghk-cu.png",
    "igf-1-lr3": "igf-1-lr3.png",
    "tesamorelin": "tesamorelin.png",
    "mots-c": "mots-c.png",
    "ss-31": "ss-31.png",
    "kpv": "kpv.png",
    "epitalon": "epitalon.png",
    "semax": "semax.png",
    "selank": "selank.png",
    "hexarelin": "hexarelin.png",
    "ipamorelin": "ipamorelin.png",
    "pt-141-bremelanotide": "pt-141-bremelanotide.png",
    "kisspeptin-10": "kisspeptin-10.png",
    "dsip": "dsip.png",
    "oxytocin": "oxytocin.png",
    "peg-mgf": "peg-mgf.png",
    "melanotan-ii": "melanotan-ii.png",
    "5-amino-1mq": "5-amino-1mq.png",
}

updated = 0
for comp in compounds:
    slug = comp.get("slug", "")
    if slug in IMAGE_MAP:
        img_path = f"/images/products/octagon-peptides/{IMAGE_MAP[slug]}"
        for s in comp.get("sources", []):
            if s.get("vendor") == "Octagon Peptides":
                s["image"] = img_path
                updated += 1

with open('src/data/compounds.json', 'w') as f:
    json.dump(compounds, f, indent=2)

print(f"Updated {updated} source entries")
