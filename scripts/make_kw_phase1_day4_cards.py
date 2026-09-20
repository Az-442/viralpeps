"""Generate the 3 Day-4 KW Phase 1 guide cards.

- cognitive-peptide-suppliers-uk -> single-vial Semax card, "Supplier Guide"
- uk-peptide-directory           -> non-compound; handled separately (AI photoreal)
- where-to-buy-peptides-uk       -> non-compound; handled separately (AI photoreal)

Only the compound-group card is generated here via the shared Pillow template.
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
        "compound": "Cognitive Peptide Suppliers",
        "vial_paths": [p("public/images/compounds/semax-vial.png")],
        "output_path": p("public/images/guides/cognitive-peptide-suppliers-uk.png"),
        "description_lines": [
            "Semax, Selank, DSIP, Pinealon and the thin",
            "single-vendor end of the UK cognitive",
            "peptide market, compared.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "Cognitive Peptides UK",
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
