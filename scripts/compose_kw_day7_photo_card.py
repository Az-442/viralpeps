"""Compose the Day-7 non-compound guide card: research-peptides-for-sale-uk.

Base imagery is the AI-generated photorealistic vials-and-cartons photograph
already produced via FAL Flux 2 for the KW Phase 1 Day-4 cards (kept in
/tmp/gen_cards/). Per the skill, non-compound practical/pillar guides must use
photorealistic imagery ONLY — never Pillow-drawn graphics. Pillow is used here
solely to lay the standard card chrome over the photo.

The source photo carries no compound name or logo (only the VIRALPEPS wordmark),
which makes it compound-neutral and appropriate for a market-structure pillar.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
from compose_kw_day4_photo_cards import compose  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

CARDS = [
    dict(
        photo_path="/tmp/gen_cards/uk-peptide-directory-v2.png",
        output_path=os.path.join(ROOT, "public/images/guides/research-peptides-for-sale-uk.png"),
        badge="Market Guide",
        title="Research Peptides for Sale UK",
        subtitle="How the Market Is Structured",
        description_lines=[
            "89 suppliers, 154 compounds, 2,819 listings —",
            "the four vendor tiers and why the cheapest",
            "listing is rarely the one to buy.",
        ],
    ),
]

if __name__ == "__main__":
    for c in CARDS:
        if not os.path.exists(c["photo_path"]):
            print(f"  SKIP (base photo missing): {c['photo_path']}")
            continue
        out = compose(**c)
        print(f"  OK {os.path.relpath(out, ROOT)} ({os.path.getsize(out)//1024} KB)")
