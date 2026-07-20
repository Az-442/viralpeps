"""Generate all 4 deep dive card images for Night 6."""
from PIL import Image, ImageDraw, ImageFont
import os

COMPOUNDS = [
    {
        "name": "Tesamorelin",
        "vial": "public/images/compounds/tesamorelin-vial.png",
        "output": "public/images/guides/tesamorelin-deep-dive.png",
        "desc": [
            "Comprehensive deep dive into Tesamorelin,",
            "the only FDA-approved GHRH analog with",
            "proven visceral fat reduction from JAMA",
            "RCTs. Metabolic, liver fat, and body",
            "recomposition research.",
        ],
    },
    {
        "name": "Melanotan II",
        "vial": "public/images/compounds/melanotan-ii-vial.png",
        "output": "public/images/guides/melanotan2-deep-dive.png",
        "desc": [
            "Deep dive into Melanotan II, the",
            "synthetic α-MSH analog that activates",
            "melanocortin receptors across the body.",
            "Pigmentation, sexual function, side",
            "effects, and safety research.",
        ],
    },
    {
        "name": "Oxytocin",
        "vial": "public/images/compounds/oxytocin-vial.png",
        "output": "public/images/guides/oxytocin-deep-dive.png",
        "desc": [
            "Deep dive into oxytocin, the cyclic",
            "neuropeptide hormone that goes far",
            "beyond the 'love hormone' label.",
            "Social bonding, anxiety, autism,",
            "pain modulation, and GI research.",
        ],
    },
    {
        "name": "Sermorelin",
        "vial": "public/images/compounds/sermorelin-vial.png",
        "output": "public/images/guides/sermorelin-deep-dive.png",
        "desc": [
            "Deep dive into Sermorelin, the first",
            "FDA-approved GHRH(1-29) analogue for",
            "stimulating pulsatile GH release.",
            "Cardiac repair, bone density, sleep,",
            "epilepsy, and longevity research.",
        ],
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
PURPLE = (124, 58, 237)

for c in COMPOUNDS:
    card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
    draw = ImageDraw.Draw(card)

    # Purple-tinted gradient
    for y in range(card_h):
        ratio = y / card_h
        r = int(248 - ratio * 8)
        g = int(247 - ratio * 9)
        b = int(255)
        for x in range(card_w):
            draw.point((x, y), fill=(r, g, b))

    # Decorative circles
    draw.ellipse([-80, -80, 250, 250], fill=(237, 233, 254))
    draw.ellipse([card_w - 180, card_h - 180, card_w + 80, card_h + 80], fill=(237, 233, 254))

    # Vial
    vial_path = c["vial"]
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
        vial_x, target_w = 50, 0

    text_x = vial_x + target_w + 50

    # Badge
    badge_x, badge_y = text_x, 140
    draw.rounded_rectangle([badge_x, badge_y, badge_x + 170, badge_y + 30], radius=15, fill=PURPLE)
    draw.text((badge_x + 85, badge_y + 15), "Deep Dive Report", fill=(255, 255, 255), font=badge_font, anchor="mm")

    # Title
    draw.text((text_x, badge_y + 55), c["name"], fill=(15, 30, 50), font=title_font)

    # Subtitle
    draw.text((text_x, badge_y + 125), "Deep Dive", fill=PURPLE, font=subtitle_font)

    # Description
    y_off = badge_y + 185
    for line in c["desc"]:
        draw.text((text_x, y_off), line, fill=(100, 116, 139), font=body_font)
        y_off += 30

    # Footer
    draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=small_font)

    # Purple accent stripe
    draw.rounded_rectangle([0, card_h - 4, card_w, card_h], radius=0, fill=PURPLE)

    card.save(c["output"], "PNG", quality=97)
    print(f"Saved: {c['output']} ({os.path.getsize(c['output'])} bytes)")
