"""Generate the 3 Day-21 KW Phase 1 guide cards (1200x675).

Day 21 articles (Tue 06 Oct plan), written 10 Oct 2026:
- buy-tirzepatide-uk        -> single-vial 75% (tirzepatide-vial), "Buyer's Guide"
- retatrutide-suppliers-uk  -> single-vial 75% (retatrutide-vial), "Supplier Guide"
- pt-141-vs-melanotan-ii-uk -> dual-vial 50% (pt-141-vial + melanotan-ii-vial),
                               "Head-to-Head Comparison"

Vial labels QA'd with the vision tool before compositing:
- tirzepatide-vial.png   -> "ViralPeps / Tirzepatide / 10mg"       OK
- retatrutide-vial.png   -> "ViraPeps / Retatrutide / 10mg"        OK
- pt-141-vial.png        -> "ViralPeps / PT-141 / 10mg"            OK
- melanotan-ii-vial.png  -> "ViralPeps / Melanotan 2 / 10mg"       OK
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
        "compound": "Buy Tirzepatide UK",
        "vial_paths": [p("public/images/compounds/tirzepatide-vial.png")],
        "output_path": p("public/images/guides/buy-tirzepatide-uk.png"),
        "description_lines": [
            "A licensed prescription medicine and a",
            "research reagent share one name. The 23x",
            "price gap is the difference.",
        ],
        "badge_text": "Buyer\u2019s Guide",
        "subtitle_text": "Two Markets, One Molecule",
    },
    {
        # single vial 75%
        "compound": "Retatrutide Suppliers",
        "vial_paths": [p("public/images/compounds/retatrutide-vial.png")],
        "output_path": p("public/images/guides/retatrutide-suppliers-uk.png"),
        "description_lines": [
            "55 vendors, 138 listings, no licence and a",
            "27x price range. The widest unanchored",
            "market on the site.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "UK Market & Prices",
    },
    {
        # dual vial 50%
        "compound": "PT-141 vs Melanotan II",
        "vial_paths": [p("public/images/compounds/pt-141-vial.png"),
                       p("public/images/compounds/melanotan-ii-vial.png")],
        "output_path": p("public/images/guides/pt-141-vs-melanotan-ii-uk.png"),
        "description_lines": [
            "One backbone, one structural change, two",
            "receptor profiles. Why only one of them",
            "tans you.",
        ],
        "badge_text": "Comparison",
        "subtitle_text": "Melanocortin Selectivity",
    },
]


if __name__ == "__main__":
    for card in CARDS:
        missing = [v for v in card["vial_paths"] if not os.path.exists(v)]
        if missing:
            print("  MISSING vial(s):", missing)
            sys.exit(1)
        out = draw_guide_card(
            compound=card["compound"],
            vial_paths=card["vial_paths"],
            output_path=card["output_path"],
            description_lines=card["description_lines"],
            badge_text=card["badge_text"],
            subtitle_text=card["subtitle_text"],
        )
        kb = os.path.getsize(out) // 1024
        print(f"  OK {os.path.relpath(out, ROOT)} ({kb} KB)")
