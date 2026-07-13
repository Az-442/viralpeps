from PIL import Image, ImageDraw, ImageFont
import os, sys

def make_card(compound, dosage, category, subheading, desc_lines, vial_source, output_path):
    card_w, card_h = 1200, 675
    card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
    draw = ImageDraw.Draw(card)

    # Gradient bg
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

    # Vial
    vial = Image.open(vial_source)
    vr = vial.width / vial.height
    th = int(card_h * 0.8)
    tw = int(th * vr)
    if tw > card_w // 2 - 40:
        tw = card_w // 2 - 60
        th = int(tw / vr)
    vial_r = vial.resize((tw, th), Image.LANCZOS)
    vx, vy = 50, (card_h - th) // 2
    card.paste(vial_r, (vx, vy), vial_r if vial.mode == "RGBA" else None)

    # Fonts
    h = "/System/Library/Fonts/Helvetica.ttc"
    if os.path.exists(h):
        tf = ImageFont.truetype(h, 54, index=1)
        sf = ImageFont.truetype(h, 30)
        bf = ImageFont.truetype(h, 14)
        df = ImageFont.truetype(h, 20)
        smf = ImageFont.truetype(h, 16)
    else:
        tf = sf = bf = df = smf = ImageFont.load_default()

    tx = vx + tw + 50
    bx, by = tx, 140
    draw.rounded_rectangle([bx, by, bx + 170, by + 30], radius=15, fill=(37, 99, 235))
    draw.text((bx + 85, by + 15), category, fill=(255, 255, 255), font=bf, anchor="mm")
    draw.text((tx, by + 55), compound, fill=(15, 30, 50), font=tf)
    draw.text((tx, by + 125), subheading, fill=(37, 99, 235), font=sf)
    yo = by + 185
    for line in desc_lines:
        draw.text((tx, yo), line, fill=(100, 116, 139), font=df)
        yo += 30
    draw.text((tx, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=smf)
    draw.rounded_rectangle([0, card_h - 4, card_w, card_h], radius=0, fill=(37, 99, 235))

    card.save(output_path, "PNG", quality=97)
    sz = os.path.getsize(output_path)
    print(f"✓ {output_path} ({sz} bytes)")

# GHK-Cu
make_card("GHK-Cu", "50mg", "Compound Profile", "Research Summary",
    ["Overview of GHK-Cu, a naturally occurring", "copper peptide complex that modulates gene", "expression and promotes tissue repair."],
    "public/images/compounds/ghk-cu-vial.png",
    "public/images/guides/ghkcu-summary.png")

# Retatrutide
make_card("Retatrutide", "10mg", "Compound Profile", "Research Summary",
    ["Overview of Retatrutide (LY3437943), a", "first-in-class triple GLP-1/GIP/glucagon", "receptor agonist for metabolic research."],
    "public/images/compounds/retatrutide-vial.png",
    "public/images/guides/retatrutide-summary.png")
