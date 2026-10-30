"""Generate the 2 DSIP Class C guide cards (1200x675).

Class C queue DAY 6 (2026-10-30) — DSIP slots 1 and 2.
Cards:
- dsip-research-guide  -> "Research Guide", "No Receptor, No Answer"
- dsip-uk-price-guide  -> "Buyer's Guide",  "Cost Per Milligram"
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
        "compound": "DSIP",
        "vial_paths": [p("public/images/compounds/dsip-vial.png")],
        "output_path": p("public/images/guides/dsip-research-guide.png"),
        "description_lines": [
            "A nine-residue peptide with no identified",
            "receptor and three small human trials that",
            "all concluded the effect was weak.",
        ],
        "badge_text": "Research Guide",
        "subtitle_text": "No Receptor, No Answer",
    },
    {
        "compound": "DSIP",
        "vial_paths": [p("public/images/compounds/dsip-vial.png")],
        "output_path": p("public/images/guides/dsip-uk-price-guide.png"),
        "description_lines": [
            "29 UK vendors sell 5 mg DSIP. Sticker prices",
            "span 20x, per mg just 2.5x - and the biggest",
            "premium in the market is the pen.",
        ],
        "badge_text": "Buyer's Guide",
        "subtitle_text": "Cost Per Milligram",
    },
]

if __name__ == "__main__":
    from PIL import ImageFont, ImageDraw, Image
    helv = "/System/Library/Fonts/Helvetica.ttc"
    tf = ImageFont.truetype(helv, 54, index=1)
    dummy = ImageDraw.Draw(Image.new("RGB", (10, 10)))
    for card in CARDS:
        missing = [v for v in card["vial_paths"] if not os.path.exists(v)]
        if missing:
            print("  MISSING vial(s):", missing)
            sys.exit(1)
        vh = int(675 * 0.80)
        vimg = Image.open(card["vial_paths"][0])
        vw = int(vh * vimg.width / vimg.height)
        text_left = 50 + vw + 50
        if text_left > 1200 - 200:
            text_left = 1200 - 350
        avail = 1200 - text_left - 25
        tw = dummy.textlength(card["compound"], font=tf)
        status = "OK" if tw <= avail else "CLIP!"
        print(f"  title '{card['compound']}' = {tw:.0f}px vs {avail:.0f}px  {status}")
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
