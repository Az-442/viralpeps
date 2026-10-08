"""Generate the 2 Day-19 KW Phase 1 guide cards (1200x675).

Day 19 articles (Sun 04 Oct), written Oct 2026:
- cardiogen-research-summary   -> single-vial 75% (Cardiogen), "Research Summary"
- tb-500-suppliers-uk          -> single-vial 75% (TB-500), "Supplier Guide"

Vial labels QA'd with the vision tool before compositing:
- tb-500-vial.png                 -> "Viral Peps / TB-500 / 5mg"        OK
- cardiogen-research-peptide.png  -> "VIRALPEPS / Cardiogen / For Research Use Only"  OK
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
        "compound": "Cardiogen Research",
        "vial_paths": [p("public/images/compounds/cardiogen-research-peptide.png")],
        "output_path": p("public/images/guides/cardiogen-research-summary.png"),
        "description_lines": [
            "AEDR, a four-residue cardiac bioregulator:",
            "a real mechanism and one open safety question.",
        ],
        "badge_text": "Research Summary",
        "subtitle_text": "AEDR Cardiac Bioregulator",
    },
    {
        "compound": "TB-500 Suppliers UK",
        "vial_paths": [p("public/images/compounds/tb-500-vial.png")],
        "output_path": p("public/images/guides/tb-500-suppliers-uk.png"),
        "description_lines": [
            "83 vendors from \u00a311.95, four names for the",
            "same fragment, and five verification traps.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "TB-500 Price & Supplier Guide",
    },
]

if __name__ == "__main__":
    for card in CARDS:
        missing = [v for v in card["vial_paths"] if not os.path.exists(v)]
        if missing:
            print("  MISSING vial(s):", missing)
            sys.exit(1)
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
