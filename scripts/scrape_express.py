#!/usr/bin/env python3
"""
Scrape Express Peptides catalog - extract product images and build compound entries.
"""

import requests
import json
import re
import os
import time
import sys
from urllib.parse import urljoin

BASE_URL = "https://www.expresspeptides.co.uk"
IMAGE_DIR = "/Users/time4you/viralpeps/public/images/products/express-peptides"
MASTER_COMPOUNDS_PATH = "/Users/time4you/viralpeps/src/data/compounds.json"

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
    "Accept-Language": "en-GB,en;q=0.9",
}

# ============================================================
# PRODUCT DEFINITIONS
# ============================================================
PRODUCTS = [
    # (compound-slug, type, price, product-name, category, compareSlug, description, form)
    
    # ADIPOTIDE
    ("adipotide", "vial", "£45.00", "Adipotide", "research-compounds", "adipotide-ftpp-5mg-1", 
     "Adipotide (FTPP) is a pro-apoptotic peptide that selectively targets blood vessels supplying adipose tissue, inducing programmed cell death in the endothelial cells of fat tissue vasculature.", "Lyophilised powder"),
    ("adipotide", "pen", "£79.00", "Adipotide Pre-mixed Pen", "research-compounds", "adipotide-ftpp-5mg-1",
     "Adipotide (FTPP) is a pro-apoptotic peptide that selectively targets blood vessels supplying adipose tissue.", "Pre-mixed pen"),
    
    # AHK-CU
    ("ahk-cu", "pen", "£59.00", "AHK-Cu Pre-mixed Pen", "cosmetic-peptides", "ahk-cu",
     "AHK-Cu is a copper peptide complex known for its skin regenerative and anti-aging properties, promoting collagen synthesis and wound healing.", "Pre-mixed pen"),
    
    # AOD 9604
    ("aod-9604", "vial", "£50.00", "AOD 9604", "aod-fragments", "aod-9604",
     "AOD 9604 is a modified fragment of Human Growth Hormone (hGH 177-191) that stimulates fat metabolism and lipolysis without affecting blood sugar or growth.", "Lyophilised powder"),
    ("aod-9604", "pen", "£80.00", "AOD 9604 Pre-mixed Pen", "aod-fragments", "aod-9604",
     "AOD 9604 is a modified fragment of Human Growth Hormone (hGH 177-191) that stimulates fat metabolism.", "Pre-mixed pen"),
    
    # ARA-290
    ("ara-290", "pen", "£55.00", "ARA-290 Pre-mixed Pen", "research-compounds", "ara-290",
     "ARA-290 is a non-hematopoietic peptide derived from erythropoietin (EPO) with neuroprotective, anti-inflammatory and tissue-protective properties.", "Pre-mixed pen"),
    
    # BACTERIOSTATIC WATER
    ("bacteriostatic-water", "vial", "£7.50", "Bacteriostatic Water", "supplies", "bacteriostatic-water",
     "Sterile bacteriostatic water for injection, containing 0.9% benzyl alcohol, used for reconstituting lyophilised peptide powders.", "Sterile solution"),
    
    # BPC-157
    ("bpc-157", "vial", "£17.00", "BPC-157", "thymosin-bpc", "bpc-157",
     "BPC-157 (Body Protection Compound 157) is a synthetic peptide derived from a protein found in human gastric juice, known for its regenerative and healing properties.", "Lyophilised powder"),
    ("bpc-157", "pen", "£37.00", "BPC-157 Pre-mixed Pen", "thymosin-bpc", "bpc-157",
     "BPC-157 (Body Protection Compound 157) is a synthetic peptide known for its regenerative and healing properties.", "Pre-mixed pen"),
    
    # BPC-157 + TB-500 (Wolverine)
    ("bpc-157-tb-500", "vial", "£38.00", "BPC-157 + TB-500 (Wolverine)", "peptide-blends", "bpc-157-tb-500-blend",
     "The Wolverine stack combines BPC-157 and TB-500, two powerful regenerative peptides that work synergistically for enhanced tissue repair and recovery.", "Lyophilised powder"),
    ("bpc-157-tb-500", "pen", "£54.99", "BPC-157 + TB-500 (Wolverine) Pre-mixed Pen", "peptide-blends", "bpc-157-tb-500-blend",
     "The Wolverine stack combines BPC-157 and TB-500 for enhanced tissue repair and recovery.", "Pre-mixed pen"),
    
    # CARTALAX
    ("cartalax", "pen", "£45.00", "Cartalax Pre-mixed Pen", "cosmetic-peptides", "cartalax",
     "Cartalax is a peptide complex designed to support joint and cartilage health through its regenerative properties.", "Pre-mixed pen"),
    
    # CJC-1295 No DAC
    ("cjc-1295", "vial", "£14.00", "CJC-1295 (No DAC)", "growth-factors", "cjc-1295",
     "CJC-1295 (No DAC) is a growth hormone-releasing hormone (GHRH) analog that stimulates the production and release of growth hormone from the pituitary gland.", "Lyophilised powder"),
    ("cjc-1295", "pen", "£39.00", "CJC-1295 (No DAC) Pre-mixed Pen", "growth-factors", "cjc-1295",
     "CJC-1295 (No DAC) is a GHRH analog that stimulates growth hormone release.", "Pre-mixed pen"),
    
    # CJC-1295 With DAC
    ("cjc-1295-with-dac", "vial", "£25.00", "CJC-1295 (With DAC)", "growth-factors", "cjc-1295",
     "CJC-1295 (With DAC) is a long-acting GHRH analog with a Drug Affinity Complex (DAC) that extends its half-life for sustained growth hormone release.", "Lyophilised powder"),
    ("cjc-1295-with-dac", "pen", "£45.00", "CJC-1295 (With DAC) Pre-mixed Pen", "growth-factors", "cjc-1295",
     "CJC-1295 (With DAC) is a long-acting GHRH analog with extended half-life for sustained GH release.", "Pre-mixed pen"),
    
    # DSIP
    ("dsip", "vial", "£17.99", "DSIP (Delta Sleep-Inducing Peptide)", "research-compounds", "dsip",
     "DSIP (Delta Sleep-Inducing Peptide) is a natural nonapeptide that promotes delta-wave sleep and helps regulate the sleep-wake cycle.", "Lyophilised powder"),
    ("dsip", "pen", "£38.00", "DSIP (Delta Sleep-Inducing Peptide) Pre-mixed Pen", "research-compounds", "dsip",
     "DSIP (Delta Sleep-Inducing Peptide) promotes delta-wave sleep and helps regulate sleep-wake cycles.", "Pre-mixed pen"),
    
    # EPITHALON
    ("epithalon", "vial", "£25.00", "Epithalon", "research-compounds", "epitalon",
     "Epithalon (Epitalon) is a synthetic tetrapeptide that activates telomerase and regulates pineal gland function, associated with anti-aging research.", "Lyophilised powder"),
    ("epithalon", "pen", "£45.00", "Epithalon Pre-mixed Pen", "research-compounds", "epitalon",
     "Epithalon (Epitalon) activates telomerase and regulates pineal gland function for anti-aging research.", "Pre-mixed pen"),
    
    # FOLLISTATIN 344
    ("follistatin-344", "vial", "£80.00", "Follistatin 344", "growth-factors", "follistatin-344",
     "Follistatin 344 is a protein that binds to and neutralizes activin, promoting muscle growth and inhibiting myostatin.", "Lyophilised powder"),
    ("follistatin-344", "pen", "£100.00", "Follistatin 344 Pre-mixed Pen", "growth-factors", "follistatin-344",
     "Follistatin 344 binds to and neutralizes activin, promoting muscle growth by inhibiting myostatin.", "Pre-mixed pen"),
    
    # GHK-Cu
    ("ghk-cu", "vial", "£26.00", "GHK-Cu", "cosmetic-peptides", "ghk-cu",
     "GHK-Cu is a naturally occurring copper peptide complex that promotes collagen synthesis, wound healing, and skin regeneration.", "Lyophilised powder"),
    ("ghk-cu", "pen", "£49.00", "GHK-Cu Pre-mixed Pen", "cosmetic-peptides", "ghk-cu",
     "GHK-Cu is a naturally occurring copper peptide that promotes collagen synthesis and skin regeneration.", "Pre-mixed pen"),
    
    # GHRP-2
    ("ghrp-2", "vial", "£16.00", "GHRP-2", "ghrp", "ghrp-2",
     "GHRP-2 (Growth Hormone Releasing Peptide-2) is a synthetic hexapeptide that stimulates growth hormone release from the pituitary gland.", "Lyophilised powder"),
    ("ghrp-2", "pen", "£36.00", "GHRP-2 Pre-mixed Pen", "ghrp", "ghrp-2",
     "GHRP-2 stimulates growth hormone release from the pituitary gland.", "Pre-mixed pen"),
    
    # GHRP-6
    ("ghrp-6", "vial", "£16.00", "GHRP-6", "ghrp", "ghrp-6",
     "GHRP-6 (Growth Hormone Releasing Peptide-6) is a synthetic hexapeptide that stimulates growth hormone secretion and increases appetite.", "Lyophilised powder"),
    ("ghrp-6", "pen", "£36.00", "GHRP-6 Pre-mixed Pen", "ghrp", "ghrp-6",
     "GHRP-6 stimulates growth hormone secretion and increases appetite.", "Pre-mixed pen"),
    
    # GLOW COMBO
    ("glow-combo", "pen", "£75.00", "GLOW Combo Pre-mixed Pen", "peptide-blends", "glow",
     "GLOW Combo is a synergistic blend of GHK-Cu, BPC-157, and TB-500 designed for skin health, regeneration, and anti-aging research.", "Pre-mixed pen"),
    
    # HEXARELIN
    ("hexarelin-acetate", "vial", "£24.99", "Hexarelin", "ghrp", "hexarelin",
     "Hexarelin is a synthetic hexapeptide growth hormone secretagogue that strongly stimulates GH release from the pituitary gland.", "Lyophilised powder"),
    ("hexarelin-acetate", "pen", "£44.99", "Hexarelin Pre-mixed Pen", "ghrp", "hexarelin",
     "Hexarelin is a potent growth hormone secretagogue that stimulates GH release.", "Pre-mixed pen"),
    
    # FRAGMENT 176-191
    ("fragment-176-191", "vial", "£29.00", "Fragment 176-191", "aod-fragments", "fragment-176-191",
     "Fragment 176-191 (HGH 176-191) is a C-terminal fragment of human growth hormone that stimulates lipolysis and fat metabolism.", "Lyophilised powder"),
    ("fragment-176-191", "pen", "£59.00", "Fragment 176-191 Pre-mixed Pen", "aod-fragments", "fragment-176-191",
     "Fragment 176-191 is a C-terminal fragment of HGH that stimulates lipolysis and fat metabolism.", "Pre-mixed pen"),
    
    # IGF-1 DES
    ("igf1-des", "vial", "£44.99", "IGF-1 DES", "growth-factors", "igf-1-lr3",
     "IGF-1 DES is a truncated form of IGF-1 (Insulin-like Growth Factor-1) with enhanced potency and reduced binding to IGF binding proteins.", "Lyophilised powder"),
    ("igf1-des", "pen", "£64.00", "IGF-1 DES Pre-mixed Pen", "growth-factors", "igf-1-lr3",
     "IGF-1 DES is a truncated form of IGF-1 with enhanced potency for muscle growth research.", "Pre-mixed pen"),
    
    # IGF-1 LR3
    ("igf1-lr3", "vial", "£50.00", "IGF-1 LR3", "growth-factors", "igf-1-lr3",
     "IGF-1 LR3 is a long-acting analog of Insulin-like Growth Factor-1 with reduced affinity for IGF binding proteins, providing prolonged biological activity.", "Lyophilised powder"),
    ("igf1-lr3", "pen", "£69.00", "IGF-1 LR3 Pre-mixed Pen", "growth-factors", "igf-1-lr3",
     "IGF-1 LR3 is a long-acting IGF-1 analog with prolonged biological activity.", "Pre-mixed pen"),
    
    # IPAMORELIN
    ("ipamorelin", "vial", "£26.00", "Ipamorelin", "ghrp", "ipamorelin",
     "Ipamorelin is a pentapeptide growth hormone secretagogue that selectively stimulates GH release without significantly affecting cortisol or prolactin.", "Lyophilised powder"),
    ("ipamorelin", "pen", "£46.00", "Ipamorelin Pre-mixed Pen", "ghrp", "ipamorelin",
     "Ipamorelin selectively stimulates GH release without significantly affecting cortisol or prolactin.", "Pre-mixed pen"),
    
    # IPAMORELIN/CJC NO DAC COMBO
    ("ipamorelin-cjc-combo", "pen", "£65.00", "Ipamorelin/CJC-1295 No DAC Combo Pre-mixed Pen", "peptide-blends", "cjc-1295-ipamorelin-blend",
     "Synergistic blend of Ipamorelin and CJC-1295 (No DAC) for enhanced growth hormone release research.", "Pre-mixed pen"),
    
    # IPAMORELIN/CJC DAC COMBO
    ("ipamorelin-cjc-combo-dac", "pen", "£65.00", "Ipamorelin/CJC-1295 With DAC Combo Pre-mixed Pen", "peptide-blends", "cjc-1295-ipamorelin-blend",
     "Synergistic blend of Ipamorelin and CJC-1295 (With DAC) for prolonged growth hormone release research.", "Pre-mixed pen"),
    
    # IPAMORELIN/TESAMORELIN COMBO
    ("ipamorelin-tesamorelin", "pen", "£85.00", "Ipamorelin/Tesamorelin Combo Pre-mixed Pen", "peptide-blends", "ipamorelin",
     "Synergistic blend of Ipamorelin and Tesamorelin for enhanced growth hormone secretagogue research.", "Pre-mixed pen"),
    
    # KISSPEPTIN
    ("kisspeptin", "pen", "£44.00", "Kisspeptin-10 Pre-mixed Pen", "research-compounds", "kisspeptin-10",
     "Kisspeptin-10 is the active fragment of the KiSS-1 gene product, a key regulator of the reproductive axis and GnRH secretion.", "Pre-mixed pen"),
    
    # KLOW COMBO
    ("klow-combo", "pen", "£84.00", "KLOW Combo Pre-mixed Pen", "peptide-blends", "klow",
     "KLOW is a specialized peptide blend designed for skin lightening and complexion optimization research.", "Pre-mixed pen"),
    
    # KPV
    ("kpv", "pen", "£43.00", "KPV Pre-mixed Pen", "research-compounds", "kpv",
     "KPV (Lys-Pro-Val) is a tripeptide with potent anti-inflammatory properties, particularly studied for gut health and inflammatory bowel conditions.", "Pre-mixed pen"),
    
    # L-CARNITINE
    ("l-carnitine", "vial", "£29.99", "L-Carnitine", "nad-metabolic", "l-carnitine",
     "L-Carnitine is an amino acid derivative that plays a crucial role in energy metabolism by transporting fatty acids into mitochondria for oxidation.", "Sterile solution"),
    
    # L-GLUTATHIONE
    ("l-glutathione", "pen", "£43.00", "L-Glutathione Pre-mixed Pen", "cosmetic-peptides", "glutathione",
     "L-Glutathione is a powerful antioxidant tripeptide composed of glutamate, cysteine, and glycine, essential for cellular detoxification.", "Pre-mixed pen"),
    
    # MGF
    ("mgf", "vial", "£32.00", "MGF (Mechano Growth Factor)", "growth-factors", "mgf",
     "MGF (Mechano Growth Factor) is a splice variant of IGF-1 that is expressed in response to mechanical stress and muscle damage.", "Lyophilised powder"),
    ("mgf", "pen", "£52.00", "MGF (Mechano Growth Factor) Pre-mixed Pen", "growth-factors", "mgf",
     "MGF is a splice variant of IGF-1 expressed in response to mechanical stress and muscle damage.", "Pre-mixed pen"),
    
    # MOTS-C
    ("mots-c", "vial", "£22.00", "MOTS-c", "peptide-fragments", "mots-c",
     "MOTS-c is a mitochondrial-derived peptide that regulates metabolic homeostasis, insulin sensitivity, and energy expenditure.", "Lyophilised powder"),
    ("mots-c", "pen", "£46.00", "MOTS-c Pre-mixed Pen", "peptide-fragments", "mots-c",
     "MOTS-c is a mitochondrial-derived peptide that regulates metabolic homeostasis and energy expenditure.", "Pre-mixed pen"),
    
    # NAD+
    ("nad", "vial", "£135.00", "NAD+", "nad-metabolic", "nad-plus",
     "NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme central to cellular metabolism, energy production, and DNA repair processes.", "Lyophilised powder"),
    ("nad", "pen", "£165.00", "NAD+ Pre-mixed Pen 500mg", "nad-metabolic", "nad-plus",
     "NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme central to cellular metabolism and energy production.", "Pre-mixed pen"),
    ("nad", "pen/1000", "£240.00", "NAD+ Pre-mixed Pen 1000mg", "nad-metabolic", "nad-plus",
     "NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme central to cellular metabolism and energy production.", "Pre-mixed pen"),
    ("nad", "pen/5", "£495.00", "NAD+ Pre-mixed 5×500mg Pack", "nad-metabolic", "nad-plus",
     "NAD+ (Nicotinamide Adenine Dinucleotide) is a coenzyme central to cellular metabolism. Discount multi-pack for bulk research.", "Pre-mixed pen"),
    
    # NAD+/5-Amino-1MQ/MOTS-C COMBO
    ("nad-amino-mots-combo", "pen", "£125.00", "NAD+/5-Amino-1MQ/MOTS-c Combo Pre-mixed Pen", "peptide-blends", "nad-plus",
     "Metabolic support blend combining NAD+, 5-Amino-1MQ, and MOTS-c for comprehensive metabolic research.", "Pre-mixed pen"),
    
    # NEEDLE TIPS
    ("needle-tip", "30", "N/A", "Needle Tips (30G)", "supplies", None,
     "Sterile 30G needle tips suitable for peptide reconstitution and research applications.", "Medical supplies"),
    
    # 5-AMINO-1MQ
    ("5-amino-1mq", "vial", "£60.00", "5-Amino-1MQ", "research-compounds", "5-amino-1mq",
     "5-Amino-1MQ is a small molecule that inhibits NNMT (Nicotinamide N-Methyltransferase), promoting cellular metabolism and energy expenditure.", "Lyophilised powder"),
    ("5-amino-1mq", "pen", "£75.00", "5-Amino-1MQ Pre-mixed Pen", "research-compounds", "5-amino-1mq",
     "5-Amino-1MQ inhibits NNMT, promoting cellular metabolism and energy expenditure.", "Pre-mixed pen"),
    
    # OXYTOCIN
    ("oxytocin", "vial", "£35.00", "Oxytocin", "research-compounds", "oxytocin",
     "Oxytocin is a peptide hormone and neuropeptide that plays roles in social bonding, reproduction, and various behavioral processes.", "Lyophilised powder"),
    ("oxytocin", "pen", "£45.00", "Oxytocin Pre-mixed Pen", "research-compounds", "oxytocin",
     "Oxytocin is a peptide hormone involved in social bonding, reproduction, and behavioral research.", "Pre-mixed pen"),
    
    # PEG-MGF
    ("peg-mgf", "vial", "£32.00", "PEG-MGF", "growth-factors", "peg-mgf-5mg-1",
     "PEG-MGF is a PEGylated form of Mechano Growth Factor with improved stability and half-life for enhanced muscle growth research.", "Lyophilised powder"),
    ("peg-mgf", "pen", "£52.00", "PEG-MGF Pre-mixed Pen", "growth-factors", "peg-mgf-5mg-1",
     "PEG-MGF is a PEGylated form of Mechano Growth Factor with improved stability.", "Pre-mixed pen"),
    
    # PT-141
    ("pt-141", "vial", "£24.99", "PT-141 (Bremelanotide)", "melanotans", "pt-141-bremelanotide",
     "PT-141 (Bremelanotide) is a synthetic cyclic heptapeptide melanocortin receptor agonist that modulates sexual response.", "Lyophilised powder"),
    ("pt-141", "pen", "£54.00", "PT-141 (Bremelanotide) Pre-mixed Pen", "melanotans", "pt-141-bremelanotide",
     "PT-141 (Bremelanotide) is a melanocortin receptor agonist that modulates sexual response.", "Pre-mixed pen"),
    
    # SELANK
    ("selank", "vial", "£27.99", "Selank", "cognitive", "selank",
     "Selank is a synthetic heptapeptide with anxiolytic and cognitive-enhancing properties, modulating the immune and nervous systems.", "Lyophilised powder"),
    ("selank", "pen", "£45.00", "Selank Pre-mixed Pen", "cognitive", "selank",
     "Selank is a synthetic heptapeptide with anxiolytic and cognitive-enhancing properties.", "Pre-mixed pen"),
    
    # SEMAX
    ("semax", "vial", "£24.00", "Semax", "cognitive", "semax",
     "Semax is a synthetic heptapeptide analog of ACTH fragment 4-10 with nootropic and neuroprotective properties.", "Lyophilised powder"),
    ("semax", "pen", "£45.00", "Semax Pre-mixed Pen", "cognitive", "semax",
     "Semax is a synthetic heptapeptide with nootropic and neuroprotective properties.", "Pre-mixed pen"),
    
    # SERMORELIN
    ("sermorelin-acetate", "vial", "£26.99", "Sermorelin", "ghrp", "sermorelin",
     "Sermorelin is a synthetic analog of growth hormone-releasing hormone (GHRH 1-29) that stimulates the production and release of growth hormone.", "Lyophilised powder"),
    ("sermorelin-acetate", "pen", "£46.00", "Sermorelin Pre-mixed Pen", "ghrp", "sermorelin",
     "Sermorelin is a GHRH analog that stimulates growth hormone production and release.", "Pre-mixed pen"),
    
    # SLU-PP-332
    ("slu-pp-332", "vial", "£45.00", "SLU-PP-332", "research-compounds", "slu-pp-332",
     "SLU-PP-332 is a selective estrogen-related receptor alpha (ERRα) agonist that enhances mitochondrial function and energy metabolism.", "Lyophilised powder"),
    ("slu-pp-332", "pen", "N/A", "SLU-PP-332 Pre-mixed Pen", "research-compounds", "slu-pp-332",
     "SLU-PP-332 is an ERRα agonist that enhances mitochondrial function and energy metabolism.", "Pre-mixed pen"),
    
    # SS-31
    ("ss-31", "vial", "£49.00", "SS-31 (Elamipretide)", "peptide-fragments", "ss-31",
     "SS-31 (Elamipretide) is a mitochondrial-targeted peptide that stabilizes cardiolipin and improves mitochondrial function and energy production.", "Lyophilised powder"),
    ("ss-31", "pen", "£58.00", "SS-31 (Elamipretide) Pre-mixed Pen", "peptide-fragments", "ss-31",
     "SS-31 is a mitochondrial-targeted peptide that improves mitochondrial function.", "Pre-mixed pen"),
    
    # TB-500
    ("tb-500", "vial", "£32.00", "TB-500 (Thymosin Beta-4)", "tb-500", "tb-500",
     "TB-500 (Thymosin Beta-4) is a synthetic actin-sequestering peptide that promotes cell migration, angiogenesis, and tissue repair.", "Lyophilised powder"),
    ("tb500", "pen", "£52.00", "TB-500 (Thymosin Beta-4) Pre-mixed Pen", "tb-500", "tb-500",
     "TB-500 (Thymosin Beta-4) is a synthetic peptide that promotes cell migration, angiogenesis, and tissue repair.", "Pre-mixed pen"),
    
    # TESAMORELIN
    ("tesamorelin", "vial", "£26.00", "Tesamorelin", "ghrp", "tesamorelin",
     "Tesamorelin is a synthetic analog of growth hormone-releasing hormone (GHRH) that stimulates growth hormone secretion and reduces visceral fat.", "Lyophilised powder"),
    ("tesamorelin", "pen", "£46.00", "Tesamorelin Pre-mixed Pen", "ghrp", "tesamorelin",
     "Tesamorelin is a GHRH analog that stimulates growth hormone secretion.", "Pre-mixed pen"),
    
    # THYMOSIN ALPHA-1
    ("thymosin-alpha-1", "vial", "£30.00", "Thymosin Alpha-1", "research-compounds", "thymosin-alpha-1",
     "Thymosin Alpha-1 is a synthetic peptide that modulates immune system function and enhances T-cell-mediated immunity.", "Lyophilised powder"),
    ("thymosin-alpha-1", "pen", "£50.00", "Thymosin Alpha-1 Pre-mixed Pen", "research-compounds", "thymosin-alpha-1",
     "Thymosin Alpha-1 modulates immune system function and enhances T-cell-mediated immunity.", "Pre-mixed pen"),
    
    # VIP
    ("vip", "pen", "£45.00", "VIP (Vasoactive Intestinal Peptide) Pre-mixed Pen", "research-compounds", "vip",
     "VIP (Vasoactive Intestinal Peptide) is a neuropeptide with vasodilatory, anti-inflammatory, and immunomodulatory properties.", "Pre-mixed pen"),
]


def fetch_image_url(slug, ptype):
    """Fetch product page HTML and extract image URL from figure tag."""
    if ptype == "30":
        # Needle tips - no product image needed, use generic
        return None
    url = f"{BASE_URL}/product/{slug}/{ptype}"
    try:
        resp = requests.get(url, headers=HEADERS, timeout=15)
        resp.raise_for_status()
        html = resp.text
        
        # Find image URL - use webp format (the actual delivered format)
        # Pattern from picture element's source tags
        match = re.search(
            r'<source\s+[^>]*media="\(min-width:\s*800px\)"[^>]*' +
            r'srcset="(/asset/image/product/\d+/product-[\w-]+-large\.webp)"',
            html
        )
        if match:
            return urljoin(BASE_URL, match.group(1))
        
        # Try data-lightbox-open-src as fallback
        match = re.search(
            r'data-lightbox-open-src="(/asset/image/product/\d+/product-[\w-]+-large\.webp)"',
            html
        )
        if match:
            return urljoin(BASE_URL, match.group(1))
        
        # Try source srcset without media attribute
        match = re.search(
            r'<source[^>]+srcset="(/asset/image/product/\d+/product-[\w-]+-large\.webp)"',
            html
        )
        if match:
            return urljoin(BASE_URL, match.group(1))
            
        print(f"  WARNING: No image found for {url}")
        return None
    except Exception as e:
        print(f"  ERROR fetching {url}: {e}")
        return None


def download_image(image_url, dest_path):
    """Download image using requests and save as webp."""
    if image_url is None:
        return False
    try:
        resp = requests.get(image_url, headers=HEADERS, timeout=30, stream=True)
        resp.raise_for_status()
        
        with open(dest_path, 'wb') as f:
            for chunk in resp.iter_content(chunk_size=8192):
                f.write(chunk)
        return True
    except Exception as e:
        print(f"  ERROR downloading {image_url}: {e}")
        return False


def build_entry(slug, ptype, price, name, category, compare_slug, description, form, image_path):
    """Build a JSON entry for a product."""
    variant = "vial" if ptype == "vial" else \
              "pen" if ptype == "pen" else \
              "pen-1000" if ptype == "pen/1000" else \
              "pen-5pack" if ptype == "pen/5" else \
              f"pen-{ptype}" if ptype == "30" else ptype
    
    entry_id = f"{slug}-{variant}-express"
    entry_slug = entry_id
    
    # Build product page URL
    if ptype in ("vial", "pen"):
        page_url = f"{BASE_URL}/product/{slug}/{ptype}"
    elif ptype == "30":
        page_url = f"{BASE_URL}/product/{slug}/{ptype}"
    else:
        page_url = f"{BASE_URL}/product/{slug}/{ptype}"
    
    source_entry = {
        "vendor": "Express Peptides",
        "url": page_url,
        "price": price,
        "inStock": True,
    }
    
    # Local image path
    img_rel = f"/images/products/express-peptides/{entry_slug}.webp"
    source_entry["image"] = img_rel
    
    return {
        "id": entry_id,
        "name": name,
        "slug": entry_slug,
        "aliases": [],
        "category": category,
        "description": description,
        "mechanism": "N/A",
        "cas": "N/A",
        "molarMass": "N/A",
        "sequence": "N/A",
        "purity": "≥99%",
        "form": form,
        "halfLife": "N/A",
        "researchAreas": ["General research"],
        "commonDosages": [],
        "sources": [source_entry],
        "faq": [],
        "compareSlug": compare_slug,
    }


def main():
    os.makedirs(IMAGE_DIR, exist_ok=True)
    
    entries = []
    errors = []
    
    print(f"Processing {len(PRODUCTS)} products...")
    print("=" * 60)
    
    for i, (slug, ptype, price, name, category, compare_slug, description, form) in enumerate(PRODUCTS, 1):
        variant = "vial" if ptype == "vial" else \
                  "pen" if ptype == "pen" else \
                  "pen-1000" if ptype == "pen/1000" else \
                  "pen-5pack" if ptype == "pen/5" else \
                  f"pen-{ptype}" if ptype == "30" else ptype
        entry_id = f"{slug}-{variant}-express"
        
        print(f"[{i}/{len(PRODUCTS)}] {name} ({ptype})...")
        
        # Fetch image URL
        image_url = fetch_image_url(slug, ptype)
        
        # Download image
        dest_path = os.path.join(IMAGE_DIR, f"{entry_id}.webp")
        if image_url:
            print(f"  Image URL: {image_url}")
            success = download_image(image_url, dest_path)
            if success:
                print(f"  Downloaded: {dest_path}")
            else:
                print(f"  FAILED download")
                errors.append(f"Download failed: {entry_id}")
        else:
            print(f"  No image URL found, skipping download")
        
        # Build entry
        entry = build_entry(slug, ptype, price, name, category, compare_slug, description, form, dest_path)
        entries.append(entry)
        
        # Be polite
        if i < len(PRODUCTS):
            time.sleep(0.3)
    
    print("=" * 60)
    print(f"\nDone! {len(entries)} entries created, {len(errors)} errors.")
    
    # Write output JSON
    output_path = "/Users/time4you/viralpeps/src/data/express-peptides-entries.json"
    with open(output_path, 'w') as f:
        json.dump(entries, f, indent=2)
    print(f"Entries written to: {output_path}")
    
    if errors:
        print(f"\nErrors ({len(errors)}):")
        for e in errors:
            print(f"  - {e}")


if __name__ == "__main__":
    main()
