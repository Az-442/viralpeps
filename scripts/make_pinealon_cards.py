"""Pinealon Class C guide cards (1200x675). Reuses the canonical template."""
import sys, os
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
from batch_generate_guide_cards import draw_guide_card

CARDS = [
    {
        "compound": "Pinealon",
        "vial_paths": ["public/images/compounds/pinealon.png"],
        "output_path": "public/images/guides/pinealon-research-guide.png",
        "description_lines": [
            "The Glu-Asp-Arg tripeptide — PubChem-verified",
            "identity, the net-charge error on rival pages, and",
            "a 2023 transporter screen nobody else quotes.",
        ],
        "badge_text": "Research Guide",
        "subtitle_text": "Mechanism, Identity & Evidence Limits",
    },
    {
        "compound": "Pinealon",
        "vial_paths": ["public/images/compounds/pinealon.png"],
        "output_path": "public/images/guides/pinealon-uk-price-guide.png",
        "description_lines": [
            "£1.75 to £4.00 per mg across 19 identical",
            "10 mg vials — and why the 20 mg fill can beat",
            "every one of them once you divide.",
        ],
        "badge_text": "Price Guide",
        "subtitle_text": "UK Cost Per Milligram",
    },
]

if __name__ == "__main__":
    for c in CARDS:
        print(draw_guide_card(**c))
