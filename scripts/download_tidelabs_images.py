#!/usr/bin/env python3
"""Download product images from Tide Labs website."""

import os
import re
import urllib.request
import json
import sys
from io import BytesIO

try:
    from PIL import Image
except ImportError:
    print("Pillow not available, installing...")
    os.system("pip3 install Pillow")
    from PIL import Image

# Mapping: compound slug -> Tide Labs product URL handle
HANDLES = {
    "bpc-157": "bpc-157-research-peptide",
    "tb-500": "tb-500",
    "ghrp-2": "ghrp-2",
    "aod-9604": "aod-9604",
    "cjc-1295": "cjc-1295-no-dac",
    "igf-1-lr3": "igf1-lr3-1mg",
    "sermorelin": "sermorelin-grf-1-29-5mg",
    "mots-c": "mots-c-research-peptide",
    "ss-31": "ss-31-10mg",
    "ghk-cu": "ghk-cu",
    "kpv": "kpv-5mg-peptide-research",
    "thymosin-alpha-1": "thymosin-alpha-1",
    "epitalon": "epithalon",
    "semax": "semax",
    "selank": "selank",
    "ara-290": "ara-290-10mg",
    "fragment-176-191": "ghrh-fragment-176-191",
    "hexarelin": "hexarelin-5mg",
    "ipamorelin": "ipamorelin-5mg-peptide-research",
    "ghrp-6": "ghrp-6",
    "pt-141": "pt-141-bremelanotide-10mg",
    "kisspeptin-10": "kisspeptin-10",
    "bpc-157-tb-500-blend": "bpc-157-tb-500-blend",
    "dsip": "dsip-delta-sleep-peptide",
}

OUTPUT_DIR = "/Users/time4you/viralpeps/public/images/products/tide-labs"
os.makedirs(OUTPUT_DIR, exist_ok=True)

def extract_og_image(url):
    """Extract og:image URL from a product page."""
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="replace")
        
        # Find og:image content
        pattern = r'og:image"[^>]*content="([^"]+)"'
        match = re.search(pattern, html)
        if match:
            return match.group(1)
        return None
    except Exception as e:
        print(f"  Error fetching {url}: {e}")
        return None

def download_and_convert(image_url, output_path):
    """Download image and convert to 200x200 webp."""
    try:
        req = urllib.request.Request(image_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=15) as resp:
            img_data = resp.read()
        
        # Use PIL to convert
        img = Image.open(BytesIO(img_data))
        
        # Convert RGBA to RGB if needed
        if img.mode == "RGBA":
            img = img.convert("RGB")
        elif img.mode == "P":
            img = img.convert("RGBA").convert("RGB")
        
        # Resize to fit 200x200 (maintaining aspect ratio, then center crop)
        img.thumbnail((200, 200), Image.Resampling.LANCZOS)
        
        # Center crop to exactly 200x200
        w, h = img.size
        left = (w - 200) // 2
        top = (h - 200) // 2
        if w >= 200 and h >= 200:
            img = img.crop((left, top, left + 200, top + 200))
        
        # Save as webp
        img.save(output_path, "WEBP", quality=85)
        return True
    except Exception as e:
        print(f"  Error converting: {e}")
        return False

# Also check if ipamorelin has a different handle
# Try to find additional products
print("=== Checking additional products ===")
additional_handles = {
    "ipamorelin": "ipamorelin-5mg-peptide-research",  # correct handle
}
for slug, handle in additional_handles.items():
    if slug not in HANDLES:
        url = f"https://tidelabs.co.uk/products/{handle}"
        og_url = extract_og_image(url)
        if og_url:
            HANDLES[slug] = handle
            print(f"Found {slug} -> {handle}")

print("\n=== Downloading Tide Labs product images ===")
success_count = 0
fail_count = 0

for slug, handle in HANDLES.items():
    url = f"https://tidelabs.co.uk/products/{handle}"
    output_path = os.path.join(OUTPUT_DIR, f"{slug}.webp")
    
    print(f"\nProcessing {slug} -> {handle}")
    
    og_url = extract_og_image(url)
    if og_url:
        print(f"  Image URL: {og_url}")
        if download_and_convert(og_url, output_path):
            print(f"  ✓ Saved: {output_path}")
            success_count += 1
        else:
            print(f"  ✗ Failed to convert")
            fail_count += 1
    else:
        print(f"  ✗ No image found")
        fail_count += 1

print(f"\n=== Done: {success_count} succeeded, {fail_count} failed ===")
print(f"Output directory: {OUTPUT_DIR}")
