#!/usr/bin/env python3
"""
Canonical vial label stamper — the SINGLE source of truth for the ViralPeps
badge + bottom-band tick.

WHY: FAL draws the badge and tick from a text prompt, non-deterministically.
Across ~120 vials that produced 1-line vs 2-line badges, tick vs circle vs
droplet, and varying blues. This script stamps both elements in code so the
ONLY things that vary between vials are the compound name and the mg.

USAGE
  python3 stamp_vial_label.py --vial IN.png --compound "Retatrutide" --dose "10mg" --out OUT.png
  python3 stamp_vial_label.py --preview IN.png --compound "TB-500" --dose "5mg"
"""
import argparse
import numpy as np
from PIL import Image, ImageDraw, ImageFont

# ---------------- CANONICAL SPEC (do not vary) ----------------
BLUE = (60, 128, 184)          # #3C80B8 badge + band
WHITE = (255, 255, 255)
TICK_XFRAC = 0.887             # tick centre across the band
TICK_SIZE_FRAC = 0.85          # tick height / band height
TICK_STROKE_FRAC = 0.17        # stroke / tick height
BADGE_TEXT = "ViralPeps"       # ONE line, always
BADGE_LINES = 1

FONT_CANDIDATES = [
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/HelveticaNeue.ttc",
    "/Library/Fonts/Arial.ttf",
]


def load_font(size):
    for p in FONT_CANDIDATES:
        try:
            return ImageFont.truetype(p, size)
        except Exception:
            continue
    return ImageFont.load_default()


def blue_mask(a):
    r, g, b = a[..., 0].astype(int), a[..., 1].astype(int), a[..., 2].astype(int)
    return (b > 110) & (b > r + 25) & (b >= g + 25)


def find_band(a, w, h):
    """Locate the bottom blue band -> (y0,y1,x0,x1) or None."""
    m = blue_mask(a)
    counts = m.sum(axis=1)
    rows = [y for y in range(h) if counts[y] > w * 0.25]
    if not rows:
        return None
    runs, start, prev = [], rows[0], rows[0]
    for y in rows[1:]:
        if y - prev <= 3:
            prev = y
        else:
            runs.append((start, prev)); start = y; prev = y
    runs.append((start, prev))
    runs.sort(key=lambda r: (r[1] - r[0], r[0]))
    y0, y1 = runs[-1]
    if (y1 - y0 + 1) < 8:
        return None
    yc = (y0 + y1) // 2
    cols = np.where(m[yc])[0]
    if len(cols) < w * 0.20:
        return None
    return (y0, y1, int(cols.min()), int(cols.max()))


def find_badge(a, w, h):
    """Locate the top-right blue badge -> (x0,y0,x1,y1) or None."""
    m = blue_mask(a)
    top = m[: h // 2]
    ys, xs = np.where(top)
    if len(xs) == 0:
        return None
    return (int(xs.min()), int(ys.min()), int(xs.max()), int(ys.max()))


def stamp_badge(img, box):
    """Repaint badge solid canonical blue + draw 'ViralPeps' on ONE line."""
    x0, y0, x1, y1 = box
    d = ImageDraw.Draw(img)
    d.rectangle([x0, y0, x1, y1], fill=BLUE)

    bw, bh = x1 - x0 + 1, y1 - y0 + 1
    # fit the text inside the badge with a small margin
    size = int(bh * 0.42)
    while size > 6:
        f = load_font(size)
        tb = d.textbbox((0, 0), BADGE_TEXT, font=f)
        tw, th = tb[2] - tb[0], tb[3] - tb[1]
        if tw <= bw - 6 and th <= bh - 6:
            break
        size -= 1
    f = load_font(size)
    tb = d.textbbox((0, 0), BADGE_TEXT, font=f)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    d.text((x0 + (bw - tw) / 2 - tb[0], y0 + (bh - th) / 2 - tb[1]),
           BADGE_TEXT, font=f, fill=WHITE)


def stamp_tick(img, band):
    """Repaint band solid native blue + draw the canonical white tick."""
    y0, y1, x0, x1 = band
    a = np.asarray(img).astype(int)
    # use the vial's own median band blue so the colour stays native
    sub = a[y0:y1 + 1, x0:x1 + 1].reshape(-1, 3)
    m = ((sub[:, 2] > 110) & (sub[:, 2] > sub[:, 0] + 25) & (sub[:, 2] >= sub[:, 1] + 25))
    blues = sub[m]
    blue = tuple(int(v) for v in np.median(blues, axis=0)) if len(blues) else BLUE

    d = ImageDraw.Draw(img)
    band_h, band_w = y1 - y0 + 1, x1 - x0 + 1
    d.rectangle([x0 + 1, y0 + 1, x1 - 1, y1 - 1], fill=blue)

    # Tick must sit fully INSIDE the band. Derive height from the band with a
    # safety inset, and clamp the drawn bbox to the band interior afterwards.
    inset = max(3, int(band_h * 0.10))
    avail_h = band_h - 2 * inset
    avail_w = band_w * 0.30                      # keep it in the right third
    th = min(avail_h, avail_w)                   # square footprint
    stroke = max(2, int(th * TICK_STROKE_FRAC))

    cx = x0 + TICK_XFRAC * band_w
    cy = y0 + band_h / 2.0
    left = cx - th / 2.0
    top = cy - th / 2.0

    # pad by half the stroke so the fat line can't poke out
    pad = stroke / 2.0 + 1
    left = max(left, x0 + pad)
    top = max(top, y0 + pad)
    right = min(left + th, x1 - pad)
    bottom = min(top + th, y1 - pad)
    # if clamping shrank the box, re-derive the square
    side = min(right - left, bottom - top)
    if side < 6:
        return
    left = cx - side / 2.0
    top = cy - side / 2.0
    left = max(min(left, x1 - pad - side), x0 + pad)
    top = max(min(top, y1 - pad - side), y0 + pad)

    p_l = (left + side * 0.10, top + side * 0.55)
    p_v = (left + side * 0.38, top + side * 0.84)
    p_r = (left + side * 0.90, top + side * 0.18)
    for a_, b_ in ((p_l, p_v), (p_v, p_r)):
        d.line([a_, b_], fill=WHITE, width=stroke, joint="curve")
    r = stroke / 2.0
    for px_, py_ in (p_l, p_v, p_r):
        d.ellipse([px_ - r, py_ - r, px_ + r, py_ + r], fill=WHITE)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--vial", required=True)
    ap.add_argument("--compound", required=True)
    ap.add_argument("--dose", required=True)
    ap.add_argument("--out", default=None)
    ap.add_argument("--preview", action="store_true")
    args = ap.parse_args()

    img = Image.open(args.vial).convert("RGB")
    w, h = img.size
    a = np.asarray(img).astype(int)

    band = find_band(a, w, h)
    badge = find_badge(a, w, h)

    print(f"vial      : {args.vial} ({w}x{h})")
    print(f"compound  : {args.compound} / {args.dose}")
    print(f"band      : {band}")
    print(f"badge     : {badge}")

    if badge:
        stamp_badge(img, badge)
        print("  badge  -> stamped 'ViralPeps' (1 line, canonical blue)")
    else:
        print("  badge  -> NOT FOUND, skipped")

    if band:
        stamp_tick(img, band)
        print("  tick   -> stamped canonical white tick")
    else:
        print("  tick   -> NO BAND FOUND, skipped")

    out = args.out or ("/tmp/stamped-preview.png" if args.preview else None)
    if out:
        img.save(out)
        print(f"saved     : {out}")


if __name__ == "__main__":
    main()
