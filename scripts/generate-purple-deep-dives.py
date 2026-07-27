"""Generate 3 purple/lavender deep dive images for BPC-157, Tirzepatide, Semaglutide."""
from PIL import Image, ImageDraw, ImageFont
import os

font_dir = "/System/Library/Fonts"
helvetica = os.path.join(font_dir, "Helvetica.ttc")
if os.path.exists(helvetica):
    title_font = ImageFont.truetype(helvetica, 48, index=1)
    subtitle_font = ImageFont.truetype(helvetica, 26)
    badge_font = ImageFont.truetype(helvetica, 14)
    body_font = ImageFont.truetype(helvetica, 18)
    small_font = ImageFont.truetype(helvetica, 14)
else:
    title_font = subtitle_font = badge_font = body_font = small_font = ImageFont.load_default()

card_w, card_h = 1200, 675
PURPLE_ACCENT = (124, 58, 237)
DARK = (30, 41, 59)
BODY_COLOR = (100, 116, 139)
WHITE = (255, 255, 255)


def draw_purple_deep_dive(compound, vial_path, output_path, description_lines):
    card = Image.new("RGB", (card_w, card_h), WHITE)
    draw = ImageDraw.Draw(card)

    # Purple/lavender gradient background
    for y in range(card_h):
        ratio = y / card_h
        r = int(245 - ratio * 12)
        g = int(235 - ratio * 10)
        b = int(255 - ratio * 8)
        for x in range(card_w):
            draw.point((x, y), fill=(r, g, b))

    # Decorative circles (light purple)
    draw.ellipse([-80, -80, 250, 250], fill=(237, 233, 254))
    draw.ellipse([card_w - 180, card_h - 180, card_w + 80, card_h + 80], fill=(237, 233, 254))

    # Vial image (left side)
    if os.path.exists(vial_path):
        vial = Image.open(vial_path).convert("RGBA")
        vial_h = int(card_h * 0.75)
        vial_w = int(vial_h * vial.width / vial.height)
        vial = vial.resize((vial_w, vial_h), Image.LANCZOS)
        card.paste(vial, (50, int((card_h - vial_h) / 2)), vial)
        text_left = 50 + vial_w + 40
    else:
        text_left = 50

    # Badge (purple)
    badge_text = "Deep Dive Report"
    text_w = draw.textlength(badge_text, font=badge_font)
    badge_w = int(text_w + 20)
    badge_h = 24
    draw.rounded_rectangle(
        [text_left, 50, text_left + badge_w, 50 + badge_h],
        radius=4, fill=PURPLE_ACCENT,
    )
    draw.text((text_left + 10, 53), badge_text, fill=WHITE, font=badge_font)

    # Title
    draw.text((text_left, 90), compound, fill=DARK, font=title_font)

    # Subtitle (purple)
    draw.text((text_left, 154), "Deep Dive", fill=PURPLE_ACCENT, font=subtitle_font)

    # Description
    desc_y = 200
    for line in description_lines:
        draw.text((text_left, desc_y), line, fill=BODY_COLOR, font=body_font)
        desc_y += 28

    # Footer
    draw.text((text_left, card_h - 50), "viralpeps.co.uk", fill=PURPLE_ACCENT, font=small_font)

    # Accent stripe (purple)
    draw.rectangle([0, card_h - 4, card_w, card_h], fill=PURPLE_ACCENT)

    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
    card.save(output_path, quality=97)
    return os.path.abspath(output_path)


CARDS = [
    {
        "compound": "BPC-157",
        "vial_path": "public/images/compounds/bpc-157-vial.png",
        "output_path": "public/images/guides/bpc157-deep-dive-2.png",
        "description_lines": [
            "BPC-157 deep dive: mechanisms, tissue regeneration,",
            "gastrointestinal healing, tendon repair, dosing",
            "protocols, and current research evidence.",
        ],
    },
    {
        "compound": "Tirzepatide",
        "vial_path": "public/images/compounds/tirzepatide-vial.png",
        "output_path": "public/images/guides/tirzepatide-deep-dive-2.png",
        "description_lines": [
            "Tirzepatide deep dive: dual GIP/GLP-1 agonist",
            "for metabolic research, superior weight loss,",
            "glycemic control, and cardiovascular outcomes.",
        ],
    },
    {
        "compound": "Semaglutide",
        "vial_path": "public/images/compounds/semaglutide-vial.png",
        "output_path": "public/images/guides/semaglutide-deep-dive.png",
        "description_lines": [
            "Semaglutide deep dive: GLP-1 receptor agonist for",
            "type 2 diabetes, obesity research, cardiovascular",
            "outcomes, and metabolic health applications.",
        ],
    },
]

if __name__ == "__main__":
    root = os.path.join(os.path.dirname(__file__), "..")
    for card in CARDS:
        vp = os.path.join(root, card["vial_path"])
        op = os.path.join(root, card["output_path"])
        draw_purple_deep_dive(card["compound"], vp, op, card["description_lines"])
        kb = os.path.getsize(op)//1024
        print(f"  ✓ {card['output_path']} ({kb} KB)")
