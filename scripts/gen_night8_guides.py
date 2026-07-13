"""Generate guide card images for Night 8 articles."""
from PIL import Image, ImageDraw, ImageFont
import os

IMAGE_SOURCES = {
    "ghkcu-vs-bpc157": "public/images/compounds/ghk-cu.png",
    "retatrutide-vs-tirzepatide": "public/images/compounds/tirzepatide-vial.png",
    "semax-vs-selank": "public/images/compounds/semax.png",
}

ARTICLES = {
    "ghkcu-vs-bpc157": {
        "title": "GHK-Cu vs BPC-157",
        "category": "Comparison",
        "subtitle": "Tissue Repair Peptide Comparison",
        "desc": ["Comparing GHK-Cu and BPC-157 — two leading", "tissue repair peptides. Mechanisms, evidence,", "application routes, and research contexts."],
        "vial": "public/images/compounds/ghk-cu.png",
    },
    "retatrutide-vs-tirzepatide": {
        "title": "Retatrutide vs Tirzepatide",
        "category": "Comparison",
        "subtitle": "Triple vs Dual Agonist Comparison",
        "desc": ["Retatrutide (triple GLP-1/GIP/glucagon) vs", "Tirzepatide (dual GIP/GLP-1). How they differ,", "clinical data, and research implications."],
        "vial": "public/images/compounds/tirzepatide-vial.png",
    },
    "semax-vs-selank": {
        "title": "Semax vs Selank",
        "category": "Comparison",
        "subtitle": "Nootropic Peptide Comparison",
        "desc": ["Semax vs Selank — comparing two Russian", "regulatory peptides. BDNF nootropic vs GABA", "anxiolytic. Mechanisms, evidence, and use cases."],
        "vial": "public/images/compounds/semax.png",
    },
    "peptide-reconstitution-guide": {
        "title": "Peptide Reconstitution Guide",
        "category": "Guide",
        "subtitle": "Complete Step-by-Step Guide",
        "desc": ["How to reconstitute lyophilised peptides", "with bacteriostatic water. Supplies, dosing", "math, storage, and common mistakes to avoid."],
        "vial": "public/images/compounds/viralpeps-vial-simple.png",
    },
}

card_w, card_h = 1200, 675
font_dir = "/System/Library/Fonts"
helvetica = os.path.join(font_dir, "Helvetica.ttc")

for slug, info in ARTICLES.items():
    vial = Image.open(info["vial"])
    card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
    draw = ImageDraw.Draw(card)

    # Background gradient (subtle blue to white)
    for y in range(card_h):
        ratio = y / card_h
        r = int(245 - ratio * 15)
        g = int(248 - ratio * 15)
        b = int(255 - ratio * 15)
        draw.line([(0, y), (card_w, y)], fill=(r, g, b))

    # Decorative subtle blue circles
    draw.ellipse([-80, -80, 250, 250], fill=(230, 240, 255))
    draw.ellipse([card_w-180, card_h-180, card_w+80, card_h+80], fill=(240, 245, 255))

    # Paste vial image - resize and position on the left
    vial_ratio = vial.width / vial.height
    target_h = int(card_h * 0.8)
    target_w = int(target_h * vial_ratio)
    if target_w > card_w // 2 - 40:
        target_w = card_w // 2 - 60
        target_h = int(target_w / vial_ratio)
    vial_resized = vial.resize((target_w, target_h), Image.LANCZOS)
    vial_x = 50
    vial_y = (card_h - target_h) // 2
    if vial.mode == 'RGBA':
        card.paste(vial_resized, (vial_x, vial_y), vial_resized)
    else:
        card.paste(vial_resized, (vial_x, vial_y))

    # Fonts
    title_font = ImageFont.truetype(helvetica, 48, index=1) if os.path.exists(helvetica) else ImageFont.load_default()
    subtitle_font = ImageFont.truetype(helvetica, 28) if os.path.exists(helvetica) else ImageFont.load_default()
    badge_font = ImageFont.truetype(helvetica, 14) if os.path.exists(helvetica) else ImageFont.load_default()
    body_font = ImageFont.truetype(helvetica, 20) if os.path.exists(helvetica) else ImageFont.load_default()
    small_font = ImageFont.truetype(helvetica, 16) if os.path.exists(helvetica) else ImageFont.load_default()

    text_x = vial_x + target_w + 50

    # Category badge
    badge_x, badge_y = text_x, 130
    badge_w = len(info["category"]) * 13 + 30
    draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + 30], radius=15, fill=(37, 99, 235))
    draw.text((text_x + badge_w // 2, badge_y + 15), info["category"], fill=(255, 255, 255), font=badge_font, anchor="mm")

    # Title
    title_y = badge_y + 55
    draw.text((text_x, title_y), info["title"], fill=(15, 30, 50), font=title_font)

    # Subtitle
    subtitle_y = title_y + 65
    draw.text((text_x, subtitle_y), info["subtitle"], fill=(37, 99, 235), font=subtitle_font)

    # Description
    y_off = subtitle_y + 55
    for line in info["desc"]:
        draw.text((text_x, y_off), line, fill=(100, 116, 139), font=body_font)
        y_off += 28

    # ViralPeps branding
    draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=small_font)

    # Blue accent stripe
    draw.rounded_rectangle([0, card_h-4, card_w, card_h], radius=0, fill=(37, 99, 235))

    out_path = f"public/images/guides/{slug}.png"
    card.save(out_path, "PNG", quality=97)
    print(f"Saved: {out_path} ({os.path.getsize(out_path)} bytes)")
