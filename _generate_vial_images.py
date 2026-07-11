#!/usr/bin/env python3
"""
Generate 6 photorealistic ViralPeps-branded vial images using Pillow.
Enhanced version with realistic glass, cap, lighting, and shadows.
"""

import os
import math
import random
from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT_DIR = "/Users/time4you/viralpeps/public/images/compounds"
random.seed(42)


def hex_to_rgba(h, a=255):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4)) + (a,)


def clamp(v, lo=0, hi=255):
    return max(lo, min(hi, int(v)))


def smooth_noise(x, y, seed=0):
    """Simple 2D value noise for adding texture."""
    n = math.sin(x * 12.9898 + y * 78.233 + seed * 42.0) * 43758.5453
    return n - math.floor(n)


def draw_vial_pro(
    size=(1024, 1024),
    rotation_deg=0,
    light_angle=45,
    light_elevation=60,
    fill_level=0.65,
    label_color="#1B5E20",
    accent_color="#4CAF50",
    liquid_color="#C8E6C9",
    liquid_opacity=200,
    shadow_strength=0.3,
):
    """
    Draw a photorealistic pharmaceutical vial.

    light_angle: degrees, 0 = from right, 90 = from top, etc.
    light_elevation: degrees above the horizontal plane.
    """
    w, h = size
    cx, cy = w // 2, h // 2

    # Convert light direction to vector
    lrad = math.radians(light_angle)
    lerad = math.radians(light_elevation)
    lx = math.cos(lrad) * math.cos(lerad)
    ly = math.sin(lrad) * math.cos(lerad)
    lz = math.sin(lerad)

    # ---- Vial dimensions ----
    vial_w = 170
    vial_h = 390
    neck_w = 76
    neck_h = 38
    cap_h = 48
    cap_extra = 55
    rim_w = 95
    rim_h = 12
    wall = 8  # glass wall thickness

    total_h = vial_h + neck_h + cap_h + cap_extra + rim_h
    vial_top = cy - total_h // 2 + 25
    vial_left = cx - vial_w // 2

    body_top = vial_top + cap_extra + cap_h + neck_h + rim_h
    body_bot = body_top + vial_h
    body_mid = (body_top + body_bot) / 2

    neck_top = body_top - rim_h - neck_h
    neck_bot = neck_top + neck_h
    rim_top = neck_top - rim_h
    rim_bot = rim_top + rim_h
    cap_top = rim_top - cap_h
    cap_bot = cap_top + cap_h

    # Create canvas
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # ========== BACKGROUND ==========
    bg = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    bg_draw = ImageDraw.Draw(bg)
    for y in range(h):
        t = y / h
        gray = int(245 + 10 * math.sin(t * math.pi * 0.3))
        bg_draw.line([(0, y), (w, y)], fill=(gray, gray, gray + 2, 255))

    # ========== SHADOW ==========
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    sw = vial_w + 60
    sh = 35
    shadow_bottom = body_bot + 8

    # Light-based shadow offset
    shadow_off_x = int(-lx * 25)
    shadow_off_y = 5

    for i in range(10):
        t = i / 10
        a = int(45 * shadow_strength * (1 - t * t))
        r = sw * (0.9 + t * 0.3)
        s_draw.ellipse(
            [
                cx - r // 2 + shadow_off_x,
                shadow_bottom + t * 5,
                cx + r // 2 + shadow_off_x,
                shadow_bottom + sh + t * 5,
            ],
            fill=(0, 0, 0, a),
        )
    shadow = shadow.filter(ImageFilter.GaussianBlur(radius=10))
    bg = Image.alpha_composite(bg, shadow)

    # ========== VIAL SURFACE ==========
    vsurf = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    vdraw = ImageDraw.Draw(vsurf)

    # ---- Helper: shaded rect with per-pixel lighting ----
    def glass_rect(x1, y1, x2, y2, base_color=(220, 230, 240), max_alpha=40):
        """Draw a translucent glass rectangle with simulated lighting."""
        for y in range(y1, y2, 2):
            ny = (y - y1) / (y2 - y1) if y2 != y1 else 0.5
            for x in range(x1, x2, 2):
                nx = (x - x1) / (x2 - x1)
                # Light dot product
                ndot = (nx - 0.5) * lx + (ny - 0.5) * ly
                ndot = max(-0.5, min(0.5, ndot))
                bright = 0.8 + 0.4 * ndot
                r = clamp(base_color[0] * bright)
                g = clamp(base_color[1] * bright)
                b = clamp(base_color[2] * bright)
                a = max(5, int(max_alpha * (0.6 + 0.4 * bright)))
                vdraw.point((x, y), fill=(r, g, b, a))

    # ---- 1. Vial body (back wall) ----
    body_rect = (vial_left, body_top, vial_left + vial_w, body_bot)
    vdraw.rounded_rectangle(body_rect, radius=14, fill=(235, 240, 245, 12))

    # ---- 2. Liquid ----
    fill_top = int(body_bot - vial_h * fill_level)
    lc = hex_to_rgba(liquid_color, liquid_opacity)

    for y in range(fill_top, body_bot):
        t = (y - fill_top) / (body_bot - fill_top) if body_bot != fill_top else 0.5
        # Side-to-side light variation
        yfac = 0.85 + 0.15 * math.sin(t * math.pi)
        for x in range(vial_left + wall + 4, vial_left + vial_w - wall - 4, 2):
            nx = (x - vial_left) / vial_w
            ndot = (nx - 0.5) * lx * 0.5
            bright = 0.85 + 0.3 * ndot
            r = clamp(lc[0] * bright * yfac)
            g = clamp(lc[1] * bright * yfac)
            b = clamp(lc[2] * bright * yfac)
            a = clamp(lc[3] * yfac)
            vdraw.point((x, y), fill=(r, g, b, a))

    # Liquid meniscus
    for dx in range(-vial_w // 2 + wall + 4, vial_w // 2 - wall - 4, 2):
        curve = int(6 * math.cos(dx / (vial_w // 2 - wall - 4) * math.pi / 2))
        vdraw.point((cx + dx, fill_top + curve), fill=(255, 255, 255, 160))

    # Liquid surface specular
    for dx in range(-30, 31, 2):
        bright = max(0, 1 - abs(dx / 30))
        a = int(100 * bright * bright)
        vdraw.point((cx + dx, fill_top + 2), fill=(255, 255, 255, a))

    # ---- 3. Label ----
    label_h = 130
    label_w = vial_w - 28
    label_top = body_top + (vial_h - label_h) // 2 + 10
    label_left = vial_left + 14

    # Label shadow (slight 3D effect)
    lc_bg = hex_to_rgba(label_color)
    vdraw.rounded_rectangle(
        [label_left + 2, label_top + 2, label_left + label_w + 2, label_top + label_h + 2],
        radius=6, fill=(0, 0, 0, 40),
    )

    # Label body with slight lighting gradient
    for y in range(label_top, label_top + label_h):
        t = (y - label_top) / label_h
        for x in range(label_left, label_left + label_w, 2):
            nx = (x - label_left) / label_w
            ndot = (nx - 0.5) * lx * 0.3
            bright = 0.85 + 0.3 * ndot
            # Slight vertical gradient
            vert = 0.9 + 0.1 * math.sin(t * math.pi)
            r = clamp(lc_bg[0] * bright * vert)
            g = clamp(lc_bg[1] * bright * vert)
            b = clamp(lc_bg[2] * bright * vert)
            vdraw.point((x, y), fill=(r, g, b, 230))

    # Label border
    vdraw.rounded_rectangle(
        [label_left, label_top, label_left + label_w, label_top + label_h],
        radius=6, outline=(255, 255, 255, 50), width=1,
    )

    # Decorative stripes
    ac = hex_to_rgba(accent_color)
    stripe_h = 3
    vdraw.rectangle(
        [label_left + 12, label_top + 14, label_left + label_w - 12, label_top + 14 + stripe_h],
        fill=ac,
    )
    vdraw.rectangle(
        [label_left + 12, label_top + label_h - 14 - stripe_h, label_left + label_w - 12, label_top + label_h - 14],
        fill=ac,
    )

    # ---- Text on label ----
    try:
        fp = None
        for fp in [
            "/System/Library/Fonts/Helvetica.ttc",
            "/System/Library/Fonts/HelveticaNeue.ttc",
            "/System/Library/Fonts/Supplemental/Arial.ttf",
        ]:
            if os.path.exists(fp):
                break
        if fp and os.path.exists(fp):
            title_font = ImageFont.truetype(fp, 30)
            sub_font = ImageFont.truetype(fp, 17)
            small_font = ImageFont.truetype(fp, 12)
        else:
            title_font = sub_font = small_font = ImageFont.load_default()

        # "ViralPeps" brand name
        brand = "ViralPeps"
        bb = vdraw.textbbox((0, 0), brand, font=title_font)
        tw = bb[2] - bb[0]
        vdraw.text((cx - tw // 2, label_top + 28), brand, fill=(255, 255, 255, 255), font=title_font)

        # Subtitle
        sub = "Research Peptide"
        bb = vdraw.textbbox((0, 0), sub, font=sub_font)
        tw = bb[2] - bb[0]
        vdraw.text((cx - tw // 2, label_top + 63), sub, fill=(200, 255, 200, 230), font=sub_font)

        # Info line
        info = "10 mg | Lyophilized"
        bb = vdraw.textbbox((0, 0), info, font=small_font)
        tw = bb[2] - bb[0]
        vdraw.text((cx - tw // 2, label_top + 95), info, fill=(180, 220, 180, 200), font=small_font)

    except Exception:
        vdraw.text((cx - 45, label_top + 30), "ViralPeps", fill=(255, 255, 255, 255))

    # ---- 4. Glass front wall (over label) ----
    # Subtle highlight strip on the glass surface
    glass_overlay = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    gov = ImageDraw.Draw(glass_overlay)

    # Left highlight
    for x in range(vial_left + 6, vial_left + 24, 2):
        nx = (x - vial_left) / vial_w
        ndot = (nx - 0.5) * lx
        bright = 0.6 + 0.4 * max(0, ndot)
        a = int(25 * bright)
        gov.rectangle([x, body_top + 20, x + 1, body_bot - 20], fill=(255, 255, 255, a))

    # Right highlight
    for x in range(vial_left + vial_w - 24, vial_left + vial_w - 6, 2):
        nx = (x - vial_left) / vial_w
        ndot = (nx - 0.5) * lx
        bright = 0.6 + 0.4 * max(0, -ndot)
        a = int(25 * bright)
        gov.rectangle([x, body_top + 20, x + 1, body_bot - 20], fill=(255, 255, 255, a))

    vsurf = Image.alpha_composite(vsurf, glass_overlay)

    # ---- 5. Body outline ----
    vdraw.rounded_rectangle(
        body_rect, radius=14,
        outline=(180, 195, 210, 140), width=2,
    )

    # ---- 6. Neck ----
    neck_left = cx - neck_w // 2
    neck_right = neck_left + neck_w
    nrect = (neck_left, neck_top, neck_right, neck_bot)
    vdraw.rounded_rectangle(nrect, radius=6, fill=(200, 210, 220, 25))
    vdraw.rounded_rectangle(nrect, radius=6, outline=(160, 175, 190, 140), width=2)

    # ---- 7. Rim ----
    rim_left = cx - rim_w // 2
    rim_right = rim_left + rim_w
    rrect = (rim_left, rim_top, rim_right, rim_bot)
    vdraw.rounded_rectangle(rrect, radius=5, fill=(210, 220, 230, 35))
    vdraw.rounded_rectangle(rrect, radius=5, outline=(150, 165, 180, 150), width=2)

    # ---- 8. Aluminum Cap ----
    cap_left = cx - neck_w // 2 - 6
    cap_right = cap_left + neck_w + 12

    # Cap body with metallic gradient
    for y in range(cap_top, cap_bot):
        t = (y - cap_top) / cap_h
        ny = t - 0.5
        ndot = ny * ly * 0.3 + lx * 0.15
        bright = 0.75 + 0.35 * ndot
        bright = max(0.4, min(1.0, bright))
        r = clamp(195 * bright)
        g = clamp(200 * bright)
        b = clamp(208 * bright)
        a = 220 + int(30 * bright)
        vdraw.rectangle([cap_left + 4, y, cap_right - 4, y + 1], fill=(r, g, b, a))

    # Cap highlight (specular reflection)
    for y in range(cap_top + 8, cap_bot - 8, 2):
        t = (y - cap_top - 8) / (cap_bot - cap_top - 16)
        bright = 0.3 + 0.7 * (1 - abs(t - 0.5) * 2)
        a = int(60 * bright)
        vdraw.rectangle([cap_left + 8, y, cap_left + 30, y + 1], fill=(255, 255, 255, a))

    cap_rect = (cap_left, cap_top, cap_right, cap_bot)
    vdraw.rounded_rectangle(cap_rect, radius=7, outline=(180, 185, 190, 200), width=2)

    # Cap ridges (horizontal bands)
    for i in range(5):
        ry = cap_top + 8 + i * 9
        vdraw.rectangle(
            [cap_left + 8, ry, cap_right - 8, ry + 1],
            fill=(180, 185, 190, 100),
        )

    # Flip-off tab
    tab_w, tab_h = 44, 12
    tab_top = cap_top - tab_h
    tab_left = cx - tab_w // 2
    vdraw.rounded_rectangle(
        [tab_left, tab_top, tab_left + tab_w, tab_top + tab_h],
        radius=4, fill=(210, 212, 218, 210), outline=(185, 188, 192, 200), width=1,
    )
    # Tab highlight
    vdraw.rounded_rectangle(
        [tab_left + 3, tab_top + 2, tab_left + tab_w - 3, tab_top + tab_h - 2],
        radius=3, fill=(235, 237, 240, 60), width=0,
    )

    # ---- 9. Bottom curve ----
    vdraw.rounded_rectangle(
        [vial_left, body_bot - 18, vial_left + vial_w, body_bot],
        radius=10, outline=(160, 175, 190, 130), width=2,
    )

    # ---- 10. Apply rotation ----
    if rotation_deg != 0:
        vsurf = vsurf.rotate(rotation_deg, expand=False, center=(cx, cy), resample=Image.BICUBIC)

    # ---- 11. Compose ----
    result = Image.alpha_composite(bg, vsurf)

    # ---- 12. Soft global blur for realism ----
    result = result.filter(ImageFilter.GaussianBlur(radius=0.6))

    final = Image.new("RGB", (w, h), (250, 250, 252))
    final.paste(result, (0, 0), result)
    return final


def main():
    os.makedirs(OUT_DIR, exist_ok=True)

    # 6 distinct variations
    configs = [
        # (rot, angle, elev, fill, label, accent, liquid, liquid_opacity, shadow)
        (0,    45,  65, 0.65, "#1B5E20", "#4CAF50", "#C8E6C9", 200, 0.30),  # 1
        (-10,  135, 55, 0.55, "#1B5E20", "#4CAF50", "#E8F5E9", 180, 0.35),  # 2
        (12,   0,   70, 0.70, "#1565C0", "#42A5F5", "#BBDEFB", 170, 0.25),  # 3 - blue label variant
        (6,    90,  80, 0.60, "#1B5E20", "#4CAF50", "#C8E6C9", 200, 0.30),  # 4
        (-15,  180, 45, 0.75, "#1B5E20", "#4CAF50", "#A5D6A7", 210, 0.35),  # 5
        (18,   -45, 30, 0.50, "#1B5E20", "#4CAF50", "#E8F5E9", 160, 0.40),  # 6
    ]

    for i, (rot, angle, elev, fill, label_c, accent_c, liquid_c, liq_op, shadow) in enumerate(configs, 1):
        print(f"Generating vial {i}/6 (rot={rot}°, light_angle={angle}°, elev={elev}°, fill={fill:.0%})...")
        img = draw_vial_pro(
            size=(1024, 1024),
            rotation_deg=rot,
            light_angle=angle,
            light_elevation=elev,
            fill_level=fill,
            label_color=label_c,
            accent_color=accent_c,
            liquid_color=liquid_c,
            liquid_opacity=liq_op,
            shadow_strength=shadow,
        )
        out_path = os.path.join(OUT_DIR, f"viralpeps-vial-{i}.png")
        img.save(out_path, "PNG", optimize=True)
        print(f"  Saved: {out_path} ({os.path.getsize(out_path)} bytes)")

    print("\nDone! 6 vial images generated.")


if __name__ == "__main__":
    main()
