"""Generate the 3 Day-3 KW Phase 1 guide cards (1200x675).

- buy-follistatin-344-uk        -> single-vial Follistatin-344 card, "Buying Guide"
- tirzepatide-suppliers-uk      -> single-vial Tirzepatide card, "Supplier Guide"
- tb-500-vs-ghk-cu              -> dual-vial TB-500 + GHK-Cu card, "Comparison"

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
        "compound": "Follistatin-344",
        "vial_paths": [p("public/images/compounds/follistatin-344-vial.png")],
        "output_path": p("public/images/guides/buy-follistatin-344-uk.png"),
        "description_lines": [
            "What UK researchers actually receive,",
            "what the myostatin literature supports,",
            "and how to read the paperwork.",
        ],
        "badge_text": "Buying Guide",
        "subtitle_text": "Buy Follistatin 344 UK",
    },
    {
        "compound": "Tirzepatide",
        "vial_paths": [p("public/images/compounds/tirzepatide-vial.png")],
        "output_path": p("public/images/guides/tirzepatide-suppliers-uk.png"),
        "description_lines": [
            "Every UK vendor compared on price,",
            "purity documentation and stock",
            "across the dual GIP/GLP-1 market.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "Tirzepatide Suppliers UK",
    },
    {
        "compound": "TB-500 vs GHK-Cu",
        "vial_paths": [
            p("public/images/compounds/tb-500-vial.png"),
            p("public/images/compounds/ghk-cu-vial.png"),
        ],
        "output_path": p("public/images/guides/tb-500-vs-ghk-cu.png"),
        "description_lines": [
            "Actin regulation versus copper",
            "peptide signalling \u2014 two repair",
            "peptides, two different mechanisms.",
        ],
        "badge_text": "Comparison",
        "subtitle_text": "Repair Peptide Comparison",
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
