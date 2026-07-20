"""Generate 4 compound profile guide cards for Night 5 — Semaglutide, NAD+, MOTS-c, SS-31"""
from PIL import Image, ImageDraw, ImageFont
import os

font_dir = "/System/Library/Fonts"
helvetica = os.path.join(font_dir, "Helvetica.ttc")
if os.path.exists(helvetica):
    title_font = ImageFont.truetype(helvetica, 48, index=1)
    subtitle_font = ImageFont.truetype(helvetica, 26)
    badge_font = ImageFont.truetype(helvetica, 12)
    body_font = ImageFont.truetype(helvetica, 18)
    small_font = ImageFont.truetype(helvetica, 14)
else:
    title_font = subtitle_font = badge_font = body_font = small_font = ImageFont.load_default()

card_w, card_h = 1200, 675
BLUE = (37, 99, 235)

compounds = [
    {
        "name": "Semaglutide",
        "vial": "public/images/compounds/semaglutide-vial.png",
        "output": "public/images/guides/semaglutide-research-summary.png",
        "desc": [
            "Overview of Semaglutide, a GLP-1 receptor",
            "agonist widely studied for metabolic health,",
            "appetite regulation, and glucose homeostasis.",
        ],
    },
    {
        "name": "NAD+",
        "vial": "public/images/compounds/nad-plus-vial.png",
        "output": "public/images/guides/nad-research-summary.png",
        "desc": [
            "Overview of NAD+, the essential coenzyme",
            "for cellular energy, sirtuin activation,",
            "DNA repair, and longevity research.",
        ],
    },
    {
        "name": "MOTS-c",
        "vial": "public/images/compounds/mots-c-vial.png",
        "output": "public/images/guides/mots-c-research-summary.png",
        "desc": [
            "Overview of MOTS-c, a mitochondrial-derived",
            "peptide that regulates metabolic homeostasis,",
            "AMPK activation, and exercise-mimetic effects.",
        ],
    },
    {
        "name": "SS-31",
        "vial": "public/images/compounds/ss-31-vial.png",
        "output": "public/images/guides/ss-31-research-summary.png",
        "desc": [
            "Overview of SS-31 (Elamipretide), a",
            "mitochondria-targeted peptide that stabilises",
            "cardiolipin and supports ATP production.",
        ],
    },
]

for c in compounds:
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

    # Vial
    target_h = int(card_h * 0.8)
    if os.path.exists(c["vial"]):
        vial = Image.open(c["vial"])
        vial_ratio = vial.width / vial.height
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
    badge_w = 155
    draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + 26], radius=13, fill=BLUE)
    draw.text((badge_x + badge_w // 2, badge_y + 13), "Compound Profile", fill=(255, 255, 255), font=badge_font, anchor="mm")

    # Title
    draw.text((text_x, badge_y + 50), c["name"], fill=(15, 30, 50), font=title_font)

    # Subtitle
    draw.text((text_x, badge_y + 115), "Research Summary", fill=BLUE, font=subtitle_font)

    # Description
    y_off = badge_y + 170
    for line in c["desc"]:
        draw.text((text_x, y_off), line, fill=(100, 116, 139), font=body_font)
        y_off += 26

    # Footer
    draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=small_font)

    # Blue accent stripe
    draw.rounded_rectangle([0, card_h - 4, card_w, card_h], radius=0, fill=BLUE)

    card.save(c["output"], "PNG", quality=97)
    print(f"Saved: {c['output']} ({os.path.getsize(c['output'])} bytes)")
