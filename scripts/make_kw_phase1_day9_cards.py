"""Generate the 2 Day-9 KW Phase 1 guide cards (1200x675).

Day 9 articles (Thu 24 Sep):
- tirzepatide-vs-survodutide            -> dual-vial comparison card (Tirzepatide + Survodutide),
                                           50% card height each, "Head-to-Head Comparison"
- oxytocin-nasal-spray-suppliers-uk     -> single-vial oxytocin nasal spray card, "Supplier Guide"

Uses the shared draw_guide_card() layout from batch_generate_guide_cards.py.

Vial labels were QA'd with the vision tool before compositing:
- tirzepatide-vial.png  -> "Tirzepatide / 10mg"   OK
- survodutide-vial.png  -> "Survodutide / 10mg"   OK
- oxytocin-nasal-spray.png -> "Oxytocin / Nasal / 10ml"  OK (compound identifiers correct)
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
        "compound": "Tirzepatide vs Survodutide",
        "vial_paths": [
            p("public/images/compounds/tirzepatide-vial.png"),
            p("public/images/compounds/survodutide-vial.png"),
        ],
        "output_path": p("public/images/guides/tirzepatide-vs-survodutide.png"),
        "description_lines": [
            "Both build on GLP-1. One adds GIP,",
            "one adds glucagon — and only one",
            "is already a licensed medicine.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "Tirzepatide vs Survodutide",
    },
    {
        "compound": "Oxytocin Nasal Spray",
        "vial_paths": [
            p("public/images/compounds/oxytocin-nasal-spray.png"),
        ],
        "output_path": p("public/images/guides/oxytocin-nasal-spray-suppliers-uk.png"),
        "description_lines": [
            "Nose-to-brain delivery, ~2% bioavailability,",
            "and the autism trial that found",
            "no clinical benefit.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "Oxytocin Nasal Spray Suppliers UK",
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
