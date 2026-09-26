"""Generate the 3 Day-8 KW Phase 1 guide cards (1200x675).

Day 8 articles (Wed 23 Sep):
- p21-for-neurogenesis                  -> single-vial P21 card, "Deep Dive Report"
- growth-hormone-peptide-suppliers-uk   -> dual-vial GH card (Tesamorelin + Ipamorelin),
                                            "Supplier Guide"
- peptides-for-sale-uk                  -> photorealistic base + Pillow chrome
                                            (handled by compose_kw_day8_photo_card.py)

Uses the shared draw_guide_card() layout from batch_generate_guide_cards.py so
sizing/template matches every other card on the site.

Vial labels were QA'd with the vision tool before compositing (day-5 lesson:
the 5-Amino-1MQ vial shipped with "5-Amio-1MQ" printed on it). All three vials
used here read correctly.
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
        "compound": "P21",
        "vial_paths": [p("public/images/compounds/p21.png")],
        "output_path": p("public/images/guides/p21-for-neurogenesis.png"),
        "description_lines": [
            "A CDK5 inhibitor, not a growth factor.",
            "How the p25 cascade drives tau pathology,",
            "and why one vendor is the whole UK market.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "P21 for Neurogenesis",
    },
    {
        "compound": "GH Peptides UK",
        "vial_paths": [
            p("public/images/compounds/tesamorelin.png"),
            p("public/images/compounds/ipamorelin.png"),
        ],
        "output_path": p("public/images/guides/growth-hormone-peptide-suppliers-uk.png"),
        "description_lines": [
            "88 vendors, four mechanisms, one category.",
            "Tesamorelin 74 vendors from GBP 19.95.",
            "Ipamorelin 72 vendors from GBP 6.99.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "Growth Hormone Peptide Suppliers UK",
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
