"""Generate the 2 compound guide cards for KW Phase 1 Day 10 (1200x675).

- follistatin-344-deep-dive        -> single-vial, 75% card height, "Deep Dive Report"
- cjc-1295-with-dac-suppliers-uk   -> single-vial, 75% card height, "Supplier Guide"

Uses the shared draw_guide_card() layout from batch_generate_guide_cards.py.

Vial labels QA'd with the vision tool before compositing:
- follistatin-344-vial.png     -> "Follistatin 344 / 1mg"   OK
- cjc-1295-with-dac-vial.png   -> "CJC-1295 / DAC"          OK (DAC stated on label)
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
        "compound": "Follistatin 344",
        "vial_paths": [
            p("public/images/compounds/follistatin-344-vial.png"),
        ],
        "output_path": p("public/images/guides/follistatin-344-deep-dive.png"),
        "description_lines": [
            "The myostatin story is real. So is the",
            "37,000 g/mol manufacturing problem —",
            "and the missing human data.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "Follistatin 344 Deep Dive",
    },
    {
        "compound": "CJC-1295 (With DAC)",
        "vial_paths": [
            p("public/images/compounds/cjc-1295-with-dac-vial.png"),
        ],
        "output_path": p("public/images/guides/cjc-1295-with-dac-suppliers-uk.png"),
        "description_lines": [
            "22 UK suppliers. 6-8 day half-life.",
            "Why the DAC linker makes it a",
            "different product entirely.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "CJC-1295 With DAC Suppliers UK",
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
