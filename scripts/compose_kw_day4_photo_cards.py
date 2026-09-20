"""Compose the Day-4 non-compound guide cards.

Base imagery is AI-generated photorealistic photography (FAL Flux 2 via the Nous
managed gateway), NOT Pillow-drawn graphics. Pillow is used only to lay the
card's text chrome over the photo, preserving the standard guide-card template
(1200x675, left image panel, right text column, badge + title + subtitle +
description + footer + accent stripe).
"""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

CARD_W, CARD_H = 1200, 675
ACCENT = (37, 99, 235)        # blue-600
DARK = (17, 24, 39)           # gray-900
BODY = (75, 85, 99)           # gray-600
WHITE = (255, 255, 255)

FONT_CANDIDATES = [
    "/System/Library/Fonts/Helvetica.ttc",
    "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
    "/Library/Fonts/Arial.ttf",
    "/System/Library/Fonts/Supplemental/Arial.ttf",
]


def load_font(size, bold=False):
    for path in FONT_CANDIDATES:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size, index=1 if bold and path.endswith(".ttc") else 0)
            except Exception:
                try:
                    return ImageFont.truetype(path, size)
                except Exception:
                    continue
    return ImageFont.load_default()


def compose(photo_path, output_path, badge, title, subtitle, description_lines):
    card = Image.new("RGB", (CARD_W, CARD_H), WHITE)

    # Photo panel on the left, cropped to a square that fills 60% of card height
    photo = Image.open(photo_path).convert("RGB")
    panel_h = int(CARD_H * 0.72)
    panel_w = int(photo.width * panel_h / photo.height)
    if panel_w > int(CARD_W * 0.46):
        panel_w = int(CARD_W * 0.46)
        panel_h = int(photo.height * panel_w / photo.width)
    photo = photo.resize((panel_w, panel_h), Image.LANCZOS)
    px, py = 38, int((CARD_H - panel_h) / 2)
    card.paste(photo, (px, py))

    text_left = px + panel_w + 34

    badge_font = load_font(19)
    title_font = load_font(40, bold=True)
    sub_font = load_font(23)
    body_font = load_font(18)
    small_font = load_font(16)

    draw = ImageDraw.Draw(card)

    # Badge
    bw = int(draw.textlength(badge, font=badge_font) + 22)
    draw.rounded_rectangle([text_left, 60, text_left + bw, 60 + 27], radius=5, fill=ACCENT)
    draw.text((text_left + 11, 64), badge, fill=WHITE, font=badge_font)

    # Title (wrap on width)
    y = 108
    max_w = CARD_W - text_left - 30
    words = title.split()
    line = ""
    for w in words:
        trial = (line + " " + w).strip()
        if draw.textlength(trial, font=title_font) <= max_w:
            line = trial
        else:
            draw.text((text_left, y), line, fill=DARK, font=title_font)
            y += 46
            line = w
    if line:
        draw.text((text_left, y), line, fill=DARK, font=title_font)
        y += 46

    draw.text((text_left, y + 6), subtitle, fill=ACCENT, font=sub_font)
    y += 48

    for dl in description_lines:
        draw.text((text_left, y), dl, fill=BODY, font=body_font)
        y += 25

    draw.text((text_left, CARD_H - 48), "viralpeps.co.uk", fill=ACCENT, font=small_font)
    draw.rectangle([0, CARD_H - 4, CARD_W, CARD_H], fill=ACCENT)

    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    card.save(output_path, quality=97)
    return output_path


CARDS = [
    dict(
        photo_path="/tmp/gen_cards/uk-peptide-directory-v2.png",
        output_path=os.path.join(ROOT, "public/images/guides/uk-peptide-directory.png"),
        badge="Research Hub",
        title="UK Peptide Directory",
        subtitle="Vendors, Compounds & Listings",
        description_lines=[
            "88 UK vendors, 154 research compounds and",
            "2,894 tracked listings — how to read a",
            "directory and which metrics discriminate.",
        ],
    ),
    dict(
        photo_path="/tmp/gen_cards/where-to-buy-peptides-uk.png",
        output_path=os.path.join(ROOT, "public/images/guides/where-to-buy-peptides-uk.png"),
        badge="Buying Guide",
        title="Where to Buy Peptides UK",
        subtitle="Sourcing & Legality Guide",
        description_lines=[
            "The four checks that separate a supplier",
            "from a listing, how each one gets faked,",
            "and the UK research-use-only position.",
        ],
    ),
]

if __name__ == "__main__":
    for c in CARDS:
        out = compose(**c)
        print(f"  OK {os.path.relpath(out, ROOT)} ({os.path.getsize(out)//1024} KB)")
