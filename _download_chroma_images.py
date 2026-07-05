#!/usr/bin/env python3
"""
Download real product images for Chroma Peptides from their shop pages.
Maps shop product URLs to compound slugs, downloads and converts to .webp.
"""
import json
import os
import re
import urllib.request
import sys
from PIL import Image
from io import BytesIO
import time

WORKDIR = '/Users/time4you/viralpeps'
OUT_DIR = os.path.join(WORKDIR, 'public/images/products/chroma-peptides')

# 1. Load compounds.json for slug mapping
c = json.load(open(os.path.join(WORKDIR, 'src/data/compounds.json')))

# Build reverse mapping: shop product URL -> compound slug (deduplicated, prefer first)
# Shop product pages from the scrape
shop_products = [
    # (name_from_shop, url, img_url)
    ("5-Amino-1MQ", "https://chromapeptides.co.uk/product/5-amino-1mq/", "https://chromapeptides.co.uk/wp-content/uploads/2025/07/5-Amino-1MQ-5mg_1-mockup-1024x1024.webp"),
    ("Acetic Acid 0.6%", "https://chromapeptides.co.uk/product/acetic-acid-0-6/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/AOD-9604-5mg_1-mockup-1024x1024.webp"),
    ("AOD-9604", "https://chromapeptides.co.uk/product/aod-9604/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Bacteriostatic-Water-3mL_1-1-mockup-1024x1024.webp"),
    ("Bacteriostatic Water", "https://chromapeptides.co.uk/product/bacteriostatic-water/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/BPC-157-5mg-mockup-1024x1024.webp"),
    ("BPC-157", "https://chromapeptides.co.uk/product/bpc-157/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/BPC-157-TB-500-Blend-5mg-5mg_1-mockup-1024x1024.webp"),
    ("BPC-157 TB-500 Blend", "https://chromapeptides.co.uk/product/bpc-157-tb-500-blend/", "https://chromapeptides.co.uk/wp-content/uploads/2026/06/tmp-cartalax-1024x1024.jpeg"),
    ("Cartalax", "https://chromapeptides.co.uk/product/cartalax/", "https://chromapeptides.co.uk/wp-content/uploads/2025/08/CJC-1295-DAC-5-MG_BPC-157-5MG-1024x1024.webp"),
    ("CJC-1295 DAC", "https://chromapeptides.co.uk/product/cjc-1295-dac/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/CJC-1295-No-DAC_5mg-mockup-1024x1024.webp"),
    ("CJC-1295 No DAC", "https://chromapeptides.co.uk/product/cjc-1295-no-dac/", "https://chromapeptides.co.uk/wp-content/uploads/2026/06/dihexa-1024x1024.webp"),
    ("Dihexa", "https://chromapeptides.co.uk/product/dihexa/", "https://chromapeptides.co.uk/wp-content/uploads/2026/06/DMSO-3ml.webp"),
    ("DMSO", "https://chromapeptides.co.uk/product/dmso/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/DSIP-5mg_1-mockup-1024x1024.webp"),
    ("DSIP", "https://chromapeptides.co.uk/product/dsip/", "https://chromapeptides.co.uk/wp-content/uploads/2026/03/Logo-1024x583.png"),
    ("Epithalon", "https://chromapeptides.co.uk/product/epithalon/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Epithalon-10MG-mockup-1024x1024.webp"),
    ("GHK-Cu", "https://chromapeptides.co.uk/product/ghk-cu/", "https://chromapeptides.co.uk/wp-content/uploads/2025/08/GHRP-2-5mg-mockup-1024x1024.webp"),
    ("GHRP-2", "https://chromapeptides.co.uk/product/ghrp-2-5-mg/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/GHRP-6-5mg-mockup-1024x1024.webp"),
    ("GHRP-6", "https://chromapeptides.co.uk/product/ghrp-6-5-mg/", "https://chromapeptides.co.uk/wp-content/uploads/2025/08/GLOW-70mg-1024x1024.webp"),
    ("GLOW", "https://chromapeptides.co.uk/product/glow/", "https://chromapeptides.co.uk/wp-content/uploads/2026/06/glutathione-1500-1024x1024.webp"),
    ("Glutathione", "https://chromapeptides.co.uk/product/glutathione/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Hexarelin-5mg-mockup-1024x1024.webp"),
    ("Hexarelin", "https://chromapeptides.co.uk/product/hexarelin/", "https://chromapeptides.co.uk/wp-content/uploads/2025/11/Untitled-design-2025-11-28T104726.266-1024x1024.webp"),
    ("HGH Fragment 176-191", "https://chromapeptides.co.uk/product/hgh-fragment-176-191/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/IGF-1-LR3-1mg-mockup-1024x1024.webp"),
    ("IGF-1 LR3", "https://chromapeptides.co.uk/product/igf-1-lr3/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/ipamorelin-5mg-mockup-1024x1024.webp"),
    ("Ipamorelin", "https://chromapeptides.co.uk/product/ipamorelin/", "https://chromapeptides.co.uk/wp-content/uploads/2026/06/combo-10-1024x1024.webp"),
    ("Ipamorelin + CJC-1295 No DAC", "https://chromapeptides.co.uk/product/ipamorelin-cjc-1295-no-dac-combo/", ""),
    ("Kisspeptin", "https://chromapeptides.co.uk/product/kisspeptin/", ""),
    ("K-LOW", "https://chromapeptides.co.uk/product/klow/", ""),
    ("KPV", "https://chromapeptides.co.uk/product/kpv/", ""),
    ("Melanotan II", "https://chromapeptides.co.uk/product/melanotan-2-mt-ii/", ""),
    ("Melanotan I (MT-1)", "https://chromapeptides.co.uk/product/melanotan-i-mt-1/", ""),
    ("Methylene Blue", "https://chromapeptides.co.uk/product/methylene-blue-1-usp-grade/", ""),
    ("MOTS-C", "https://chromapeptides.co.uk/product/mots-c/", ""),
    ("NAD+", "https://chromapeptides.co.uk/product/nad/", ""),
    ("PT-141 (Bremelanotide)", "https://chromapeptides.co.uk/product/pt-141-bremelanotide/", ""),
    ("RU-58841", "https://chromapeptides.co.uk/product/ru-58841-5-solution/", ""),
    ("Selank", "https://chromapeptides.co.uk/product/selank/", ""),
    ("Semax", "https://chromapeptides.co.uk/product/semax/", ""),
    ("Sermorelin", "https://chromapeptides.co.uk/product/sermorelin/", ""),
    ("SLU-PP-332", "https://chromapeptides.co.uk/product/slu-pp-332/", ""),
    ("SNAP-8", "https://chromapeptides.co.uk/product/snap-8-ghk-cu-matrixyl-hyaluronic-acid-serum/", ""),
    ("SS-31", "https://chromapeptides.co.uk/product/ss-31/", ""),
    ("SS-31 50mg", "https://chromapeptides.co.uk/product/ss-31-50mg/", ""),
    ("TB-500", "https://chromapeptides.co.uk/product/tb-500/", ""),
    ("Tesamorelin", "https://chromapeptides.co.uk/product/tesamorelin/", ""),
    ("Thymosin Alpha-1", "https://chromapeptides.co.uk/product/thymosin-alpha-1/", ""),
    ("K-LOW", "https://chromapeptides.co.uk/product/klow/", "https://chromapeptides.co.uk/wp-content/uploads/2026/03/Logo-1024x583.png"),
    ("KPV", "https://chromapeptides.co.uk/product/kpv/", "https://chromapeptides.co.uk/wp-content/uploads/2025/11/Untitled-design-2025-11-28T102135.593-1024x1024.webp"),
    ("Melanotan II", "https://chromapeptides.co.uk/product/melanotan-2-mt-ii/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Melanotan-II-MT-2-10mg_1-mockup-1024x1024.webp"),
    ("Melanotan I (MT-1)", "https://chromapeptides.co.uk/product/melanotan-i-mt-1/", "https://chromapeptides.co.uk/wp-content/uploads/2026/06/mt1-1024x1024.webp"),
    ("Methylene Blue", "https://chromapeptides.co.uk/product/methylene-blue-1-usp-grade/", "https://chromapeptides.co.uk/wp-content/uploads/2025/11/mockup-update-1024x1024.png"),
    ("MOTS-C", "https://chromapeptides.co.uk/product/mots-c/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/MOTS-C-10mg-mockup-1024x1024.webp"),
    ("NAD+", "https://chromapeptides.co.uk/product/nad/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/NAD-500mg_1-mockup-1024x1024.webp"),
    ("PT-141 (Bremelanotide)", "https://chromapeptides.co.uk/product/pt-141-bremelanotide/", "https://chromapeptides.co.uk/wp-content/uploads/2025/08/PT-141-Bremelanotide_1-1024x1024.webp"),
    ("RU-58841", "https://chromapeptides.co.uk/product/ru-58841-5-solution/", "https://chromapeptides.co.uk/wp-content/uploads/2026/01/fef98001-f89d-4079-a734-adc9c651371b-1024x1024.webp"),
    ("Selank", "https://chromapeptides.co.uk/product/selank/", "https://chromapeptides.co.uk/wp-content/uploads/2025/08/111-1024x1024.webp"),
    ("Semax", "https://chromapeptides.co.uk/product/semax/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Selank-5mg_1-mockup-1024x1024.webp"),
    ("Sermorelin", "https://chromapeptides.co.uk/product/sermorelin/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Sermorelin-5mg_1-mockup-1024x1024.webp"),
    ("SLU-PP-332", "https://chromapeptides.co.uk/product/slu-pp-332/", "https://chromapeptides.co.uk/wp-content/uploads/2026/03/Logo-1024x583.png"),
    ("SNAP-8", "https://chromapeptides.co.uk/product/snap-8-ghk-cu-matrixyl-hyaluronic-acid-serum/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/SLU-PP-332-5mg_1-mockup-1024x1024.webp"),
    ("SS-31", "https://chromapeptides.co.uk/product/ss-31/", "https://chromapeptides.co.uk/wp-content/uploads/2025/11/Untitled-design-2025-11-28T103311.708-1024x1024.webp"),
    ("SS-31 50mg", "https://chromapeptides.co.uk/product/ss-31-50mg/", "https://chromapeptides.co.uk/wp-content/uploads/2026/06/ss31-50-1024x1024.webp"),
    ("TB-500", "https://chromapeptides.co.uk/product/tb-500/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/TB-500-5mg-mockup-1024x1024.webp"),
    ("Tesamorelin", "https://chromapeptides.co.uk/product/tesamorelin/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/tesamorelin-2mg-mockup-1024x1024.webp"),
    ("Thymosin Alpha-1", "https://chromapeptides.co.uk/product/thymosin-alpha-1/", "https://chromapeptides.co.uk/wp-content/uploads/2025/09/Thymosin-Alpha-1-5mg_1-mockup-1024x1024.webp"),
]

# Build unique mapping: shop url -> (display_name, img_url)
shop_map = {}
for name, url, img in shop_products:
    if url not in shop_map:
        shop_map[url] = (name, img)

# 2. Map shop product URLs to compound slugs
# Build URL->slug mapping from compounds.json
url_to_slug = {}
for comp in c:
    slug = comp.get('slug', '')
    sources = comp.get('sources', [])
    if isinstance(sources, list):
        for src in sources:
            url = src.get('url', '')
            vendor = src.get('vendor', '')
            if 'chroma' in vendor.lower() and slug not in url_to_slug:
                url_to_slug[url] = slug

print(f"URL-to-slug mapping has {len(url_to_slug)} entries")

# 3. For each shop product, find its slug
slug_img_map = {}  # slug -> img_url
unmapped_shop_urls = []
mapped_count = 0

for shop_url, (name, img_url) in shop_map.items():
    if shop_url in url_to_slug:
        slug = url_to_slug[shop_url]
        if slug not in slug_img_map:  # first mapping wins
            slug_img_map[slug] = (name, shop_url, img_url)
            mapped_count += 1
    else:
        unmapped_shop_urls.append((name, shop_url))

print(f"\nMapped to compounds: {mapped_count}")
print(f"Unmapped shop URLs: {len(unmapped_shop_urls)}")
for name, url in unmapped_shop_urls:
    print(f"  {name} -> {url}")

# 4. Fix the image URLs - download the full-size version
# Remove -{width}x{height} size constraints from URLs before extension
def get_full_size_url(img_url):
    """Remove WooCommerce size constraints to get the full image."""
    if not img_url:
        return None
    # Replace -{N}x{N}.ext with .ext
    img_url = re.sub(r'(-\d+x\d+)(\.\w+)$', r'\2', img_url)
    # Also handle -1, _1 variants
    img_url = re.sub(r'[_-]\d+x\d+', '', img_url)
    return img_url

# 5. Now let's scrape the actual product pages to get the CORRECT image for each
# The listing page images were often shifted (showing wrong adjacent products)
# Let's use the product page itself to get the correct image

print("\n--- Scraping individual product pages for correct images ---")

import urllib.request
import ssl

ssl_ctx = ssl.create_default_context()
ssl_ctx.check_hostname = False
ssl_ctx.verify_mode = ssl.CERT_NONE

def get_real_image_from_product_page(product_url):
    """Fetch a product page and extract the main product image."""
    try:
        req = urllib.request.Request(
            product_url,
            headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}
        )
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=30) as resp:
            html = resp.read().decode('utf-8')
        
        # Look for WooCommerce product gallery image
        # Pattern 1: figure.woocommerce-product-gallery__wrapper img
        img_matches = re.findall(
            r'<img[^>]*(?:data-src|src)=["\'](https://chromapeptides\.co\.uk/wp-content/uploads/[^"\']+)["\'][^>]*>',
            html
        )
        
        if img_matches:
            # Return the first (main) product image
            img = img_matches[0]
            # Remove size constraints
            full_img = re.sub(r'-\d+x\d+(\.\w+)$', r'\1', img)
            return full_img
        
        # Pattern 2: div.woocommerce-product-gallery__image a img
        a_img = re.findall(
            r'<a[^>]*href=["\'](https://chromapeptides\.co\.uk/wp-content/uploads/[^"\']+)["\'][^>]*>',
            html
        )
        if a_img:
            return a_img[0]
        
        return None
    except Exception as e:
        print(f"  Error fetching {product_url}: {e}")
        return None

# Actually let's just use the proper image from the listing page
# The listing images were shifted because of the regex matching, so let me
# fix this by properly scraping each product page

# Rebuild the slug->image mapping properly
slug_to_img = {}

for shop_url, (name, _) in shop_map.items():
    if shop_url in url_to_slug:
        slug = url_to_slug[shop_url]
        img_url = get_real_image_from_product_page(shop_url)
        if img_url:
            slug_to_img[slug] = img_url
            print(f"  ✓ {slug} -> {img_url.split('/')[-1][:60]}")
        else:
            print(f"  ✗ {slug} - no image found")
        time.sleep(0.3)  # be polite

# 6. Download and convert images
print("\n--- Downloading images ---")
os.makedirs(OUT_DIR, exist_ok=True)

downloaded = 0
failed = 0

for slug, img_url in sorted(slug_to_img.items()):
    out_path = os.path.join(OUT_DIR, f"{slug}.webp")
    
    if os.path.exists(out_path):
        print(f"  ⏭ {slug}.webp already exists")
        downloaded += 1
        continue
    
    # Get full image URL
    full_url = get_full_size_url(img_url)
    if not full_url:
        full_url = img_url
    
    print(f"  ↓ {slug} -> {full_url.split('/')[-1][:50]}...", end=" ")
    
    try:
        req = urllib.request.Request(
            full_url,
            headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'}
        )
        with urllib.request.urlopen(req, context=ssl_ctx, timeout=60) as resp:
            img_data = resp.read()
        
        # Open with PIL, convert to RGB if needed, save as webp
        img = Image.open(BytesIO(img_data))
        if img.mode in ('RGBA', 'LA', 'P'):
            # Convert to RGB (fill transparency with white)
            bg = Image.new('RGB', img.size, (255, 255, 255))
            if img.mode == 'P':
                img = img.convert('RGBA')
            bg.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = bg
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        img.save(out_path, 'WEBP', quality=85)
        size_kb = os.path.getsize(out_path) / 1024
        print(f"✓ ({size_kb:.0f} KB)")
        downloaded += 1
        time.sleep(0.2)
        
    except Exception as e:
        print(f"✗ {e}")
        failed += 1

print(f"\n{'='*50}")
print(f"Done! Downloaded: {downloaded}, Failed: {failed}")
print(f"Output: {OUT_DIR}")
