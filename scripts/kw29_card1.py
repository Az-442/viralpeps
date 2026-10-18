"""KW29 card 1 — mots-c-suppliers-uk (single-vial 75%, Pillow).

Vial label QA'd with the vision tool BEFORE compositing:
- public/images/compounds/mots-c-vial.png -> "ViralPeps / MOTS-c / 10mg"   OK
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
from batch_generate_guide_cards import draw_guide_card  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


def p(rel):
    return os.path.join(ROOT, rel)


CARDS = [
    {
        "compound": "MOTS-c Suppliers",
        "vial_paths": [p("public/images/compounds/mots-c-vial.png")],
        "output_path": p("public/images/guides/mots-c-suppliers-uk.png"),
        "description_lines": [
            "93 vendors, 127 listings. The cheapest sticker",
            "price is a 5 mg vial costing 3.5x the best per",
            "milligram. Normalise before you compare.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "93 Vendors, One Wrong Ranking",
    },
]

if __name__ == "__main__":
    from PIL import ImageFont, ImageDraw, Image
    helv = "/System/Library/Fonts/Helvetica.ttc"
    tf = ImageFont.truetype(helv, 42, index=1)
    dummy = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    for card in CARDS:
        missing = [v for v in card["vial_paths"] if not os.path.exists(v)]
        if missing:
            print("  MISSING vial(s):", missing)
            sys.exit(1)
        vh = int(675 * 0.75)
        vimg = Image.open(card["vial_paths"][0])
        vw = int(vh * vimg.width / vimg.height)
        text_left = 50 + vw + 40
        if text_left > 1200 - 200:
            text_left = 1200 - 350
        avail = 1200 - text_left - 25
        tw = dummy.textlength(card["compound"], font=tf)
        status = "OK" if tw <= avail else "CLIP!"
        print(f"  title '{card['compound']}' = {tw:.0f}px vs {avail:.0f}px available  {status}")
        if tw > avail:
            sys.exit(2)

    for card in CARDS:
        out = draw_guide_card(
            compound=card["compound"],
            vial_paths=card["vial_paths"],
            output_path=card["output_path"],
            description_lines=card["description_lines"],
            badge_text=card["badge_text"],
            subtitle_text=card["subtitle_text"],
        )
        print("  wrote", out, os.path.getsize(out), "bytes")
