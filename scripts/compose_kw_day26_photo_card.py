"""Compose the Day-26 non-compound market-structure pillar card: uk-peptide-comparison-site.

Base imagery MUST be photorealistic AI photography, never a Pillow-drawn graphic
(skill rule for non-compound practical/pillar guides). image_generate is not
available in this cron session, so the base is recovered by cropping the untouched
photo panel out of the approved Day-4 rendered card. The recovered photo carries no
compound name or logo - only the VIRALPEPS wordmark - so it stays compound-neutral
and appropriate for a market-structure pillar.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
from compose_kw_day8_photo_card import recover_base  # noqa: E402
import compose_kw_day8_photo_card as d8  # noqa: E402
from compose_kw_day4_photo_cards import compose  # noqa: E402
import shutil  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
BASE_OUT = "/tmp/gen_cards/uk-peptide-comparison-site-base.png"

CARD = dict(
    photo_path=BASE_OUT,
    output_path=os.path.join(ROOT, "public/images/guides/uk-peptide-comparison-site.png"),
    badge="Market Guide",
    title="Comparison Sites",
    subtitle="How the Ranking Is Built",
    description_lines=[
        "Affiliate commission is worth up to 20 of 100",
        "points in the score - and it is the first",
        "tie-breaker. What that means for the table.",
    ],
)

if __name__ == "__main__":
    # recover_base() writes to its own hardcoded path (peptides-for-sale-uk-base.png),
    # so copy the result to this card's base path.
    src = recover_base()
    os.makedirs(os.path.dirname(BASE_OUT), exist_ok=True)
    shutil.copy(src, BASE_OUT)
    print(f"  base -> {BASE_OUT} {os.path.getsize(BASE_OUT)//1024} KB")
    out = compose(**CARD)
    print(f"  OK {os.path.relpath(out, ROOT)} ({os.path.getsize(out)//1024} KB)")
