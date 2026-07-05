#!/usr/bin/env python3
"""Map XL Peptides and Chroma Peptides products to existing compounds and add sources."""
import json

with open('src/data/compounds.json') as f:
    compounds = json.load(f)

# Build a lookup from compound ID
compound_map = {c['id']: c for c in compounds}

def add_source(compound_id, vendor_name, url, price, in_stock, image, dosage=None):
    """Add a source to a compound if it doesn't already exist."""
    if compound_id not in compound_map:
        print(f"⚠️ Compound '{compound_id}' not found - skipping")
        return False
    
    compound = compound_map[compound_id]
    # Check if this vendor already has a source for this compound
    for s in compound.get('sources', []):
        if s.get('vendor') == vendor_name and s.get('url') == url:
            print(f"  ⏭️ Already exists: {vendor_name} → {compound_id}")
            return False
    
    source = {
        "vendor": vendor_name,
        "url": url,
        "price": price,
        "inStock": in_stock,
        "image": image
    }
    if dosage:
        source["dosage"] = dosage
    
    if 'sources' not in compound:
        compound['sources'] = []
    compound['sources'].append(source)
    print(f"  ✅ Added: {vendor_name} → {compound_id} ({price})")
    return True

###############
# XL PEPTIDES #
###############

xl_name = "XL Peptides"
xl_base = "https://xlpeptides.com"

xl_products = [
    # (compound_id, url, price, in_stock, image, dosage)
    ("aod9604", f"{xl_base}/product/aod-9604-5mg/", "£24.99", True, "/images/products/xl-peptides/aod-9604-5mg.webp", "5mg"),
    ("bpc-157", f"{xl_base}/product/bpc-157-5mg/", "£13.99", True, "/images/products/xl-peptides/bpc-157-5mg.webp", "5mg"),
    ("cjc-1295-no-dac", f"{xl_base}/product/cjc-1295-no-dac-5mg/", "£18.99", True, "/images/products/xl-peptides/cjc-1295-no-dac-5mg.webp", "5mg"),
    ("dsip", f"{xl_base}/product/dsip-10mg/", "£17.49", True, "/images/products/xl-peptides/dsip-10mg.webp", "10mg"),
    ("epitalon", f"{xl_base}/product/epitalon-10mg/", "£14.99", True, "/images/products/xl-peptides/epitalon-10mg.webp", "10mg"),
    ("ghk-cu", f"{xl_base}/product/ghk-cu-50mg/", "£17.99", True, "/images/products/xl-peptides/ghk-cu-50mg.webp", "50mg"),
    ("ghrp-6", f"{xl_base}/product/ghrp-6-10mg/", "£12.99", True, "/images/products/xl-peptides/ghrp-6-10mg.webp", "10mg"),
    ("fragment-176-191", f"{xl_base}/product/hgh-frag-176-191-5mg/", "£19.99", True, "/images/products/xl-peptides/hgh-frag-176-191-5mg.webp", "5mg"),
    ("igf-1-lr3", f"{xl_base}/product/igf-1-lr3-1mg/", "£34.99", True, "/images/products/xl-peptides/igf-1-lr3-1mg.webp", "1mg"),
    ("ipamorelin", f"{xl_base}/product/ipamorelin-5mg/", "£15.99", True, "/images/products/xl-peptides/ipamorelin-5mg.webp", "5mg"),
    ("kpv", f"{xl_base}/product/kpv-10mg/", "£24.49", True, "/images/products/xl-peptides/kpv-10mg.webp", "10mg"),
    ("mots-c", f"{xl_base}/product/mots-c-10mg/", "£23.99", True, "/images/products/xl-peptides/mots-c-10mg.webp", "10mg"),
    ("mt2", f"{xl_base}/product/mt-2-10mg/", "£18.99", True, "/images/products/xl-peptides/mt-2-10mg.webp", "10mg"),
    ("nad-plus", f"{xl_base}/product/nad-500mg/", "£44.95", True, "/images/products/xl-peptides/nad-500mg.webp", "500mg"),
    ("oxytocin", f"{xl_base}/product/oxytocin-2mg/", "£10.99", True, "/images/products/xl-peptides/oxytocin-2mg.webp", "2mg"),
    ("pt-141", f"{xl_base}/product/pt-141-10mg/", "£16.99", True, "/images/products/xl-peptides/pt-141-10mg.webp", "10mg"),
    ("selank", f"{xl_base}/product/selank-10mg/", "£7.50", True, "/images/products/xl-peptides/selank-10mg.webp", "10mg"),
    ("semax", f"{xl_base}/product/semax-10mg/", "£7.50", True, "/images/products/xl-peptides/semax-10mg.webp", "10mg"),
    ("ss-31", f"{xl_base}/product/ss-31-10mg/", "£26.99", True, "/images/products/xl-peptides/ss-31-10mg.webp", "10mg"),
    ("tb-500", f"{xl_base}/product/tb-500-5mg/", "£18.99", True, "/images/products/xl-peptides/tb-500-5mg.webp", "5mg"),
    ("tesamorelin", f"{xl_base}/product/tesamorelin-5mg/", "£27.99", True, "/images/products/xl-peptides/tesamorelin-5mg.webp", "5mg"),
    ("sermorelin", f"{xl_base}/product/sermorelin-5mg/", "£24.99", True, "/images/products/xl-peptides/sermorelin-5mg.webp", "5mg"),
    ("glow", f"{xl_base}/product/glow-peptide-blend-5-vial-bundle/", "£69.99", True, "/images/products/xl-peptides/glow-blend.webp", "Blend"),
    ("klow", f"{xl_base}/product/klow-peptide-blend-6-vial-bundle/", "£89.99", True, "/images/products/xl-peptides/klow-blend.webp", "Blend"),
    ("cjc-1295-ipamorelin-blend", f"{xl_base}/product/ipamorelin-cjc-1295-no-dac-bundle/", "£29.99", True, "/images/products/xl-peptides/ipam-cjc-blend.webp", "Blend"),
    ("wolverine-stack-bpc157-tb500-blend", f"{xl_base}/product/wolverine-stack-bpc-157-tb-500-bundle/", "£29.99", True, "/images/products/xl-peptides/wolverine-stack.webp", "Blend"),
    ("bacteriostatic-water", f"{xl_base}/product/bacteriostatic-water-10ml/", "£8.50", True, "/images/products/xl-peptides/bacteriostatic-water.webp", "10ml"),
    ("mt-1-melanotan-1-acetate-10mg", f"{xl_base}/product/mt-1-10mg/", "£19.99", True, "/images/products/xl-peptides/mt-1-10mg.webp", "10mg"),
    ("foxo4-dr1", f"{xl_base}/product/foxo4-dri-10mg/", "£69.99", True, "/images/products/xl-peptides/foxo4-dri-10mg.webp", "10mg"),
    ("ghrp-2", f"{xl_base}/product/ghrp-2-5mg/", "£11.99", True, "/images/products/xl-peptides/ghrp-2-5mg.webp", "5mg"),
]

for cid, url, price, stock, img, dosage in xl_products:
    add_source(cid, xl_name, url, price, stock, img, dosage)

###################
# CHROMA PEPTIDES #
###################

chroma_name = "Chroma Peptides"
chroma_base = "https://chromapeptides.co.uk"

chroma_products = [
    # (compound_id, url, price, in_stock, image, dosage)
    ("5-amino-1mq", f"{chroma_base}/product/5-amino-1mq/", "£24.45", True, "/images/products/chroma-peptides/5-amino-1mq.webp", "10mg"),
    ("aod9604", f"{chroma_base}/product/aod-9604/", "£35.27", False, "/images/products/chroma-peptides/aod-9604.webp", "5mg"),
    ("bpc-157", f"{chroma_base}/product/bpc-157/", "£29.49", True, "/images/products/chroma-peptides/bpc-157.webp", "10mg"),
    ("bpc-157", f"{chroma_base}/product/bpc-157/", "£18.33", True, "/images/products/chroma-peptides/bpc-157.webp", "5mg"),
    ("cjc-1295-no-dac", f"{chroma_base}/product/cjc-1295-no-dac/", "£45.50", True, "/images/products/chroma-peptides/cjc-1295-no-dac.webp", "10mg"),
    ("cjc-1295-no-dac", f"{chroma_base}/product/cjc-1295-no-dac/", "£22.27", True, "/images/products/chroma-peptides/cjc-1295-no-dac.webp", "5mg"),
    ("cjc-1295-with-dac", f"{chroma_base}/product/cjc-1295-dac/", "£42.57", True, "/images/products/chroma-peptides/cjc-1295-dac.webp", "5mg"),
    ("dsip", f"{chroma_base}/product/dsip/", "£40.09", True, "/images/products/chroma-peptides/dsip.webp", "10mg"),
    ("dsip", f"{chroma_base}/product/dsip/", "£22.27", True, "/images/products/chroma-peptides/dsip.webp", "5mg"),
    ("epitalon", f"{chroma_base}/product/epithalon/", "£19.75", True, "/images/products/chroma-peptides/epithalon.webp", "5mg"),
    ("epitalon", f"{chroma_base}/product/epithalon/", "£88.88", True, "/images/products/chroma-peptides/epithalon.webp", "Bulk"),
    ("ghk-cu", f"{chroma_base}/product/ghk-cu/", "£41.61", True, "/images/products/chroma-peptides/ghk-cu.webp", "100mg"),
    ("ghk-cu", f"{chroma_base}/product/ghk-cu/", "£24.15", True, "/images/products/chroma-peptides/ghk-cu.webp", "50mg"),
    ("ghrp-2", f"{chroma_base}/product/ghrp-2/", "£40.02", False, "/images/products/chroma-peptides/ghrp-2.webp", "10mg"),
    ("ghrp-2", f"{chroma_base}/product/ghrp-2/", "£22.25", False, "/images/products/chroma-peptides/ghrp-2.webp", "5mg"),
    ("ghrp-6", f"{chroma_base}/product/ghrp-6/", "£39.65", True, "/images/products/chroma-peptides/ghrp-6.webp", "10mg"),
    ("ghrp-6", f"{chroma_base}/product/ghrp-6/", "£22.03", True, "/images/products/chroma-peptides/ghrp-6.webp", "5mg"),
    ("glutathione", f"{chroma_base}/product/glutathione/", "£37.80", True, "/images/products/chroma-peptides/glutathione.webp", "500mg"),
    ("hexarelin", f"{chroma_base}/product/hexarelin/", "£19.75", True, "/images/products/chroma-peptides/hexarelin.webp", "5mg"),
    ("fragment-176-191", f"{chroma_base}/product/hgh-fragment-176-191/", "£28.25", True, "/images/products/chroma-peptides/hgh-fragment-176-191.webp", "5mg"),
    ("igf-1-lr3", f"{chroma_base}/product/igf-1-lr3/", "£43.37", True, "/images/products/chroma-peptides/igf-1-lr3.webp", "1mg"),
    ("ipamorelin", f"{chroma_base}/product/ipamorelin/", "£38.22", True, "/images/products/chroma-peptides/ipamorelin.webp", "10mg"),
    ("ipamorelin", f"{chroma_base}/product/ipamorelin/", "£20.27", True, "/images/products/chroma-peptides/ipamorelin.webp", "5mg"),
    ("kisspeptin-10", f"{chroma_base}/product/kisspeptin/", "£26.75", True, "/images/products/chroma-peptides/kisspeptin.webp", "5mg"),
    ("kpv", f"{chroma_base}/product/kpv/", "£35.45", True, "/images/products/chroma-peptides/kpv.webp", "10mg"),
    ("mt2", f"{chroma_base}/product/melanotan-2-mt-ii/", "£24.45", False, "/images/products/chroma-peptides/melanotan-2.webp", "10mg"),
    ("mt-1-melanotan-1-acetate-10mg", f"{chroma_base}/product/melanotan-i-mt-1/", "£18.99", True, "/images/products/chroma-peptides/melanotan-1.webp", "10mg"),
    ("mots-c", f"{chroma_base}/product/mots-c/", "£80.25", True, "/images/products/chroma-peptides/mots-c.webp", "10mg"),
    ("mots-c", f"{chroma_base}/product/mots-c/", "£22.25", True, "/images/products/chroma-peptides/mots-c.webp", "5mg"),
    ("nad-plus", f"{chroma_base}/product/nad/", "£178.15", True, "/images/products/chroma-peptides/nad.webp", "1000mg"),
    ("nad-plus", f"{chroma_base}/product/nad/", "£98.95", True, "/images/products/chroma-peptides/nad.webp", "500mg"),
    ("pt-141", f"{chroma_base}/product/pt-141-bremelanotide/", "£28.85", True, "/images/products/chroma-peptides/pt-141.webp", "10mg"),
    ("selank", f"{chroma_base}/product/selank/", "£33.93", True, "/images/products/chroma-peptides/selank.webp", "10mg"),
    ("selank", f"{chroma_base}/product/selank/", "£18.85", True, "/images/products/chroma-peptides/selank.webp", "5mg"),
    ("semax", f"{chroma_base}/product/semax/", "£40.95", True, "/images/products/chroma-peptides/semax.webp", "10mg"),
    ("semax", f"{chroma_base}/product/semax/", "£22.75", True, "/images/products/chroma-peptides/semax.webp", "5mg"),
    ("sermorelin", f"{chroma_base}/product/sermorelin/", "£51.93", True, "/images/products/chroma-peptides/sermorelin.webp", "10mg"),
    ("sermorelin", f"{chroma_base}/product/sermorelin/", "£28.85", True, "/images/products/chroma-peptides/sermorelin.webp", "5mg"),
    ("ss-31", f"{chroma_base}/product/ss-31/", "£30.38", True, "/images/products/chroma-peptides/ss-31.webp", "10mg"),
    ("ss-31", f"{chroma_base}/product/ss-31-50mg/", "£121.17", True, "/images/products/chroma-peptides/ss-31-50mg.webp", "50mg"),
    ("tb-500", f"{chroma_base}/product/tb-500/", "£41.13", False, "/images/products/chroma-peptides/tb-500.webp", "10mg"),
    ("tb-500", f"{chroma_base}/product/tb-500/", "£27.55", False, "/images/products/chroma-peptides/tb-500.webp", "5mg"),
    ("tesamorelin", f"{chroma_base}/product/tesamorelin/", "£72.95", True, "/images/products/chroma-peptides/tesamorelin.webp", "10mg"),
    ("tesamorelin", f"{chroma_base}/product/tesamorelin/", "£28.85", True, "/images/products/chroma-peptides/tesamorelin.webp", "5mg"),
    ("thymosin-alpha-1", f"{chroma_base}/product/thymosin-alpha-1/", "£54.49", False, "/images/products/chroma-peptides/thymosin-alpha-1.webp", "10mg"),
    ("thymosin-alpha-1", f"{chroma_base}/product/thymosin-alpha-1/", "£30.25", False, "/images/products/chroma-peptides/thymosin-alpha-1.webp", "5mg"),
    ("slu-pp-332", f"{chroma_base}/product/slu-pp-332/", "£52.25", True, "/images/products/chroma-peptides/slu-pp-332.webp", "5mg"),
    ("glow", f"{chroma_base}/product/glow-blend/", "£77.02", True, "/images/products/chroma-peptides/glow-blend.webp", "Blend"),
    ("klow", f"{chroma_base}/product/klow-blend/", "£86.43", True, "/images/products/chroma-peptides/klow-blend.webp", "Blend"),
    ("cjc-1295-ipamorelin-blend", f"{chroma_base}/product/ipamorelin-cjc-1295-no-dac-combo/", "£74.38", True, "/images/products/chroma-peptides/ipam-cjc-combo.webp", "Blend"),
    ("cjc-1295-ipamorelin-blend", f"{chroma_base}/product/ipamorelin-cjc-1295-no-dac-combo/", "£40.91", True, "/images/products/chroma-peptides/ipam-cjc-combo.webp", "Combo"),
    ("bacteriostatic-water", f"{chroma_base}/product/bacteriostatic-water/", "£8.50", True, "/images/products/chroma-peptides/bacteriostatic-water.webp", "10ml"),
    ("bacteriostatic-water", f"{chroma_base}/product/bacteriostatic-water/", "£4.99", True, "/images/products/chroma-peptides/bacteriostatic-water.webp", "5ml"),
    ("cartalax", f"{chroma_base}/product/cartalax/", "£37.58", True, "/images/products/chroma-peptides/cartalax.webp", "20mg"),
    ("dihexa", f"{chroma_base}/product/dihexa/", "£47.13", True, "/images/products/chroma-peptides/dihexa.webp", "10mg"),
    ("snap-8", f"{chroma_base}/product/snap-8/", "£34.99", True, "/images/products/chroma-peptides/snap-8.webp", "Serum"),
    ("acetic-acid-reconstitution-solvent-10ml", f"{chroma_base}/product/acetic-acid-06/", "£8.50", False, "/images/products/chroma-peptides/acetic-acid.webp", "10ml"),
]

for cid, url, price, stock, img, dosage in chroma_products:
    add_source(cid, chroma_name, url, price, stock, img, dosage)

# Write back
with open('src/data/compounds.json', 'w') as f:
    json.dump(compounds, f, indent=2, ensure_ascii=False)

print("\n✅ compounds.json updated!")
print(f"Total compounds processed: {len(compounds)}")
