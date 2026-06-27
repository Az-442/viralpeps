#!/usr/bin/env python3
"""Create generic branded vial images for Dr Peptides compounds missing real photos."""
import os
from PIL import Image, ImageDraw, ImageFont

OUTPUT_DIR = "/Users/time4you/viralpeps/public/images/products/dr-peptides"
os.makedirs(OUTPUT_DIR, exist_ok=True)

MISSING_COMPOUNDS = [
    "igf-1-lr3", "fragment-176-191", "bpc-157-oral", "tirzepatide",
    "semaglutide", "melanotan-ii", "retatrutide", "cerebrolysin",
    "p21", "noopept", "phenylpiracetam", "pramipexole", "gonadorelin"
]

def draw_vial(draw, cx, y_bottom, width=120, height=180):
    """Draw a glass vial centered at cx, with bottom at y_bottom."""
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
    
    # Liquid fill
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
    
    # Draw shadow under vial
    draw.ellipse([170, 440, 330, 460], fill=(0, 0, 0, 25))
    
    # Draw vial
    label_bbox = draw_vial(draw, 250, 435, width=140, height=210)
    
    # Try to load fonts
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
    
    # Format compound name for display
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
    print("=== Creating generic Dr Peptides branded images ===\n")
    
    created = 0
    skipped = 0
    
    for compound in sorted(MISSING_COMPOUNDS):
        output = os.path.join(OUTPUT_DIR, f"{compound}.webp")
        if os.path.exists(output):
            size = os.path.getsize(output)
            print(f"  ✓ {compound}.webp already exists ({size} bytes)")
            skipped += 1
            continue
        
        size = create_vial_image(compound, "Dr Peptides", output)
        print(f"  ✓ Created {compound}.webp ({size} bytes)")
        created += 1
    
    print(f"\n=== Done: {created} created, {skipped} skipped ===")
    
    # Final count
    all_files = sorted([f for f in os.listdir(OUTPUT_DIR) if f.endswith(".webp")])
    print(f"\nTotal images in {OUTPUT_DIR}: {len(all_files)}")
    
    # Check which of the 38 compounds are missing
    all_38 = [
        "tirzepatide", "semaglutide", "bpc-157", "tb-500", "melanotan-ii",
        "ghrp-2", "aod-9604", "retatrutide", "cjc-1295", "igf-1-lr3",
        "tesamorelin", "sermorelin", "mots-c", "ss-31", "ghk-cu", "kpv",
        "thymosin-alpha-1", "epitalon", "semax", "selank", "ara-290",
        "bpc-157-oral", "fragment-176-191", "hexarelin", "ipamorelin",
        "ghrp-6", "pt-141", "kisspeptin-10", "cerebrolysin", "p21",
        "dihexa", "noopept", "phenylpiracetam", "pramipexole",
        "bpc-157-tb-500-blend", "gonadorelin", "dsip", "oxytocin"
    ]
    existing = [f.replace(".webp", "") for f in all_files]
    final_missing = [c for c in all_38 if c not in existing]
    if final_missing:
        print(f"\nStill missing ({len(final_missing)}): {', '.join(final_missing)}")
    else:
        print(f"\n✓ All 38 compounds have images!")


if __name__ == "__main__":
    main()
