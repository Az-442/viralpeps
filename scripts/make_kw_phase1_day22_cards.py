"""Generate the 3 Day-22 KW Phase 1 guide cards (1200x675).

Day 22 articles (Fri 07 Oct plan), written 11 Oct 2026:
- buy-kpv-uk                    -> single-vial 75% (kpv-vial), "Buyer's Guide"
- aod-9604-vs-mots-c            -> dual-vial 50% (aod-9604-vial + mots-c-vial),
                                   "Head-to-Head Comparison"
- recovery-peptide-suppliers-uk -> dual-vial 50% (bpc-157-vial + tb-500-vial),
                                   "Supplier Guide"

Vial labels QA'd with the vision tool before compositing:
- kpv-vial.png       -> "KPV / 5mg"          OK
- aod-9604-vial.png  -> "AOD 9604 / 5mg"     OK
- mots-c-vial.png    -> "MOTS-c / 10mg"      OK
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
        # single vial 75%
        "compound": "Buy KPV UK",
        "vial_paths": [p("public/images/compounds/kpv-vial.png")],
        "output_path": p("public/images/guides/buy-kpv-uk.png"),
        "description_lines": [
            "The simplest molecule in the catalogue",
            "spans a 15x price range. Here is what",
            "a tripeptide should actually cost.",
        ],
        "badge_text": "Buyer\u2019s Guide",
        "subtitle_text": "What It Should Cost",
    },
    {
        # dual vial 50%
        "compound": "AOD-9604 vs MOTS-c",
        "vial_paths": [p("public/images/compounds/aod-9604-vial.png"),
                       p("public/images/compounds/mots-c-vial.png")],
        "output_path": p("public/images/guides/aod-9604-vs-mots-c.png"),
        "description_lines": [
            "One is a fragment of growth hormone,",
            "one is encoded in mitochondrial DNA. Two",
            "metabolic peptides, two evidence bases.",
        ],
        "badge_text": "Comparison",
        "subtitle_text": "Two Metabolic Fragments",
    },
    {
        # dual vial 50%
        "compound": "Recovery Peptides",
        "vial_paths": [p("public/images/compounds/bpc-157-vial.png"),
                       p("public/images/compounds/tb-500-vial.png")],
        "output_path": p("public/images/guides/recovery-peptide-suppliers-uk.png"),
        "description_lines": [
            "BPC-157, TB-500, GHK-Cu and KPV by the",
            "numbers: listing counts, price floors,",
            "and the verification sequence.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "The Recovery Aisle",
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
        print("  wrote", out)
