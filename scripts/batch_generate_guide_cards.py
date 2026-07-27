"""Batch generate 6 guide card images — comparison articles get 2 vials, deep dives get 1."""
from PIL import Image, ImageDraw, ImageFont
import os

def draw_guide_card(compound, vial_paths, description_lines, output_rel_path, badge_text="Compound Profile"):
    """Draw a single 1200×675 guide card. vial_paths can be 1 or 2 vials."""
    font_dir = "/System/Library/Fonts"
    helvetica = os.path.join(font_dir, "Helvetica.ttc")
    if os.path.exists(helvetica):
        title_font = ImageFont.truetype(helvetica, 48, index=1)  # 48pt for 2-vial cards
        subtitle_font = ImageFont.truetype(helvetica, 28)
        badge_font = ImageFont.truetype(helvetica, 14)
        body_font = ImageFont.truetype(helvetica, 20)
        small_font = ImageFont.truetype(helvetica, 16)
    else:
        title_font = subtitle_font = badge_font = body_font = small_font = ImageFont.load_default()

    card_w, card_h = 1200, 675
    BLUE = (37, 99, 235)

    card = Image.new("RGB", (card_w, card_h), (255, 255, 255))
    draw = ImageDraw.Draw(card)

    # Solid gradient background (per-pixel — CORRECT approach)
    for y in range(card_h):
        ratio = y / card_h
        r = int(245 - ratio * 15)
        g = int(248 - ratio * 15)
        b = int(255 - ratio * 15)
        for x in range(card_w):
            draw.point((x, y), fill=(r, g, b))

    # Decorative circles — BOTH must be (230, 240, 255)
    draw.ellipse([-80, -80, 250, 250], fill=(230, 240, 255))
    draw.ellipse([card_w - 180, card_h - 180, card_w + 80, card_h + 80], fill=(230, 240, 255))

    base = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # Paste vials
    num_vials = len(vial_paths)
    vial_total_w = 0
    vial_pasted = []

    for i, vial_rel in enumerate(vial_paths):
        vial_abs = os.path.join(base, vial_rel)
        if os.path.exists(vial_abs):
            vial = Image.open(vial_abs)
            v_ratio = vial.width / vial.height
            target_h = int(card_h * 0.75)
            target_w = int(target_h * v_ratio)
            if target_w > card_w // (num_vials + 1) - 20:
                target_w = card_w // (num_vials + 1) - 20
                target_h = int(target_w / v_ratio)
            vial_resized = vial.resize((target_w, target_h), Image.LANCZOS)
            vial_pasted.append((vial_resized, target_w, target_h))
            vial_total_w += target_w
        else:
            print(f"  WARNING: vial not found at {vial_abs}")
            vial_pasted.append((None, 0, 0))

    # Position vials
    if num_vials == 2:
        # Two vials — position side by side, left half
        gap = 20
        total_w = vial_pasted[0][1] + gap + vial_pasted[1][1]
        start_x = int((card_w // 2 - total_w) / 2)
        vial_x_positions = []
        cx = start_x
        for i in range(num_vials):
            vial_x_positions.append(cx)
            cx += vial_pasted[i][1] + gap

        for i in range(num_vials):
            if vial_pasted[i][0]:
                _, tw, th = vial_pasted[i]
                vx = vial_x_positions[i]
                vy = (card_h - th) // 2
                if vial_pasted[i][0].mode == "RGBA":
                    card.paste(vial_pasted[i][0], (vx, vy), vial_pasted[i][0])
                else:
                    card.paste(vial_pasted[i][0], (vx, vy))

        text_x = card_w // 2 + 30
    else:
        # Single vial — centre-left
        if vial_pasted[0][0]:
            _, tw, th = vial_pasted[0]
            vx, vy = 50, (card_h - th) // 2
            if vial_pasted[0][0].mode == "RGBA":
                card.paste(vial_pasted[0][0], (vx, vy), vial_pasted[0][0])
            else:
                card.paste(vial_pasted[0][0], (vx, vy))
        text_x = 50 + (vial_pasted[0][1] if vial_pasted[0][0] else 0) + 50

    # Badge
    badge_x, badge_y = text_x, 140
    draw.rounded_rectangle([badge_x, badge_y, badge_x + 170, badge_y + 30], radius=15, fill=BLUE)
    draw.text((badge_x + 85, badge_y + 15), badge_text, fill=(255, 255, 255), font=badge_font, anchor="mm")

    # Title
    title_font_use = title_font
    draw.text((text_x, badge_y + 55), compound, fill=(15, 30, 50), font=title_font_use)

    # Subtitle
    subtitle_text = "Comparison" if num_vials == 2 else "Research Summary"
    draw.text((text_x, badge_y + 120), subtitle_text, fill=BLUE, font=subtitle_font)

    # Description
    y_off = badge_y + 180
    for line in description_lines:
        draw.text((text_x, y_off), line, fill=(100, 116, 139), font=body_font)
        y_off += 30

    # Footer
    draw.text((text_x, card_h - 55), "viralpeps.co.uk", fill=(148, 163, 184), font=small_font)

    # Blue accent stripe
    draw.rounded_rectangle([0, card_h - 4, card_w, card_h], radius=0, fill=BLUE)

    output_path = os.path.join(base, output_rel_path)
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    card.save(output_path, "PNG", quality=97)
    print(f"  Saved: {output_path} ({os.path.getsize(output_path)} bytes)")


# ============================================================
# Card definitions
# ============================================================
CARDS = [
    # === COMPARISON ARTICLES (2 vials each) ===
    {
        "compound": "GHK-Cu vs Retinol",
        "vials": ["public/images/compounds/ghk-cu-vial.png", "public/images/vials/retinol-vial.png"],
        "output": "public/images/guides/ghkcu-vs-retinol.png",
        "badge": "Head-to-Head Comparison",
        "description": [
            "Comparing GHK-Cu with Retinol for skin",
            "health, collagen synthesis, and anti-aging",
            "applications.",
        ],
    },
    {
        "compound": "CJC-1295 vs Tesamorelin",
        "vials": ["public/images/compounds/cjc-1295-vial.png", "public/images/compounds/tesamorelin-vial.png"],
        "output": "public/images/guides/cjc1295-vs-tesamorelin.png",
        "badge": "Head-to-Head Comparison",
        "description": [
            "Comparing CJC-1295 with Tesamorelin for",
            "growth hormone release, IGF-1 elevation,",
            "and body composition research.",
        ],
    },
    {
        "compound": "Selank vs Semax (ADHD)",
        "vials": ["public/images/compounds/selank-vial.png", "public/images/compounds/semax-vial.png"],
        "output": "public/images/guides/selank-vs-semax-adhd.png",
        "badge": "Head-to-Head Comparison",
        "description": [
            "Comparing Selank and Semax for cognitive",
            "enhancement, focus, and ADHD symptom",
            "management.",
        ],
    },
    # === DEEP DIVE ARTICLES (1 vial each) ===
    {
        "compound": "BPC-157",
        "vials": ["public/images/compounds/bpc-157-oral.png"],
        "output": "public/images/guides/bpc157-summary.png",
        "badge": "Compound Profile",
        "description": [
            "BPC-157 research summary covering",
            "mechanisms, benefits, dosing protocols,",
            "and current scientific evidence.",
        ],
    },
    {
        "compound": "Tirzepatide",
        "vials": ["public/images/compounds/tirzepatide-vial.png"],
        "output": "public/images/guides/tirzepatide-summary.png",
        "badge": "Compound Profile",
        "description": [
            "Tirzepatide research summary covering",
            "GLP-1/GIP dual agonism mechanisms,",
            "clinical outcomes, and metabolic research.",
        ],
    },
    {
        "compound": "Semaglutide",
        "vials": ["public/images/compounds/semaglutide-vial.png"],
        "output": "public/images/guides/semaglutide-research-summary.png",
        "badge": "Compound Profile",
        "description": [
            "Semaglutide research summary covering",
            "GLP-1 receptor agonism, metabolic",
            "outcomes, and clinical applications.",
        ],
    },
]

if __name__ == "__main__":
    print(f"Generating {len(CARDS)} guide card images...\n")
    for i, card in enumerate(CARDS, 1):
        print(f"[{i}/{len(CARDS)}] {card['compound']}")
        draw_guide_card(
            compound=card["compound"],
            vial_paths=card["vials"],
            description_lines=card["description"],
            output_rel_path=card["output"],
            badge_text=card.get("badge", "Compound Profile"),
        )
        print()
    print("Done — all cards generated.")
