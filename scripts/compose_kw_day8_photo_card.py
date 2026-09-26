"""Compose the Day-8 non-compound pillar guide card: peptides-for-sale-uk.

Base imagery MUST be photorealistic AI photography, never Pillow-drawn graphics
(skill rule for non-compound practical/pillar guides).

The original FAL Flux 2 base photo for the Day-4 cards lived in /tmp/gen_cards/
and has been cleared by the OS. However the *rendered* Day-4 card
`public/images/guides/uk-peptide-directory.png` still exists on disk, and its
left-hand photo panel is the untouched AI photograph (the compose routine pastes
it at a known offset and never draws over it). We therefore recover the base by
cropping that panel back out, then lay fresh chrome over it.

The recovered photo carries no compound name or logo — only the VIRALPEPS
wordmark — so it stays compound-neutral and appropriate for a market-structure
pillar.

If image_generate becomes available inside the cron, regenerate a dedicated base
and replace this card.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
from compose_kw_day4_photo_cards import compose  # noqa: E402
from PIL import Image  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

SOURCE_CARD = os.path.join(ROOT, "public/images/guides/uk-peptide-directory.png")
BASE_OUT = "/tmp/gen_cards/peptides-for-sale-uk-base.png"


def recover_base():
    """Crop the AI photo panel out of the Day-4 rendered card."""
    os.makedirs(os.path.dirname(BASE_OUT), exist_ok=True)
    card = Image.open(SOURCE_CARD).convert("RGB")

    card_w, card_h = card.size
    panel_h = int(card_h * 0.72)
    panel_w = int(card_w * 0.46)          # compose caps width at 46% of card
    px, py = 38, int((card_h - panel_h) / 2)

    # The compose routine may have shrunk the panel to fit the width cap.
    # Recompute exactly as compose() does.
    #   panel_w = int(photo.width * panel_h / photo.height); capped at 46% width
    # We only know the pasted rect, and 46% cap is what was used for a landscape
    # source, so crop that rect. Inset by 1px to avoid the card's white edges.
    crop = card.crop((px + 1, py + 1, px + panel_w - 1, py + panel_h - 1))
    # Tighten to the subject: the recovered panel carries a lot of empty white
    # margin (the source photo was placed with wide padding). Crop to the
    # content bounding box with a small breathing-space pad so the vial fills
    # the panel properly instead of floating in whitespace.
    import numpy as np

    arr = np.array(crop.convert("L"))
    ys, xs = np.where(arr < 245)
    if len(xs) and len(ys):
        pad = 18
        x0 = max(0, xs.min() - pad)
        x1 = min(crop.width, xs.max() + pad)
        y0 = max(0, ys.min() - pad)
        y1 = min(crop.height, ys.max() + pad)
        crop = crop.crop((x0, y0, x1, y1))
        print(f"  tightened to subject: {crop.size}")

    crop.save(BASE_OUT)
    print(f"  recovered base -> {BASE_OUT} {crop.size} (native, no upscale)")
    return BASE_OUT


CARDS = [
    dict(
        photo_path=BASE_OUT,
        output_path=os.path.join(ROOT, "public/images/guides/peptides-for-sale-uk.png"),
        badge="Market Guide",
        title="Peptides for Sale UK",
        subtitle="What the Price Is Telling You",
        description_lines=[
            "91 vendors, 154 compounds, 2,965 listings \u2014",
            "what is legal, what is verifiable, and where",
            "the price spread actually comes from.",
        ],
    ),
]

if __name__ == "__main__":
    recover_base()
    for c in CARDS:
        out = compose(**c)
        print(f"  OK {os.path.relpath(out, ROOT)} ({os.path.getsize(out)//1024} KB)")
