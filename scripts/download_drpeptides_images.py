#!/usr/bin/env python3
"""Download product images from Dr Peptides (drpresearch.co.uk) website."""

import os
import re
import urllib.request
import urllib.parse
import json
import sys
from io import BytesIO

try:
    from PIL import Image
except ImportError:
    print("Pillow not available")
    sys.exit(1)

# Cookie jar for maintaining session
COOKIE_FILE = "/tmp/drpeptides_cookies.txt"

# Compound slug -> (image_filename_or_URL_fragment, alt_text_match)
# Using the 300x300 thumbnail URLs, we'll get full-size by removing -300x300
IMAGE_MAP = {
    "bpc-157": ("drp-laboratory-series-54", "BPC-157 5mg"),
    "tb-500": ("drp-laboratory-series-52", "TB500 5mg"),
    "ghrp-2": ("drp-laboratory-series-37", "GHRP-2"),
    "ghrp-6": ("drp-laboratory-series-64", "GHRP-6"),
    "aod-9604": ("drp-laboratory-series-45", "AOD-9604 5mg"),
    "cjc-1295": ("drp-laboratory-series-79", "CJC-1295"),
    "sermorelin": ("drp-laboratory-series-36", "Sermorelin"),
    "tesamorelin": ("drp-laboratory-series-62", "Tesamorelin 10mg"),
    "mots-c": ("drp-laboratory-series-67", "MOTS-C"),
    "ss-31": ("drp-laboratory-series-28", "SS-31"),
    "ghk-cu": ("drp-laboratory-series-65", "GHK-CU 50mg"),
    "kpv": ("drp-laboratory-series-58", "KPV 10mg"),
    "thymosin-alpha-1": ("drp-laboratory-series-16", "Thymosin Alpha-1"),
    "epitalon": ("drp-laboratory-series-38", "Epithalon"),
    "semax": ("drp-laboratory-series-47", "Semax 5mg"),
    "selank": ("drp-laboratory-series-63", "Selank 5mg"),
    "ara-290": ("drp-laboratory-series-39", "Ara-290"),
    "hexarelin": ("drp-laboratory-series-35", "Hexarelin"),
    "ipamorelin": ("drp-laboratory-series-68", "Ipamorelin 5mg"),
    "pt-141": ("PTDR", "PT-141"),
    "kisspeptin-10": ("drp-laboratory-series-48", "Kisspeptin-10 5mg"),
    "dsip": ("drp-laboratory-series-53", "DSIP"),
    "oxytocin": ("drp-laboratory-series-21", "Oxytocin 2mg"),
    "dihexa": ("drp-laboratory-series-27", "Dihexa"),
    "bpc-157-tb-500-blend": ("WS20DR", "WOLVERINE"),
    "igf-1-lr3": None,  # Not found on Dr Peptides
    "fragment-176-191": None,  # Not found
    "bpc-157-oral": None,  # Not found
    "tirzepatide": None,  # Not found
    "semaglutide": None,  # Not found
    "melanotan-ii": None,  # Not found
    "retatrutide": None,  # Not found
    "cerebrolysin": None,  # Not found
    "p21": None,  # Not found
    "noopept": None,  # Not found
    "phenylpiracetam": None,  # Not found
    "pramipexole": None,  # Not found
    "gonadorelin": None,  # Not found
}

OUTPUT_DIR = "/Users/time4you/viralpeps/public/images/products/dr-peptides"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def get_fullsize_url(thumbnail_url):
    """Convert a -300x300.jpg URL to the full-size version."""
    # Remove -300x300 suffix before .jpg
    full = re.sub(r'-300x300(\.\w+)$', r'\1', thumbnail_url)
    return full

def scrape_product_images():
    """Scrape the products page to build an image URL map."""
    req = urllib.request.Request(
        "https://drpresearch.co.uk/products/",
        headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.6 Safari/605.1.15",
        }
    )
    
    # Open with cookie handling
    import http.cookiejar
    cj = http.cookiejar.MozillaCookieJar(COOKIE_FILE)
    try:
        cj.load()
    except:
        pass
    opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
    
    # First pass the age gate
    age_data = urllib.parse.urlencode({
        "age_gate[confirm]": "yes",
        "age_gate[age]": "",
        "age_gate[lang]": "en",
        "age_gate[remember]": "1"
    }).encode()
    age_req = urllib.request.Request(
        "https://drpresearch.co.uk/",
        data=age_data,
        headers={"User-Agent": "Mozilla/5.0"}
    )
    try:
        opener.open(age_req)
    except:
        pass
    
    # Now get the products page
    try:
        resp = opener.open(req, timeout=30)
        html = resp.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"Error fetching products page: {e}")
        return {}
    
    # Extract all image URLs with alt text (handle both Dr P. and Dr P, )
    pattern = r'src="([^"]*)"[^>]*alt="Dr P[.,] ([^"]*)"'
    matches = re.findall(pattern, html)
    
    result = {}
    for img_url, alt_text in matches:
        # Convert to full-size URL
        full_url = get_fullsize_url(img_url)
        result[alt_text] = full_url
    
    return result

def download_and_convert(image_url, output_path):
    """Download image and convert to 200x200 webp."""
    try:
        req = urllib.request.Request(image_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            img_data = resp.read()
        
        img = Image.open(BytesIO(img_data))
        
        if img.mode == "RGBA":
            img = img.convert("RGB")
        elif img.mode == "P":
            bg = Image.new("RGB", img.size, (255, 255, 255))
            if img.mode == "P":
                img = img.convert("RGBA")
            bg.paste(img, mask=img.split()[3] if img.mode == "RGBA" else None)
            img = bg
        
        img.thumbnail((200, 200), Image.Resampling.LANCZOS)
        
        w, h = img.size
        if w >= 200 and h >= 200:
            left = (w - 200) // 2
            top = (h - 200) // 2
            img = img.crop((left, top, left + 200, top + 200))
        
        img.save(output_path, "WEBP", quality=85)
        return True
    except Exception as e:
        print(f"  Error: {e}")
        return False

# Scrape products
print("=== Scraping Dr Peptides products page ===")
products_map = scrape_product_images()
print(f"Found {len(products_map)} products with images")

# Map compound slugs to image URLs based on filename
slug_to_url = {}
for slug, value in IMAGE_MAP.items():
    if value is None:
        slug_to_url[slug] = None
        continue
    
    filename, keyword = value
    
    # Find the matching URL - prefer dedicated products over blends/stacks
    # For individual compounds, exclude products that list multiple compounds in alt text
    found = False
    candidates = []
    for alt_text, url in products_map.items():
        if keyword.lower() in alt_text.lower() and "bundle" not in alt_text.lower():
            candidates.append((alt_text, url))
    
    if len(candidates) == 1:
        slug_to_url[slug] = candidates[0][1]
        found = True
    elif len(candidates) > 1:
        # Prefer the one that doesn't mention other compound names (standalone product)
        # Keywords that indicate a blend/stack
        blend_indicators = ['stack', 'blend', 'wolverine', 'hulk', 'glow']
        standalone = [(a, u) for a, u in candidates if not any(b in a.lower() for b in blend_indicators)]
        if standalone:
            # Among standalone products, prefer the one whose product name starts closest to the keyword
            # Sort: shorter alt text = more specific match
            standalone.sort(key=lambda x: len(x[0]))
            slug_to_url[slug] = standalone[0][1]
        else:
            # All candidates are blends - use the first one
            slug_to_url[slug] = candidates[0][1]
        found = True
    
    if not found:
        slug_to_url[slug] = None

print("\n=== Downloading Dr Peptides product images ===")
success_count = 0
fail_count = 0
not_found = []

for slug, url in slug_to_url.items():
    output_path = os.path.join(OUTPUT_DIR, f"{slug}.webp")
    
    if url:
        print(f"\nProcessing {slug}")
        print(f"  URL: {url}")
        if download_and_convert(url, output_path):
            print(f"  ✓ Saved: {output_path}")
            success_count += 1
        else:
            print(f"  ✗ Failed to convert")
            fail_count += 1
            not_found.append(slug)
    else:
        print(f"\n{slug}: No product image found on Dr Peptides website")
        not_found.append(slug)
        fail_count += 1

print(f"\n=== Done: {success_count} succeeded, {fail_count} failed ===")
if not_found:
    print(f"Not found ({len(not_found)}): {', '.join(not_found)}")
print(f"Output directory: {OUTPUT_DIR}")
