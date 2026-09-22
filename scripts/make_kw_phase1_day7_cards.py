"""Generate the 3 Day-7 KW Phase 1 guide cards (1200x675).

- cardiogen-suppliers-uk       -> single-vial Cardiogen card, "Supplier Guide"
- buy-melanotan-ii-uk          -> single-vial Melanotan II card, "Buying Guide"
- research-peptides-for-sale-uk -> AI photorealistic base + Pillow chrome
                                  (handled by compose_kw_day7_photo_card.py)

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
        "compound": "Cardiogen",
        "vial_paths": [p("public/images/compounds/cardiogen-research-peptide.png")],
        "output_path": p("public/images/guides/cardiogen-suppliers-uk.png"),
        "description_lines": [
            "Two UK vendors carry the AEDR",
            "tetrapeptide. The cost-per-mg trap,",
            "and verifying identity with no CAS.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "Cardiogen (AEDR) Suppliers UK",
    },
    {
        "compound": "Melanotan II",
        "vial_paths": [p("public/images/compounds/melanotan-ii-vial.png")],
        "output_path": p("public/images/guides/buy-melanotan-ii-uk.png"),
        "description_lines": [
            "46 UK vendors, a GBP 14.99 floor and no",
            "UK medicines licence. The real price band",
            "and the checks that matter before ordering.",
        ],
        "badge_text": "Buying Guide",
        "subtitle_text": "Melanotan II UK",
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
