"""Create the CJC-1295 + Ipamorelin Blend guide card."""
from PIL import Image, ImageDraw, ImageFont
import os

font_dir = "/System/Library/Fonts"
helvetica = os.path.join(font_dir, "Helvetica.ttc")
if os.path.exists(helvetica):
    title_font = ImageFont.truetype(helvetica, 40, index=1)
    subtitle_font = ImageFont.truetype(helvetica, 30)
    badge_font = ImageFont.truetype(helvetica, 14)
    body_font = ImageFont.truetype(helvetica, 20)
    small_font = ImageFont.truetype(helvetica, 16)
else:
    title_font = subtitle_font = badge_font = body_font = small_font = ImageFont.load_default()

card_w, card_h = 1200, 675
BLUE = (37, 99, 235)

COMPOUND = "CJC-1295 + Ipamorelin"
VIAL_A = "public/images/compounds/cjc-1295-vial.png"
VIAL_B = "public/images/compounds/ipamorelin-vial.png"
OUTPUT = "public/images/guides/cjc1295-ipamorelin-blend-summary.png"
DESC = [
    "Overview of the CJC-1295 + Ipamorelin blend,",
    "a dual-mechanism growth-hormone stack pairing",
    "a long-acting GHRH analogue with a selective",
    "ghrelin-receptor secretagogue.",
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

# Two vials side by side in left half
card_w_left = card_w // 2
# Square vials ~200px each, spaced within left half
vial_w = 200
vial_h = 200

def paste_vial(path, x_center, y_center):
    if not os.path.exists(path):
        print(f"MISSING vial: {path}")
        return
    vial = Image.open(path)
    ratio = vial.width / vial.height
    w = vial_w
    h = int(w / ratio)
    if h > vial_h:
        h = vial_h
        w = int(h * ratio)
    vial_r = vial.resize((w, h), Image.LANCZOS)
    x = x_center - w // 2
    y = y_center - h // 2
    if vial_r.mode == "RGBA":
        card.paste(vial_r, (x, y), vial_r)
    else:
        card.paste(vial_r, (x, y))

center_y = card_h // 2
# Position two vials fully visible within left half
vial_y_center = center_y + 10
paste_vial(VIAL_A, 190, vial_y_center)
paste_vial(VIAL_B, 410, vial_y_center)

# Vertical separator line between vials
sep_x = 300
draw.line([(sep_x, 80), (sep_x, card_h - 80)], fill=BLUE, width=2)

text_x = card_w_left + 40

# Badge
badge_x, badge_y = text_x, 140
draw.rounded_rectangle([badge_x, badge_y, badge_x + 170, badge_y + 30], radius=15, fill=BLUE)
draw.text((badge_x + 85, badge_y + 15), "Compound Profile", fill=(255, 255, 255), font=badge_font, anchor="mm")

# Title
draw.text((text_x, badge_y + 55), COMPOUND, fill=(15, 30, 50), font=title_font)

# Subtitle
draw.text((text_x, badge_y + 110), "Research Summary", fill=BLUE, font=subtitle_font)

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
