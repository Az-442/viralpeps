"""Compose the Day-15 non-compound guide cards.

Pair: skin-hair-peptide-suppliers-uk (grouped supplier guide) and
uk-peptide-price-comparison (pillar comparison page). Both are NON-compound,
so per the skill rule they need photorealistic AI base imagery, NOT Pillow-drawn
vial graphics.

Since image_generate is unavailable in cron, we reuse the recovered photo base:
the Day-8/10 routine recover_base() in compose_kw_day8_photo_card.py crops the
untouched photo panel back out of public/images/guides/uk-peptide-directory.png.
That panel carries only the VIRALPEPS wordmark and is compound-neutral, which is
correct for both a grouped supplier guide and a market-structure pillar.

We copy the recovered base to its own path for each card (compose() opens the
path directly, so reusing one path is fine, but the Day-15 note says copy it to
its own base path to avoid FileNotFoundError if the shared path is cleared).
"""
import os
import shutil
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
from compose_kw_day4_photo_cards import compose  # noqa: E402
from compose_kw_day8_photo_card import recover_base, BASE_OUT  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

SKIN_BASE = "/tmp/gen_cards/skin-hair-peptide-suppliers-uk-base.png"
PRICE_BASE = "/tmp/gen_cards/uk-peptide-price-comparison-base.png"


def prepare_bases():
    recover_base()
    os.makedirs(os.path.dirname(SKIN_BASE), exist_ok=True)
    shutil.copyfile(BASE_OUT, SKIN_BASE)
    shutil.copyfile(BASE_OUT, PRICE_BASE)
    print(f"  copied base -> {SKIN_BASE}")
    print(f"  copied base -> {PRICE_BASE}")


CARDS = [
    dict(
        photo_path=SKIN_BASE,
        output_path=os.path.join(ROOT, "public/images/guides/skin-hair-peptide-suppliers-uk.png"),
        badge="Supplier Guide",
        title="Skin & Hair Peptides UK",
        subtitle="Copper Peptides, Cosmetic Peptides & the Trap",
        description_lines=[
            "94 vendors stock GHK-Cu. SNAP-8 is a cosmetic",
            "ingredient, not an injectable. How to tell a",
            "research vial from a serum — and who to trust.",
        ],
    ),
    dict(
        photo_path=PRICE_BASE,
        output_path=os.path.join(ROOT, "public/images/guides/uk-peptide-price-comparison.png"),
        badge="Pillar Guide",
        title="UK Peptide Price Comparison",
        subtitle="102 Vendors, 158 Compounds, 3,354 Listings",
        description_lines=[
            "Why the same molecule carries a 54x spread, why",
            "price-per-mg is the only honest comparator, and",
            "the four-step method that turns prices into value.",
        ],
    ),
]


if __name__ == "__main__":
    prepare_bases()
    for c in CARDS:
        out = compose(**c)
        print(f"  OK {os.path.relpath(out, ROOT)} ({os.path.getsize(out)//1024} KB)")
