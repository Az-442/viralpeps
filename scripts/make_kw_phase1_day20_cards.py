"""Generate the 3 Day-20 KW Phase 1 guide cards (1200x675).

Day 20 articles (Mon 05 Oct plan), written Oct 2026:
- p21-vs-semax                     -> dual-vial 50% (P21 + Semax), "Comparison"
- weight-loss-peptide-suppliers-uk -> dual-vial 50% (Tirzepatide + Retatrutide), "Supplier Guide"
- cheapest-peptides-uk             -> photorealistic base + chrome (pillar), "Price Guide"

Vial labels QA'd with the vision tool before compositing:
- p21.png             -> "VIRALPEPS / P21 / 5mg / For Research Use Only"   OK
- semax-vial.png      -> "ViralPeps / Semax / 600mcg"                      OK
- tirzepatide-vial.png, retatrutide-vial.png  (checked before generating)
"""
import os
import shutil
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
from batch_generate_guide_cards import draw_guide_card  # noqa: E402
from compose_kw_day4_photo_cards import compose  # noqa: E402
from compose_kw_day8_photo_card import recover_base, BASE_OUT  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PILLAR_BASE = "/tmp/gen_cards/cheapest-peptides-uk-base.png"


def p(rel):
    return os.path.join(ROOT, rel)


CARDS = [
    {
        "compound": "P21 vs Semax",
        "vial_paths": [p("public/images/compounds/p21.png"),
                       p("public/images/compounds/semax-vial.png")],
        "output_path": p("public/images/guides/p21-vs-semax.png"),
        "description_lines": [
            "One has forty years of Russian clinical use,",
            "the other twenty rodent studies from a single lab.",
        ],
        "badge_text": "Comparison",
        "subtitle_text": "Two Cognitive Peptides",
    },
    {
        "compound": "GLP-1 Peptides UK",
        "vial_paths": [p("public/images/compounds/tirzepatide-vial.png"),
                       p("public/images/compounds/retatrutide-vial.png")],
        "output_path": p("public/images/guides/weight-loss-peptide-suppliers-uk.png"),
        "description_lines": [
            "70 UK vendors, 305 listings \u2014 and the four",
            "traps that catch weight-loss buyers.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "Suppliers & Price Guide",
    },
]

PILLAR_CARDS = [
    dict(
        photo_path=PILLAR_BASE,
        output_path=p("public/images/guides/cheapest-peptides-uk.png"),
        badge="Price Guide",
        title="Cheapest Peptides UK",
        subtitle="What the Price Floor Means",
        description_lines=[
            "106 vendors, 3,443 listings, 146 priced",
            "compounds. Why the cheapest number is",
            "rarely the one that matters.",
        ],
    ),
]


def prepare_base():
    recover_base()
    os.makedirs(os.path.dirname(PILLAR_BASE), exist_ok=True)
    shutil.copyfile(BASE_OUT, PILLAR_BASE)
    print(f"  copied base -> {PILLAR_BASE}")


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

    prepare_base()
    for c in PILLAR_CARDS:
        out = compose(**c)
        print(f"  OK {os.path.relpath(out, ROOT)} ({os.path.getsize(out)//1024} KB)")
