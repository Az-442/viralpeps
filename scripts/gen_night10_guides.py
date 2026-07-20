"""Generate guide card images for Night 10 articles."""
from PIL import Image, ImageDraw, ImageFont
import os

card_w, card_h = 1200, 675
font_dir = "/System/Library/Fonts"
helvetica = os.path.join(font_dir, "Helvetica.ttc")

def make_card(slug, title, category, subtitle, desc_lines, vial_path, output_path):
    if not os.path.exists(vial_path):
        print(f"  WARNING: Vial not found at {vial_path}, using fallback")
        fallback = "public/images/compounds/viralpeps-vial-simple.png"
        if os.path.exists(fallback):
            vial_path = fallback
        else:
            print(f"  SKIPPING {slug}: no vial image available")
            return False

    vial = Image.open(vial_path)
    card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
    draw = ImageDraw.Draw(card)

    # Background gradient
    for y in range(card_h):
        ratio = y / card_h
        r = int(245 - ratio * 15)
        g = int(248 - ratio * 15)
        b = int(255 - ratio * 15)
        draw.line([(0, y), (card_w, y)], fill=(r, g, b))

    # Decorative circles
    draw.ellipse([-80, -80, 250, 250], fill=(230, 240, 255))
    draw.ellipse([card_w-180, card_h-180, card_w+80, card_h+80], fill=(240, 245, 255))

    # Vial image
    vial_ratio = vial.width / vial.height
    target_h = int(card_h * 0.8)
    target_w = int(target_h * vial_ratio)
    if target_w > card_w // 2 - 40:
        target_w = card_w // 2 - 60
        target_h = int(target_w / vial_ratio)
    vial_resized = vial.resize((target_w, target_h), Image.LANCZOS)
    vial_x = 50
    vial_y = (card_h - target_h) // 2
    if vial.mode == 'RGBA':
        card.paste(vial_resized, (vial_x, vial_y), vial_resized)
    else:
        card.paste(vial_resized, (vial_x, vial_y))

    # Fonts
    title_font = ImageFont.truetype(helvetica, 48, index=1) if os.path.exists(helvetica) else ImageFont.load_default()
    subtitle_font = ImageFont.truetype(helvetica, 28) if os.path.exists(helvetica) else ImageFont.load_default()
    badge_font = ImageFont.truetype(helvetica, 14) if os.path.exists(helvetica) else ImageFont.load_default()
    body_font = ImageFont.truetype(helvetica, 20) if os.path.exists(helvetica) else ImageFont.load_default()
    small_font = ImageFont.truetype(helvetica, 16) if os.path.exists(helvetica) else ImageFont.load_default()

    text_x = vial_x + target_w + 50

    # Category badge
    badge_x, badge_y = text_x, 130
    badge_w = len(category) * 13 + 30
    draw.rounded_rectangle([badge_x, badge_y, badge_x + badge_w, badge_y + 30], radius=15, fill=(37, 99, 235))
    draw.text((text_x + badge_w // 2, badge_y + 15), category, fill=(255, 255, 255), font=badge_font, anchor="mm")

    # Title
    title_y = badge_y + 55
    draw.text((text_x, title_y), title, fill=(15, 30, 50), font=title_font)

    # Subtitle
    subtitle_y = title_y + 65
    draw.text((text_x, subtitle_y), subtitle, fill=(37, 99, 235), font=subtitle_font)

    # Description
    y_off = subtitle_y + 55
    for line in desc_lines:
        draw.text((text_x, y_off), line, fill=(100, 116, 139), font=body_font)
        y_off += 28

    # ViralPeps branding
    draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=small_font)
    draw.rounded_rectangle([0, card_h-4, card_w, card_h], radius=0, fill=(37, 99, 235))

    card.save(output_path, "PNG", quality=97)
    print(f"Saved: {output_path} ({os.path.getsize(output_path)} bytes)")
    return True

# === PT-141 vs Melanotan 2 ===
make_card(
    slug="pt141-vs-melanotan2",
    title="PT-141 vs Melanotan 2",
    category="Comparison",
    subtitle="Melanocortin Peptide Comparison",
    desc_lines=[
        "Comparing PT-141 and Melanotan 2 — two melanocortin",
        "receptor agonists with shared origins. Sexual function,",
        "pigmentation, central mechanism, and research contexts.",
    ],
    vial_path="public/images/compounds/pt-141-vial.png",
    output_path="public/images/guides/pt141-vs-melanotan2.png",
)

# === AOD 9604 vs Tesamorelin ===
make_card(
    slug="aod9604-vs-tesamorelin",
    title="AOD 9604 vs Tesamorelin",
    category="Comparison",
    subtitle="Metabolic Peptide Comparison",
    desc_lines=[
        "Comparing AOD-9604 and Tesamorelin — two metabolic",
        "peptides targeting fat loss through different pathways.",
        "hGH fragment vs GHRH analogue. Mechanisms and evidence.",
    ],
    vial_path="public/images/compounds/aod-9604-vial.png",
    output_path="public/images/guides/aod9604-vs-tesamorelin.png",
)
