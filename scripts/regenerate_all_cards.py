"""Regenerate ALL compound profile cards with consistent template.
Matches Sermorelin style: solid gradient, circles (230,240,255), 540px vial."""

from PIL import Image, ImageDraw, ImageFont
import os, json

# === ALL compound profile cards ===
CARDS = [
    ("BPC-157", "public/images/compounds/bpc-157-vial.png", "public/images/guides/bpc157-summary.png",
     ["Overview of BPC-157, its research", "applications, dosing protocols,", "and current literature."]),
    ("Tirzepatide", "public/images/compounds/tirzepatide-vial.png", "public/images/guides/tirzepatide-summary.png",
     ["Overview of Tirzepatide as a dual", "GIP/GLP-1 receptor agonist for", "metabolic research."]),
    ("GHK-Cu", "public/images/compounds/ghk-cu-vial.png", "public/images/guides/ghkcu-summary.png",
     ["Overview of GHK-Cu, a naturally", "occurring copper peptide complex", "for tissue repair research."]),
    ("Retatrutide", "public/images/compounds/retatrutide-vial.png", "public/images/guides/retatrutide-summary.png",
     ["Overview of Retatrutide (LY3437943),", "a first-in-class triple GLP-1/GIP/", "glucagon receptor agonist."]),
    ("Semax", "public/images/compounds/semax-vial.png", "public/images/guides/semax-summary.png",
     ["Overview of Semax, a synthetic", "ACTH(4-10) analog for neuro-", "protection and cognitive research."]),
    ("Selank", "public/images/compounds/selank-vial.png", "public/images/guides/selank-summary.png",
     ["Overview of Selank (TP-7), a", "synthetic heptapeptide with", "anxiolytic and nootropic properties."]),
    ("Oxytocin", "public/images/compounds/oxytocin-vial.png", "public/images/guides/oxytocin-research-summary.png",
     ["Overview of Oxytocin, a cyclic", "nonapeptide neuropeptide hormone", "involved in social bonding research."]),
    ("Tesamorelin", "public/images/compounds/tesamorelin-vial.png", "public/images/guides/tesamorelin-research-summary.png",
     ["Overview of Tesamorelin, a", "synthetic GHRH analogue for", "pulsatile GH release research."]),
    ("Melanotan II", "public/images/compounds/melanotan-ii-vial.png", "public/images/guides/melanotan2-research-summary.png",
     ["Overview of Melanotan II (MT2),", "a synthetic α-MSH analog for", "pigmentation research."]),
    ("Sermorelin", "public/images/compounds/sermorelin-vial.png", "public/images/guides/sermorelin-research-summary.png",
     ["Overview of Sermorelin, the first", "FDA-approved GHRH(1-29) analogue", "for pulsatile GH release research."]),
    ("TB-500", "public/images/compounds/tb-500-vial.png", "public/images/guides/tb500-research-summary.png",
     ["Overview of TB-500 (Thymosin Beta-4),", "its actin-regulating mechanisms,", "and tissue repair research."]),
    ("AOD 9604", "public/images/compounds/aod-9604-vial.png", "public/images/guides/aod9604-research-summary.png",
     ["Overview of AOD-9604, the hGH", "fragment for lipolysis and", "fat metabolism research."]),
    ("CJC-1295", "public/images/compounds/cjc-1295-vial.png", "public/images/guides/cjc1295-research-summary.png",
     ["Overview of CJC-1295, the GHRH", "analog for sustained GH and", "IGF-1 research."]),
    ("Ipamorelin", "public/images/compounds/ipamorelin-vial.png", "public/images/guides/ipamorelin-research-summary.png",
     ["Overview of Ipamorelin, the", "selective GH secretagogue for", "GH pulse research."]),
    ("PT-141", "public/images/compounds/pt-141-vial.png", "public/images/guides/pt141-research-summary.png",
     ["Overview of PT-141 (Bremelanotide),", "an FDA-approved melanocortin", "receptor agonist for HSDD research."]),
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
BLUE = (37, 99, 235)

for compound, vial_path, output_path, desc_lines in CARDS:
    card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
    draw = ImageDraw.Draw(card)

    # Solid gradient — every pixel
    for y in range(card_h):
        ratio = y / card_h
        r = int(245 - ratio * 15)
        g = int(248 - ratio * 15)
        b = int(255 - ratio * 15)
        for x in range(card_w):
            draw.point((x, y), fill=(r, g, b))

    # Decorative circles — both same color
    draw.ellipse([-80, -80, 250, 250], fill=(230, 240, 255))
    draw.ellipse([card_w - 180, card_h - 180, card_w + 80, card_h + 80], fill=(230, 240, 255))

    # Vial
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
    draw.rounded_rectangle([badge_x, badge_y, badge_x + 170, badge_y + 30], radius=15, fill=BLUE)
    draw.text((badge_x + 85, badge_y + 15), "Compound Profile", fill=(255, 255, 255), font=badge_font, anchor="mm")

    # Title
    draw.text((text_x, badge_y + 55), compound, fill=(15, 30, 50), font=title_font)

    # Subtitle
    draw.text((text_x, badge_y + 125), "Research Summary", fill=BLUE, font=subtitle_font)

    # Description
    y_off = badge_y + 185
    for line in desc_lines:
        draw.text((text_x, y_off), line, fill=(100, 116, 139), font=body_font)
        y_off += 30

    # Footer
    draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=small_font)

    # Blue accent stripe
    draw.rounded_rectangle([0, card_h - 4, card_w, card_h], radius=0, fill=BLUE)

    card.save(output_path, "PNG", quality=97)
    sz = os.path.getsize(output_path)
    print(f"  ✓ {os.path.basename(output_path)} ({sz//1024}KB)")

print(f"\nDone! {len(CARDS)} cards regenerated.")
