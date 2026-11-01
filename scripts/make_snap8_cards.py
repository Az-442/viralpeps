"""SNAP-8 Class C guide cards (1200x675). Reuses the canonical template."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
from batch_generate_guide_cards import draw_guide_card

CARDS = [
    {
        "compound": "SNAP-8",
        "vial_paths": ["public/images/compounds/snap-8-vial.png"],
        "output_path": "public/images/guides/snap-8-research-guide.png",
        "description_lines": [
            "Acetyl Octapeptide-3 and the SNARE complex —",
            "what the 2004 mechanism paper actually found,",
            "and why both human trials used patches.",
        ],
        "badge_text": "Research Guide",
        "subtitle_text": "Mechanism, Identity & Evidence Limits",
    },
    {
        "compound": "SNAP-8",
        "vial_paths": ["public/images/compounds/snap-8-vial.png"],
        "output_path": "public/images/guides/snap-8-uk-price-guide.png",
        "description_lines": [
            "£1.43 to £3.00 per milligram across 18 UK 10mg",
            "vials. One pack size, a 2.1x vendor spread, and",
            "why the market average is the wrong number.",
        ],
        "badge_text": "Price Guide",
        "subtitle_text": "UK Cost Per Milligram",
    },
]

if __name__ == "__main__":
    for c in CARDS:
        print(draw_guide_card(**c))
