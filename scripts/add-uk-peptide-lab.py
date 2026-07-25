#!/usr/bin/env python3
"""
Add UK Peptide Lab (ukpeptidelab.co.uk) to ViralPeps directory.
Visits each product page, downloads images, updates data files.
"""
import json
import os
import re
import subprocess
import sys
import urllib.request
import urllib.error
from pathlib import Path

PROJECT_ROOT = Path("/Users/time4you/viralpeps")
VENDOR_SLUG = "uk-peptide-lab"
VENDOR_NAME = "UK Peptide Lab"
VENDOR_WEBSITE = "https://ukpeptidelab.co.uk"
IMAGE_DIR = PROJECT_ROOT / "public" / "images" / "products" / VENDOR_SLUG
VENDOR_LOGO_DIR = PROJECT_ROOT / "public" / "images" / "vendors"

# All products from the shop page
PRODUCTS = [
    # (url_slug, compound_name, dosage, price, category)
    ("retatrutide", "Retatrutide", "10mg", 59.99, "glp-1-agonists"),
    ("retatrutide-20mg", "Retatrutide", "20mg", 99.99, "glp-1-agonists"),
    ("retatrutide-30mg", "Retatrutide", "30mg", 134.99, "glp-1-agonists"),
    ("cagrilintide", "Cagrilintide", "10mg", 74.99, "glp-1-agonists"),
    ("semax", "Semax", "10mg", 24.99, "nootropics"),
    ("ghk-cu", "GHK-Cu", "100mg", 29.99, "peptides"),
    ("ghk-cu-50mg", "GHK-Cu", "50mg", 17.99, "peptides"),
    ("bpc-157", "BPC-157", "5mg", 15.99, "peptides"),
    ("tb-500", "TB-500", "5mg", 23.99, "peptides"),
    ("mots-c", "MOTS-C", "10mg", 24.99, "peptides"),
    ("mots-c-40mg", "MOTS-C", "40mg", 69.99, "peptides"),
    ("nad-plus", "NAD+", "500mg", 49.99, "peptides"),
    ("selank", "Selank", "10mg", 24.99, "nootropics"),
    ("cjc-1295-ipamorelin", "CJC-1295 + Ipamorelin", "5+5mg", 42.99, "growth-hormone"),
    ("glow", "GLOW Stack", "70mg", 67.99, "peptides"),
    ("klow", "KLOW Stack", "80mg", 84.99, "peptides"),
    ("kpv", "KPV", "10mg", 24.99, "peptides"),
    ("igf-1-lr3", "IGF-1 LR3", "1mg", 37.99, "growth-hormone"),
    ("cjc-1295-dac", "CJC-1295 DAC", "5mg", 32.99, "growth-hormone"),
    ("pt-141", "PT-141", "10mg", 19.99, "peptides"),
    ("cjc-1295", "CJC-1295", "5mg", 25.99, "growth-hormone"),
    ("ipamorelin", "Ipamorelin", "5mg", 19.99, "growth-hormone"),
    ("melanotan-i", "Melanotan I", "10mg", 24.99, "peptides"),
    ("tesamorelin", "Tesamorelin", "5mg", 32.99, "growth-hormone"),
    ("dsip", "DSIP", "5mg", 13.99, "peptides"),
    ("glutathione", "Glutathione", "1500mg", 44.99, "peptides"),
    ("bpc-157-tb-500", "BPC-157 + TB-500", "5+5mg", 27.99, "peptides"),
    ("l-carnitine", "L-Carnitine", "600mg", 29.99, "peptides"),
    ("5-amino-1mq", "5-Amino-1MQ", "50mg", 54.99, "peptides"),
    ("kisspeptin-10", "Kisspeptin-10", "10mg", 34.99, "peptides"),
]

def download_image(url, filepath, max_retries=3):
    """Download an image from URL to filepath. Returns True on success."""
    filepath = Path(filepath)
    filepath.parent.mkdir(parents=True, exist_ok=True)
    
    for attempt in range(max_retries):
        try:
            req = urllib.request.Request(url, headers={
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)'
            })
            with urllib.request.urlopen(req, timeout=30) as response:
                data = response.read()
                if len(data) < 100:
                    print(f"  WARNING: Image too small ({len(data)} bytes): {url}")
                    return False
                filepath.write_bytes(data)
                print(f"  Downloaded: {filepath.name} ({len(data)} bytes)")
                return True
        except Exception as e:
            if attempt < max_retries - 1:
                print(f"  Retry {attempt+1}: {e}")
            else:
                print(f"  FAILED: {url} - {e}")
    return False

def get_og_image(slug):
    """Get og:image URL for a product page by fetching via curl."""
    url = f"https://ukpeptidelab.co.uk/product/{slug}"
    # Use web_extract via curl to get the page
    try:
        result = subprocess.run(
            ["curl", "-s", "-L", url],
            capture_output=True, text=True, timeout=30
        )
        html = result.stdout
        # Look for og:image
        match = re.search(r'<meta\s+property="og:image"\s+content="([^"]+)"', html)
        if match:
            return match.group(1)
        # Try alternate pattern
        match = re.search(r'<meta\s+content="([^"]+)"\s+property="og:image"', html)
        if match:
            return match.group(1)
        print(f"  WARNING: No og:image found for {slug}")
        return None
    except Exception as e:
        print(f"  ERROR fetching {slug}: {e}")
        return None

def load_json(path):
    """Load JSON file. Returns empty list/dict if not found."""
    path = Path(path)
    if not path.exists():
        print(f"  File not found: {path}")
        return []
    try:
        with open(path) as f:
            return json.load(f)
    except json.JSONDecodeError as e:
        print(f"  JSON error in {path}: {e}")
        return []

def save_json(path, data):
    """Save JSON data to file with pretty printing."""
    path = Path(path)
    path.parent.mkdir(parents=True, exist_ok=True)
    with open(path, 'w') as f:
        json.dump(data, f, indent=2)
    print(f"  Saved: {path}")

def slugify(text):
    """Convert text to URL-friendly slug."""
    slug = text.lower()
    slug = re.sub(r'[^\w\s-]', '', slug)
    slug = re.sub(r'[\s_]+', '-', slug)
    slug = re.sub(r'-+', '-', slug)
    return slug.strip('-')

def main():
    # Step 1: Download vendor logo (use favicon)
    print("=" * 60)
    print("STEP 1: Download vendor logo")
    print("=" * 60)
    
    VENDOR_LOGO_DIR.mkdir(parents=True, exist_ok=True)
    logo_url = "https://ukpeptidelab.co.uk/favicon.svg?v=20260529"
    logo_path = VENDOR_LOGO_DIR / f"{VENDOR_SLUG}.svg"
    download_image(logo_url, logo_path)
    
    # Also download apple-touch-icon as PNG fallback
    png_logo_url = "https://ukpeptidelab.co.uk/apple-touch-icon.png?v=20260529"
    png_logo_path = VENDOR_LOGO_DIR / f"{VENDOR_SLUG}.png"
    download_image(png_logo_url, png_logo_path)
    
    # Step 2: Download all product images
    print("\n" + "=" * 60)
    print("STEP 2: Download product images")
    print("=" * 60)
    
    IMAGE_DIR.mkdir(parents=True, exist_ok=True)
    
    # Track which og:image URLs we've fetched per unique compound
    compound_images = {}
    
    for slug, compound, dosage, price, category in PRODUCTS:
        img_url = f"https://ukpeptidelab.co.uk/images/{slug}-v20260509.webp"
        
        # Create compound slug for the file name
        compound_slug = slugify(compound)
        img_file = IMAGE_DIR / f"{compound_slug}.webp"
        
        # Only download once per compound
        if compound_slug not in compound_images:
            # Try the predicted URL first
            success = download_image(img_url, img_file)
            if not success:
                # Fall back: actually fetch the page to get og:image
                print(f"  Fetching page for {slug} to find og:image...")
                og_url = get_og_image(slug)
                if og_url:
                    success = download_image(og_url, img_file)
            
            compound_images[compound_slug] = str(img_file) if img_file.exists() else None
        
        if not img_file.exists():
            print(f"  WARNING: No image for {compound} ({dosage})")
    
    # Step 3: Update vendors.json
    print("\n" + "=" * 60)
    print("STEP 3: Update vendors.json")
    print("=" * 60)
    
    vendors_path = PROJECT_ROOT / "src" / "data" / "vendors.json"
    vendors = load_json(vendors_path)
    
    # Check if this vendor already exists
    existing_ids = [v["id"] for v in vendors]
    if VENDOR_SLUG in existing_ids:
        print(f"  Vendor '{VENDOR_SLUG}' already exists in vendors.json - removing old entry")
        vendors = [v for v in vendors if v["id"] != VENDOR_SLUG]
    
    new_vendor = {
        "id": VENDOR_SLUG,
        "name": VENDOR_NAME,
        "slug": VENDOR_SLUG,
        "website": VENDOR_WEBSITE,
        "rating": 4.5,
        "verified": False,
        "founded": 2025,
        "country": "UK",
        "description": "UK-based research peptide supplier offering 98%+ HPLC-verified peptides with third-party testing by Janoshik, Krause, and Chromate Analytics. Every batch independently tested with published Certificates of Analysis. Same-day UK dispatch before 2pm GMT via Royal Mail Tracked 24, free shipping over £45. Cold-chain storage, discreet packaging, and secure Open Banking checkout.",
        "highlights": [
            "Third-party tested (Janoshik · Krause · Chromate)",
            "Same-day dispatch (before 2pm GMT)",
            "Free UK delivery over £45",
            "Published COAs on every product page",
            "Cold-chain storage",
            "Discreet packaging"
        ],
        "shipping": [
            "UK free over £45 (Royal Mail Tracked 24, same-day dispatch before 2pm GMT)",
            "UK shipping only"
        ],
        "payment": [
            "Cards (Stripe)",
            "Open Banking",
            "Apple Pay",
            "Google Pay"
        ],
        "lastTested": "",
        "labTested": True
    }
    
    vendors.append(new_vendor)
    save_json(vendors_path, vendors)
    
    # Step 4: Update compounds.json
    print("\n" + "=" * 60)
    print("STEP 4: Update compounds.json")
    print("=" * 60)
    
    compounds_path = PROJECT_ROOT / "src" / "data" / "compounds.json"
    # Load compounds with precaution for size
    with open(compounds_path) as f:
        compounds = json.load(f)
    
    compound_map = {}
    for c in compounds:
        slug_c = slugify(c["name"])
        compound_map[slug_c] = c
    
    print(f"  Loaded {len(compounds)} existing compounds")
    
    # Group products by compound name
    from collections import OrderedDict
    grouped = OrderedDict()
    for slug, compound, dosage, price, category in PRODUCTS:
        cslug = slugify(compound)
        if cslug not in grouped:
            grouped[cslug] = {"name": compound, "items": []}
        grouped[cslug]["items"].append((slug, dosage, price, category))
    
    added_count = 0
    for cslug, group in grouped.items():
        name = group["name"]
        items = group["items"]
        
        img_path = f"/images/products/{VENDOR_SLUG}/{cslug}.webp"
        has_image = (IMAGE_DIR / f"{cslug}.webp").exists()
        if not has_image:
            print(f"  WARNING: No local image for {name}")
        
        if cslug in compound_map:
            # Add sources to existing compound
            comp = compound_map[cslug]
            for slug, dosage, price, category in items:
                source_entry = {
                    "vendor": VENDOR_NAME,
                    "url": f"https://ukpeptidelab.co.uk/product/{slug}",
                    "price": f"£{price:.2f}",
                    "inStock": True,
                    "dosage": dosage,
                    "image": img_path if has_image else ""
                }
                comp["sources"].append(source_entry)
            added_count += 1
        else:
            # Determine category
            cat_map = {
                "glp-1-agonists": "glp-1-agonists",
                "nootropics": "research-chemicals",
                "peptides": "peptides",
                "growth-hormone": "growth-hormone",
            }
            cat = cat_map.get(items[0][3], "peptides")
            
            sources = []
            for slug, dosage, price, category in items:
                source_entry = {
                    "vendor": VENDOR_NAME,
                    "url": f"https://ukpeptidelab.co.uk/product/{slug}",
                    "price": f"£{price:.2f}",
                    "inStock": True,
                    "dosage": dosage,
                    "image": img_path if has_image else ""
                }
                sources.append(source_entry)
            
            # Build a minimal compound entry
            new_compound = {
                "id": cslug,
                "name": name,
                "slug": cslug,
                "category": cat,
                "description": f"{name} - research peptide supplied by {VENDOR_NAME}. For laboratory research use only.",
                "mechanism": "Research peptide. Mechanism details available from published literature.",
                "purity": "≥98%",
                "form": "Lyophilized powder",
                "researchAreas": ["General research"],
                "commonDosages": [items[0][1]],
                "sources": sources
            }
            compounds.append(new_compound)
            compound_map[cslug] = new_compound
            added_count += 1
        
        if has_image:
            # Ensure image field is set on all new source entries
            comp = compound_map[cslug]
            for src in comp["sources"]:
                if src["vendor"] == VENDOR_NAME and not src.get("image"):
                    src["image"] = img_path
    
    print(f"  Added/updated {added_count} compounds with {VENDOR_NAME} sources")
    
    # Save compounds.json
    with open(compounds_path, 'w') as f:
        json.dump(compounds, f, indent=2)
    print(f"  Saved: {compounds_path}")
    
    # Step 5: Verify
    print("\n" + "=" * 60)
    print("STEP 5: Verify files")
    print("=" * 60)
    
    img_count = len(list(IMAGE_DIR.glob("*.webp")))
    print(f"  Product images downloaded: {img_count}")
    
    logo_svg = VENDOR_LOGO_DIR / f"{VENDOR_SLUG}.svg"
    logo_png = VENDOR_LOGO_DIR / f"{VENDOR_SLUG}.png"
    print(f"  Logo SVG exists: {logo_svg.exists()}")
    print(f"  Logo PNG exists: {logo_png.exists()}")
    
    print("\n✅ Done! Ready for git commit and push.")

if __name__ == "__main__":
    main()
