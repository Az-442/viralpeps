#!/usr/bin/env python3
"""
Create generic branded vial images for compounds missing real product photos.
"""
import os
import sys
from PIL import Image, ImageDraw, ImageFont

PROJECT_ROOT = "/Users/time4you/viralpeps"
IMAGES_DIR = os.path.join(PROJECT_ROOT, "public", "images", "products")

COMPOUNDS = [
    "tirzepatide", "semaglutide", "bpc-157", "tb-500", "melanotan-ii",
    "ghrp-2", "aod-9604", "retatrutide", "cjc-1295", "igf-1-lr3",
    "tesamorelin", "sermorelin", "mots-c", "ss-31", "ghk-cu", "kpv",
    "thymosin-alpha-1", "epitalon", "semax", "selank", "ara-290",
    "bpc-157-oral", "fragment-176-191", "hexarelin", "ipamorelin",
    "ghrp-6", "pt-141", "kisspeptin-10", "cerebrolysin", "p21",
    "dihexa", "noopept", "phenylpiracetam", "pramipexole",
    "bpc-157-tb-500-blend", "gonadorelin", "dsip", "oxytocin"
]

# Compounds known to have real images downloaded
RP_REAL = ["bpc-157", "ghrp-2", "ghrp-6", "cjc-1295", "igf-1-lr3", 
           "epitalon", "fragment-176-191", "hexarelin", "ipamorelin", "dsip"]
TPC_REAL = ["retatrutide", "semaglutide", "bpc-157", "ghk-cu", 
            "ipamorelin", "tesamorelin", "bpc-157-tb-500-blend", "tb-500"]


def draw_vial(draw, cx, y_bottom, width=120, height=180):
    """Draw a glass vial centered at cx, with bottom at y_bottom."""
    # Vial dimensions
    vial_w = width
    vial_h = height
    neck_w = vial_w * 0.45
    neck_h = vial_h * 0.18
    cap_h = vial_h * 0.08
    
    x1 = cx - vial_w // 2
    y1 = y_bottom - vial_h
    
    # Glass body
    body_color = (220, 225, 230, 180)
    draw.rounded_rectangle(
        [x1, y1 + neck_h, x1 + vial_w, y_bottom],
        radius=12, fill=body_color, outline=(180, 185, 190), width=2
    )
    
    # Glass neck
    neck_x1 = cx - neck_w // 2
    draw.rounded_rectangle(
        [neck_x1, y1 + neck_h + 5, neck_x1 + neck_w, y1 + neck_h + neck_h * 1.5],
        radius=4, fill=body_color, outline=(180, 185, 190), width=2
    )
    
    # Liquid
    liquid_top = y1 + neck_h + vial_h * 0.3
    liquid_color = (220, 240, 248, 100)
    draw.rounded_rectangle(
        [x1 + 3, liquid_top, x1 + vial_w - 3, y_bottom - 3],
        radius=10, fill=liquid_color, outline=None
    )
    
    # Cap
    cap_color = (180, 180, 185)
    cap_y = y1 + neck_h - 3
    draw.rounded_rectangle(
        [neck_x1 - 5, cap_y - cap_h, neck_x1 + neck_w + 5, cap_y + 5],
        radius=4, fill=cap_color, outline=(150, 150, 155), width=1
    )
    
    # Flip-off ring
    draw.rectangle(
        [neck_x1 - 3, cap_y + 5, neck_x1 + neck_w + 3, cap_y + 12],
        fill=(200, 200, 205), outline=(160, 160, 165), width=1
    )
    
    # Label area
    label_x1 = x1 + 8
    label_y1 = liquid_top + 15
    label_w = vial_w - 16
    label_h = vial_h * 0.35
    
    # Only add label if there's room
    if label_h > 30:
        draw.rounded_rectangle(
            [label_x1, label_y1, label_x1 + label_w, label_y1 + label_h],
            radius=3, fill=(255, 255, 255, 230), outline=(200, 200, 200), width=1
        )
    
    # Glossy highlight
    highlight_coords = [x1 + 8, y1 + neck_h + 10, x1 + 18, y_bottom - 20]
    draw.rounded_rectangle(highlight_coords, radius=4, fill=(255, 255, 255, 60))
    
    return (label_x1, label_y1, label_x1 + label_w, label_y1 + label_h)


def create_vial_image(compound_name, vendor_name, output_path):
    """Create a branded vial image for a compound."""
    img = Image.new("RGBA", (500, 500), (240, 244, 248, 255))
    draw = ImageDraw.Draw(img)
    
    # Draw shadow
    draw.ellipse([170, 440, 330, 460], fill=(0, 0, 0, 25))
    
    # Draw vial
    label_bbox = draw_vial(draw, 250, 435, width=140, height=210)
    
    # Try to load a font
    font_large = None
    font_small = None
    font_tiny = None
    
    for font_path in [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/HelveticaNeue.ttc",
        "/System/Library/Fonts/Arial.ttf",
    ]:
        try:
            font_large = ImageFont.truetype(font_path, 18)
            font_small = ImageFont.truetype(font_path, 12)
            font_tiny = ImageFont.truetype(font_path, 10)
            break
        except (OSError, IOError):
            continue
    
    if font_large is None:
        font_large = ImageFont.load_default()
        font_small = font_large
        font_tiny = font_large
    
    # Draw compound name on label
    display_name = compound_name.replace("-", " ").upper()
    
    if label_bbox:
        lx1, ly1, lx2, ly2 = label_bbox
        label_cx = (lx1 + lx2) // 2
        label_cy = (ly1 + ly2) // 2
        
        # Draw compound name
        draw.text((label_cx, label_cy - 14), display_name, 
                  fill=(40, 40, 40), font=font_small, anchor="mm")
        
        # "Research Only" text
        draw.text((label_cx, label_cy + 8), "Research Use Only",
                  fill=(120, 120, 120), font=font_tiny, anchor="mm")
    
    # Draw vendor name at bottom
    draw.text((250, 450), vendor_name, fill=(80, 90, 100), font=font_small, anchor="mm")
    
    # Convert to RGB and save as WebP
    img_rgb = img.convert("RGB")
    img_rgb.save(output_path, "WEBP", quality=85)
    
    return os.path.getsize(output_path)


def main():
    # Process Research Peptides UK
    rp_dir = os.path.join(IMAGES_DIR, "research-peptides-uk-main")
    os.makedirs(rp_dir, exist_ok=True)
    
    rp_missing = [c for c in COMPOUNDS if c not in RP_REAL]
    print(f"\nResearch Peptides UK - Creating {len(rp_missing)} generic images:")
    for compound in sorted(rp_missing):
        output = os.path.join(rp_dir, f"{compound}.webp")
        if os.path.exists(output):
            continue
        size = create_vial_image(compound, "Research Peptides UK", output)
        print(f"  {compound}.webp ({size} bytes)")
    
    # Process The Peptide Company
    tpc_dir = os.path.join(IMAGES_DIR, "the-peptide-company")
    os.makedirs(tpc_dir, exist_ok=True)
    
    tpc_missing = [c for c in COMPOUNDS if c not in TPC_REAL]
    print(f"\nThe Peptide Company - Creating {len(tpc_missing)} generic images:")
    for compound in sorted(tpc_missing):
        output = os.path.join(tpc_dir, f"{compound}.webp")
        if os.path.exists(output):
            continue
        size = create_vial_image(compound, "The Peptide Company", output)
        print(f"  {compound}.webp ({size} bytes)")
    
    # Final summary
    print("\n" + "=" * 60)
    print("FINAL SUMMARY")
    print("=" * 60)
    for vendor_slug in ["research-peptides-uk-main", "the-peptide-company"]:
        vdir = os.path.join(IMAGES_DIR, vendor_slug)
        files = sorted([f for f in os.listdir(vdir) if f.endswith(".webp")])
        print(f"\n{vendor_slug}: {len(files)} images")
        for f in files:
            fpath = os.path.join(vdir, f)
            print(f"  {f} ({os.path.getsize(fpath)} bytes)")
        # Check which compounds are missing
        existing = [f.replace(".webp", "") for f in files]
        missing = [c for c in COMPOUNDS if c not in existing]
        if missing:
            print(f"  MISSING: {missing}")


if __name__ == "__main__":
    main()
