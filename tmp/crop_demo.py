#!/usr/bin/env python3
"""Crop the two demo screenshots into presentation-ready images for the supplier package."""
from PIL import Image
import os

OUT = "/Users/time4you/viralpeps/tmp/demo-screenshots"
os.makedirs(OUT, exist_ok=True)

# Source: expanded TrustScore card (widget demo)
src_widget = "/Users/time4you/.hermes/cache/screenshots/browser_screenshot_563609846bc5410aa6a812a3cdd246a8.png"
img = Image.open(src_widget)
w, h = img.size
print(f"widget src size: {w}x{h}")

# Expanded card ~ (983,263)-(1263,558). Add 14px padding.
pad = 14
card_box = (983 - pad, 263 - pad, 1263 + pad, 558 + pad)
card = img.crop(card_box)
card_path = os.path.join(OUT, "trustscore-widget-demo.png")
card.save(card_path)
print(f"widget demo (card only): {card_path}  size={card.size}")

# Source: collapsed badge full page (verified demo)
src_verified = "/Users/time4you/.hermes/cache/screenshots/browser_screenshot_a2fd7de2204a413aa603dfc85324556e.png"
img2 = Image.open(src_verified)
print(f"verified src size: {img2.size}")

# Verified demo: top verified bar (y0-28) + product area with Learn button (up to ~y343)
# plus collapsed badge bottom-right (y573-617). Build a composite crop.
# Crop a vertical region from top (y=0) to include the Learn button area, then
# the collapsed badge sits below. A single crop from y0 to y~360 captures the
# verified bar + product + Learn. We'll also show the collapsed badge.
top_crop = img2.crop((0, 0, 1280, 360))
top_path = os.path.join(OUT, "verified-demo-top.png")
top_crop.save(top_path)
print(f"verified demo (top): {top_path}  size={top_crop.size}")

# Crop just the collapsed badge for a clean inset
badge_box = (1055 - 10, 573 - 10, 1265 + 10, 617 + 10)
badge = img2.crop(badge_box)
badge_path = os.path.join(OUT, "verified-demo-badge.png")
badge.save(badge_path)
print(f"collapsed badge: {badge_path}  size={badge.size}")
