from PIL import Image, ImageDraw, ImageFont
import os, sys

# === CONFIG FROM ARGS ===
if len(sys.argv) < 2:
    print("Usage: python3 create_deep_dive_card.py <compound>")
    print("Compounds: ghk-cu, retatrutide, semax")
    sys.exit(1)

compound_arg = sys.argv[1].lower()

COMPOUNDS = {
    "ghk-cu": {
        "name": "GHK-Cu",
        "dosage": "50mg",
        "lines": [
            "A comprehensive analysis of GHK-Cu (Copper Peptide),",
            "its mechanism as a copper-binding tripeptide for",
            "tissue regeneration, wound healing, anti-aging",
            "research, collagen synthesis, and hair regrowth.",
            "Naturally occurring in human plasma.",
        ],
        "vial": "public/images/compounds/ghk-cu-vial.png",
    },
    "retatrutide": {
        "name": "Retatrutide",
        "dosage": "10mg",
        "lines": [
            "A comprehensive analysis of Retatrutide, a triple",
            "agonist of GIP, GLP-1, and glucagon receptors for",
            "metabolic research. Phase 2 trials show significant",
            "weight reduction and glycemic control improvements.",
            "Developed by Eli Lilly.",
        ],
        "vial": "public/images/compounds/retatrutide-vial.png",
    },
    "semax": {
        "name": "Semax",
        "dosage": "10mg",
        "lines": [
            "A comprehensive analysis of Semax, a synthetic",
            "ACTH(4-7) peptide fragment with nootropic and",
            "neuroprotective properties. Research covers BDNF",
            "upregulation, cognitive enhancement, stroke recovery,",
            "and neuroplasticity. Developed in Russia.",
        ],
        "vial": "public/images/compounds/semax-vial.png",
    },
}

if compound_arg not in COMPOUNDS:
    print(f"Unknown compound: {compound_arg}")
    print(f"Available: {', '.join(COMPOUNDS.keys())}")
    sys.exit(1)

cfg = COMPOUNDS[compound_arg]
COMPOUND = cfg["name"]
DOSAGE = cfg["dosage"]
DESCRIPTION_LINES = cfg["lines"]
VIAL_SOURCE = cfg["vial"]
OUTPUT_PATH = f"public/images/guides/{compound_arg}-deep-dive.png"

# Purple palette
PURPLE = (124, 58, 237)
PURPLE_DARK = (109, 40, 217)
PURPLE_LIGHT = (237, 233, 254)
DARK_TEXT = (15, 30, 50)
BODY_TEXT = (100, 116, 139)
FOOTER_TEXT = (148, 163, 184)
BG_START = (248, 247, 255)
BG_END = (240, 238, 255)

card_w, card_h = 1200, 675
card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
draw = ImageDraw.Draw(card)

# Background gradient (subtle purple-tinted)
for y in range(card_h):
    ratio = y / card_h
    r = int(BG_START[0] - ratio * (BG_START[0] - BG_END[0]))
    g = int(BG_START[1] - ratio * (BG_START[1] - BG_END[1]))
    b = int(BG_START[2] - ratio * (BG_START[2] - BG_END[2]))
    for x in range(card_w):
        draw.point((x, y), fill=(r, g, b))

# Decorative circles (purple-tinted)
draw.ellipse([-80, -80, 250, 250], fill=PURPLE_LIGHT)
draw.ellipse([card_w - 180, card_h - 180, card_w + 80, card_h + 80], fill=PURPLE_LIGHT)
draw.ellipse([card_w // 2 - 100, -120, card_w // 2 + 100, 80], fill=PURPLE_LIGHT)

# Open and resize vial
if os.path.exists(VIAL_SOURCE):
    vial = Image.open(VIAL_SOURCE)
else:
    # Try alternate paths
    for alt in [f"public/images/compounds/{compound_arg}.png",
                f"public/images/compounds/{compound_arg.replace('-','')}.png"]:
        if os.path.exists(alt):
            vial = Image.open(alt)
            break
    else:
        print(f"Vial image not found for {COMPOUND}")
        sys.exit(1)

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

# Load fonts
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

# Text area
text_x = vial_x + target_w + 50

# Category badge (purple)
badge_x, badge_y = text_x, 120
draw.rounded_rectangle([badge_x, badge_y, badge_x + 200, badge_y + 32], radius=16, fill=PURPLE)
draw.text((badge_x + 100, badge_y + 16), "Deep Dive Report", fill=(255, 255, 255), font=badge_font, anchor="mm")

# Title
draw.text((text_x, badge_y + 55), COMPOUND, fill=DARK_TEXT, font=title_font)

# Subtitle (purple)
draw.text((text_x, badge_y + 125), "Deep Dive", fill=PURPLE, font=subtitle_font)

# Description
y_off = badge_y + 185
for line in DESCRIPTION_LINES:
    draw.text((text_x, y_off), line, fill=BODY_TEXT, font=body_font)
    y_off += 28

# Footer
draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=FOOTER_TEXT, font=small_font)

# Purple accent stripe at bottom
draw.rounded_rectangle([0, card_h - 4, card_w, card_h], radius=0, fill=PURPLE)

# Save
card.save(OUTPUT_PATH, "PNG", quality=97)
print(f"Saved: {OUTPUT_PATH} ({os.path.getsize(OUTPUT_PATH)} bytes)")
