"""Generate the 2 Day-7 KW Phase 1 guide cards (1200x675).

- kpv-deep-dive         -> single-vial KPV card, "Deep Dive Report"
- epitalon-vs-thymalin  -> dual-vial Epitalon + Thymalin card, "Head-to-Head Comparison"

Uses the shared draw_guide_card() layout from batch_generate_guide_cards.py
so sizing/template matches every other card on the site.
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
        # Single vial, 75% card height (deep dive styling)
        "compound": "KPV",
        "vial_paths": [p("public/images/compounds/kpv-vial.png")],
        "output_path": p("public/images/guides/kpv-deep-dive.png"),
        "description_lines": [
            "How a three-amino-acid fragment of",
            "alpha-MSH keeps the anti-inflammatory",
            "activity and loses the pigmentation.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "KPV (Lys-Pro-Val) Research",
    },
    {
        # Dual vial, 50% card height each (comparison styling)
        "compound": "Epitalon vs Thymalin",
        "vial_paths": [
            p("public/images/compounds/epitalon-vial.png"),
            p("public/images/compounds/thymalin-vial.png"),
        ],
        "output_path": p("public/images/guides/epitalon-vs-thymalin.png"),
        "description_lines": [
            "A defined tetrapeptide against a tissue",
            "fraction - telomerase and circadian",
            "signalling versus thymic T-cell function.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "Peptide Bioregulators Compared",
    },
]

if __name__ == "__main__":
    for card in CARDS:
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
