"""Generate the 2 Day-26 KW Phase 1 guide cards (1200x675).

Day 26 articles (Sun 11 Oct plan), written 16 Oct 2026:
- cjc-1295-suppliers-uk      -> single-vial 75% (cjc-1295-no-dac-vial),
                                "Supplier Guide", subtitle "The Name v The Molecule"
- uk-peptide-comparison-site -> photorealistic AI photo base + Pillow chrome,
                                "Market Guide", subtitle "How the Ranking Is Built"

Vial label QA'd with the vision tool before compositing:
- cjc-1295-no-dac-vial.png -> "CJC-1295 / No DAC / 2mg"   OK (and confirms the
  card identifies the molecule the article is actually about)

The pillar card is a non-compound market-structure guide, so per the skill rule it
must use photorealistic AI imagery, never a Pillow-drawn graphic. image_generate is
not available in this cron session, so the base photo is recovered by cropping the
untouched photo panel out of the approved Day-4 rendered card
(uk-peptide-directory.png) - the same recover_base() path used on Days 7/8/10.
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
        "compound": "CJC-1295 No DAC",
        "vial_paths": [p("public/images/compounds/cjc-1295-no-dac-vial.png")],
        "output_path": p("public/images/guides/cjc-1295-suppliers-uk.png"),
        "description_lines": [
            "71 UK suppliers, 86 no-DAC listings, GBP 9.95",
            "to GBP 199.99. The name promises a week; the",
            "molecule on the label lasts minutes.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "The Name vs The Molecule",
    },
]

PILLAR_CARD = dict(
    photo_path="/tmp/gen_cards/uk-peptide-comparison-site-base.png",
    output_path=p("public/images/guides/uk-peptide-comparison-site.png"),
    badge="Market Guide",
    title="Comparison Sites",
    subtitle="How the Ranking Is Built",
    description_lines=[
        "Affiliate commission is worth up to 20 of 100",
        "points in the score - and it is the first",
        "tie-breaker. What that means for the table.",
    ],
)


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
