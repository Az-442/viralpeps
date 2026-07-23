"""Batch generate 4 guide card images by calling the core card-drawing logic."""

from PIL import Image, ImageDraw, ImageFont
import os

# ============================================================
# Core card-drawing function (adapted from create_guide_image.py)
# ============================================================
def draw_guide_card(compound, vial_rel_path, description_lines, output_rel_path):
    """Draw a single 1200×675 guide card and save to output_rel_path."""
    font_dir = "/System/Library/Fonts"
    helvetica = os.path.join(font_dir, "Helvetica.ttc")
    if os.path.exists(helvetica):
        title_font = ImageFont.truetype(helvetica, 54, index=1)
        subtitle_font = ImageFont.truetype(helvetica, 30)
        badge_font = ImageFont.truetype(helvetica, 14)
        body_font = ImageFont.truetype(helvetica, 20)
        small_font = ImageFont.truetype(helvetica, 16)
    else:
        title_font = subtitle_font = badge_font = body_font = small_font = ImageFont.load_default()

    card_w, card_h = 1200, 675
    BLUE = (37, 99, 235)

    card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
    draw = ImageDraw.Draw(card)

    # Solid gradient background
    for y in range(card_h):
        ratio = y / card_h
        r = int(245 - ratio * 15)
        g = int(248 - ratio * 15)
        b = int(255 - ratio * 15)
        for x in range(card_w):
            draw.point((x, y), fill=(r, g, b))

    # Decorative circles
    draw.ellipse([-80, -80, 250, 250], fill=(230, 240, 255))
    draw.ellipse([card_w - 180, card_h - 180, card_w + 80, card_h + 80], fill=(230, 240, 255))

    # Resolve paths relative to project root
    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    vial_path = os.path.join(base, vial_rel_path)

    # Vial image
    if os.path.exists(vial_path):
        vial = Image.open(vial_path)
        vial_ratio = vial.width / vial.height
        target_h = int(card_h * 0.8)
        target_w = int(target_h * vial_ratio)
        if target_w > card_w // 2 - 40:
            target_w = card_w // 2 - 60
            target_h = int(target_w / vial_ratio)
        vial_resized = vial.resize((target_w, target_h), Image.LANCZOS)
        vial_x, vial_y = 50, (card_h - target_h) // 2
        if vial.mode == "RGBA":
            card.paste(vial_resized, (vial_x, vial_y), vial_resized)
        else:
            card.paste(vial_resized, (vial_x, vial_y))
    else:
        print(f"  WARNING: vial not found at {vial_path}")
        vial_x, target_w = 50, 0

    text_x = vial_x + target_w + 50

    # Badge
    badge_x, badge_y = text_x, 140
    draw.rounded_rectangle([badge_x, badge_y, badge_x + 170, badge_y + 30], radius=15, fill=BLUE)
    draw.text((badge_x + 85, badge_y + 15), "Compound Profile", fill=(255, 255, 255), font=badge_font, anchor="mm")

    # Title
    draw.text((text_x, badge_y + 55), compound, fill=(15, 30, 50), font=title_font)

    # Subtitle
    draw.text((text_x, badge_y + 125), "Research Summary", fill=BLUE, font=subtitle_font)

    # Description
    y_off = badge_y + 185
    for line in description_lines:
        draw.text((text_x, y_off), line, fill=(100, 116, 139), font=body_font)
        y_off += 30

    # Footer
    draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=small_font)

    # Blue accent stripe
    draw.rounded_rectangle([0, card_h - 4, card_w, card_h], radius=0, fill=BLUE)

    output_path = os.path.join(base, output_rel_path)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    card.save(output_path, "PNG", quality=97)
    print(f"  Saved: {output_path} ({os.path.getsize(output_path)} bytes)")


# ============================================================
# Card definitions
# ============================================================
CARDS = [
    {
        "compound": "Reconstitution Calculations",
        "vial": "public/images/compounds/viralpeps-vial-simple.png",
        "output": "public/images/guides/reconstitution-calculations.png",
        "description": [
            "A complete guide to peptide reconstitution",
            "calculations — vial strength, water volume,",
            "concentration, and dosing math.",
        ],
    },
    {
        "compound": "Peptide Dosing Guide",
        "vial": "public/images/compounds/viralpeps-vial-simple.png",
        "output": "public/images/guides/peptide-dosing-guide.png",
        "description": [
            "A comprehensive guide to peptide dosing",
            "protocols, unit conversions, syringe",
            "measurements, and cycle planning.",
        ],
    },
    {
        "compound": "Peptide Syringe Guide",
        "vial": "public/images/compounds/viralpeps-vial-simple.png",
        "output": "public/images/guides/peptide-syringe-guide.png",
        "description": [
            "A practical guide to peptide syringes —",
            "U-100 vs U-40, needle gauges, volumes,",
            "and drawing technique.",
        ],
    },
    {
        "compound": "BPC-157 Deep Dive 2",
        "vial": "public/images/compounds/bpc-157-vial.png",
        "output": "public/images/guides/bpc157-deep-dive-2.png",
        "description": [
            "Advanced deep dive into BPC-157 — oral",
            "bioavailability, tissue-specific targeting,",
            "clinical evidence, and stacking strategies.",
        ],
    },
]


if __name__ == "__main__":
    print(f"Generating {len(CARDS)} guide card images...\n")
    for i, card in enumerate(CARDS, 1):
        print(f"[{i}/{len(CARDS)}] {card['compound']}")
        draw_guide_card(
            compound=card["compound"],
            vial_rel_path=card["vial"],
            description_lines=card["description"],
            output_rel_path=card["output"],
        )
        print()
    print("Done — all 4 cards generated.")
