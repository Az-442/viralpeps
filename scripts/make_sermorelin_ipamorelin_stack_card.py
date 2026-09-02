"""Create the Sermorelin + Ipamorelin (muscle-growth stack) guide card.
Two-vial layout matching the proven make_cjc_ipamorelin_blend_card.py (GHK-vs-BPC style)."""
from PIL import Image, ImageDraw, ImageFont
import os

font_dir = "/System/Library/Fonts"
helvetica = os.path.join(font_dir, "Helvetica.ttc")
if os.path.exists(helvetica):
    title_font = ImageFont.truetype(helvetica, 40, index=1)
    subtitle_font = ImageFont.truetype(helvetica, 28)
    badge_font = ImageFont.truetype(helvetica, 14)
    body_font = ImageFont.truetype(helvetica, 20)
    small_font = ImageFont.truetype(helvetica, 16)
else:
    title_font = subtitle_font = badge_font = body_font = small_font = ImageFont.load_default()

card_w, card_h = 1200, 675
BLUE = (37, 99, 235)

COMPOUND = "Sermorelin + Ipamorelin"
VIAL_A = "public/images/compounds/sermorelin-vial.png"
VIAL_B = "public/images/compounds/ipamorelin-vial.png"
OUTPUT = "public/images/guides/sermorelin-ipamorelin-muscle-growth-stack.png"
DESC = [
    "The goal-stack for lean mass: a GHRH",
    "analog raising GH pulse amplitude and a",
    "selective ghrelin-receptor secretagogue",
    "raising GH pulse frequency, through",
    "non-competing receptors.",
]

card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
draw = ImageDraw.Draw(card)

# Gradient background (same as other cards)
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

# Two vials side by side at 50% card height (GHK-vs-BPC style, large)
vial_h = int(card_h * 0.50)  # 337px
gap = 18
start_x = 40

def paste_vial(path, x, y_top):
    if not os.path.exists(path):
        print(f"MISSING vial: {path}")
        return 0
    vial = Image.open(path).convert("RGBA")
    vw = int(vial_h * vial.width / vial.height)
    vial = vial.resize((vw, vial_h), Image.LANCZOS)
    card.paste(vial, (x, y_top), vial)
    return vw

center_y = int((card_h - vial_h) / 2)
_a = Image.open(VIAL_A).convert("RGBA")
_aw = int(vial_h * _a.width / _a.height)
paste_vial(VIAL_A, 40, center_y)
_b = Image.open(VIAL_B).convert("RGBA")
_bw = int(vial_h * _b.width / _b.height)
paste_vial(VIAL_B, 40 + _aw + 18, center_y)
text_x = 40 + _aw + 18 + _bw + 30

# Badge
badge_x, badge_y = text_x, 140
draw.rounded_rectangle([badge_x, badge_y, badge_x + 170, badge_y + 30], radius=15, fill=BLUE)
draw.text((badge_x + 85, badge_y + 15), "Goal Stack", fill=(255, 255, 255), font=badge_font, anchor="mm")

# Title — auto-fit font size so the full title fits on one line within the text column
title_avail = card_w - text_x - 10
title_size = 40
title_font_t = title_font
while title_size >= 18:
    title_font_t = ImageFont.truetype(helvetica, title_size, index=1)
    tw = draw.textlength(COMPOUND, font=title_font_t)
    if tw <= title_avail:
        break
    title_size -= 2
draw.text((text_x, badge_y + 55), COMPOUND, fill=(15, 30, 50), font=title_font_t)
print("title font size:", title_size)

# Subtitle
draw.text((text_x, badge_y + 110), "Muscle Growth Stack", fill=BLUE, font=subtitle_font)

# Description
y_off = badge_y + 165
for line in DESC:
    draw.text((text_x, y_off), line, fill=(100, 116, 139), font=body_font)
    y_off += 30

# Footer
draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=small_font)

# Blue accent stripe
draw.rounded_rectangle([0, card_h - 4, card_w, card_h], radius=0, fill=BLUE)

card.save(OUTPUT, "PNG", quality=97)
print(f"Saved: {OUTPUT} ({os.path.getsize(OUTPUT)} bytes)")
