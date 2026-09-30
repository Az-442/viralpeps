"""Generate the 3 Day-12 KW Phase 1 guide cards (1200x675).

Day 12 articles (Sun 27 Sep):
- kpv-vs-thymosin-alpha1  -> dual-vial 50%-height (KPV + Thymosin Alpha-1),
                             badge "Head-to-Head Comparison"
- epitalon-deep-dive      -> single-vial 75%-height (Epitalon), badge "Deep Dive Report"
- ghk-cu-suppliers-uk     -> single-vial 75%-height (GHK-Cu), badge "Supplier Guide"

Uses the shared draw_guide_card() layout from batch_generate_guide_cards.py.

Vial labels QA'd with the vision tool before compositing:
- kpv-vial.png              -> "KPV / 5mg"                 OK
- thymosin-alpha1-vial.png  -> "THYMOSIN ALPHA-1 / 5mg"    OK
- epitalon-vial.png         -> "EPITALON / 10mg"           OK
- ghk-cu-vial.png           -> "GHK-Cu / 50mg"             OK
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
        "compound": "KPV vs T\u03b11",
        "vial_paths": [
            p("public/images/compounds/kpv-vial.png"),
            p("public/images/compounds/thymosin-alpha1-vial.png"),
        ],
        "output_path": p("public/images/guides/kpv-vs-thymosin-alpha1.png"),
        "description_lines": [
            "KPV vs Thymosin Alpha-1: a",
            "3-residue \u03b1-MSH fragment against a",
            "28-residue thymic peptide.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "KPV vs Thymosin Alpha-1",
    },
    {
        "compound": "Epitalon Deep Dive",
        "vial_paths": [
            p("public/images/compounds/epitalon-vial.png"),
        ],
        "output_path": p("public/images/guides/epitalon-deep-dive.png"),
        "description_lines": [
            "The 2003 telomerase finding, and",
            "everything it does not show about",
            "ageing in a living organism.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "Epitalon Research Profile",
    },
    {
        "compound": "GHK-Cu Suppliers UK",
        "vial_paths": [
            p("public/images/compounds/ghk-cu-vial.png"),
        ],
        "output_path": p("public/images/guides/ghk-cu-suppliers-uk.png"),
        "description_lines": [
            "126 listings, one question that",
            "matters: is the copper actually",
            "bound to the peptide?",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "GHK-Cu Price & Supplier Guide",
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
