"""Generate the 2 Day-11 KW Phase 1 guide cards (1200x675).

Day 11 articles (Sat 26 Sep):
- buy-tb-500-uk           -> single-vial TB-500 card, "Buyer's Guide"
- mots-c-for-metabolism   -> single-vial MOTS-c card, "Compound Profile"

Uses the shared draw_guide_card() layout from batch_generate_guide_cards.py.

Vial labels QA'd with the vision tool before compositing:
- tb-500-vial.png -> "TB-500 / 5mg"   OK
- mots-c-vial.png -> "MOTS-c / 10mg"  OK
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
        "compound": "Buy TB-500 UK",
        "vial_paths": [
            p("public/images/compounds/tb-500-vial.png"),
        ],
        "output_path": p("public/images/guides/buy-tb-500-uk.png"),
        "description_lines": [
            "75 suppliers, 100 listings, \u00a311.95\u2013\u00a3199.99.",
            "Why the same vial costs seventeen",
            "different amounts \u2014 and what to check.",
        ],
        "badge_text": "Buyer's Guide",
        "subtitle_text": "TB-500 Suppliers, Prices & COAs",
    },
    {
        "compound": "MOTS-c for Metabolism",
        "vial_paths": [
            p("public/images/compounds/mots-c-vial.png"),
        ],
        "output_path": p("public/images/guides/mots-c-for-metabolism.png"),
        "description_lines": [
            "The AMPK story, the folate-cycle",
            "mechanism, and where the human",
            "evidence firmly stops.",
        ],
        "badge_text": "Compound Profile",
        "subtitle_text": "MOTS-c Research Summary",
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
