"""Gonadorelin Class C guide cards (1200x675). Reuses the canonical template."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(__file__)))
from batch_generate_guide_cards import draw_guide_card

CARDS = [
    {
        "compound": "Gonadorelin",
        "vial_paths": ["public/images/compounds/gonadorelin.png"],
        "output_path": "public/images/guides/gonadorelin-research-guide.png",
        "description_lines": [
            "The native GnRH decapeptide — PubChem-verified",
            "identity, the pulsatile paradox, and why the",
            "same molecule both drives and suppresses the axis.",
        ],
        "badge_text": "Research Guide",
        "subtitle_text": "Mechanism, Identity & Evidence Limits",
    },
    {
        "compound": "Gonadorelin",
        "vial_paths": ["public/images/compounds/gonadorelin.png"],
        "output_path": "public/images/guides/gonadorelin-uk-price-guide.png",
        "description_lines": [
            "£4.88 to £8.60 per mg across six UK listings.",
            "Why most of the sticker spread is vial size —",
            "and how to read a lot-specific COA.",
        ],
        "badge_text": "Price Guide",
        "subtitle_text": "UK Cost Per Milligram",
    },
]

if __name__ == "__main__":
    for c in CARDS:
        print(draw_guide_card(**c))
