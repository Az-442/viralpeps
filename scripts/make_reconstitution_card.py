"""Generate on-brand reconstitution guide card - syringe icon instead of vial."""
from PIL import Image, ImageDraw, ImageFont
import os

OUT = "/Users/time4you/viralpeps/public/images/guides"
W, H = 1200, 675

img = Image.new("RGB", (W, H), "#f0f5ff")
draw = ImageDraw.Draw(img)

# Gradient background
for y in range(H):
    r = int(240 - (y / H) * 40)
    g = int(245 - (y / H) * 30)
    b = int(255 - (y / H) * 20)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# Decorative circles
draw.ellipse((-80, -80, 160, 160), fill=(220, 235, 255, 180))
draw.ellipse((W - 120, H - 120, W + 40, H + 40), fill=(200, 225, 250, 120))

# Draw a simple syringe icon on the left using Pillow shapes
sx, sy = 200, H // 2 - 60

# Syringe barrel
barrel_w, barrel_h = 30, 120
draw.rounded_rectangle([sx - barrel_w//2, sy, sx + barrel_w//2, sy + barrel_h], radius=5, fill="#e2e8f0", outline="#94a3b8", width=2)

# Plunger
draw.rectangle([sx - 4, sy - 30, sx + 4, sy + 5], fill="#475569")
# Plunger handle
draw.rectangle([sx - 12, sy - 40, sx + 12, sy - 30], fill="#64748b")

# Needle
draw.polygon([(sx, sy + barrel_h), (sx - 6, sy + barrel_h + 30), (sx + 6, sy + barrel_h + 30)], fill="#cbd5e1", outline="#94a3b8")

# Liquid in barrel (blue)
draw.rectangle([sx - barrel_w//2 + 3, sy + barrel_h - 50, sx + barrel_w//2 - 3, sy + barrel_h - 3], fill="#60a5fa")

# Measurement marks
for i in range(5):
    my = sy + barrel_h - 10 - i * 22
    draw.line([(sx - barrel_w//2 + 5, my), (sx - barrel_w//2 + 12, my)], fill="#475569", width=1)

# ViralPeps badge above syringe
draw.rounded_rectangle([sx - 45, sy - 65, sx + 45, sy - 48], radius=8, fill="#2563eb")
draw.text((sx - 32, sy - 63), "VIRALPEPS", fill="white")

# Text on right
tx = 420
ty = 150

# Category badge
bc = (16, 185, 129)  # teal green for Guide
draw.rounded_rectangle([tx, ty, tx + 80, ty + 30], radius=12, fill=bc)
draw.text((tx + 12, ty + 5), "Guide", fill="white")

ty += 48
draw.text((tx, ty), "Peptide Reconstitution", fill="#0f172a")
ty += 42
draw.text((tx, ty), "Guide", fill="#0f172a")
ty += 42

draw.text((tx, ty), "Practical Guide", fill="#2563eb")
ty += 34

desc = "Complete step-by-step guide to reconstituting lyophilised peptides with bacteriostatic water."
words = desc.split()
lines = []
current = ""
for w in words:
    test = current + (" " if current else "") + w
    bb = draw.textbbox((0, 0), test)
    if bb[2] - bb[0] <= W - tx - 40:
        current = test
    else:
        lines.append(current)
        current = w
if current:
    lines.append(current)
for line in lines:
    draw.text((tx, ty), line, fill="#64748b")
    ty += 22

# Footer
draw.text((tx, H - 40), "viralpeps.co.uk", fill="#94a3b8")

out_path = f"{OUT}/peptide-reconstitution-guide.png"
img.save(out_path, "PNG")
print(f"✓ peptide-reconstitution-guide.png saved")
