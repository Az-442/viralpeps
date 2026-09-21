"""Generate the 2 Day-5 KW Phase 1 guide cards (1200x675).

- mots-c-vs-5-amino-1mq  -> dual-vial MOTS-c + 5-Amino-1MQ card, "Comparison"
- semax-suppliers-uk     -> single-vial Semax card, "Supplier Guide"

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
        "compound": "MOTS-c vs 5-Amino-1MQ",
        "vial_paths": [
            p("public/images/compounds/mots-c-vial.png"),
            p("public/images/compounds/5-amino-1mq.png"),
        ],
        "output_path": p("public/images/guides/mots-c-vs-5-amino-1mq.png"),
        "description_lines": [
            "Mitochondrial-derived peptide versus",
            "NNMT inhibition \u2014 two metabolic routes,",
            "two very different evidence bases.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "Metabolic Peptide Comparison",
    },
    {
        "compound": "Semax",
        "vial_paths": [p("public/images/compounds/semax-vial.png")],
        "output_path": p("public/images/guides/semax-suppliers-uk.png"),
        "description_lines": [
            "Every UK supplier carrying Semax,",
            "compared on price, purity paperwork",
            "and stock across the ACTH(4-10) range.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "Semax Suppliers UK",
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
