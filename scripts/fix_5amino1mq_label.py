"""Fix the '5-Amio-1MQ' typo on the 5-Amino-1MQ compound vial.

The name sits on the label in a soft shadow band (y 580-636, x 354-669).
Black text on a smooth light-grey gradient must be REMOVED by inpainting the
gradient — NOT by painting a flat rectangle, which leaves a visible grey plate.

Approach: if OpenCV is available use cv2.inpaint (TELEA). Otherwise fall back
to a vertical linear-gradient reconstruction of the band from the un-shadowed
rows immediately above/below it, blended in with a feathered mask.

Then stamp the correct text with a fitted bold font.

Usage:
  python3 fix_5amino1mq_label.py            # preview only -> /tmp
  python3 fix_5amino1mq_label.py --write    # write in place
"""
import os
import sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont

V = '/Users/time4you/viralpeps/public/images/compounds/5-amino-1mq.png'
BAND = (354, 580, 669, 636)   # x0, y0, x1, y1  (inclusive)
TEXT = "5-Amino-1MQ"

FONTS = [
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/Library/Fonts/Arial.ttf",
]


def load_font(size):
    for p in FONTS:
        try:
            return ImageFont.truetype(p, size, index=1 if p.endswith('.ttc') else 0)
        except Exception:
            try:
                return ImageFont.truetype(p, size)
            except Exception:
                continue
    return ImageFont.load_default()


def erase_via_cv2(im):
    import cv2
    a = np.asarray(im).copy()
    x0, y0, x1, y1 = BAND
    m = np.zeros(a.shape[:2], np.uint8)
    # mask the whole band, dilated a little to catch antialiased glyph edges
    m[y0 - 2:y1 + 3, x0 - 2:x1 + 3] = 255
    return Image.fromarray(cv2.inpaint(cv2.cvtColor(a, cv2.COLOR_RGB2BGR), m, 7, cv2.INPAINT_TELEA)[:, :, ::-1])


def erase_via_gradient(im):
    """Reconstruct the band as a smooth 2-D gradient sampled from a clean ring
    around it, then feather every seam. Avoids the flat-plate artifact."""
    a = np.asarray(im).astype(np.float32)
    x0, y0, x1, y1 = BAND
    # sample a clean ring OUTSIDE the shadowed band on all four sides
    pad = 16
    ring_px = np.concatenate([
        a[y0 - pad:y0 - 4, x0 - pad:x1 + pad].reshape(-1, 3),
        a[y1 + 5:y1 + pad, x0 - pad:x1 + pad].reshape(-1, 3),
        a[y0:y1 + 1, x0 - pad:x0 - 4].reshape(-1, 3),
        a[y0:y1 + 1, x1 + 5:x1 + pad].reshape(-1, 3),
    ])
    base = np.median(ring_px, axis=0)          # (3,)

    # vertical profile of the label's gentle shading, from the clean ring
    above_l = a[y0 - pad:y0 - 4, x0:x1 + 1].mean(axis=1)   # (pad-4, 3)
    below_l = a[y1 + 5:y1 + pad, x0:x1 + 1].mean(axis=1)
    top_v = above_l[-4:].mean(axis=0)
    bot_v = below_l[:4].mean(axis=0)

    h, w = y1 - y0 + 1, x1 - x0 + 1
    t = np.linspace(0.0, 1.0, h)[:, None, None]
    vert = top_v[None, None, :] * (1 - t) + bot_v[None, None, :] * t   # (h,1,3)

    # horizontal component: the vial's cylinder shading is nearly linear here,
    # so keep the ring's per-column median as a gentle left-right tilt
    col_med = np.median(
        np.concatenate([a[y0 - pad:y0 - 4, x0:x1 + 1], a[y1 + 5:y1 + pad, x0:x1 + 1]], axis=0),
        axis=0,
    )                                                  # (w,3)
    tilt = col_med - col_med.mean(axis=0)[None, :]     # (w,3) zero-mean
    grad = vert + tilt[None, :, :]
    grad = grad + (base[None, None, :] - grad.mean(axis=(0, 1))[None, None, :])

    # feathered alpha: fade in over `f` px from every edge of the band
    f = 6.0
    yy = np.arange(h)[:, None]
    xx = np.arange(w)[None, :]
    ay = np.minimum(np.minimum(yy + 1, h - yy) / f, 1.0)
    ax = np.minimum(np.minimum(xx + 1, w - xx) / f, 1.0)
    alpha = np.clip(np.minimum(ay, ax), 0.0, 1.0)[:, :, None]

    patch = a[y0:y1 + 1, x0:x1 + 1]
    blended = grad * alpha + patch * (1 - alpha)
    out = a.copy()
    out[y0:y1 + 1, x0:x1 + 1] = blended
    return Image.fromarray(out.clip(0, 255).astype(np.uint8))


def main():
    write = "--write" in sys.argv
    im = Image.open(V).convert("RGB")

    have_cv2 = True
    try:
        import cv2  # noqa: F401
    except Exception:
        have_cv2 = False

    im = erase_via_cv2(im) if have_cv2 else erase_via_gradient(im)
    print("erase method:", "cv2.inpaint TELEA" if have_cv2 else "gradient reconstruction")

    x0, y0, x1, y1 = BAND
    bw, bh = x1 - x0 + 1, y1 - y0 + 1
    d = ImageDraw.Draw(im)

    size = 200
    while size > 8:
        f = load_font(size)
        tb = d.textbbox((0, 0), TEXT, font=f)
        tw, th = tb[2] - tb[0], tb[3] - tb[1]
        if tw >= bw * 0.96 or th >= bh * 0.94:
            size -= 1
            continue
        break
    f = load_font(size)
    tb = d.textbbox((0, 0), TEXT, font=f)
    tw, th = tb[2] - tb[0], tb[3] - tb[1]
    d.text((x0 + (bw - tw) / 2 - tb[0], y0 + (bh - th) / 2 - tb[1]),
           TEXT, font=f, fill=(25, 25, 25))
    print(f"font_size={size} text_w={tw} band_w={bw}")

    if write:
        im.save(V)
        print("WROTE", V)
    else:
        im.crop((300, 530, 730, 690)).resize((860, 320), Image.LANCZOS).save("/tmp/5a1mq_check.png")
        im.crop((0, 380, 1024, 780)).resize((1024, 400), Image.LANCZOS).save("/tmp/5a1mq_wide.png")
        print("preview -> /tmp/5a1mq_wide.png")


if __name__ == "__main__":
    main()
