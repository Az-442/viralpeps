"""Compose the Day-18 non-compound pillar card: research-peptides-guide.

Non-compound market-structure pillar, so per the skill rule it needs
photorealistic AI base imagery, NOT a Pillow-drawn vial graphic. Since
image_generate is unavailable in cron, reuse the recovered photo base
(the compound-neutral VIRALPEPS-wordmark panel from the Day-4 card).
"""
import os
import shutil
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
from compose_kw_day4_photo_cards import compose  # noqa: E402
from compose_kw_day8_photo_card import recover_base, BASE_OUT  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
PILLAR_BASE = "/tmp/gen_cards/research-peptides-guide-base.png"


def prepare_base():
    recover_base()
    os.makedirs(os.path.dirname(PILLAR_BASE), exist_ok=True)
    shutil.copyfile(BASE_OUT, PILLAR_BASE)
    print(f"  copied base -> {PILLAR_BASE}")


CARDS = [
    dict(
        photo_path=PILLAR_BASE,
        output_path=os.path.join(ROOT, "public/images/guides/research-peptides-guide.png"),
        badge="Pillar Guide",
        title="Research Peptides Guide",
        subtitle="104 Vendors, 158 Compounds, 3,409 Listings",
        description_lines=[
            "A research peptide is a regulatory category,",
            "not a chemical one. The four checks that",
            "separate a verified reagent from a PDF.",
        ],
    ),
]


if __name__ == "__main__":
    prepare_base()
    for c in CARDS:
        out = compose(**c)
        print(f"  OK {os.path.relpath(out, ROOT)} ({os.path.getsize(out)//1024} KB)")
