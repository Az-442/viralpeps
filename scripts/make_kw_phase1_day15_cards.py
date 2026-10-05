"""Generate the Day-15 KW Phase 1 guide cards (1200x675).

Day 15 articles (Wed 30 Sep), run 5 Oct 2026:
- skin-hair-peptide-suppliers-uk  -> single-vial 75%-height (GHK-Cu), badge "Supplier Guide"
- uk-peptide-price-comparison     -> single-vial 75%-height (TB-500),  badge "Buyer's Guide"

Wait -- see CARDS below for the actual pair for this run.

Vial labels QA'd with the vision tool before compositing:
- ghk-cu-vial.png   -> GHK-Cu
- tb-500-vial.png   -> TB-500
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
        "compound": "Semax Suppliers UK",
        "vial_paths": [
            p("public/images/compounds/semax-vial.png"),
        ],
        "output_path": p("public/images/guides/semax-suppliers-uk.png"),
        "description_lines": [
            "74 vendors, 83 listings, \u00a37.50 to \u00a3199.99",
            "\u2014 and a nasal spray that is not a vial.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "Semax Price & Supplier Guide",
    },
    {
        "compound": "Selank Suppliers UK",
        "vial_paths": [
            p("public/images/compounds/selank-vial.png"),
        ],
        "output_path": p("public/images/guides/selank-suppliers-uk.png"),
        "description_lines": [
            "72 vendors, 83 listings, \u00a37.50 to \u00a3199.99",
            "\u2014 and one vendor 13\u00d7 the cheapest.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "Selank Price & Supplier Guide",
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
