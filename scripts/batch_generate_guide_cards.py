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
        # 2 vials: each at 40% card height, side by side with 15px gap
        vial_h = int(card_h * 0.40)
        gap = 15
        start_x = 40
        
        for i, vial_path in enumerate(vial_paths[:2]):
            if os.path.exists(vial_path):
                vial = Image.open(vial_path).convert("RGBA")
                vw = int(vial_h * vial.width / vial.height)
                vial = vial.resize((vw, vial_h), Image.LANCZOS)
                card.paste(vial, (start_x, int((card_h - vial_h) / 2)), vial)
                start_x += vw + gap
        
        text_left = start_x + 30

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
    # === COMPARISONS (2 vials side-by-side, fixed text overlap) ===
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
    {
        "compound": "Selank vs Semax",
        "vial_paths": ["public/images/compounds/selank-vial.png", "public/images/compounds/semax-vial.png"],
        "output_path": "public/images/guides/semax-vs-selank.png",
        "description_lines": [
            "Comparing Selank with Semax for anxiety",
            "modulation, cognitive enhancement, and",
            "neurological research applications.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "Cognitive Research",
    },
    {
        "compound": "GHK-Cu vs BPC-157",
        "vial_paths": ["public/images/compounds/ghk-cu-vial.png", "public/images/compounds/bpc-157-vial.png"],
        "output_path": "public/images/guides/ghkcu-vs-bpc157.png",
        "description_lines": [
            "Comparing GHK-Cu with BPC-157 for tissue repair,",
            "wound healing, anti-aging, and regenerative",
            "medicine research applications.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "Tissue Repair Research",
    },
    {
        "compound": "TB-500 vs BPC-157",
        "vial_paths": ["public/images/compounds/tb-500-vial.png", "public/images/compounds/bpc-157-vial.png"],
        "output_path": "public/images/guides/tb500-vs-bpc157.png",
        "description_lines": [
            "Comparing TB-500 (Thymosin Beta-4) with BPC-157",
            "for tissue repair, inflammation modulation, and",
            "regenerative peptide research.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "Regenerative Research",
    },
    {
        "compound": "CJC-1295 vs Ipamorelin",
        "vial_paths": ["public/images/compounds/cjc-1295-vial.png", "public/images/compounds/ipamorelin-vial.png"],
        "output_path": "public/images/guides/cjc1295-vs-ipamorelin.png",
        "description_lines": [
            "Comparing CJC-1295 with Ipamorelin for growth",
            "hormone secretion, IGF-1 levels, and body",
            "composition research.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "GH Secretagogues",
    },
    {
        "compound": "Tesamorelin vs Sermorelin",
        "vial_paths": ["public/images/compounds/tesamorelin-vial.png", "public/images/compounds/sermorelin-vial.png"],
        "output_path": "public/images/guides/tesamorelin-vs-sermorelin.png",
        "description_lines": [
            "Comparing Tesamorelin with Sermorelin for GHRH",
            "agonism, GH/IGF-1 elevation, and metabolic",
            "research applications.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "GHRH Research",
    },
    {
        "compound": "Retatrutide vs Tirzepatide",
        "vial_paths": ["public/images/compounds/retatrutide-vial.png", "public/images/compounds/tirzepatide-vial.png"],
        "output_path": "public/images/guides/retatrutide-vs-tirzepatide.png",
        "description_lines": [
            "Comparing Retatrutide (triple agonist) with",
            "Tirzepatide (dual agonist) for weight loss,",
            "glycemic control, and metabolic research.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "Metabolic Research",
    },
    {
        "compound": "Semaglutide vs Tirzepatide",
        "vial_paths": ["public/images/compounds/semaglutide-vial.png", "public/images/compounds/tirzepatide-vial.png"],
        "output_path": "public/images/guides/semaglutide-vs-tirzepatide.png",
        "description_lines": [
            "Comparing Semaglutide with Tirzepatide for",
            "GLP-1 agonism, weight reduction, and",
            "metabolic health research.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "GLP-1 Research",
    },
    {
        "compound": "Retatrutide vs Semaglutide",
        "vial_paths": ["public/images/compounds/retatrutide-vial.png", "public/images/compounds/semaglutide-vial.png"],
        "output_path": "public/images/guides/retatrutide-vs-semaglutide.png",
        "description_lines": [
            "Comparing Retatrutide (triple agonist) with",
            "Semaglutide (GLP-1 agonist) for metabolic",
            "research and weight management outcomes.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "Metabolic Research",
    },
    {
        "compound": "Oxytocin vs PT-141",
        "vial_paths": ["public/images/compounds/oxytocin-vial.png", "public/images/compounds/pt-141-vial.png"],
        "output_path": "public/images/guides/oxytocin-vs-pt141.png",
        "description_lines": [
            "Comparing Oxytocin with PT-141 (Bremelanotide)",
            "for social bonding, sexual health research, and",
            "melanocortin pathway modulation.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "Neuroendocrine Research",
    },
    {
        "compound": "PT-141 vs Melanotan II",
        "vial_paths": ["public/images/compounds/pt-141-vial.png", "public/images/compounds/melanotan-ii-vial.png"],
        "output_path": "public/images/guides/pt141-vs-melanotan2.png",
        "description_lines": [
            "Comparing PT-141 (Bremelanotide) with Melanotan II",
            "for melanocortin receptor research, sexual health,",
            "and pigmentation studies.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "Melanocortin Research",
    },
    {
        "compound": "AOD-9604 vs Tesamorelin",
        "vial_paths": ["public/images/compounds/aod-9604-vial.png", "public/images/compounds/tesamorelin-vial.png"],
        "output_path": "public/images/guides/aod9604-vs-tesamorelin.png",
        "description_lines": [
            "Comparing AOD-9604 with Tesamorelin for",
            "lipolysis, fat metabolism, GH release, and",
            "body composition research.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "Metabolic Research",
    },
    {
        "compound": "Selank vs Semax (ADHD)",
        "vial_paths": ["public/images/compounds/selank-vial.png", "public/images/compounds/semax-vial.png"],
        "output_path": "public/images/guides/selank-vs-semax-adhd.png",
        "description_lines": [
            "Comparing Selank with Semax for ADHD-related",
            "cognitive symptoms, focus enhancement, and",
            "neurological research applications.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "Cognitive Research",
    },
    # === DEEP DIVES (single vial, white/blue style - FIXED from purple) ===
    {
        "compound": "BPC-157",
        "vial_paths": ["public/images/compounds/bpc-157-vial.png"],
        "output_path": "public/images/guides/bpc157-deep-dive-2.png",
        "description_lines": [
            "BPC-157 deep dive: mechanisms, tissue regeneration,",
            "gastrointestinal healing, tendon repair, dosing",
            "protocols, and current research evidence.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "Deep Dive",
    },
    {
        "compound": "GHK-Cu",
        "vial_paths": ["public/images/compounds/ghk-cu-vial.png"],
        "output_path": "public/images/guides/ghkcu-deep-dive.png",
        "description_lines": [
            "GHK-Cu deep dive: copper-binding tripeptide for",
            "tissue regeneration, wound healing, anti-aging,",
            "collagen synthesis, and hair regrowth research.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "Deep Dive",
    },
    {
        "compound": "Retatrutide",
        "vial_paths": ["public/images/compounds/retatrutide-vial.png"],
        "output_path": "public/images/guides/retatrutide-deep-dive.png",
        "description_lines": [
            "Retatrutide deep dive: triple GIP/GLP-1/glucagon",
            "agonist for metabolic research, weight reduction,",
            "glycemic control, and Phase 2 trial data.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "Deep Dive",
    },
    {
        "compound": "Semax",
        "vial_paths": ["public/images/compounds/semax-vial.png"],
        "output_path": "public/images/guides/semax-deep-dive.png",
        "description_lines": [
            "Semax deep dive: synthetic peptide for cognitive",
            "enhancement, neuroprotection, BDNF modulation,",
            "and neurological research applications.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "Deep Dive",
    },
    {
        "compound": "Melanotan II",
        "vial_paths": ["public/images/compounds/melanotan-ii-vial.png"],
        "output_path": "public/images/guides/melanotan2-deep-dive.png",
        "description_lines": [
            "Melanotan II deep dive: synthetic melanocortin",
            "agonist for tanning research, libido studies,",
            "and melanogenesis pathway investigation.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "Deep Dive",
    },
    {
        "compound": "Oxytocin",
        "vial_paths": ["public/images/compounds/oxytocin-vial.png"],
        "output_path": "public/images/guides/oxytocin-deep-dive.png",
        "description_lines": [
            "Oxytocin deep dive: neuropeptide for social",
            "bonding, anxiety modulation, pain research, and",
            "therapeutic applications in psychiatry.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "Deep Dive",
    },
    {
        "compound": "Sermorelin",
        "vial_paths": ["public/images/compounds/sermorelin-vial.png"],
        "output_path": "public/images/guides/sermorelin-deep-dive.png",
        "description_lines": [
            "Sermorelin deep dive: GHRH analogue for growth",
            "hormone stimulation, anti-aging research, body",
            "composition, and peptide therapy protocols.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "Deep Dive",
    },
    {
        "compound": "Tesamorelin",
        "vial_paths": ["public/images/compounds/tesamorelin-vial.png"],
        "output_path": "public/images/guides/tesamorelin-deep-dive.png",
        "description_lines": [
            "Tesamorelin deep dive: GHRH analogue for visceral",
            "fat reduction, GH/IGF-1 elevation, and metabolic",
            "research in HIV-associated lipodystrophy.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "Deep Dive",
    },
    {
        "compound": "Semaglutide",
        "vial_paths": ["public/images/compounds/semaglutide-vial.png"],
        "output_path": "public/images/guides/semaglutide-deep-dive.png",
        "description_lines": [
            "Semaglutide deep dive: GLP-1 receptor agonist for",
            "type 2 diabetes, obesity research, cardiovascular",
            "outcomes, and metabolic health applications.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "Deep Dive",
    },
    {
        "compound": "Tirzepatide",
        "vial_paths": ["public/images/compounds/tirzepatide-vial.png"],
        "output_path": "public/images/guides/tirzepatide-deep-dive-2.png",
        "description_lines": [
            "Tirzepatide deep dive: dual GIP/GLP-1 agonist",
            "for metabolic research, superior weight loss,",
            "glycemic control, and cardiovascular outcomes.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "Deep Dive",
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
