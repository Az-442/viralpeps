"""Generate the Day-14 KW Phase 1 guide cards (1200x675).

Day 14 articles (Tue 29 Sep), completed 2 Oct 2026:
- p21-suppliers-uk                       -> single-vial 75%-height (P21),        "Supplier Guide"
- where-to-buy-tirzepatide-uk            -> single-vial 75%-height (Tirzepatide), "Buyer's Guide"
- oxytocin-nasal-spray-research-summary  -> single-vial 75%-height (Oxytocin NS), "Research Summary"

Vial labels QA'd with the vision tool before compositing:
- p21.png                    -> "VIRALPEPS / P21 / 5mg / For Research Use Only"   OK
- tirzepatide-vial.png       -> "ViralPeps / Tirzepatide / 10mg"                  OK
- oxytocin-nasal-spray.png   -> "VIRALPEPS / Oxytocin / Nasal / 10ml"             OK
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__))))
from batch_generate_guide_cards import draw_guide_card  # noqa: E402

ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))


def p(rel):
    return os.path.join(ROOT, rel)


CARDS = [
    {
        "compound": "P21 Suppliers UK",
        "vial_paths": [
            p("public/images/compounds/p21.png"),
        ],
        "output_path": p("public/images/guides/p21-suppliers-uk.png"),
        "description_lines": [
            "Two UK listings, one out of stock,",
            "and no human trial data at all.",
        ],
        "badge_text": "Supplier Guide",
        "subtitle_text": "P21 Price & Supplier Guide",
    },
    {
        "compound": "Where to Buy Tirzepatide UK",
        "vial_paths": [
            p("public/images/compounds/tirzepatide-vial.png"),
        ],
        "output_path": p("public/images/guides/where-to-buy-tirzepatide-uk.png"),
        "description_lines": [
            "A licensed POM or a research",
            "reagent \u2014 two different markets.",
        ],
        "badge_text": "Buyer's Guide",
        "subtitle_text": "Tirzepatide Sourcing Guide",
    },
    {
        "compound": "Oxytocin Nasal Spray",
        "vial_paths": [
            p("public/images/compounds/oxytocin-nasal-spray.png"),
        ],
        "output_path": p("public/images/guides/oxytocin-nasal-spray-research-summary.png"),
        "description_lines": [
            "The nose-to-brain route, 2%",
            "bioavailability, and a null NEJM trial.",
        ],
        "badge_text": "Research Summary",
        "subtitle_text": "Intranasal Oxytocin Research",
    },
]

if __name__ == "__main__":
    for card in CARDS:
        missing = [v for v in card["vial_paths"] if not os.path.exists(v)]
        if missing:
            print("  MISSING vial(s):", missing)
            sys.exit(1)
        out = draw_guide_card(
            compound=card["compound"],
            vial_paths=card["vial_paths"],
            output_path=card["output_path"],
            description_lines=card["description_lines"],
            badge_text=card["badge_text"],
            subtitle_text=card["subtitle_text"],
        )
        kb = os.path.getsize(out) // 1024
        print(f"  OK {os.path.relpath(out, ROOT)} ({kb} KB)")
