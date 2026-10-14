"""Generate the 2 Day-25 KW Phase 1 guide cards (1200x675).

Day 25 articles (Sat 10 Oct plan), written 14 Oct 2026:
- ghk-cu-vs-ahk-cu   -> dual-vial 50% (ghk-cu-vial + ahk-cu-vial), "Comparison",
                        subtitle "Two copper tripeptides, one difference"
- tb-500-deep-dive   -> single-vial 75% (tb-500-vial), "Deep Dive Report",
                        subtitle "One Fragment, Four Names"

Vial labels QA'd with the vision tool before compositing:
- ghk-cu-vial.png   -> "GHK-Cu / 50mg"    OK
- ahk-cu-vial.png   -> "AHK-CU / 100mg"   OK
- tb-500-vial.png   -> "TB-500 / 5mg"     OK
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
        "compound": "GHK-Cu vs AHK-Cu",
        "vial_paths": [p("public/images/compounds/ghk-cu-vial.png"),
                       p("public/images/compounds/ahk-cu-vial.png")],
        "output_path": p("public/images/guides/ghk-cu-vs-ahk-cu.png"),
        "description_lines": [
            "Both are copper tripeptides. One keeps the",
            "glycine, one swaps it. 143 GHK-Cu listings",
            "against 17 for AHK-Cu.",
        ],
        "badge_text": "Comparison",
        "subtitle_text": "One Residue Apart",
    },
    {
        # single vial 75%
        "compound": "TB-500",
        "vial_paths": [p("public/images/compounds/tb-500-vial.png")],
        "output_path": p("public/images/guides/tb-500-deep-dive.png"),
        "description_lines": [
            "Thymosin beta-4, TB4, Tbeta4, TB-500. The",
            "17-residue fragment has 88 UK vendors and",
            "an 8-mer actin-binding site.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "One Fragment, Four Names",
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
