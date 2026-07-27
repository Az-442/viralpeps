"""
Batch generate ViralPeps guide card images (1200x675) — with dual-vial support.
Usage: python3 scripts/batch_generate_guide_cards.py
"""

from PIL import Image, ImageDraw, ImageFont
import os

font_dir = "/System/Library/Fonts"
helvetica = os.path.join(font_dir, "Helvetica.ttc")
if os.path.exists(helvetica):
    title_font = ImageFont.truetype(helvetica, 48, index=1)
    subtitle_font = ImageFont.truetype(helvetica, 26)
    badge_font = ImageFont.truetype(helvetica, 14)
    body_font = ImageFont.truetype(helvetica, 18)
    small_font = ImageFont.truetype(helvetica, 14)
else:
    title_font = subtitle_font = badge_font = body_font = small_font = ImageFont.load_default()

card_w, card_h = 1200, 675
ACCENT = (37, 99, 235)
DARK = (30, 41, 59)
BODY_COLOR = (100, 116, 139)
CIRCLE_COLOR = (230, 240, 255)
WHITE = (255, 255, 255)


def draw_guide_card(
    compound: str,
    vial_paths: list[str],
    output_path: str,
    description_lines: list[str],
    badge_text: str = "Compound Profile",
    subtitle_text: str = "Research Summary",
) -> str:
    """Draw a 1200x675 guide card with 1 or 2 vials on the left.
    For 2 vials: each vial is 55% card height, placed side-by-side.
    Text always gets ~50% of card width on the right.
    """
    card = Image.new("RGB", (card_w, card_h), WHITE)
    draw = ImageDraw.Draw(card)

    # Gradient background (light grey-blue)
    for y in range(card_h):
        ratio = y / card_h
        r = int(245 - ratio * 15)
        g = int(248 - ratio * 15)
        b = int(255 - ratio * 15)
        for x in range(card_w):
            draw.point((x, y), fill=(r, g, b))

    # Decorative circles (light blue)
    draw.ellipse([-80, -80, 250, 250], fill=CIRCLE_COLOR)
    draw.ellipse([card_w - 180, card_h - 180, card_w + 80, card_h + 80], fill=CIRCLE_COLOR)

    # Vial placement
    num_vials = len(vial_paths)
    if num_vials == 0:
        text_left = 50
    elif num_vials == 1:
        vial_path = vial_paths[0]
        if os.path.exists(vial_path):
            vial = Image.open(vial_path).convert("RGBA")
            vial_h = int(card_h * 0.75)
            vial_w = int(vial_h * vial.width / vial.height)
            vial = vial.resize((vial_w, vial_h), Image.LANCZOS)
            card.paste(vial, (50, int((card_h - vial_h) / 2)), vial)
            text_left = 50 + vial_w + 40
        else:
            text_left = 50
    else:
        # 2 vials: stacked vertically, each at 37% card height (same visual size as single)
        vial_h = int(card_h * 0.37)
        gap = 20
        start_y = int((card_h - (vial_h * 2 + gap)) / 2)
        vial_x = 50
        
        for i, vial_path in enumerate(vial_paths[:2]):
            if os.path.exists(vial_path):
                vial = Image.open(vial_path).convert("RGBA")
                vw = int(vial_h * vial.width / vial.height)
                vial = vial.resize((vw, vial_h), Image.LANCZOS)
                vy = start_y + i * (vial_h + gap)
                card.paste(vial, (vial_x, vy), vial)
        
        text_left = vial_x + int(vial_h * 1.0) + 45

    # Ensure text has enough room
    if text_left > card_w - 200:
        text_left = card_w - 350

    # Badge
    text_w = draw.textlength(badge_text, font=badge_font)
    badge_w = int(text_w + 20)
    badge_h = 24
    draw.rounded_rectangle(
        [text_left, 50, text_left + badge_w, 50 + badge_h],
        radius=4,
        fill=ACCENT,
    )
    draw.text((text_left + 10, 53), badge_text, fill=WHITE, font=badge_font)

    # Title (wrap if too long)
    title_y = 90
    max_text_w = card_w - text_left - 30
    compound_line = compound
    # If title is too long, check if there's a " vs " split
    if " vs " in compound and draw.textlength(compound, font=title_font) > max_text_w:
        parts = compound.split(" vs ", 1)
        compound_line = f"{parts[0]}"
        compound_line2 = f"vs {parts[1]}"
        draw.text((text_left, title_y), compound_line, fill=DARK, font=title_font)
        draw.text((text_left, title_y + 54), compound_line2, fill=DARK, font=title_font)
        subtitle_y = title_y + 108
    else:
        draw.text((text_left, title_y), compound_line, fill=DARK, font=title_font)
        subtitle_y = title_y + 58

    # Subtitle
    draw.text((text_left, subtitle_y), subtitle_text, fill=ACCENT, font=subtitle_font)

    # Description lines
    desc_y = subtitle_y + 44
    for line in description_lines:
        draw.text((text_left, desc_y), line, fill=BODY_COLOR, font=body_font)
        desc_y += 26

    # Footer
    footer_y = card_h - 50
    draw.text((text_left, footer_y), "viralpeps.co.uk", fill=ACCENT, font=small_font)

    # Accent stripe at bottom
    draw.rectangle([0, card_h - 4, card_w, card_h], fill=ACCENT)

    os.makedirs(os.path.dirname(output_path) or ".", exist_ok=True)
    card.save(output_path, quality=97)
    return os.path.abspath(output_path)


# ============ CONFIG: Add/remove cards here ============
CARDS = [
    # === COMPARISONS (2 vials stacked vertically, same size as single vial cards) ===
    {
        "compound": "GHK-Cu vs Retinol",
        "vial_paths": ["public/images/compounds/ghk-cu-vial.png", "public/images/compounds/ghk-cu-vial.png"],
        "output_path": "public/images/guides/ghkcu-vs-retinol.png",
        "description_lines": [
            "Comparing GHK-Cu with Retinol for skin health,",
            "collagen synthesis, and anti-aging applications.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "Skin Research",
    },
    {
        "compound": "CJC-1295 vs Tesamorelin",
        "vial_paths": ["public/images/compounds/cjc-1295-vial.png", "public/images/compounds/tesamorelin-vial.png"],
        "output_path": "public/images/guides/cjc1295-vs-tesamorelin.png",
        "description_lines": [
            "Comparing CJC-1295 with Tesamorelin for growth",
            "hormone release, IGF-1 elevation, and body",
            "composition research.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "Growth Hormone Research",
    },
]

if __name__ == "__main__":
    project_root = os.path.join(os.path.dirname(__file__), "..")
    for card in CARDS:
        vial_paths_abs = [os.path.join(project_root, vp) for vp in card["vial_paths"]]
        output_path = os.path.join(project_root, card["output_path"])
        draw_guide_card(
            compound=card["compound"],
            vial_paths=vial_paths_abs,
            output_path=output_path,
            description_lines=card["description_lines"],
            badge_text=card.get("badge_text", "Compound Profile"),
            subtitle_text=card.get("subtitle_text", "Research Summary"),
        )
        size_kb = os.path.getsize(output_path)//1024 if os.path.exists(output_path) else 0
        print(f"  ✓ {card['output_path']} ({size_kb} KB)")
