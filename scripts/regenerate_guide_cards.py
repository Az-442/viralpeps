"""Regenerate all guide card images with consistent ViralPeps branding.
Uses the generic viralpeps vial template - compound names in text only.
1200x675px cards with gradient background, vial, and correct text per article."""

from PIL import Image, ImageDraw, ImageFont
import os

BASE = "/Users/time4you/viralpeps"
OUT = f"{BASE}/public/images/guides"
VIAL = f"{BASE}/public/images/compounds/viralpeps-vial-template.png"

W, H = 1200, 675

# Article data: (image_stub, title_text, subheading, description, category)
articles = [
    ("bpc157-summary", "BPC-157", "Research Summary", "Overview of BPC-157, its research applications, dosing protocols, and current literature.", "Compound Profile"),
    ("tirzepatide-summary", "Tirzepatide", "Research Summary", "Overview of Tirzepatide as a dual GIP/GLP-1 receptor agonist for metabolic research.", "Compound Profile"),
    ("ghkcu-summary", "GHK-Cu", "Research Summary", "Overview of GHK-Cu, a copper peptide complex that modulates gene expression and promotes tissue repair.", "Compound Profile"),
    ("retatrutide-summary", "Retatrutide", "Research Summary", "Overview of Retatrutide (LY3437943), a first-in-class triple GLP-1/GIP/glucagon receptor agonist.", "Compound Profile"),
    ("semax-summary", "Semax", "Research Summary", "Overview of Semax, a synthetic ACTH(4-10) analog for neuroprotection and cognitive research.", "Compound Profile"),
    ("selank-summary", "Selank", "Research Summary", "Overview of Selank (TP-7), a synthetic heptapeptide with anxiolytic and nootropic properties.", "Compound Profile"),
    ("ghkcu-vs-bpc157", "GHK-Cu vs BPC-157", "Comparison", "Which peptide for tissue repair? A detailed comparison of mechanisms, strengths, and research applications.", "Comparison"),
    ("retatrutide-vs-tirzepatide", "Retatrutide vs Tirzepatide", "Comparison", "Triple vs dual agonist showdown — mechanism, clinical data, and regulatory status.", "Comparison"),
    ("semax-vs-selank", "Semax vs Selank", "Comparison", "Nootropic & anxiolytic comparison — BDNF upregulation vs GABAergic modulation.", "Comparison"),
    ("peptide-reconstitution-guide", "Peptide Reconstitution Guide", "Practical Guide", "Complete step-by-step guide to reconstituting lyophilised peptides with bacteriostatic water.", "Guide"),
]

def wrap_text(text, font, max_width, draw):
    words = text.split()
    lines = []
    current = ""
    for w in words:
        test = current + (" " if current else "") + w
        bb = draw.textbbox((0, 0), test, font=font)
        if bb[2] - bb[0] <= max_width:
            current = test
        else:
            lines.append(current)
            current = w
    if current:
        lines.append(current)
    return lines

def make_card(stub, title, subheading, desc, category):
    img = Image.new("RGB", (W, H), "#f0f5ff")
    draw = ImageDraw.Draw(img)

    # Gradient overlay
    for y in range(H):
        r = int(240 - (y / H) * 40)
        g = int(245 - (y / H) * 30)
        b = int(255 - (y / H) * 20)
        draw.line([(0, y), (W, y)], fill=(r, g, b))

    # Decorative circles
    draw.ellipse((-80, -80, 160, 160), fill=(220, 235, 255, 180))
    draw.ellipse((W - 120, H - 120, W + 40, H + 40), fill=(200, 225, 250, 120))

    # Paste vial on left
    try:
        vial = Image.open(VIAL).convert("RGBA")
        # Resize to fit left panel
        vial_w = int(vial.width * 220 / vial.height) if vial.height > 220 else vial.width
        vial_h = 220
        vial = vial.resize((vial_w, vial_h), Image.LANCZOS)
        # Center in left 400px area
        vx = 200 - vial_w // 2
        vy = H // 2 - vial_h // 2
        if vial.mode == "RGBA":
            img.paste(vial, (vx, vy), vial)
        else:
            img.paste(vial, (vx, vy))
    except Exception as e:
        print(f"  Failed to paste vial for {stub}: {e}")

    # Text on right (offset ~420px)
    tx = 420
    ty = 150

    # Category badge
    try:
        fnt_badge = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttf", 22)
    except:
        fnt_badge = ImageFont.load_default()
    badge_colors = {
        "Compound Profile": (37, 99, 235),
        "Comparison": (124, 58, 237),
        "Guide": (16, 185, 129),
    }
    bc = badge_colors.get(category, (37, 99, 235))
    draw.rounded_rectangle([tx, ty, tx + draw.textbbox((0,0), category, font=fnt_badge)[2] - draw.textbbox((0,0), category, font=fnt_badge)[0] + 24, ty + 30], radius=12, fill=bc)
    draw.text((tx + 12, ty + 5), category, fill="white", font=fnt_badge)

    # Title
    try:
        fnt_title = ImageFont.truetype("/System/Library/Fonts/Helvetica-Bold.ttf", 36)
        fnt_sub = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttf", 22)
        fnt_desc = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttf", 16)
    except:
        fnt_title = ImageFont.load_default()
        fnt_sub = fnt_title
        fnt_desc = fnt_title

    ty += 48
    draw.text((tx, ty), title, fill="#0f172a", font=fnt_title)
    ty += 46

    draw.text((tx, ty), subheading, fill="#2563eb", font=fnt_sub)
    ty += 34

    # Wrapped description
    desc_lines = wrap_text(desc, fnt_desc, W - tx - 40, draw)
    for line in desc_lines:
        draw.text((tx, ty), line, fill="#64748b", font=fnt_desc)
        ty += 22

    # Footer
    draw.text((tx, H - 40), "viralpeps.co.uk", fill="#94a3b8", font=fnt_desc)

    out_path = f"{OUT}/{stub}.png"
    img.save(out_path, "PNG")
    print(f"  ✓ {stub}.png saved")

for stub, title, sub, desc, cat in articles:
    print(f"Generating {stub}...")
    make_card(stub, title, sub, desc, cat)

print(f"\nDone! {len(articles)} images generated.")
