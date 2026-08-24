#!/usr/bin/env python3
"""Add circle/highlight annotations — one per widget — to both demo screenshots.

Widget demo  → highlight the EXPANDED TrustScore card (1 widget).
Verified demo → highlight all 3 widgets: top Verified bar, Learn button, collapsed badge.
"""
from PIL import Image, ImageDraw, ImageFont
import os

SCREENS = "/Users/time4you/viralpeps/tmp/demo-screenshots"

# Royal blue highlight + label text
HIGHLIGHT = (37, 99, 235, 255)       # #2563eb
FILL = (37, 99, 235, 60)             # translucent fill
LABEL_BG = (11, 26, 46, 255)         # navy label chip
LABEL_FG = (255, 255, 255, 255)

def font(size):
    """Best available TTF font."""
    for p in [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
    ]:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()

def round_rect(d, box, radius=14):
    d.rounded_rectangle(box, radius=radius, outline=HIGHLIGHT, width=4, fill=FILL)

def label(d, x, y, text):
    f = font(22)
    tw = d.textlength(text, font=f) + 20
    th = 34
    # chip with small pointer
    d.rounded_rectangle([x, y, x + tw, y + th], radius=8, fill=LABEL_BG)
    d.text((x + 10, y + (th - 24) / 2), text, font=f, fill=LABEL_FG)

def annotate(src, out, boxes):
    img = Image.open(src).convert("RGBA")
    ov = Image.new("RGBA", img.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(ov)
    for (x1, y1, x2, y2), txt in boxes:
        # align label above box, clamp to top of image
        ly = y1 - 42
        if ly < 6:
            ly = y2 + 6
        d.rounded_rectangle([x1, y1, x2, y2], radius=14, outline=HIGHLIGHT, width=4, fill=FILL)
        label(d, x1, ly, txt)
    img = Image.alpha_composite(img, ov).convert("RGB")
    img.save(out)
    print("wrote", out)

# WIDGET DEMO — highlight the EXPANDED card only
annotate(
    os.path.join(SCREENS, "trustscore-widget-demo.png"),
    os.path.join(SCREENS, "trustscore-widget-demo-annotated.png"),
    [
        ((983, 265, 1263, 560), "TrustScore widget"),
    ],
)

# VERIFIED DEMO — highlight all 3 widgets
annotate(
    os.path.join(SCREENS, "verified-demo-top.png"),
    os.path.join(SCREENS, "verified-demo-annotated.png"),
    [
        ((645, 296, 885, 378), "Learn widget"),
        ((1055, 575, 1265, 615), "TrustScore badge"),
        ((0, 0, 1280, 26), "Verified bar"),
    ],
)
