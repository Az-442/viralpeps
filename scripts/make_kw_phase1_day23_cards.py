"""Generate the 2 Day-23 KW Phase 1 guide cards (1200x675).

Day 23 articles (Thu 08 Oct plan), written 12 Oct 2026:
- follistatin-344-suppliers-uk -> single-vial 75% (follistatin-344-vial), "Supplier Guide"
- survodutide-deep-dive        -> single-vial 75% (survodutide-vial), "Deep Dive Report"

Vial labels QA'd with the vision tool before compositing:
- follistatin-344-vial.png -> "Follistatin 344 / 1mg"  OK
- survodutide-vial.png     -> "Survodutide / 10mg"     OK
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
        # single vial 75%
        "compound": "Follistatin 344",
        "vial_paths": [p("public/images/compounds/follistatin-344-vial.png")],
        "output_path": p("public/images/guides/follistatin-344-suppliers-uk.png"),
        "description_lines": [
            "A 344-residue recombinant protein sold",
            "like a 5 mg tripeptide. 11 vendors, a 7.6x",
            "spread, and no bioactivity assay to ask for.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "A Protein Sold Like a Peptide",
    },
    {
        # single vial 75%
        "compound": "Survodutide",
        "vial_paths": [p("public/images/compounds/survodutide-vial.png")],
        "output_path": p("public/images/guides/survodutide-deep-dive.png"),
        "description_lines": [
            "The first incretin drug built around",
            "glucagon, not appetite. Phase 3 at week 76,",
            "the MASH data, and the mediation question.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "The Glucagon-Biased Dual Agonist",
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
        # measure title fit for single-vial layout
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
