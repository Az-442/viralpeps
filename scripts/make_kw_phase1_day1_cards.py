"""Generate the 3 Day-1 KW Phase 1 guide cards (1200x675).

- kpv-suppliers-uk         -> single-vial KPV card, "Supplier Guide"
- retatrutide-vs-survodutide -> dual-vial comparison card @50% height
- p21-deep-dive            -> single-vial P21 card, "Deep Dive Report"

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
        "compound": "KPV",
        "vial_paths": [p("public/images/compounds/kpv-vial.png")],
        "output_path": p("public/images/guides/kpv-suppliers-uk.png"),
        "description_lines": [
            "How UK KPV supply works, how vendors",
            "differ, and the verification checklist",
            "to run before you buy.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "KPV Suppliers UK",
    },
    {
        "compound": "Retatrutide vs Survodutide",
        "vial_paths": [
            p("public/images/compounds/retatrutide-vial.png"),
            p("public/images/compounds/survodutide-vial.png"),
        ],
        "output_path": p("public/images/guides/retatrutide-vs-survodutide.png"),
        "description_lines": [
            "Triple agonist vs dual agonist: GIP,",
            "GLP-1 and glucagon compared \u2014 plus",
            "how each market looks in the UK.",
        ],
        "badge_text": "Comparison",
        "subtitle_text": "Metabolic Research Comparison",
    },
    {
        "compound": "P21",
        "vial_paths": [p("public/images/compounds/p21.png")],
        "output_path": p("public/images/guides/p21-deep-dive.png"),
        "description_lines": [
            "The CNTF-derived CDK5 inhibitor:",
            "mechanism, preclinical evidence,",
            "limits, and UK supply reality.",
        ],
        "badge_text": "Deep Dive Report",
        "subtitle_text": "CDK5 Neuropeptide",
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
