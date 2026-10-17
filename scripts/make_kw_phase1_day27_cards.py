"""Generate the 3 Day-27 KW Phase 1 guide cards (1200x675).

Day 27 articles (Mon 12 Oct plan), written 17 Oct 2026.
NOTE: the planned `p21-research-summary` was SKIPPED as a near-duplicate (four P21
articles already exist and no distinct angle remained), so this run took the next
unused articles from Day 28 instead. See kw-phase-1-progress.md Day 27 entry.

Cards:
- survodutide-suppliers-uk            -> single-vial 75% (survodutide-vial),
                                         "Supplier Guide", "Five Vendors, One Molecule"
- buy-epitalon-uk                     -> single-vial 75% (epitalon-vial),
                                         "Buyer's Guide", "Cost Per Milligram"
- follistatin-344-for-muscle-growth   -> single-vial 75% (follistatin-344-vial),
                                         "Compound Profile", "The Brake, Not The Builder"

Vial label QA'd with the vision tool BEFORE compositing:
- survodutide-vial.png     -> "ViralPeps / Survodutide / 10mg"          OK
- epitalon-vial.png        -> "ViralPeps / EPITALON(R) / 10mg"          OK
- follistatin-344-vial.png -> "ViralPeps / Follistatin 344 / 1mg"       OK
All three compound identifiers are correct and match the article subjects.
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
        "compound": "Survodutide",
        "vial_paths": [p("public/images/compounds/survodutide-vial.png")],
        "output_path": p("public/images/guides/survodutide-suppliers-uk.png"),
        "description_lines": [
            "5 vendors, 5 listings, GBP 39.00 to GBP 160.00",
            "for the same 10 mg vial. Thin supply cannot",
            "discipline its own prices. Verification first.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "Five Vendors, One Molecule",
    },
    {
        "compound": "Buy Epitalon",
        "vial_paths": [p("public/images/compounds/epitalon-vial.png")],
        "output_path": p("public/images/guides/buy-epitalon-uk.png"),
        "description_lines": [
            "57 vendors from GBP 10.99. The headline 18x",
            "spread is really 4.1x once vial size is held",
            "constant. Buy on the certificate, not the story.",
        ],
        "badge_text": "Buyer's Guide",
        "subtitle_text": "Cost Per Milligram",
    },
    {
        "compound": "Follistatin 344",
        "vial_paths": [p("public/images/compounds/follistatin-344-vial.png")],
        "output_path": p("public/images/guides/follistatin-344-for-muscle-growth.png"),
        "description_lines": [
            "It removes the myostatin brake - and the one",
            "human trial that tested it was formally",
            "contested in print. What the data supports.",
        ],
        "badge_text": "Compound Profile",
        "subtitle_text": "The Brake, Not The Builder",
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
