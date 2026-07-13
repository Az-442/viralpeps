"""Generate 4 guide card images for GHK-Cu, Retatrutide, Semax, Selank."""
from PIL import Image, ImageDraw, ImageFont
import os

COMPOUNDS = [
    {
        "name": "GHK-Cu",
        "dosage": "50mg",
        "category": "Compound Profile",
        "subheading": "Research Summary",
        "desc": [
            "Overview of GHK-Cu, a naturally occurring copper",
            "peptide complex that modulates gene expression,",
            "promotes tissue repair and supports skin health.",
        ],
        "output": "public/images/guides/ghkcu-summary.png",
    },
    {
        "name": "Retatrutide",
        "dosage": "10mg",
        "category": "Compound Profile",
        "subheading": "Research Summary",
        "desc": [
            "Overview of Retatrutide (LY3437943), a first-in-class",
            "triple GLP-1/GIP/glucagon receptor agonist for",
            "metabolic and obesity research.",
        ],
        "output": "public/images/guides/retatrutide-summary.png",
    },
    {
        "name": "Semax",
        "dosage": "30mg",
        "category": "Compound Profile",
        "subheading": "Research Summary",
        "desc": [
            "Overview of Semax, a synthetic ACTH(4-10) analog",
            "that upregulates BDNF and NGF for neuroprotection,",
            "cognitive enhancement and stroke recovery research.",
        ],
        "output": "public/images/guides/semax-summary.png",
    },
    {
        "name": "Selank",
        "dosage": "5mg",
        "category": "Compound Profile",
        "subheading": "Research Summary",
        "desc": [
            "Overview of Selank (TP-7), a synthetic heptapeptide",
            "tuftsin analog with anxiolytic and nootropic",
            "properties for neuropeptide research.",
        ],
        "output": "public/images/guides/selank-summary.png",
    },
]

VIAL_SOURCE = "public/images/compounds/viralpeps-vial-simple.png"
vial = Image.open(VIAL_SOURCE)

font_dir = "/System/Library/Fonts"
helvetica = os.path.join(font_dir, "Helvetica.ttc")

for c in COMPOUNDS:
    card_w, card_h = 1200, 675
    card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
    draw = ImageDraw.Draw(card)

    # Background gradient (subtle blue to white)
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

    # Resize and paste vial
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

    # Fonts
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
    draw.text((text_x, badge_y + 15), c["category"], fill=(255, 255, 255), font=badge_font, anchor="mm")

    # Title
    title_y = badge_y + 55
    draw.text((text_x, title_y), c["name"], fill=(15, 30, 50), font=title_font)

    # Subtitle
    draw.text((text_x, title_y + 70), c["subheading"], fill=(37, 99, 235), font=subtitle_font)

    # Description
    y_off = title_y + 130
    for line in c["desc"]:
        draw.text((text_x, y_off), line, fill=(100, 116, 139), font=body_font)
        y_off += 30

    # Footer
    draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=small_font)

    # Blue accent stripe
    draw.rounded_rectangle([0, card_h - 4, card_w, card_h], radius=0, fill=(37, 99, 235))

    card.save(c["output"], "PNG", quality=97)
    print(f"Saved: {c['output']}")

print("All 4 guide cards generated.")
