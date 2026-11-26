"""Generate Class D comparison cards: tirzepatide-vs-mazdutide and mazdutide-vs-semaglutide (1200x675)."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
from batch_generate_guide_cards import draw_guide_card  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


def p(rel):
    return os.path.join(ROOT, rel)


CARDS = [
    {
        "compound": "Tirzepatide vs Mazdutide",
        "vial_paths": [
            p("public/images/compounds/tirzepatide-vial.png"),
            p("public/images/compounds/mazdutide-vial.png"),
        ],
        "output_path": p("public/images/guides/tirzepatide-vs-mazdutide.png"),
        "description_lines": [
            "GIP/GLP-1 against GLP-1/glucagon",
            "\u2014 72 weeks vs 48, two estimands.",
        ],
        "badge_text": "Comparison",
        "subtitle_text": "GIP/GLP-1 Against GLP-1/Glucagon",
    },
    {
        "compound": "Mazdutide vs Semaglutide",
        "vial_paths": [
            p("public/images/compounds/mazdutide-vial.png"),
            p("public/images/compounds/semaglutide-vial.png"),
        ],
        "output_path": p("public/images/guides/mazdutide-vs-semaglutide.png"),
        "description_lines": [
            "DREAMS-3 has no results yet",
            "\u2014 what GLORY-1 and STEP 1 show.",
        ],
        "badge_text": "Comparison",
        "subtitle_text": "A Comparison DREAMS-3 Cannot Settle",
    },
]

if __name__ == "__main__":
    for card in CARDS:
        missing = [v for v in card["vial_paths"] if not os.path.exists(v)]
        if missing:
            print("  MISSING vial(s):", missing)
            sys.exit(1)
        out = draw_guide_card(**card)
        print("  ->", out)
