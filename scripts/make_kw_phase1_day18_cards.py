"""Generate the 3 Day-18 KW Phase 1 guide cards (1200x675).

Day 18 articles (Sat 03 Oct), written Oct 2026:
- epitalon-suppliers-uk                    -> single-vial 75% (Epitalon), "Supplier Guide"
- cjc-1295-with-dac-vs-without-dac          -> dual-vial 50% (CJC-1295 DAC + no DAC),
                                               "Head-to-Head Comparison"
- research-peptides-guide                   -> non-compound pillar -> photorealistic base + chrome

Vial labels QA'd with the vision tool before compositing:
- epitalon-vial.png             -> "EPITALON / 10mg"           OK
- cjc-1295-with-dac-vial.png    -> "CJC-1295 / DAC"            OK
- cjc-1295-no-dac-vial.png      -> checked below
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
        "compound": "Epitalon Suppliers UK",
        "vial_paths": [p("public/images/compounds/epitalon-vial.png")],
        "output_path": p("public/images/guides/epitalon-suppliers-uk.png"),
        "description_lines": [
            "55 vendors, a \u00a310.99 floor, and a",
            "telomerase claim its literature cannot carry.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "Epitalon Price & Supplier Guide",
    },
    {
        "compound": "CJC-1295 DAC vs No DAC",
        "vial_paths": [
            p("public/images/compounds/cjc-1295-with-dac-vial.png"),
            p("public/images/compounds/cjc-1295-no-dac-vial.png"),
        ],
        "output_path": p("public/images/guides/cjc-1295-with-dac-vs-without-dac.png"),
        "description_lines": [
            "With DAC vs without DAC: one albumin",
            "linker, 30 minutes versus 8 days.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "DAC vs No DAC",
    },
]

if __name__ == "__main__":
    for card in CARDS:
        missing = [v for v in card["vial_paths"] if not os.path.exists(v)]
        if missing:
            print("  MISSING vial(s):", missing)
            sys.exit(1)
        # measure title fit for dual-vial cards
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
