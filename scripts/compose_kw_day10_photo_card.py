"""Compose the Day-10 non-compound pillar guide card: buy-peptides-online-uk.

Base imagery MUST be photorealistic AI photography, never Pillow-drawn graphics
(skill rule for non-compound practical/pillar guides).

`image_generate` is NOT available in this cron session, so a fresh FAL base
cannot be produced here. The recovered photorealistic base is reused, exactly as
on Day 7 and Day 8: the untouched AI photo panel is cropped back out of an
already-rendered card (the compose routine pastes the photo at a known offset and
never draws over it), then fresh chrome is laid over it.

The recovered photo carries only the VIRALPEPS wordmark and no compound name, so
it remains compound-neutral and appropriate for a market-structure pillar.

If image_generate becomes available inside the cron, regenerate a dedicated base
and replace this card.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
from compose_kw_day4_photo_cards import compose  # noqa: E402
from compose_kw_day8_photo_card import recover_base  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

BASE_OUT = "/tmp/gen_cards/buy-peptides-online-uk-base.png"

CARDS = [
    dict(
        photo_path=BASE_OUT,
        output_path=os.path.join(ROOT, "public/images/guides/buy-peptides-online-uk.png"),
        badge="Buyer's Guide",
        title="Buy Peptides Online UK",
        subtitle="How the Market Actually Works",
        description_lines=[
            "93 suppliers, 406 listings, 2,904 prices \u2014",
            "what separates a verifiable listing",
            "from one that only looks credible.",
        ],
    ),
]

if __name__ == "__main__":
    # Recover the photorealistic base (reuses the Day-8 recovery routine, which
    # crops the AI photo panel out of the rendered uk-peptide-directory card and
    # writes it to its own hardcoded path).
    if not os.path.exists(BASE_OUT):
        recovered = recover_base()
        os.makedirs(os.path.dirname(BASE_OUT), exist_ok=True)
        if os.path.abspath(recovered) != os.path.abspath(BASE_OUT):
            import shutil
            shutil.copyfile(recovered, BASE_OUT)
            print(f"  base copied -> {BASE_OUT}")
    for c in CARDS:
        out = compose(**c)
        print(f"  OK {os.path.relpath(out, ROOT)} ({os.path.getsize(out)//1024} KB)")
