from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os

# === CONFIG: 4 Compounds ===
configs = [
    {
        "COMPOUND": "Oxytocin",
        "DOSAGE": "2mg",
        "CATEGORY": "Compound Profile",
        "SUBHEADING": "Research Summary",
        "DESCRIPTION_LINES": [
            "Overview of Oxytocin, a cyclic",
            "nonapeptide neuropeptide hormone",
            "involved in social bonding, stress",
            "regulation, and reproductive research.",
        ],
        "VIAL_SOURCE": "public/images/compounds/oxytocin-vial.png",
        "OUTPUT_PATH": "public/images/guides/oxytocin-research-summary.png",
    },
    {
        "COMPOUND": "Tesamorelin",
        "DOSAGE": "10mg",
        "CATEGORY": "Compound Profile",
        "SUBHEADING": "Research Summary",
        "DESCRIPTION_LINES": [
            "Overview of Tesamorelin, a synthetic",
            "GHRH analogue for pulsatile GH",
            "release, visceral fat reduction,",
            "and metabolic research.",
        ],
        "VIAL_SOURCE": "public/images/compounds/tesamorelin-vial.png",
        "OUTPUT_PATH": "public/images/guides/tesamorelin-research-summary.png",
    },
    {
        "COMPOUND": "Melanotan II",
        "DOSAGE": "10mg",
        "CATEGORY": "Compound Profile",
        "SUBHEADING": "Research Summary",
        "DESCRIPTION_LINES": [
            "Overview of Melanotan II (MT2),",
            "a synthetic α-MSH analog with",
            "melanocortin receptor activity for",
            "pigmentation, metabolic, and",
            "inflammation research.",
        ],
        "VIAL_SOURCE": "public/images/compounds/melanotan-ii-vial.png",
        "OUTPUT_PATH": "public/images/guides/melanotan2-research-summary.png",
    },
    {
        "COMPOUND": "Sermorelin",
        "DOSAGE": "5mg",
        "CATEGORY": "Compound Profile",
        "SUBHEADING": "Research Summary",
        "DESCRIPTION_LINES": [
            "Overview of Sermorelin, the first",
            "FDA-approved GHRH(1-29) analogue",
            "for stimulating pulsatile GH",
            "release in endocrine research.",
        ],
        "VIAL_SOURCE": "public/images/compounds/sermorelin-vial.png",
        "OUTPUT_PATH": "public/images/guides/sermorelin-research-summary.png",
    },
]

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

for cfg in configs:
    card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
    draw = ImageDraw.Draw(card)

    # Background gradient
    for y in range(card_h):
        ratio = y / card_h
        r = int(245 - ratio * 15)
        g = int(248 - ratio * 15)
        b = int(255 - ratio * 15)
        for x in range(card_w):
            draw.point((x, y), fill=(r, g, b))

    # Decorative circles
    draw.ellipse([-80, -80, 250, 250], fill=(230, 240, 255))
    draw.ellipse([card_w - 180, card_h - 180, card_w + 80, card_h + 80], fill=(240, 245, 255))

    # Open and resize vial
    vial = Image.open(cfg["VIAL_SOURCE"])
    vial_ratio = vial.width / vial.height
    target_h = int(card_h * 0.8)
    target_w = int(target_h * vial_ratio)
    if target_w > card_w // 2 - 40:
        target_w = card_w // 2 - 60
        target_h = int(target_w / vial_ratio)
    vial_resized = vial.resize((target_w, target_h), Image.LANCZOS)

    # Position vial on left
    vial_x, vial_y = 50, (card_h - target_h) // 2
    if vial.mode == "RGBA":
        card.paste(vial_resized, (vial_x, vial_y), vial_resized)
    else:
        card.paste(vial_resized, (vial_x, vial_y))

    # Text area
    text_x = vial_x + target_w + 50

    # Category badge
    badge_x, badge_y = text_x, 140
    draw.rounded_rectangle([badge_x, badge_y, badge_x + 170, badge_y + 30], radius=15, fill=(37, 99, 235))
    draw.text((badge_x + 85, badge_y + 15), cfg["CATEGORY"], fill=(255, 255, 255), font=badge_font, anchor="mm")

    # Title
    draw.text((text_x, badge_y + 55), cfg["COMPOUND"], fill=(15, 30, 50), font=title_font)

    # Subtitle
    draw.text((text_x, badge_y + 125), cfg["SUBHEADING"], fill=(37, 99, 235), font=subtitle_font)

    # Description
    y_off = badge_y + 185
    for line in cfg["DESCRIPTION_LINES"]:
        draw.text((text_x, y_off), line, fill=(100, 116, 139), font=body_font)
        y_off += 30

    # Footer
    draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=small_font)

    # Blue accent stripe
    draw.rounded_rectangle([0, card_h - 4, card_w, card_h], radius=0, fill=(37, 99, 235))

    # Save
    card.save(cfg["OUTPUT_PATH"], "PNG", quality=97)
    print(f"Saved: {cfg['OUTPUT_PATH']} ({os.path.getsize(cfg['OUTPUT_PATH'])} bytes)")
