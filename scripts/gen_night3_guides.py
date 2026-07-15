from PIL import Image, ImageDraw, ImageFont
import os

CARDS = [
    {
        "compound": "TB-500",
        "slug": "tb500-research-summary",
        "category": "Compound Profile",
        "subheading": "Research Summary",
        "lines": [
            "Overview of TB-500 (Thymosin Beta-4),",
            "its actin-regulating mechanisms,",
            "and tissue repair research.",
        ],
        "vial": "public/images/compounds/tb-500-vial.png",
    },
    {
        "compound": "AOD 9604",
        "slug": "aod9604-research-summary",
        "category": "Compound Profile",
        "subheading": "Research Summary",
        "lines": [
            "Overview of AOD-9604, the hGH",
            "fragment for lipolysis and",
            "fat metabolism research.",
        ],
        "vial": "public/images/compounds/aod-9604-vial.png",
    },
    {
        "compound": "CJC-1295",
        "slug": "cjc1295-research-summary",
        "category": "Compound Profile",
        "subheading": "Research Summary",
        "lines": [
            "Overview of CJC-1295, the GHRH",
            "analog for sustained GH and",
            "IGF-1 research.",
        ],
        "vial": "public/images/compounds/cjc-1295-vial.png",
    },
    {
        "compound": "Ipamorelin",
        "slug": "ipamorelin-research-summary",
        "category": "Compound Profile",
        "subheading": "Research Summary",
        "lines": [
            "Overview of Ipamorelin, the",
            "selective GH secretagogue",
            "for GH pulse research.",
        ],
        "vial": "public/images/compounds/ipamorelin-vial.png",
    },
]

card_w, card_h = 1200, 675
font_dir = "/System/Library/Fonts"

for card_data in CARDS:
    card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
    draw = ImageDraw.Draw(card)

    # Background gradient
    for y in range(card_h):
        ratio = y / card_h
        r = int(245 - ratio * 15)
        g = int(248 - ratio * 15)
        b = int(255 - ratio * 15)
        for x in range(0, card_w, 4):
            draw.point((x, y), fill=(r, g, b))

    # Decorative circles
    draw.ellipse([-80, -80, 250, 250], fill=(230, 240, 255))
    draw.ellipse([card_w - 180, card_h - 180, card_w + 80, card_h + 80], fill=(240, 245, 255))

    # Open and resize vial
    vial = Image.open(card_data["vial"])
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

    # Load fonts
    helvetica = os.path.join(font_dir, "Helvetica.ttc")
    if os.path.exists(helvetica):
        title_font = ImageFont.truetype(helvetica, 54, index=1)
        subtitle_font = ImageFont.truetype(helvetica, 30)
        badge_font = ImageFont.truetype(helvetica, 14)
        body_font = ImageFont.truetype(helvetica, 20)
        small_font = ImageFont.truetype(helvetica, 16)
    else:
        title_font = subtitle_font = badge_font = body_font = small_font = ImageFont.load_default()

    text_x = vial_x + target_w + 50

    # Category badge
    badge_x, badge_y = text_x, 140
    draw.rounded_rectangle([badge_x, badge_y, badge_x + 170, badge_y + 30], radius=15, fill=(37, 99, 235))
    draw.text((badge_x + 85, badge_y + 15), card_data["category"], fill=(255, 255, 255), font=badge_font, anchor="mm")

    # Title
    draw.text((text_x, badge_y + 55), card_data["compound"], fill=(15, 30, 50), font=title_font)

    # Subtitle
    draw.text((text_x, badge_y + 125), card_data["subheading"], fill=(37, 99, 235), font=subtitle_font)

    # Description
    y_off = badge_y + 185
    for line in card_data["lines"]:
        draw.text((text_x, y_off), line, fill=(100, 116, 139), font=body_font)
        y_off += 30

    # Footer
    draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=small_font)

    # Blue accent stripe
    draw.rounded_rectangle([0, card_h - 4, card_w, card_h], radius=0, fill=(37, 99, 235))

    # Save
    out = f"public/images/guides/{card_data['slug']}.png"
    os.makedirs(os.path.dirname(out), exist_ok=True)
    card.save(out, "PNG", quality=97)
    print(f"Saved: {out} ({os.path.getsize(out)} bytes)")
