#!/usr/bin/env python3
"""
Deterministic vial bottom-band tick fixer.

PROBLEM: FAL renders the bottom-band icon non-deterministically — some vials get a
plain white tick, others get a circle/droplet/shield emblem, some get nothing.
The agreed template requires: plain white tick, right side, x-frac ~0.89, no circle.

FIX: detect the blue bottom band on each vial, erase whatever icon is there
(repaint the band solid blue), then draw the canonical tick deterministically.

Usage:
  python3 fix_vial_tick.py <vial.png> [more...]        # dry-run measure only
  python3 fix_vial_tick.py --write <vial.png> ...      # actually write
  python3 fix_vial_tick.py --write --preview out.png <vial.png>
"""
import sys, os
import numpy as np
from PIL import Image, ImageDraw

# ---- canonical spec (from viralpeps-vial-image reference) ----
BLUE = (60, 128, 184)          # #3C80B8 — badge + band blue
TICK_XFRAC = 0.887             # tick centre as fraction across the band
TICK_STROKE_FRAC = 0.16        # stroke width as fraction of tick size
TICK_SIZE_FRAC = 0.85          # tick height as fraction of band height


def is_blue_arr(a):
    """Boolean mask: pixel is 'blue' (band/badge blue).
    Tolerant — FAL renders 'the same' blue anywhere from (39,102,167) to (60,128,184),
    and bands often carry a subtle gradient."""
    r = a[..., 0].astype(int); g = a[..., 1].astype(int); b = a[..., 2].astype(int)
    return (b > 110) & (b > r + 25) & (b >= g + 25)


def find_band(a, w, h):
    """Locate the wide horizontal blue band. Returns (y0, y1, x0, x1) or None."""
    mask = is_blue_arr(a)
    counts = mask.sum(axis=1)
    rows = [y for y in range(h) if counts[y] > w * 0.25]
    if not rows:
        return None
    # keep only the LAST contiguous run (the bottom band, not the top-right badge)
    runs = []
    start = rows[0]; prev = rows[0]
    for y in rows[1:]:
        if y - prev <= 3:
            prev = y
        else:
            runs.append((start, prev)); start = y; prev = y
    runs.append((start, prev))
    # prefer the run with the most rows; break ties by lowest position (bottom band)
    runs.sort(key=lambda r: (r[1] - r[0], r[0]))
    y0, y1 = runs[-1]
    # require it to actually be band-shaped (wider than tall)
    if (y1 - y0 + 1) < 8:
        return None
    yc = (y0 + y1) // 2
    cols = np.where(mask[yc])[0]
    if len(cols) < w * 0.20:
        return None
    return (y0, y1, int(cols.min()), int(cols.max()))


def dominant_blue(a, band):
    """Most common blue pixel colour inside the band (so we repaint with the REAL blue)."""
    y0, y1, x0, x1 = band
    sub = a[y0:y1 + 1, x0:x1 + 1].reshape(-1, 3)
    mask = is_blue_arr(sub.reshape(-1, 1, 3)).reshape(-1)
    blues = sub[mask]
    if len(blues) == 0:
        return BLUE
    # median is robust against anti-aliased edges
    med = np.median(blues, axis=0).astype(int)
    return tuple(int(v) for v in med)


def draw_tick(img, band, blue):
    """Repaint band solid blue, then draw the canonical white tick at x-frac 0.887."""
    y0, y1, x0, x1 = band
    d = ImageDraw.Draw(img)
    band_h = y1 - y0 + 1
    band_w = x1 - x0 + 1

    # 1. erase existing icon: repaint band interior solid blue (inset 1px to keep AA edge)
    d.rectangle([x0 + 1, y0 + 1, x1 - 1, y1 - 1], fill=blue)

    # 2. canonical tick geometry
    tick_h = band_h * TICK_SIZE_FRAC
    tick_w = tick_h                      # roughly square footprint
    cx = x0 + TICK_XFRAC * band_w
    cy = y0 + band_h / 2.0
    left = cx - tick_w / 2.0
    top = cy - tick_h / 2.0
    stroke = max(2, int(tick_h * TICK_STROKE_FRAC))

    # tick vertices: short down-stroke to vertex, long up-stroke to top-right
    p_left = (left + tick_w * 0.06, top + tick_h * 0.52)
    p_vertex = (left + tick_w * 0.36, top + tick_h * 0.86)
    p_right = (left + tick_w * 0.94, top + tick_h * 0.14)

    white = (255, 255, 255)
    for a_pt, b_pt in ((p_left, p_vertex), (p_vertex, p_right)):
        d.line([a_pt, b_pt], fill=white, width=stroke, joint="curve")
    # round the caps so it reads as a clean bold tick
    r = stroke / 2.0
    for (px_, py_) in (p_left, p_vertex, p_right):
        d.ellipse([px_ - r, py_ - r, px_ + r, py_ + r], fill=white)

    return img


def process(path, write=False, preview=None):
    im = Image.open(path).convert("RGB")
    w, h = im.size
    a = np.asarray(im).astype(int)

    band = find_band(a, w, h)
    if not band:
        print(f"SKIP  {os.path.basename(path)} — no blue band detected (needs manual review)")
        return False

    blue = dominant_blue(a, band)
    y0, y1, x0, x1 = band
    out = draw_tick(im.copy(), band, blue)

    if preview:
        out.save(preview)

    if write:
        out.save(path)

    tag = "WROTE" if write else "MEASURED"
    print(f"{tag} {os.path.basename(path)}  band y{y0}-{y1} x{x0}-{x1}  blue={blue}")
    return True


if __name__ == "__main__":
    args = sys.argv[1:]
    write = "--write" in args
    preview = None
    if "--preview" in args:
        i = args.index("--preview")
        preview = args[i + 1]
        del args[i:i + 2]
    args = [a for a in args if a != "--write"]
    if not args:
        print(__doc__)
        sys.exit(1)
    ok = 0
    for p in args:
        if process(p, write=write, preview=preview if len(args) == 1 else None):
            ok += 1
    print(f"\n{ok}/{len(args)} processed")
