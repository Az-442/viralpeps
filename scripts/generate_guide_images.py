#!/usr/bin/env python3
"""
Generate 6 photorealistic product vial images for ViralPeps.co.uk guide cards.
Renders glass vials with VIRALPEPS branding using Python Pillow.
Output: 800x450 PNG files in /Users/time4you/viralpeps/public/images/guides/

V2: Much more opaque and colorful elements for better visibility.
"""

from PIL import Image, ImageDraw, ImageFont, ImageFilter
import math
import os

# ─── Colour palette ────────────────────────────────────────────────────────

GUIDES = {
    "peptide-reconstitution": {
        "title": "Peptide Reconstitution Guide",
        "cap": (37, 99, 235),         # Blue
        "cap_light": (80, 140, 255),
        "accent": (37, 99, 235),
        "liquid": (100, 200, 150),
        "elements": "syringe",
        "short": "Reconstitution",
    },
    "peptide-purity": {
        "title": "Understanding Peptide Purity",
        "cap": (200, 169, 50),         # Gold
        "cap_light": (230, 200, 80),
        "accent": (200, 169, 50),
        "liquid": (200, 160, 240),
        "elements": "coa",
        "short": "Peptide Purity",
    },
    "peptide-storage": {
        "title": "Peptide Storage & Handling",
        "cap": (8, 145, 178),          # Teal
        "cap_light": (30, 185, 210),
        "accent": (8, 145, 178),
        "liquid": (160, 220, 230),
        "elements": "ice",
        "short": "Storage & Handling",
    },
    "glp1-overview": {
        "title": "GLP-1 Research Overview",
        "cap": (34, 197, 94),          # Green
        "cap_light": (60, 230, 120),
        "accent": (34, 197, 94),
        "liquid": (240, 210, 150),
        "elements": "dna",
        "short": "GLP-1 Overview",
    },
    "bpc157-summary": {
        "title": "BPC-157 Research Summary",
        "cap": (126, 34, 206),         # Purple
        "cap_light": (160, 70, 240),
        "accent": (126, 34, 206),
        "liquid": (230, 160, 150),
        "elements": "tubes",
        "short": "BPC-157 Summary",
    },
    "choosing-supplier": {
        "title": "Choosing a UK Supplier",
        "cap": (234, 88, 12),          # Orange
        "cap_light": (255, 130, 50),
        "accent": (234, 88, 12),
        "liquid": (160, 210, 170),
        "elements": "ukflag",
        "short": "Choosing a Supplier",
    },
}

# ─── Helpers ───────────────────────────────────────────────────────────────

def draw_rounded_rect(draw, xy, radius, fill=None, outline=None, width=1):
    x1, y1, x2, y2 = xy
    r = min(radius, (x2 - x1) // 2, (y2 - y1) // 2)
    draw.rectangle([x1 + r, y1, x2 - r, y2], fill=fill)
    draw.rectangle([x1, y1 + r, x2, y2 - r], fill=fill)
    draw.pieslice([x1, y1, x1 + 2 * r, y1 + 2 * r], 180, 270, fill=fill)
    draw.pieslice([x2 - 2 * r, y1, x2, y1 + 2 * r], 270, 360, fill=fill)
    draw.pieslice([x1, y2 - 2 * r, x1 + 2 * r, y2], 90, 180, fill=fill)
    draw.pieslice([x2 - 2 * r, y2 - 2 * r, x2, y2], 0, 90, fill=fill)
    if outline:
        draw.arc([x1, y1, x1 + 2 * r, y1 + 2 * r], 180, 270, fill=outline, width=width)
        draw.arc([x2 - 2 * r, y1, x2, y1 + 2 * r], 270, 360, fill=outline, width=width)
        draw.arc([x1, y2 - 2 * r, x1 + 2 * r, y2], 90, 180, fill=outline, width=width)
        draw.arc([x2 - 2 * r, y2 - 2 * r, x2, y2], 0, 90, fill=outline, width=width)
        draw.line([x1 + r, y1, x2 - r, y1], fill=outline, width=width)
        draw.line([x1 + r, y2, x2 - r, y2], fill=outline, width=width)
        draw.line([x1, y1 + r, x1, y2 - r], fill=outline, width=width)
        draw.line([x2, y1 + r, x2, y2 - r], fill=outline, width=width)


def render_vial(draw, cx, cy, cap_color, cap_light, liquid_color):
    """Render a glass vial with label. Returns vial rect."""
    vial_w, vial_h = 100, 210
    neck_w, neck_h = 44, 22
    cap_w, cap_h = 50, 24

    x1 = cx - vial_w // 2
    y_bottom = cy + vial_h // 2
    y_top = cy - vial_h // 2

    vial_x1, vial_y1 = x1, y_top + neck_h
    vial_x2, vial_y2 = x1 + vial_w, y_bottom

    # ── Shadow ──
    draw_rounded_rect(draw, [vial_x1 + 12, vial_y1 + 14, vial_x2 + 12, vial_y2 + 14],
                      22, fill=(10, 15, 25, 50))

    # ── Glass body (opaque enough to be visible) ──
    draw_rounded_rect(draw, [vial_x1, vial_y1, vial_x2, vial_y2], 22,
                      fill=(235, 238, 245, 220))
    draw_rounded_rect(draw, [vial_x1, vial_y1, vial_x2, vial_y2], 22,
                      outline=(170, 178, 195, 180), width=2)

    # ── Liquid fill ──
    liquid_top_y = vial_y1 + 35
    liquid_bottom_y = vial_y2 - 8
    lr, lg, lb = liquid_color

    for y in range(liquid_top_y, liquid_bottom_y):
        t = (y - liquid_top_y) / max((liquid_bottom_y - liquid_top_y), 1)
        fade = 0.7 + t * 0.3
        draw.line([vial_x1 + 4, y, vial_x2 - 4, y],
                  fill=(min(255, int(lr * fade)), min(255, int(lg * fade)),
                        min(255, int(lb * fade)), 160))

    # Liquid surface ellipse
    draw.ellipse([vial_x1 + 3, liquid_top_y - 5, vial_x2 - 3, liquid_top_y + 7],
                 fill=(min(255, lr + 30), min(255, lg + 30),
                       min(255, lb + 30), 180))
    # Inner glow
    draw.ellipse([vial_x1 + 12, liquid_top_y + 8, vial_x2 - 14, liquid_top_y + 30],
                 fill=(255, 255, 255, 40))

    # ── Glass reflections ──
    for x in range(vial_x1 + 3, vial_x1 + 18):
        fade = 1.0 - (x - vial_x1 - 3) / 15.0
        if fade > 0:
            draw.line([x, vial_y1 + 5, x, vial_y2 - 5],
                      fill=(255, 255, 255, int(60 * fade)))
    draw.line([vial_x2 - 5, vial_y1 + 15, vial_x2 - 5, vial_y2 - 15],
              fill=(255, 255, 255, 90), width=2)

    # ── Neck ──
    neck_x1 = cx - neck_w // 2
    neck_y1 = y_top
    neck_x2 = cx + neck_w // 2
    neck_y2 = y_top + neck_h
    draw.rectangle([neck_x1, neck_y1, neck_x2, neck_y2], fill=(130, 138, 150, 220))
    draw.rectangle([neck_x1, neck_y1, neck_x2, neck_y2], outline=(110, 118, 130), width=1)

    # Neck ridge
    ridge_y = neck_y2 - 3
    draw.rectangle([neck_x1 - 7, ridge_y - 2, neck_x2 + 7, ridge_y + 3],
                   fill=(155, 160, 170, 230), outline=(125, 130, 140), width=1)

    # ── Cap ──
    cap_x1 = cx - cap_w // 2
    cap_x2 = cx + cap_w // 2
    cap_y1 = neck_y1 - cap_h - 3
    cap_y2 = neck_y1 - 3

    # Cap body - fully opaque cap color
    draw_rounded_rect(draw, [cap_x1, cap_y1, cap_x2, cap_y2], 7, fill=cap_color)
    draw_rounded_rect(draw, [cap_x1, cap_y1, cap_x2, cap_y2], 7,
                      outline=tuple(max(0, c - 40) for c in cap_color), width=1)

    # Cap highlight
    hl_color = cap_light
    for x in range(cap_x1 + 4, cap_x1 + cap_w // 3 + 2):
        fade = 1.0 - (x - cap_x1 - 4) / (cap_w // 3 - 2)
        draw.line([x, cap_y1 + 3, x, cap_y2 - 3],
                  fill=(hl_color[0], hl_color[1], hl_color[2], int(120 * fade)))

    # Cap top surface
    draw.rectangle([cap_x1 + 2, cap_y1, cap_x2 - 2, cap_y1 + 3],
                   fill=cap_light)

    # Flip-off tab
    tab_cx, tab_cy = cx, cap_y1 - 5
    draw.ellipse([tab_cx - 8, tab_cy - 4, tab_cx + 8, tab_cy + 4],
                 fill=cap_light, outline=tuple(max(0, c - 30) for c in cap_color), width=1)

    # Cap bottom rim
    draw.line([cap_x1 + 2, cap_y2, cap_x2 - 2, cap_y2],
              fill=tuple(max(0, c - 40) for c in cap_color), width=2)

    # ── Label ──
    label_x1 = vial_x1 + 7
    label_y1 = vial_y1 + 48
    label_x2 = vial_x2 - 7
    label_y2 = label_y1 + 100

    draw_rounded_rect(draw, [label_x1, label_y1, label_x2, label_y2], 5,
                      fill=(248, 248, 252, 250))
    draw_rounded_rect(draw, [label_x1, label_y1, label_x2, label_y2], 5,
                      outline=(190, 190, 200, 160), width=1)

    # Color accent dot
    dot_cx = (label_x1 + label_x2) // 2
    draw.ellipse([dot_cx - 5, label_y1 + 5, dot_cx + 5, label_y1 + 15],
                 fill=cap_color)

    # Load fonts
    try:
        f_bold = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 14)
        f_small = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 10)
        f_tiny = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 8)
    except:
        try:
            f_bold = ImageFont.truetype("/Library/Fonts/Arial.ttf", 14)
            f_small = ImageFont.truetype("/Library/Fonts/Arial.ttf", 10)
            f_tiny = ImageFont.truetype("/Library/Fonts/Arial.ttf", 8)
        except:
            f_bold = f_small = f_tiny = ImageFont.load_default()

    # VIRALPEPS
    tw = draw.textbbox((0, 0), "VIRALPEPS", font=f_bold)
    tw = tw[2] - tw[0]
    draw.text(((label_x1 + label_x2 - tw) // 2, label_y1 + 20),
              "VIRALPEPS", fill=(20, 25, 55), font=f_bold)

    # viralpeps.co.uk
    tw2 = draw.textbbox((0, 0), "viralpeps.co.uk", font=f_tiny)
    tw2 = tw2[2] - tw2[0]
    draw.text(((label_x1 + label_x2 - tw2) // 2, label_y1 + 40),
              "viralpeps.co.uk", fill=(60, 65, 90), font=f_tiny)

    # Research Grade
    tw3 = draw.textbbox((0, 0), "Research Grade", font=f_tiny)
    tw3 = tw3[2] - tw3[0]
    draw.text(((label_x1 + label_x2 - tw3) // 2, label_y1 + 52),
              "Research Grade", fill=(80, 85, 110), font=f_tiny)

    # Decorative line
    dl_y = label_y1 + 62
    draw.line([label_x1 + 10, dl_y, label_x2 - 10, dl_y], fill=(200, 200, 205, 150), width=1)

    # Barcode lines
    bc_y = dl_y + 10
    bc_x = label_x1 + 15
    for i in range(14):
        bw = 1 + (i % 3)
        draw.line([bc_x, bc_y, bc_x, bc_y + 12],
                  fill=(40, 40, 50, 200), width=bw)
        bc_x += bw + 1

    # For Research Use Only
    tw4 = draw.textbbox((0, 0), "For Research Use Only", font=f_tiny)
    tw4 = tw4[2] - tw4[0]
    draw.text(((label_x1 + label_x2 - tw4) // 2, bc_y + 18),
              "For Research Use Only", fill=(120, 125, 140), font=f_tiny)

    return (vial_x1, vial_y1, vial_x2, vial_y2)


def draw_syringe(draw, cx, cy, accent):
    sx, sy = cx + 105, cy - 30
    # Barrel
    draw.rectangle([sx, sy, sx + 10, sy + 75], fill=(245, 245, 248, 235),
                   outline=(160, 165, 178), width=1)
    # Grad marks
    for i in range(7):
        my = sy + 12 + i * 9
        draw.line([sx + 10, my, sx + 14, my], fill=(140, 145, 160, 180), width=1)
    # Plunger
    draw.rectangle([sx + 2, sy + 77, sx + 8, sy + 100], fill=(195, 198, 205, 220))
    draw.rectangle([sx - 3, sy + 100, sx + 13, sy + 106], fill=(175, 180, 190, 220))
    # Needle
    draw.line([sx + 5, sy, sx + 5, sy - 22], fill=(175, 180, 190, 230), width=2)
    # Needle bevel
    draw.line([sx + 5, sy - 22, sx + 5, sy - 28], fill=(195, 198, 205, 200), width=1)
    # Droplets
    for dx, dy in [(cx - 55, cy + 25), (cx - 40, cy + 48), (cx - 25, cy + 15)]:
        draw.ellipse([dx - 5, dy - 4, dx + 5, dy + 4], fill=(190, 225, 250, 140))
        draw.ellipse([dx - 2, dy - 2, dx + 2, dy + 1], fill=(210, 240, 255, 100))


def draw_coa(draw, cx, cy, accent):
    doc_x, doc_y = cx + 100, cy - 55
    doc_w, doc_h = 85, 110
    draw_rounded_rect(draw, [doc_x, doc_y, doc_x + doc_w, doc_y + doc_h],
                      4, fill=(250, 250, 246, 248),
                      outline=(175, 175, 165, 150), width=1)
    try:
        f = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 10)
        f_s = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 8)
    except:
        f = f_s = ImageFont.load_default()

    draw.text((doc_x + 8, doc_y + 5), "CERTIFICATE OF", fill=(40, 40, 50), font=f)
    draw.text((doc_x + 8, doc_y + 17), "ANALYSIS", fill=(40, 40, 50), font=f)

    # Table lines
    for i in range(8):
        ly = doc_y + 35 + i * 9
        draw.line([doc_x + 6, ly, doc_x + doc_w - 6, ly],
                  fill=(200, 200, 190, 140), width=1)

    # Gold stamp
    stamp_cx = doc_x + doc_w - 18
    stamp_cy = doc_y + doc_h - 18
    draw.ellipse([stamp_cx - 10, stamp_cy - 10, stamp_cx + 10, stamp_cy + 10],
                 outline=accent + (180,), width=2)
    draw.text((stamp_cx - 3, stamp_cy - 4), "✓", fill=accent + (200,), font=f)

    # Title above doc
    draw.text((doc_x + 3, doc_y - 20), "Certificate of", fill=(70, 70, 85), font=f_s)
    draw.text((doc_x + 3, doc_y - 10), "Analysis", fill=(70, 70, 85), font=f_s)


def draw_ice(draw, cx, cy):
    try:
        f = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 10)
        f_l = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 16)
    except:
        f = f_l = ImageFont.load_default()

    # Thermometer
    tx, ty = cx + 100, cy - 25
    draw.rectangle([tx, ty, tx + 10, ty + 55], fill=(238, 238, 242, 230),
                   outline=(165, 168, 178), width=1)
    # Bulb
    draw.ellipse([tx - 4, ty + 55, tx + 14, ty + 70], fill=(210, 40, 40, 210))
    # Mercury
    draw.rectangle([tx + 3, ty + 18, tx + 7, ty + 52], fill=(210, 40, 40, 200))
    # Marks
    for i in range(4):
        my = ty + 12 + i * 10
        draw.line([tx + 10, my, tx + 14, my], fill=(140, 145, 158), width=1)

    # Ice crystals
    ice_pos = [(cx - 55, cy - 35), (cx - 65, cy + 5), (cx + 25, cy - 55), (cx + 45, cy - 15)]
    for ix, iy in ice_pos:
        draw.text((ix, iy), "❄", fill=(180, 215, 240, 140), font=f_l)

    # Temperature text
    draw.text((tx - 2, ty - 18), "2-8°C", fill=(8, 145, 178, 200), font=f)

    # Mist overlay
    mist = Image.new("RGBA", (800, 450), (0, 0, 0, 0))
    md = ImageDraw.Draw(mist)
    md.ellipse([cx - 75, cy + 45, cx - 15, cy + 85], fill=(210, 230, 245, 20))
    md.ellipse([cx - 55, cy + 35, cx + 10, cy + 80], fill=(210, 230, 245, 15))
    mist = mist.filter(ImageFilter.GaussianBlur(radius=8))
    draw.bitmap((0, 0), mist, fill=None)


def draw_dna(draw, cx, cy, accent):
    import random
    random.seed(42)

    # Helix strands
    for y_off in range(0, 200, 3):
        x_off = int(16 * math.sin(y_off * 0.12))
        # First strand
        px1, py1 = cx + 95 + x_off, cy - 85 + y_off
        # Second strand (offset)
        x_off2 = int(16 * math.sin(y_off * 0.12 + math.pi))
        px2, py2 = cx + 95 + x_off2, cy - 85 + y_off

        # Draw strand dots
        draw.ellipse([px1 - 1, py1 - 1, px1 + 1, py1 + 1], fill=accent + (80,))
        draw.ellipse([px2 - 1, py2 - 1, px2 + 1, py2 + 1], fill=accent + (80,))

        # Cross-links
        if y_off % 18 < 3:
            draw.line([px1, py1, px2, py2], fill=accent + (50,), width=1)
            # Nucleotide dot
            mid_x, mid_y = (px1 + px2) // 2, (py1 + py2) // 2
            draw.ellipse([mid_x - 2, mid_y - 2, mid_x + 2, mid_y + 2],
                         fill=accent + (100,))

    # Random molecular dots
    random.seed(99)
    for _ in range(15):
        mx = cx + 95 + random.randint(-25, 25)
        my = cy - 30 + random.randint(-60, 60)
        draw.ellipse([mx - 3, my - 3, mx + 3, my + 3],
                     fill=accent + (60,))


def draw_tubes(draw, cx, cy):
    tube_colors = [(126, 34, 206), (37, 99, 235), (34, 197, 94)]
    for i, tc in enumerate(tube_colors):
        tx = cx + 85 + i * 22
        ty = cy - 20 + i * 8
        # Body
        draw.rectangle([tx, ty, tx + 14, ty + 45], fill=(242, 242, 248, 235),
                       outline=(165, 168, 178), width=1)
        # Cap
        draw.rectangle([tx, ty - 7, tx + 14, ty], fill=tc,
                       outline=tuple(max(0, c - 30) for c in tc), width=1)
        # Flip cap
        draw.polygon([(tx + 2, ty - 7), (tx + 12, ty - 7),
                      (tx + 10, ty - 14), (tx + 4, ty - 14)],
                     fill=tuple(min(255, c + 40) for c in tc))
        # Liquid
        draw.rectangle([tx + 2, ty + 25, tx + 12, ty + 42],
                       fill=(tc[0], tc[1], tc[2], 120))
    # Rack
    rx = cx + 80
    ry = cy - 20 + 45 + 3
    draw.rectangle([rx, ry, rx + 22 * 3 + 8, ry + 7],
                   fill=(175, 178, 185, 200), outline=(150, 153, 160), width=1)


def draw_ukflag(draw, cx, cy, accent):
    flag_x, flag_y = cx + 100, cy - 55
    fw, fh = 55, 38

    # Background
    draw.rectangle([flag_x, flag_y, flag_x + fw, flag_y + fh], fill=(0, 51, 102))
    # St Andrew cross (white diagonals)
    draw.line([flag_x, flag_y, flag_x + fw, flag_y + fh], fill=(255, 255, 255), width=5)
    draw.line([flag_x + fw, flag_y, flag_x, flag_y + fh], fill=(255, 255, 255), width=5)
    # St Patrick cross (red diagonals)
    draw.line([flag_x, flag_y, flag_x + fw, flag_y + fh], fill=(204, 0, 0), width=2)
    draw.line([flag_x + fw, flag_y, flag_x, flag_y + fh], fill=(204, 0, 0), width=2)
    # St George cross (white)
    draw.rectangle([flag_x, flag_y + fh // 2 - 4, flag_x + fw, flag_y + fh // 2 + 4],
                   fill=(255, 255, 255))
    draw.rectangle([flag_x + fw // 2 - 4, flag_y, flag_x + fw // 2 + 4, flag_y + fh],
                   fill=(255, 255, 255))
    # St George cross (red center)
    draw.rectangle([flag_x, flag_y + fh // 2 - 2, flag_x + fw, flag_y + fh // 2 + 2],
                   fill=(204, 0, 0))
    draw.rectangle([flag_x + fw // 2 - 2, flag_y, flag_x + fw // 2 + 2, flag_y + fh],
                   fill=(204, 0, 0))

    # Shield
    sx, sy = flag_x + 3, flag_y + fh + 10
    sw, sh = 49, 36
    draw.polygon([(sx + 4, sy), (sx + sw - 4, sy),
                  (sx + sw, sy + sh - 8), (sx + sw - 4, sy + sh),
                  (sx + 4, sy + sh), (sx, sy + sh - 8)],
                 fill=accent, outline=tuple(max(0, c - 50) for c in accent), width=1)
    # Shield cross
    draw.line([sx + 4, sy + sh // 2, sx + sw - 4, sy + sh // 2],
              fill=(255, 255, 255, 180), width=2)
    draw.line([sx + sw // 2, sy + 3, sx + sw // 2, sy + sh - 3],
              fill=(255, 255, 255, 180), width=2)
    # Checkmark
    draw.line([sx + 10, sy + sh // 2 + 2,
               sx + sw // 2 - 2, sy + sh - 8],
              fill=(255, 255, 255, 200), width=3)
    draw.line([sx + sw // 2 - 2, sy + sh - 8,
               sx + sw - 10, sy + 8],
              fill=(255, 255, 255, 200), width=3)


def render_elements(draw, cx, cy, element_type, accent):
    if element_type == "syringe":
        draw_syringe(draw, cx, cy, accent)
    elif element_type == "coa":
        draw_coa(draw, cx, cy, accent)
    elif element_type == "ice":
        draw_ice(draw, cx, cy)
    elif element_type == "dna":
        draw_dna(draw, cx, cy, accent)
    elif element_type == "tubes":
        draw_tubes(draw, cx, cy)
    elif element_type == "ukflag":
        draw_ukflag(draw, cx, cy, accent)


def render_title_panel(draw, guide_title, short_name, accent):
    try:
        f_title = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 20)
        f_sub = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 11)
    except:
        try:
            f_title = ImageFont.truetype("/Library/Fonts/Arial.ttf", 20)
            f_sub = ImageFont.truetype("/Library/Fonts/Arial.ttf", 11)
        except:
            f_title = f_sub = ImageFont.load_default()

    # Category badge
    badge = "Research Guide"
    bb = draw.textbbox((0, 0), badge, font=f_sub)
    bw = bb[2] - bb[0] + 18
    bh = bb[3] - bb[1] + 10
    bx, by = 270, 150
    draw_rounded_rect(draw, [bx, by, bx + bw, by + bh], 12, fill=accent)
    draw.text((bx + 9, by + 5), badge, fill=(255, 255, 255), font=f_sub)

    # Title
    draw.text((270, 178), guide_title, fill=(25, 28, 48), font=f_title)

    # Brand tag
    try:
        f_tag = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 9)
    except:
        f_tag = ImageFont.load_default()
    draw.text((270, 208), "viralpeps.co.uk  |  Research Grade", fill=(120, 125, 140), font=f_tag)


# ─── Main ──────────────────────────────────────────────────────────────────

W, H = 800, 450

for stub, cfg in GUIDES.items():
    print(f"Generating {stub}.png ...")

    img = Image.new("RGBA", (W, H))
    draw = ImageDraw.Draw(img)

    # Background gradient
    for y in range(H):
        t = y / H
        r = int(250 - t * 22)
        g = int(252 - t * 20)
        b = int(254 - t * 16)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Subtle vignette
    vignette = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    vd = ImageDraw.Draw(vignette)
    cx_c, cy_c = W // 2, H // 2
    for r in range(0, int(math.sqrt(W**2 + H**2)), 3):
        opacity = max(0, int(25 * (1 - r / 450)))
        if opacity > 0:
            vd.ellipse([cx_c - r, cy_c - r, cx_c + r, cy_c + r], fill=(0, 0, 0, opacity))
    vignette = vignette.filter(ImageFilter.GaussianBlur(radius=50))
    img.paste(vignette, (0, 0), vignette)

    # Render components
    cx, cy = 145, 225
    render_vial(draw, cx, cy, cfg["cap"], cfg["cap_light"], cfg["liquid"])
    render_elements(draw, cx, cy, cfg["elements"], cfg["accent"])
    render_title_panel(draw, cfg["title"], cfg["short"], cfg["accent"])

    # Studio glare
    glare = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    gd = ImageDraw.Draw(glare)
    gd.ellipse([60, 60, 220, 220], fill=(255, 255, 255, 20))
    gd.ellipse([580, 280, 760, 410], fill=(255, 255, 255, 10))
    glare = glare.filter(ImageFilter.GaussianBlur(radius=50))
    img.paste(glare, (0, 0), glare)

    # Save
    out_path = f"/Users/time4you/viralpeps/public/images/guides/{stub}.png"
    img.convert("RGB").save(out_path, "PNG")
    print(f"  → Saved ({os.path.getsize(out_path) // 1024} KB)")

print("\nDone! All 6 guide images generated.")
