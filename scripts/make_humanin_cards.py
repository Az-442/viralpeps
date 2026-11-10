"""Humanin Class C guide cards (1200x675). Reuses the canonical template + real product photo."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
from batch_generate_guide_cards import draw_guide_card

CARDS = [
    {
        "compound": "Humanin",
        "vial_paths": ["public/images/products/genopept/humanin-10mg.webp"],
        "output_path": "public/images/guides/humanin-research-guide.png",
        "description_lines": [
            "The 24-amino-acid mitochondrial peptide —",
            "PubChem-verified identity, the FPRL1 receptor",
            "correction, and why no human trial exists.",
        ],
        "badge_text": "Research Guide",
        "subtitle_text": "Identity, Mechanism & Evidence",
    },
    {
        "compound": "Humanin",
        "vial_paths": ["public/images/products/genopept/humanin-10mg.webp"],
        "output_path": "public/images/guides/humanin-uk-price-guide.png",
        "description_lines": [
            "Two UK listings, £49.00 to £80.00 per 10 mg.",
            "The 2687.2 vs 2801.3 salt-form trap, and what",
            "a fair price looks like on a two-listing market.",
        ],
        "badge_text": "Price Guide",
        "subtitle_text": "UK Cost Per Milligram",
    },
]

if __name__ == "__main__":
    for c in CARDS:
        print(draw_guide_card(**c))
