"""Generate the 3 Day-2 KW Phase 1 guide cards (1200x675).

- epitalon-for-longevity      -> single-vial Epitalon card, "Longevity Research"
- cjc-1295-with-dac-deep-dive -> single-vial CJC-1295 DAC card, "Deep Dive Report"
- types-of-research-peptides  -> non-compound pillar; BPC-157 vial as class cue

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
        "compound": "Epitalon",
        "vial_paths": [p("public/images/compounds/epitalon-vial.png")],
        "output_path": p("public/images/guides/epitalon-for-longevity.png"),
        "description_lines": [
            "The telomerase and pineal hypothesis,",
            "what the literature actually supports,",
            "and where the evidence runs out.",
        ],
        "badge_text": "Longevity Research",
        "subtitle_text": "Epitalon for Longevity",
    },
    {
        "compound": "CJC-1295 (With DAC)",
        "vial_paths": [p("public/images/compounds/cjc-1295-with-dac-vial.png")],
        "output_path": p("public/images/guides/cjc-1295-with-dac-deep-dive.png"),
        "description_lines": [
            "How a drug-affinity complex turns a",
            "29-residue GHRH analogue into a",
            "week-long depot \u2014 and what that changes.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "Albumin-Conjugated GHRH Analogue",
    },
    {
        "compound": "Types of Research Peptides",
        "vial_paths": [p("public/images/compounds/bpc-157-vial.png")],
        "output_path": p("public/images/guides/types-of-research-peptides.png"),
        "description_lines": [
            "A structural and functional map of the",
            "UK catalogue \u2014 native, analogue, fragment,",
            "conjugated and cyclic classes explained.",
        ],
        "badge_text": "Research Hub",
        "subtitle_text": "A Structural & Functional Map",
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
