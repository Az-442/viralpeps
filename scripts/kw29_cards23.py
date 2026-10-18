"""KW29 cards 2 & 3 — non-compound guides (photorealistic base + Pillow chrome).

Base imagery MUST be photorealistic, never Pillow-drawn (skill rule for
non-compound practical guides). FAL/image_generate is unavailable in this cron
session (no FAL key in env, no image_generate tool), so the approved
compound-neutral photorealistic base is reused — same path as Days 7, 8, 10, 18,
26. The photo carries only the VIRALPEPS wordmark, no compound name, so it is
suitable for both a procurement pillar and a markets pillar.
"""
import os
import shutil
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
from compose_kw_day8_photo_card import recover_base  # noqa: E402
from compose_kw_day4_photo_cards import compose  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
BASE = "/tmp/gen_cards/kw29-base.png"

CARDS = [
    dict(
        badge="Procurement Guide",
        title="Buy Research Peptides",
        subtitle="The Eight-Step Sequence",
        description_lines=[
            "3,580 listings. 27.4% never state how much",
            "is in the vial. Write the requirement first,",
            "normalise to mg, then ask for the certificate.",
        ],
        output_path=os.path.join(ROOT, "public/images/guides/buy-research-peptides-uk.png"),
    ),
    dict(
        badge="Market Guide",
        title="The Vial Staircase",
        subtitle="Why Cheap Costs More",
        description_lines=[
            "On 49 of 67 compounds the cheapest sticker",
            "price is not the cheapest per milligram -",
            "a median 2.0x penalty, and 13x on GHK-Cu.",
        ],
        output_path=os.path.join(ROOT, "public/images/guides/staircase-of-vial-sizes.png"),
    ),
]

if __name__ == "__main__":
    if not os.path.exists(BASE):
        src = recover_base()
        os.makedirs(os.path.dirname(BASE), exist_ok=True)
        shutil.copy(src, BASE)
    from PIL import Image
    im = Image.open(BASE)
    print(f"  base {BASE} {im.width}x{im.height} {os.path.getsize(BASE)//1024} KB")
    for c in CARDS:
        out = compose(photo_path=BASE, **c)
        print(f"  OK {os.path.relpath(out, ROOT)} ({os.path.getsize(out)//1024} KB)")
