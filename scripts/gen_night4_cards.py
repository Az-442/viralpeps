"""
Generate 4 guide card images for Night 4 articles.
Uses existing vial images from public/images/compounds/.
"""
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import os, textwrap

WIDTH, HEIGHT = 1200, 675  # 16:9 aspect ratio
OUTPUT_DIR = "public/images/guides"
COMPOUNDS_DIR = "public/images/compounds"
FALLBACK_VIAL = os.path.join(COMPOUNDS_DIR, "viralpeps-vial-simple.png")
FONT_BOLD = "/System/Library/Fonts/Helvetica.ttc"
FONT_REGULAR = "/System/Library/Fonts/Helvetica.ttc"

def hex_to_rgb(h):
    h = h.lstrip("#")
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def make_card(
    output_name: str,
    compound_name: str,
    category: str,
    subtitle: str,
    description_lines: list[str],
    vial_slug: str = None,
    gradient_top: str = "#0a1628",
    gradient_bottom: str = "#1a3a5c",
    badge_bg: str = "#6366f1",
):
    """Generate a guide card with gradient background + vial overlay + text."""
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Gradient background
    top_rgb = hex_to_rgb(gradient_top)
    bot_rgb = hex_to_rgb(gradient_bottom)
    for y in range(HEIGHT):
        ratio = y / HEIGHT
        r = int(top_rgb[0] * (1 - ratio) + bot_rgb[0] * ratio)
        g = int(top_rgb[1] * (1 - ratio) + bot_rgb[1] * ratio)
        b = int(top_rgb[2] * (1 - ratio) + bot_rgb[2] * ratio)
        draw.line([(0, y), (WIDTH, y)], fill=(r, g, b, 255))

    # Subtle glow effect - lighter center spot
    glow = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    for i in range(3):
        alpha = 15 - i * 5
        center_x, center_y = 400, 320
        glow_draw.ellipse(
            [center_x - 200 - i*50, center_y - 200 - i*50, center_x + 200 + i*50, center_y + 200 + i*50],
            fill=(100, 150, 255, max(0, alpha))
        )
    glow = glow.filter(ImageFilter.GaussianBlur(radius=40))
    img = Image.alpha_composite(img, glow)

    # Category badge (top-left)
    font_bold = ImageFont.truetype(FONT_BOLD, 22)
    font_body = ImageFont.truetype(FONT_REGULAR, 20)
    font_title = ImageFont.truetype(FONT_BOLD, 40)
    font_sub = ImageFont.truetype(FONT_REGULAR, 18)

    badge_x, badge_y = 40, 40
    draw.rounded_rectangle(
        [badge_x, badge_y, badge_x + len(category) * 14 + 24, badge_y + 36],
        radius=6, fill=badge_bg
    )
    draw.text((badge_x + 12, badge_y + 8), category, fill="white", font=font_bold)

    # Title
    title_y = badge_y + 55
    draw.text((30, title_y), f"{compound_name}", fill="white", font=font_title)

    # Subtitle / "Deep Dive"
    if subtitle:
        sub_y = title_y + 50
        draw.text((30, sub_y), subtitle, fill=(160, 190, 220), font=font_sub)

    # Description lines (left side)
    desc_y = title_y + 85 if not subtitle else title_y + 85
    for i, line in enumerate(description_lines):
        draw.text((30, desc_y + i * 30), line, fill=(180, 200, 230), font=font_body)

    # Vial image overlay (right side)
    # Try compound-specific vial, fall back to generic
    vial_path = None
    if vial_slug:
        candidate = os.path.join(COMPOUNDS_DIR, f"{vial_slug}-vial.png")
        if os.path.exists(candidate):
            vial_path = candidate

    if not vial_path and os.path.exists(FALLBACK_VIAL):
        vial_path = FALLBACK_VIAL

    if vial_path:
        vial = Image.open(vial_path).convert("RGBA")
        # Resize vial to ~300px height maintaining aspect
        vial_w, vial_h = vial.size
        target_h = 320
        scale = target_h / vial_h
        new_w, new_h = int(vial_w * scale), int(vial_h * scale)
        if new_w > 320:
            scale = 320 / vial_w
            new_w, new_h = int(vial_w * scale), int(vial_h * scale)
        vial = vial.resize((new_w, new_h), Image.LANCZOS)
        # Position on right side
        vial_x = WIDTH - new_w - 60
        vial_y = (HEIGHT - new_h) // 2
        img.paste(vial, (vial_x, vial_y), vial)

    # Bottom accent line
    draw.rectangle([0, HEIGHT - 5, WIDTH, HEIGHT], fill=hex_to_rgb(badge_bg))

    # Save
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    out_path = os.path.join(OUTPUT_DIR, f"{output_name}.png")
    img.save(out_path, "PNG")
    print(f"Saved {out_path}")

# --- Night 4 Articles ---

make_card(
    output_name="pt141-profile",
    compound_name="PT-141 (Bremelanotide)",
    category="Compound Profiles",
    subtitle="Melanocortin Agonist | Sexual Health Research",
    description_lines=[
        "FDA-approved for HSDD in premenopausal women",
        "Acts centrally on MC3R/MC4R pathways",
        "10mg vial, 2-4 hours before activity",
        "NO-independent mechanism — works differently to PDE5 inhibitors",
    ],
    vial_slug="pt-141",
    gradient_top="#0a1628",
    gradient_bottom="#2d1b4e",
    badge_bg="#7c3aed",
)

make_card(
    output_name="ghkcu-deep-dive",
    compound_name="GHK-Cu Deep Dive",
    category="Compound Profiles",
    subtitle="Copper Peptide | Gene Expression Master",
    description_lines=[
        "Modulates over 4,000 genes — ~6% of the human genome",
        "Collagen, elastin, VEGF, NGF, antioxidant upregulation",
        "Wound healing, skin rejuvenation, hair growth research",
        "First isolated from human plasma in 1973",
    ],
    vial_slug="ghk-cu",
    gradient_top="#0a1628",
    gradient_bottom="#0f4c3a",
    badge_bg="#059669",
)

make_card(
    output_name="retatrutide-deep-dive",
    compound_name="Retatrutide Deep Dive",
    category="Compound Profiles",
    subtitle="Triple Agonist | Eli Lilly Phase 3",
    description_lines=[
        "First-in-class GIP/GLP-1/glucagon triple agonist",
        "Up to 24.2% weight loss at 48 weeks (Phase 2)",
        "80-90% liver fat reduction in MASLD patients",
        "Once-weekly dosing, ~6 day half-life",
    ],
    vial_slug="retatrutide",
    gradient_top="#0a1628",
    gradient_bottom="#1a3a5c",
    badge_bg="#2563eb",
)

make_card(
    output_name="semax-deep-dive",
    compound_name="Semax Deep Dive",
    category="Compound Profiles",
    subtitle="ACTH(4-10) Analog | Neuroprotection",
    description_lines=[
        "Upregulates BDNF and NGF in hippocampus & frontal cortex",
        "Gene expression changes detectable within 20 minutes",
        "Clinical use in Russia since the 1990s",
        "300-600 mcg intranasal, 1-2x daily, 2-4 weeks on",
    ],
    vial_slug="semax",
    gradient_top="#0a1628",
    gradient_bottom="#1e3a5f",
    badge_bg="#4f46e5",
)
