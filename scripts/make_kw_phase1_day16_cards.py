"""Generate the 3 Day-16 KW Phase 1 guide cards (1200x675).

Day 16 articles (Thu 01 Oct), completed 6 Oct 2026:
- survodutide-for-weight-loss  -> single-vial 75%-height (Survodutide), "Compound Profile"
- melanotan-ii-suppliers-uk    -> single-vial 75%-height (Melanotan 2),  "Supplier Guide"
- kpv-for-inflammation         -> single-vial 75%-height (KPV),         "Compound Profile"

Vial labels QA'd with the vision tool before compositing:
- survodutide-vial.png     -> "ViralPeps / Survodutide / 10mg"   OK
- melanotan-ii-vial.png    -> "ViralPeps / Melanotan 2 / 10mg"   OK
- kpv-vial.png             -> "ViralPeps / KPV / 5mg"            OK
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
        "compound": "Survodutide for Weight Loss",
        "vial_paths": [
            p("public/images/compounds/survodutide-vial.png"),
        ],
        "output_path": p("public/images/guides/survodutide-for-weight-loss.png"),
        "description_lines": [
            "16.6% weight loss, 34% less",
            "visceral fat \u2014 and no licence.",
        ],
        "badge_text": "Compound Profile",
        "subtitle_text": "Survodutide Phase 3 Guide",
    },
    {
        "compound": "Melanotan II Suppliers UK",
        "vial_paths": [
            p("public/images/compounds/melanotan-ii-vial.png"),
        ],
        "output_path": p("public/images/guides/melanotan-ii-suppliers-uk.png"),
        "description_lines": [
            "56 vendors, a \u00a314.75 floor,",
            "and an MHRA warning.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "Melanotan II Price & Supplier Guide",
    },
    {
        "compound": "KPV for Inflammation",
        "vial_paths": [
            p("public/images/compounds/kpv-vial.png"),
        ],
        "output_path": p("public/images/guides/kpv-for-inflammation.png"),
        "description_lines": [
            "Three amino acids, one PepT1",
            "transporter, no human trials.",
        ],
        "badge_text": "Compound Profile",
        "subtitle_text": "KPV Anti-Inflammatory Research Guide",
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
