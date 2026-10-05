"""Generate the missing Day-15 KW Phase 1 comparison card: follistatin-344-vs-mgf (1200x675)."""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
from batch_generate_guide_cards import draw_guide_card  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


def p(rel):
    return os.path.join(ROOT, rel)


CARDS = [
    {
        "compound": "Follistatin 344 vs MGF",
        "vial_paths": [
            p("public/images/compounds/follistatin-344-vial.png"),
            p("public/images/compounds/mgf-vial.png"),
        ],
        "output_path": p("public/images/guides/follistatin-344-vs-mgf.png"),
        "description_lines": [
            "10 vendors from \u00a339.95 vs 8 from \u00a310.95",
            "\u2014 removal vs addition in muscle research.",
        ],
        "badge_text": "Comparison",
        "subtitle_text": "Removal vs Addition in Muscle Research",
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
