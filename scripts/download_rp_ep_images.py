#!/usr/bin/env python3
"""
Download product images for Research Peptide and Express Peptides.
Save to: /Users/time4you/viralpeps/public/images/products/{vendor-slug}/{compound-slug}.webp
All 38 compounds per vendor.
"""

import os
import re
import urllib.request
import urllib.error
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont

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

# Vendor info for generic image generation
VENDORS = {
    "research-peptide-uk": {
        "name": "Research Peptide UK",
        "color": "#2d6b8a",
        "bg": "#f0f5f8",
        "accent": "#1a4f6e"
    },
    "express-peptides": {
        "name": "Express Peptides",
        "color": "#8b2252",
        "bg": "#f8f0f4",
        "accent": "#6a1b3e"
    }
}

# Compound slug -> Research Peptide product page URL
RESEARCH_PEPTIDE_URLS = {
    "bpc-157": "https://researchpeptide.co.uk/product/bpc-157/",
    "tb-500": "https://researchpeptide.co.uk/product/thymosin-beta-4-tb500-5mg/",
    "melanotan-ii": "https://researchpeptide.co.uk/product/mt-2-melanotan-2-acetate-10mg/",
    "ghrp-2": "https://researchpeptide.co.uk/product/ghrp-2-10mg/",
    "aod-9604": "https://researchpeptide.co.uk/product/aod-9604-5mg/",
    "cjc-1295": "https://researchpeptide.co.uk/product/cjc-1295-no-dac-5mg/",
    "igf-1-lr3": "https://researchpeptide.co.uk/product/igf-1-lr3-1mg/",
    "tesamorelin": "https://researchpeptide.co.uk/product/tesamorelin/",
    "sermorelin": "https://researchpeptide.co.uk/product/sermorelin-acetate/",
    "mots-c": "https://researchpeptide.co.uk/product/mots-c-mitochondrial-derived-peptide/",
    "ss-31": "https://researchpeptide.co.uk/product/ss-31/",
    "ghk-cu": "https://researchpeptide.co.uk/product/ghk-cu/",
    "kpv": "https://researchpeptide.co.uk/product/kpv/",
    "thymosin-alpha-1": "https://researchpeptide.co.uk/product/thymosin-alpha-1/",
    "epitalon": "https://researchpeptide.co.uk/product/epithalon/",
    "semax": "https://researchpeptide.co.uk/product/semax/",
    "selank": "https://researchpeptide.co.uk/product/selank-5mg/",
    "fragment-176-191": "https://researchpeptide.co.uk/product/hgh-fragment-176-191-10mg/",
    "hexarelin": "https://researchpeptide.co.uk/product/hexarelin-acetate/",
    "ipamorelin": "https://researchpeptide.co.uk/product/ipamorelin-5mg-10mg/",
    "ghrp-6": "https://researchpeptide.co.uk/product/ghrp-6-10mg/",
    "pt-141": "https://researchpeptide.co.uk/product/pt-141-10mg/",
    "kisspeptin-10": "https://researchpeptide.co.uk/product/kisspeptin/",
    "oxytocin": "https://researchpeptide.co.uk/product/oxytocin-acetate/",
    "gonadorelin": "https://researchpeptide.co.uk/product/gonadorelin-acetategnrh-2mg/",
    "dsip": "https://researchpeptide.co.uk/product/dsip-delta-sleep-inducing-peptide/",
    "bpc-157-tb-500-blend": "https://researchpeptide.co.uk/product/bpc-10mg-tb-10mg-20mg/",
}

# Express Peptides compound slug -> product slug
EXPRESS_PEPTIDE_SLUGS = {
    "bpc-157": "bpc-157",
    "tb-500": "tb-500",
    "ghrp-2": "ghrp-2",
    "aod-9604": "aod-9604",
    "cjc-1295": "cjc-1295",
    "igf-1-lr3": "igf1-lr3",
    "tesamorelin": "tesamorelin",
    "sermorelin": "sermorelin-acetate",
    "mots-c": "mots-c",
    "ss-31": "ss-31",
    "ghk-cu": "ghk-cu",
    "kpv": "kpv",
    "thymosin-alpha-1": "thymosin-alpha-1",
    "epitalon": "epithalon",
    "semax": "semax",
    "selank": "selank",
    "ara-290": "ara-290",
    "fragment-176-191": "fragment-176-191",
    "hexarelin": "hexarelin-acetate",
    "ipamorelin": "ipamorelin",
    "ghrp-6": "ghrp-6",
    "pt-141": "pt-141",
    "kisspeptin-10": "kisspeptin",
    "oxytocin": "oxytocin",
    "dsip": "dsip",
    "bpc-157-tb-500-blend": "bpc-157-tb-500",
}


def ensure_dir(path):
    os.makedirs(path, exist_ok=True)


def hex_to_rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))


def fetch_og_image(url):
    """Extract og:image URL from a product page."""
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        })
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="replace")

        pattern = r'og:image"[^>]*content="([^"]+)"'
        match = re.search(pattern, html)
        if match:
            return match.group(1)

        # Fallback patterns
        for p in [r'data-large_image="([^"]+)"', r'class="wp-post-image"[^>]*src="([^"]+)"']:
            m = re.search(p, html)
            if m:
                return m.group(1)
        return None
    except Exception as e:
        print(f"  Error: {e}")
        return None


def fetch_express_image_vial(product_slug):
    """Fetch Express Peptides product image from vial page."""
    url = f"https://www.expresspeptides.co.uk/product/{product_slug}/vial"
    return _fetch_express_image_from_url(url)


def fetch_express_image_pen(product_slug):
    """Fetch Express Peptides product image from pen page."""
    url = f"https://www.expresspeptides.co.uk/product/{product_slug}/pen"
    return _fetch_express_image_from_url(url)


def _fetch_express_image_from_url(url):
    """Internal: fetch image URL from Express Peptides product page."""
    try:
        req = urllib.request.Request(url, headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                          "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        })
        with urllib.request.urlopen(req, timeout=15) as resp:
            html = resp.read().decode("utf-8", errors="replace")

        pattern = r'srcset="[^"]*?/asset/image/product/(\d+)/product-([a-f0-9]+)-large\.webp"'
        match = re.search(pattern, html)
        if match:
            return f"https://www.expresspeptides.co.uk/asset/image/product/{match.group(1)}/product-{match.group(2)}-large.webp"

        # Fallback
        pattern2 = r'src="/asset/image/product/(\d+)/product-([a-f0-9]+)-large\.(?:webp|jpeg)"'
        match2 = re.search(pattern2, html)
        if match2:
            return f"https://www.expresspeptides.co.uk/asset/image/product/{match2.group(1)}/product-{match2.group(2)}-large.webp"

        return None
    except Exception:
        return None


def download_and_convert(image_url, output_path, size=(200, 200)):
    """Download image, resize, center crop, save as webp."""
    try:
        req = urllib.request.Request(image_url, headers={
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36"
        })
        with urllib.request.urlopen(req, timeout=15) as resp:
            img_data = resp.read()

        if len(img_data) < 100:
            return False

        img = Image.open(BytesIO(img_data))

        # Convert to RGB
        if img.mode == "RGBA":
            bg = Image.new("RGB", img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[3])
            img = bg
        elif img.mode == "P":
            img = img.convert("RGBA")
            bg = Image.new("RGB", img.size, (255, 255, 255))
            bg.paste(img, mask=img.split()[3])
            img = bg
        elif img.mode != "RGB":
            img = img.convert("RGB")

        # Resize to fit within size (maintaining aspect ratio)
        img.thumbnail(size, Image.Resampling.LANCZOS)

        # Center crop to exact size
        w, h = img.size
        left = (w - size[0]) // 2
        top = (h - size[1]) // 2
        if w >= size[0] and h >= size[1]:
            img = img.crop((left, top, left + size[0], top + size[1]))

        img.save(output_path, "WEBP", quality=85)
        return True
    except Exception as e:
        print(f"  Image processing error: {e}")
        return False


def create_branded_vial(compound_slug, vendor_slug):
    """Create a generic branded vial image."""
    vendor = VENDORS[vendor_slug]
    save_path = os.path.join(BASE_DIR, vendor_slug, f"{compound_slug}.webp")

    if os.path.exists(save_path):
        return True

    accent_rgb = hex_to_rgb(vendor['color'])
    bg_rgb = hex_to_rgb(vendor['bg'])

    img_size = (500, 500)
    img = Image.new('RGB', img_size, bg_rgb)
    draw = ImageDraw.Draw(img)

    # Shadow
    draw.ellipse([170, 440, 330, 460], fill=(0, 0, 0, 25))

    # Vial body
    vial_x, vial_y = 175, 100
    vial_w, vial_h = 150, 300

    draw.rounded_rectangle(
        [(vial_x, vial_y + 30), (vial_x + vial_w, vial_y + vial_h)],
        radius=20, fill='white', outline=accent_rgb, width=3
    )

    # Neck
    neck_x = vial_x + vial_w // 2 - 20
    neck_y = vial_y + 20
    draw.rounded_rectangle(
        [(neck_x, neck_y), (neck_x + 40, vial_y + 30)],
        radius=5, fill='white', outline=accent_rgb, width=2
    )

    # Cap
    cap_y = neck_y - 15
    draw.rounded_rectangle(
        [(neck_x - 5, cap_y), (neck_x + 45, neck_y)],
        radius=3, fill=accent_rgb, outline=accent_rgb, width=2
    )

    # Flip-off ring
    flip_color = tuple(min(c + 30, 255) for c in accent_rgb)
    draw.rectangle(
        [neck_x - 3, neck_y + 3, neck_x + 43, neck_y + 10],
        fill=flip_color, outline=accent_rgb, width=1
    )

    # Liquid
    liquid_top = vial_y + vial_h - 130
    liquid_fill = tuple(min(c + 80, 255) for c in accent_rgb)
    draw.rounded_rectangle(
        [(vial_x + 5, liquid_top), (vial_x + vial_w - 5, vial_y + vial_h - 5)],
        radius=15, fill=liquid_fill
    )

    # Glossy highlight
    draw.rounded_rectangle(
        [vial_x + 10, vial_y + 50, vial_x + 22, vial_y + vial_h - 40],
        radius=4, fill=(255, 255, 255, 60)
    )

    # Fonts
    try:
        font_large = ImageFont.truetype(FONT_BOLD_PATH, 26)
        font_small = ImageFont.truetype(FONT_PATH, 18)
        font_tiny = ImageFont.truetype(FONT_PATH, 14)
    except:
        try:
            font_large = ImageFont.truetype(FONT_PATH, 26)
            font_small = ImageFont.truetype(FONT_PATH, 18)
            font_tiny = ImageFont.truetype(FONT_PATH, 14)
        except:
            font_large = font_small = font_tiny = ImageFont.load_default()

    # Compound name
    name = compound_slug.replace('-', ' ').upper()
    if len(name) > 12:
        parts = name.split()
        if len(parts) > 1:
            mid = len(parts) // 2
            name = parts[0] + '\n' + ' '.join(parts[1:])

    lines = name.split('\n')
    for i, line in enumerate(lines[:3]):
        try:
            bbox = draw.textbbox((0, 0), line, font=font_small)
            tw = bbox[2] - bbox[0]
        except:
            tw = len(line) * 10
        tx = vial_x + (vial_w - tw) // 2
        ty = vial_y + 60 + i * 22
        draw.text((tx, ty), line, fill=accent_rgb, font=font_small)

    # Research Use Only
    ru_text = "Research Use Only"
    try:
        bbox = draw.textbbox((0, 0), ru_text, font=font_tiny)
        tw = bbox[2] - bbox[0]
    except:
        tw = len(ru_text) * 7
    draw.text(((img_size[0] - tw) // 2, 370), ru_text, fill=(120, 120, 120), font=font_tiny)

    # Vendor name
    vendor_name = vendor['name']
    try:
        bbox = draw.textbbox((0, 0), vendor_name, font=font_tiny)
        tw = bbox[2] - bbox[0]
    except:
        tw = len(vendor_name) * 7
    draw.text(((img_size[0] - tw) // 2, 430), vendor_name, fill=accent_rgb, font=font_tiny)

    img.save(save_path, 'WEBP', quality=90)
    return True


def download_research_peptide_images():
    success = 0
    failed = 0
    vendor_dir = os.path.join(BASE_DIR, "research-peptide-uk")
    ensure_dir(vendor_dir)

    print(f"\n{'='*60}")
    print("Research Peptide UK - Downloading real product images")
    print(f"{'='*60}")

    for compound_slug, url in sorted(RESEARCH_PEPTIDE_URLS.items()):
        output_path = os.path.join(vendor_dir, f"{compound_slug}.webp")
        if os.path.exists(output_path) and os.path.getsize(output_path) > 1000:
            print(f"  ✓ {compound_slug}: already exists")
            continue

        print(f"  Fetching {compound_slug}...", end=" ", flush=True)
        og_url = fetch_og_image(url)
        if og_url:
            print(f"found image", flush=True)
            if download_and_convert(og_url, output_path):
                print(f"    ✓ Saved ({os.path.getsize(output_path)} bytes)", flush=True)
                success += 1
            else:
                print(f"    ✗ Failed to convert", flush=True)
                failed += 1
        else:
            print(f"✗ No image found (blocked by Cloudflare)", flush=True)
            failed += 1

    return success, failed


def download_express_peptide_images():
    success = 0
    failed = 0
    vendor_dir = os.path.join(BASE_DIR, "express-peptides")
    ensure_dir(vendor_dir)

    print(f"\n{'='*60}")
    print("Express Peptides - Downloading real product images")
    print(f"{'='*60}")

    for compound_slug, product_slug in sorted(EXPRESS_PEPTIDE_SLUGS.items()):
        output_path = os.path.join(vendor_dir, f"{compound_slug}.webp")
        if os.path.exists(output_path) and os.path.getsize(output_path) > 1000:
            print(f"  ✓ {compound_slug}: already exists")
            continue

        print(f"  {compound_slug} (vial)...", end=" ", flush=True)
        img_url = fetch_express_image_vial(product_slug)
        if img_url is None:
            print(f"pen...", end=" ", flush=True)
            img_url = fetch_express_image_pen(product_slug)

        if img_url:
            print(f"found image", flush=True)
            if download_and_convert(img_url, output_path):
                print(f"    ✓ Saved ({os.path.getsize(output_path)} bytes)", flush=True)
                success += 1
            else:
                print(f"    ✗ Failed to convert", flush=True)
                failed += 1
        else:
            print(f"✗ No image found", flush=True)
            failed += 1

    return success, failed


def create_all_generic_images():
    created = 0
    for vendor_slug in VENDORS:
        vendor_dir = os.path.join(BASE_DIR, vendor_slug)
        ensure_dir(vendor_dir)
        print(f"\n{'='*60}")
        print(f"{VENDORS[vendor_slug]['name']} - Generic images")
        print(f"{'='*60}")

        for compound_slug in ALL_COMPOUNDS:
            output_path = os.path.join(vendor_dir, f"{compound_slug}.webp")
            if not os.path.exists(output_path):
                create_branded_vial(compound_slug, vendor_slug)
                print(f"  Created: {compound_slug}.webp")
                created += 1

    return created


def summary():
    print(f"\n{'='*60}")
    print("FINAL SUMMARY")
    print(f"{'='*60}")

    for vendor_slug in VENDORS:
        vendor_dir = os.path.join(BASE_DIR, vendor_slug)
        if not os.path.exists(vendor_dir):
            print(f"\n{vendor_slug}: directory not found")
            continue

        files = [f for f in os.listdir(vendor_dir) if f.endswith('.webp')]
        existing = set(f.replace('.webp', '') for f in files)
        compound_count = len([c for c in ALL_COMPOUNDS if c in existing])

        print(f"\n{VENDORS[vendor_slug]['name']}: {compound_count}/{len(ALL_COMPOUNDS)} compounds")
        missing = [c for c in ALL_COMPOUNDS if c not in existing]
        if missing:
            print(f"  Missing: {', '.join(missing)}")
        else:
            print(f"  ✓ ALL 38 COMPOUNDS COVERED")


if __name__ == "__main__":
    print("=" * 60)
    print("PRODUCT IMAGE DOWNLOADER")
    print("Research Peptide UK & Express Peptides")
    print("=" * 60)

    # Phase 1: Try Research Peptide (likely blocked by Cloudflare)
    rp_ok, rp_fail = download_research_peptide_images()

    # Phase 2: Download Express Peptides (works)
    ep_ok, ep_fail = download_express_peptide_images()

    # Phase 3: Create generic images for ALL missing compounds
    created = create_all_generic_images()

    # Summary
    summary()

    print(f"\n{'='*60}")
    print(f"Results:")
    print(f"  Research Peptide: {rp_ok} real images downloaded, {rp_fail} failed")
    print(f"  Express Peptides: {ep_ok} real images downloaded, {ep_fail} failed")
    print(f"  Generic branded vials created: {created}")
    print(f"{'='*60}")
