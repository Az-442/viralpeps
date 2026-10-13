"""Generate the 3 Day-24 KW Phase 1 guide cards (1200x675).

Day 24 articles (Fri 09 Oct plan), written 13 Oct 2026:
- cardiogen-vs-bpc-157            -> dual-vial 50% (cardiogen-research-peptide + bpc-157-vial),
                                     "Comparison"
- longevity-peptide-suppliers-uk  -> dual-vial 50% (epitalon-vial + ghk-cu-vial), "Supplier Guide"
- high-purity-research-peptides   -> single-vial 75% (bpc-157-vial), "Technical Guide"

Vial labels QA'd with the vision tool before compositing:
- cardiogen-research-peptide.png -> "VIRALPEPS / Cardiogen / For Research Use Only"  OK
- bpc-157-vial.png               -> "BPC-157 / 10mg"                                 OK
- epitalon-vial.png              -> "ViralPeps / EPITALON / 10mg"                    OK
- ghk-cu-vial.png                -> "Viral Peps / GHK-Cu / 50mg"                     OK
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
        # dual vial 50%
        "compound": "Cardiogen vs BPC-157",
        "vial_paths": [p("public/images/compounds/cardiogen-research-peptide.png"),
                       p("public/images/compounds/bpc-157-vial.png")],
        "output_path": p("public/images/guides/cardiogen-vs-bpc-157.png"),
        "description_lines": [
            "Two heart research peptides, two very",
            "different paper trails. 133 BPC-157",
            "listings. Three for Cardiogen.",
        ],
        "badge_text": "Comparison",
        "subtitle_text": "Evidence vs Availability",
    },
    {
        # dual vial 50%
        "compound": "Longevity Peptides",
        "vial_paths": [p("public/images/compounds/epitalon-vial.png"),
                       p("public/images/compounds/ghk-cu-vial.png")],
        "output_path": p("public/images/guides/longevity-peptide-suppliers-uk.png"),
        "description_lines": [
            "26 compounds, 716 listings, 107 vendors.",
            "A 54x spread on GHK-Cu and a market that",
            "is really three markets.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "Three Markets, One Label",
    },
    {
        # single vial 75%
        "compound": "High Purity Peptides",
        "vial_paths": [p("public/images/compounds/bpc-157-vial.png")],
        "output_path": p("public/images/guides/high-purity-research-peptides.png"),
        "description_lines": [
            "160 of 410 compounds claim 99%+. What",
            "reverse-phase HPLC cannot see, and the",
            "five specs that matter more.",
        ],
        "badge_text": "Technical Guide",
        "subtitle_text": "What the Number Misses",
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
        if len(card["vial_paths"]) == 2:
            avail = 395
            # template wraps on " vs " — measure each half separately
            t = card["compound"]
            if " vs " in t and dummy.textlength(t, font=tf) > avail:
                a, b = t.split(" vs ", 1)
                halves = [a, "vs " + b]
            else:
                halves = [t]
            for h in halves:
                hw = dummy.textlength(h, font=tf)
                st = "OK" if hw <= avail else "CLIP!"
                print(f"    half '{h}' = {hw:.0f}px vs {avail:.0f}px  {st}")
                if hw > avail:
                    sys.exit(2)
            continue
        else:
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
