import os
from PIL import ImageFont, ImageDraw, Image
helvetica = "/System/Library/Fonts/Helvetica.ttc"
title_font = ImageFont.truetype(helvetica, 42, index=1)
img = Image.new("RGB", (10,10)); draw = ImageDraw.Draw(img)

card_w = 1200
# dual-vial: vial_h = 0.5*675 = 337; measure vial widths
for name, vp in [("bpc","public/images/compounds/bpc-157-vial.png"),("tb","public/images/compounds/tb-500-vial.png")]:
    im = Image.open(vp)
    vh = int(675*0.50); vw = int(vh*im.width/im.height)
    print(name, "vw", vw)

# replicate layout
vh = int(675*0.50); gap=18; start_x=40
for vp in ["public/images/compounds/bpc-157-vial.png","public/images/compounds/tb-500-vial.png"]:
    im=Image.open(vp); vw=int(vh*im.width/im.height); start_x += vw+gap
text_left = start_x+30
max_w = card_w - text_left - 25
print("text_left", text_left, "max title width", max_w)

for t in ["Recovery Peptides UK","Recovery Peptides","Recovery Peptide UK","Recovery Peptides","Recovery Aisle UK"]:
    print(t, "->", draw.textlength(t, font=title_font))
