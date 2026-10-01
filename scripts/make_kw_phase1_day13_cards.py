"""Generate the 3 Day-13 KW Phase 1 guide cards (1200x675).

Day 13 articles (Mon 28 Sep), completed 1 Oct 2026:
- cardiogen-for-heart-health -> single-vial 75%-height (Cardiogen), "Compound Profile"
- aod-9604-suppliers-uk      -> single-vial 75%-height (AOD-9604),   "Supplier Guide"
- kpv-vs-ll-37               -> dual-vial 50%-height (KPV + LL-37),  "Head-to-Head Comparison"

Vial labels QA'd with the vision tool before compositing:
- aod-9604-vial.png                      -> "AOD 9604 / 5mg"     OK
- kpv-vial.png                           -> "KPV / 5mg"          OK
- cardiogen-research-peptide.png         -> "Cardiogen"          OK

LL-37 has a branded VIRALPEPS vial at public/images/compounds/ll-37-vial.png
(reads "LL-37 / (5mg)"), verified with the vision tool before compositing.
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
        "compound": "Cardiogen for Heart Health",
        "vial_paths": [
            p("public/images/compounds/cardiogen-research-peptide.png"),
        ],
        "output_path": p("public/images/guides/cardiogen-for-heart-health.png"),
        "description_lines": [
            "A cardiac designation with no",
            "cardiac function data behind it.",
        ],
        "badge_text": "Compound Profile",
        "subtitle_text": "Cardiogen (AEDR) Research Profile",
    },
    {
        "compound": "AOD-9604 Suppliers UK",
        "vial_paths": [
            p("public/images/compounds/aod-9604-vial.png"),
        ],
        "output_path": p("public/images/guides/aod-9604-suppliers-uk.png"),
        "description_lines": [
            "Six trials, one shelved obesity",
            "programme, 44 UK vendors.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "AOD-9604 Price & Supplier Guide",
    },
    {
        "compound": "KPV vs LL-37",
        "vial_paths": [
            p("public/images/compounds/kpv-vial.png"),
            p("public/images/compounds/ll-37-vial.png"),
        ],
        "output_path": p("public/images/guides/kpv-vs-ll-37.png"),
        "description_lines": [
            "A 3-residue PepT1 substrate",
            "against a 37-residue pore former.",
        ],
        "badge_text": "Head-to-Head Comparison",
        "subtitle_text": "KPV vs LL-37",
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
