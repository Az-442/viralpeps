#!/usr/bin/env python3
"""
Download product images from Imperial Peptides UK, Pure Peptides UK, and Sterling Peptides.
Save to: /Users/time4you/viralpeps/public/images/products/{vendor-slug}/{compound-slug}.webp
Create generic branded vial images for compounds without real images.
"""

import os
import subprocess
import urllib.request
import urllib.error
from PIL import Image, ImageDraw, ImageFont
import json
import sys

# Paths
BASE_DIR = "/Users/time4you/viralpeps/public/images/products"
FONT_PATH = "/System/Library/Fonts/Helvetica.ttc"
FONT_BOLD_PATH = "/Library/Fonts/Arial.ttf"

# All 38 compounds
ALL_COMPOUNDS = [
    "tirzepatide", "semaglutide", "bpc-157", "tb-500", "melanotan-ii",
    "ghrp-2", "aod-9604", "retatrutide", "cjc-1295", "igf-1-lr3",
    "tesamorelin", "sermorelin", "mots-c", "ss-31", "ghk-cu", "kpv",
    "thymosin-alpha-1", "epitalon", "semax", "selank", "ara-290",
    "bpc-157-oral", "fragment-176-191", "hexarelin", "ipamorelin",
    "ghrp-6", "pt-141", "kisspeptin-10", "cerebrolysin", "p21",
    "dihexa", "noopept", "phenylpiracetam", "pramipexole",
    "bpc-157-tb-500-blend", "gonadorelin", "dsip", "oxytocin"
]

# Vendor info
VENDORS = {
    "imperial-peptides": {
        "name": "Imperial Peptides UK",
        "color": "#2d6b8a",
        "bg": "#f0f5f8"
    },
    "pure-peptides-uk": {
        "name": "Pure Peptides UK",
        "color": "#4a7c59",
        "bg": "#f2f7f3"
    },
    "sterling-peptides": {
        "name": "Sterling Peptides",
        "color": "#8b5e3c",
        "bg": "#f8f3ee"
    }
}

def ensure_dir(path):
    os.makedirs(path, exist_ok=True)

def download_image(url, save_path, max_retries=2):
    """Download an image from URL to save_path. Returns True if successful."""
    if os.path.exists(save_path):
        return True
    for attempt in range(max_retries):
        try:
            headers = {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=15) as response:
                data = response.read()
                if len(data) < 100:  # Too small to be a real image
                    print(f"  WARNING: {url} returned only {len(data)} bytes")
                    return False
                with open(save_path, 'wb') as f:
                    f.write(data)
                print(f"  Downloaded: {url[:80]}... -> {os.path.basename(save_path)} ({len(data)} bytes)")
                return True
        except Exception as e:
            if attempt < max_retries - 1:
                pass  # retry
            else:
                print(f"  FAILED: {url[:80]}... - {e}")
    return False

def convert_to_webp(src_path, dst_path):
    """Convert image to WebP format."""
    try:
        img = Image.open(src_path)
        # Convert RGBA to RGB if needed
        if img.mode == 'RGBA':
            # Create white background
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])
            img = background
        elif img.mode == 'P':
            img = img.convert('RGBA')
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])
            img = background
            
        img.save(dst_path, 'WEBP', quality=85)
        os.remove(src_path)  # Clean up original
        return True
    except Exception as e:
        print(f"  FAILED convert: {src_path} -> {e}")
        return False

def create_branded_vial(compound_slug, vendor_slug):
    """Create a generic branded vial image."""
    vendor = VENDORS[vendor_slug]
    save_path = os.path.join(BASE_DIR, vendor_slug, f"{compound_slug}.webp")
    
    if os.path.exists(save_path):
        return save_path
    
    # Create a clean product vial image
    img_size = (500, 500)
    img = Image.new('RGB', img_size, vendor['bg'])
    draw = ImageDraw.Draw(img)
    
    # Draw vial shape
    vial_x, vial_y = 175, 100
    vial_w, vial_h = 150, 300
    
    # Vial body (rounded rectangle)
    draw.rounded_rectangle(
        [(vial_x, vial_y), (vial_x + vial_w, vial_y + vial_h)],
        radius=20, fill='white', outline=vendor['color'], width=3
    )
    
    # Vial neck
    neck_x = vial_x + vial_w // 2 - 20
    neck_y = vial_y - 10
    draw.rounded_rectangle(
        [(neck_x, neck_y), (neck_x + 40, vial_y)],
        radius=5, fill='white', outline=vendor['color'], width=2
    )
    
    # Cap
    cap_y = neck_y - 15
    draw.rounded_rectangle(
        [(neck_x - 5, cap_y), (neck_x + 45, neck_y)],
        radius=3, fill=vendor['color'], outline=vendor['color'], width=2
    )
    
    # Liquid level (about 60% fill)
    liquid_top = vial_y + vial_h - 120
    draw.rounded_rectangle(
        [(vial_x + 5, liquid_top), (vial_x + vial_w - 5, vial_y + vial_h - 5)],
        radius=15, fill=vendor['color'] + '40'  # semi-transparent
    )
    
    # Try to add text
    try:
        font_large = ImageFont.truetype(FONT_BOLD_PATH, 28)
        font_small = ImageFont.truetype(FONT_PATH, 18)
        font_tiny = ImageFont.truetype(FONT_PATH, 14)
    except:
        font_large = ImageFont.load_default()
        font_small = font_large
        font_tiny = font_large
    
    # Compound name on vial
    name = compound_slug.replace('-', ' ').upper()
    # Truncate if too long
    if len(name) > 15:
        name = name.replace(' ', '\n', 1)
    
    # Center text on vial
    lines = name.split('\n')
    for i, line in enumerate(lines):
        bbox = draw.textbbox((0, 0), line, font=font_small)
        tw = bbox[2] - bbox[0]
        tx = vial_x + (vial_w - tw) // 2
        ty = vial_y + 60 + i * 22
        draw.text((tx, ty), line, fill=vendor['color'], font=font_small)
    
    # Vendor name below vial
    vendor_name = vendor['name']
    bbox = draw.textbbox((0, 0), vendor_name, font=font_tiny)
    tw = bbox[2] - bbox[0]
    tx = (img_size[0] - tw) // 2
    draw.text((tx, 430), vendor_name, fill=vendor['color'], font=font_tiny)
    
    img.save(save_path, 'WEBP', quality=90)
    print(f"  Created branded vial: {compound_slug}.webp for {vendor_slug}")
    return save_path

# ============================================================
# IMAGE URL MAPS
# ============================================================

# Imperial Peptides UK - product images from their Shopify store
IMPERIAL_IMAGES = {
    "tirzepatide": None,  # Not sold
    "semaglutide": None,
    "bpc-157": "https://www.imperialpeptides.co.uk/cdn/shop/files/bpc157-10mg.jpg?v=1769377795",
    "tb-500": "https://www.imperialpeptides.co.uk/cdn/shop/files/Tb-500-5mg.jpg?v=1771019807",
    "melanotan-ii": "https://www.imperialpeptides.co.uk/cdn/shop/files/Melanotan-2-10mg-vial.jpg?v=1771019952",
    "ghrp-2": None,
    "aod-9604": None,
    "retatrutide": None,
    "cjc-1295": "https://www.imperialpeptides.co.uk/cdn/shop/files/CJC-1295-no-dac-5mg-vial.jpg?v=1766302183",
    "igf-1-lr3": None,
    "tesamorelin": None,
    "sermorelin": None,
    "mots-c": "https://www.imperialpeptides.co.uk/cdn/shop/files/Mots-c-10mg-vial.jpg?v=1765983608",
    "ss-31": "https://www.imperialpeptides.co.uk/cdn/shop/files/SS-31-10mg-vial.jpg?v=1775481375",
    "ghk-cu": "https://www.imperialpeptides.co.uk/cdn/shop/files/Ghk-cu-50mg-selling-fast.webp?v=1781415638",
    "kpv": "https://www.imperialpeptides.co.uk/cdn/shop/files/KPV-10mg-vial.jpg?v=1775479623",
    "thymosin-alpha-1": None,
    "epitalon": "https://www.imperialpeptides.co.uk/cdn/shop/files/epitalon-10mg-new.webp?v=1781989749",
    "semax": "https://www.imperialpeptides.co.uk/cdn/shop/files/Semax.jpg?v=1770714519",
    "selank": "https://www.imperialpeptides.co.uk/cdn/shop/files/Selank-5mg.jpg?v=1771019871",
    "ara-290": None,
    "bpc-157-oral": None,
    "fragment-176-191": None,
    "hexarelin": None,
    "ipamorelin": "https://www.imperialpeptides.co.uk/cdn/shop/files/Ipamorelin-5mg.jpg?v=1765983471",
    "ghrp-6": None,
    "pt-141": None,
    "kisspeptin-10": None,
    "cerebrolysin": None,
    "p21": None,
    "dihexa": None,
    "noopept": None,
    "phenylpiracetam": None,
    "pramipexole": None,
    "bpc-157-tb-500-blend": None,
    "gonadorelin": None,
    "dsip": "https://www.imperialpeptides.co.uk/cdn/shop/files/DSIP-10MG-NEW.webp?v=1781989844",
    "oxytocin": None,
}

# Pure Peptides UK - WooCommerce product images (front view)
PURE_IMAGES = {
    "tirzepatide": None,
    "semaglutide": None,
    "bpc-157": "https://purepeptidesuk.com/wp-content/uploads/2025/04/bpc-157-5mg-front-600x600.png",
    "tb-500": "https://purepeptidesuk.com/wp-content/uploads/2025/04/tb500-thymosin-beta-4-2mg-front-600x600.png",
    "melanotan-ii": None,
    "ghrp-2": "https://purepeptidesuk.com/wp-content/uploads/2025/04/ghrp-2-5mg-front-600x600.png",
    "aod-9604": None,
    "retatrutide": None,
    "cjc-1295": "https://purepeptidesuk.com/wp-content/uploads/2025/04/modified-grf-1-29-2mg-front-600x600.png",
    "igf-1-lr3": "https://purepeptidesuk.com/wp-content/uploads/2025/04/igf-long-r3-100mcg-front-600x600.png",
    "tesamorelin": "https://purepeptidesuk.com/wp-content/uploads/2025/04/tesamorelin-2mg-front-600x600.png",
    "sermorelin": None,
    "mots-c": "https://purepeptidesuk.com/wp-content/uploads/2025/04/mots-c-10mg-front-600x600.png",
    "ss-31": "https://purepeptidesuk.com/wp-content/uploads/2025/04/ss-31-10mg-front-600x600.png",
    "ghk-cu": "https://purepeptidesuk.com/wp-content/uploads/2025/04/ghk-cu-50mg-front-600x600.png",
    "kpv": "https://purepeptidesuk.com/wp-content/uploads/2025/04/kpv-5mg-front-600x600.png",
    "thymosin-alpha-1": "https://purepeptidesuk.com/wp-content/uploads/2025/04/thymosin-alpha-1-10mg-front-600x600.png",
    "epitalon": "https://purepeptidesuk.com/wp-content/uploads/2025/04/epitalon-10mg-front-600x600.png",
    "semax": "https://purepeptidesuk.com/wp-content/uploads/2025/04/semax-5mg-front-600x600.png",
    "selank": "https://purepeptidesuk.com/wp-content/uploads/2025/04/selank-5mg-front-600x600.png",
    "ara-290": "https://purepeptidesuk.com/wp-content/uploads/2025/04/ara-290-16mg-front-600x600.png",
    "bpc-157-oral": None,
    "fragment-176-191": "https://purepeptidesuk.com/wp-content/uploads/2025/04/fragment-176-191-5mg-front-600x600.png",
    "hexarelin": "https://purepeptidesuk.com/wp-content/uploads/2025/04/hexarelin-2mg-front-600x600.png",
    "ipamorelin": "https://purepeptidesuk.com/wp-content/uploads/2025/04/ipamorelin-5mg-front-600x600.png",
    "ghrp-6": "https://purepeptidesuk.com/wp-content/uploads/2025/04/ghrp-6-5mg-front-600x600.png",
    "pt-141": "https://purepeptidesuk.com/wp-content/uploads/2025/04/pt-141-10mg-front-600x600.png",
    "kisspeptin-10": "https://purepeptidesuk.com/wp-content/uploads/2025/04/kisspeptin-5mg-front-600x600.png",
    "cerebrolysin": None,
    "p21": None,
    "dihexa": None,
    "noopept": None,
    "phenylpiracetam": None,
    "pramipexole": None,
    "bpc-157-tb-500-blend": "https://purepeptidesuk.com/wp-content/uploads/2024/10/PPUK-Bundle-Wolverine-Stack-600x600.jpg",
    "gonadorelin": None,
    "dsip": "https://purepeptidesuk.com/wp-content/uploads/2025/04/dsip-5mg-front-600x600.png",
    "oxytocin": None,
}

# Sterling Peptides - WooCommerce product images
STERLING_IMAGES = {
    "tirzepatide": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/03/tizer.png",
    "semaglutide": None,
    "bpc-157": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/03/bpc157.png",
    "tb-500": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/03/tb500.png",
    "melanotan-ii": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/04/sterling-peptides-melanotan-ii-10mg-research-peptide-uk.jpg.jpg",
    "ghrp-2": None,
    "aod-9604": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/04/aod-9604-peptide-vial.jpg",
    "retatrutide": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/03/reta10.png",
    "cjc-1295": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/03/cjcnodac.png",
    "igf-1-lr3": None,
    "tesamorelin": None,
    "sermorelin": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/03/sermorelin_a5f76283-d154-49bc-a0be-047144d2cf0f.png",
    "mots-c": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/03/motsc.png",
    "ss-31": None,
    "ghk-cu": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/03/ghkcu.png",
    "kpv": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/04/kpv-peptide-uk.jpg",
    "thymosin-alpha-1": None,
    "epitalon": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/04/pitalon-research-vial.jpg",
    "semax": None,
    "selank": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/06/selank-10mg-uk.jpeg",
    "ara-290": None,
    "bpc-157-oral": None,
    "fragment-176-191": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/04/hgh-frag-176-191-research-vial.jpg",
    "hexarelin": None,
    "ipamorelin": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/03/ipa_21e59e98-8e26-40ae-85e5-0efa3bef3c53.png",
    "ghrp-6": None,
    "pt-141": None,
    "kisspeptin-10": "https://sterlingpeptides.co.uk/wp-content/uploads/2026/04/kisspeptin-research-vial.jpg",
    "cerebrolysin": None,
    "p21": None,
    "dihexa": None,
    "noopept": None,
    "phenylpiracetam": None,
    "pramipexole": None,
    "bpc-157-tb-500-blend": None,
    "gonadorelin": None,
    "dsip": None,
    "oxytocin": None,
}

# Map vendor slugs to their image dicts
VENDOR_IMAGES = {
    "imperial-peptides": IMPERIAL_IMAGES,
    "pure-peptides-uk": PURE_IMAGES,
    "sterling-peptides": STERLING_IMAGES,
}

def download_all():
    """Download all real product images."""
    results = {"downloaded": 0, "failed": 0, "created": 0}
    
    for vendor_slug, images in VENDOR_IMAGES.items():
        vendor_dir = os.path.join(BASE_DIR, vendor_slug)
        ensure_dir(vendor_dir)
        
        print(f"\n{'='*60}")
        print(f"Processing {VENDORS[vendor_slug]['name']} ({vendor_slug})")
        print(f"{'='*60}")
        
        for compound_slug, url in images.items():
            if url is None:
                continue
            
            # Determine output path - download as temp file first, then convert to webp
            ext = os.path.splitext(url.split('?')[0])[1] or '.jpg'
            temp_path = os.path.join(vendor_dir, f"{compound_slug}{ext}")
            webp_path = os.path.join(vendor_dir, f"{compound_slug}.webp")
            
            if os.path.exists(webp_path):
                continue
            
            # Download
            success = download_image(url, temp_path)
            if success:
                # Convert to WebP
                convert_to_webp(temp_path, webp_path)
                results["downloaded"] += 1
            else:
                results["failed"] += 1
    
    return results

def create_missing_images():
    """Create generic branded vial images for compounds without real images."""
    results = {"created": 0}
    
    for vendor_slug in VENDORS:
        vendor_dir = os.path.join(BASE_DIR, vendor_slug)
        ensure_dir(vendor_dir)
        
        for compound_slug in ALL_COMPOUNDS:
            webp_path = os.path.join(vendor_dir, f"{compound_slug}.webp")
            if not os.path.exists(webp_path):
                create_branded_vial(compound_slug, vendor_slug)
                results["created"] += 1
    
    return results

def summary():
    """Print summary of all images."""
    print(f"\n{'='*60}")
    print("SUMMARY")
    print(f"{'='*60}")
    
    for vendor_slug in VENDORS:
        vendor_dir = os.path.join(BASE_DIR, vendor_slug)
        if not os.path.exists(vendor_dir):
            print(f"\n{vendor_slug}: directory not found")
            continue
        
        files = [f for f in os.listdir(vendor_dir) if f.endswith('.webp')]
        real_count = sum(1 for f in files if f.replace('.webp', '') in ALL_COMPOUNDS)
        print(f"\n{VENDORS[vendor_slug]['name']}: {len(files)}/{len(ALL_COMPOUNDS)} compounds have images")
        
        missing = [c for c in ALL_COMPOUNDS if not os.path.exists(os.path.join(vendor_dir, f"{c}.webp"))]
        if missing:
            print(f"  Missing: {', '.join(missing)}")


if __name__ == "__main__":
    # Create directories
    for slug in VENDORS:
        ensure_dir(os.path.join(BASE_DIR, slug))
    
    # Phase 1: Download real images
    print("PHASE 1: Downloading real product images from websites...")
    dl_results = download_all()
    
    # Phase 2: Create generic branded images for missing compounds
    print(f"\nPHASE 2: Creating generic branded vial images for missing compounds...")
    create_results = create_missing_images()
    
    # Summary
    summary()
    
    print(f"\nDone! Downloaded: {dl_results['downloaded']}, Failed: {dl_results['failed']}, Created branded: {create_results['created']}")
