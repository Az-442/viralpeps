"""GHRP-6 Class C guide cards (1200x675). Reuses the canonical template."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
from batch_generate_guide_cards import draw_guide_card

CARDS = [
    {
        "compound": "GHRP-6",
        "vial_paths": ["public/images/compounds/ghrp-6.png"],
        "output_path": "public/images/guides/ghrp-6-research-guide.png",
        "description_lines": [
            "The original growth-hormone secretagogue —",
            "PubChem-verified identity, the ACTH and",
            "cortisol bundle, and where the evidence stops.",
        ],
        "badge_text": "Research Guide",
        "subtitle_text": "Mechanism, Identity & Evidence Limits",
    },
    {
        "compound": "GHRP-6",
        "vial_paths": ["public/images/compounds/ghrp-6.png"],
        "output_path": "public/images/guides/ghrp-6-uk-price-guide.png",
        "description_lines": [
            "£7.95 to £49.99 for the same 5 mg vial.",
            "Why the UK spread is 6× — and what a",
            "fair price per milligram actually is.",
        ],
        "badge_text": "Price Guide",
        "subtitle_text": "UK Cost Per Milligram",
    },
]

if __name__ == "__main__":
    for c in CARDS:
        print(draw_guide_card(**c))
