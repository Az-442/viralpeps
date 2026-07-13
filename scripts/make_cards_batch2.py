from PIL import Image, ImageDraw, ImageFont
import os

def make_card(compound, dosage, category, subheading, desc_lines, vial_source, output_path):
    card_w, card_h = 1200, 675
    card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
    draw = ImageDraw.Draw(card)

    for y in range(card_h):
        ratio = y / card_h
        r = int(245 - ratio * 15)
        g = int(248 - ratio * 15)
        b = int(255 - ratio * 15)
        for x in range(card_w):
            draw.point((x, y), fill=(r, g, b))

    draw.ellipse([-80, -80, 250, 250], fill=(230, 240, 255))
    draw.ellipse([card_w - 180, card_h - 180, card_w + 80, card_h + 80], fill=(240, 245, 255))

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
    print(f"  ✓ {output_path} ({os.path.getsize(output_path)} bytes)")


def make_comparison_card(compound1, dosage1, vial1, compound2, dosage2, vial2, title, desc_lines, output_path):
    card_w, card_h = 1200, 675
    card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
    draw = ImageDraw.Draw(card)

    for y in range(card_h):
        ratio = y / card_h
        r = int(245 - ratio * 15)
        g = int(248 - ratio * 15)
        b = int(255 - ratio * 15)
        for x in range(card_w):
            draw.point((x, y), fill=(r, g, b))

    draw.ellipse([-80, -80, 250, 250], fill=(230, 240, 255))
    draw.ellipse([card_w - 180, card_h - 180, card_w + 80, card_h + 80], fill=(240, 245, 255))

    h = "/System/Library/Fonts/Helvetica.ttc"
    if os.path.exists(h):
        tf = ImageFont.truetype(h, 48, index=1)
        bf = ImageFont.truetype(h, 14)
        df = ImageFont.truetype(h, 20)
        smf = ImageFont.truetype(h, 16)
    else:
        tf = bf = df = smf = ImageFont.load_default()

    # Load and resize vials - smaller for side by side
    v1 = Image.open(vial1)
    v2 = Image.open(vial2)

    vial_h = int(card_h * 0.7)
    v1w = int(vial_h * v1.width / v1.height)
    v2w = int(vial_h * v2.width / v2.height)

    v1r = v1.resize((v1w, vial_h), Image.LANCZOS)
    v2r = v2.resize((v2w, vial_h), Image.LANCZOS)

    # Position two vials side by side in center-left area
    total_vial_w = v1w + v2w + 30  # 30px gap
    start_x = (card_w // 2 - total_vial_w) // 2
    vy = (card_h - vial_h) // 2

    card.paste(v1r, (start_x, vy), v1r if v1.mode == "RGBA" else None)
    card.paste(v2r, (start_x + v1w + 30, vy), v2r if v2.mode == "RGBA" else None)

    # Separator line between vials
    sep_x = start_x + v1w + 15
    draw.line([(sep_x, vy - 10), (sep_x, vy + vial_h + 10)], fill=(37, 99, 235), width=2)

    # Text on right side
    tx = card_w // 2 + 20

    # Badge
    bx, by = tx, 130
    draw.rounded_rectangle([bx, by, bx + 140, by + 30], radius=15, fill=(37, 99, 235))
    draw.text((bx + 70, by + 15), "COMPARISON", fill=(255, 255, 255), font=bf, anchor="mm")

    # Title
    draw.text((tx, by + 55), title, fill=(15, 30, 50), font=tf)

    # Compound names under title
    cf = ImageFont.truetype(h, 22, index=1) if os.path.exists(h) else ImageFont.load_default()
    draw.text((tx, by + 115), f"{compound1} vs {compound2}", fill=(37, 99, 235), font=cf)

    # Description
    yo = by + 160
    for line in desc_lines:
        draw.text((tx, yo), line, fill=(100, 116, 139), font=df)
        yo += 30

    # Footer
    draw.text((tx, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=smf)
    draw.rounded_rectangle([0, card_h - 4, card_w, card_h], radius=0, fill=(37, 99, 235))

    card.save(output_path, "PNG", quality=97)
    print(f"  ✓ {output_path} ({os.path.getsize(output_path)} bytes)")


# Semax
print("Semax card...")
make_card("Semax", "600mcg", "Compound Profile", "Research Summary",
    ["Overview of Semax, a synthetic ACTH(4-10)", "analog that upregulates BDNF and NGF for", "neuroprotection and cognitive research."],
    "public/images/compounds/semax-vial.png",
    "public/images/guides/semax-summary.png")

# Selank
print("Selank card...")
make_card("Selank", "600mcg", "Compound Profile", "Research Summary",
    ["Overview of Selank (TP-7), a synthetic", "heptapeptide tuftsin analog with anxiolytic", "and nootropic properties."],
    "public/images/compounds/selank-vial.png",
    "public/images/guides/selank-summary.png")

# Retatrutide vs Tirzepatide comparison
print("Comparison card...")
make_comparison_card(
    "Retatrutide", "10mg", "public/images/compounds/retatrutide-vial.png",
    "Tirzepatide", "10mg", "public/images/compounds/tirzepatide-vial.png",
    "Retatrutide vs Tirzepatide",
    ["Triple vs dual agonist showdown — mechanism,",
     "clinical data, liver fat reduction, and where",
     "each stands in metabolic research."],
    "public/images/guides/retatrutide-vs-tirzepatide.png"
)

print("\nAll done!")
