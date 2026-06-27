#!/usr/bin/env python3
"""Update UK Peptides URLs and prices in compounds.json based on scraped data."""

import json
import re

with open('/Users/time4you/viralpeps/src/data/compounds.json', 'r') as f:
    data = json.load(f)

# UK Peptides catalog price map: {compound_slug: (correct_url, correct_price)}
# Only for products confirmed to be on their website catalog
updates = {
    "tirzepatide": ("https://ukpeptides.com/catalog/tirzepatide", "£94.99"),
    "semaglutide": ("https://ukpeptides.com/catalog/semaglutide", "£94.99"),
    "bpc-157": ("https://ukpeptides.com/catalog/bpc-157", "£29.99"),  # already correct
    "tb-500": ("https://ukpeptides.com/catalog/tb-500", "£44.99"),
    "melanotan-ii": ("https://ukpeptides.com/catalog/melanotan-ii", "£15.00"),
    "ghrp-2": ("https://ukpeptides.com/catalog/ghrp-2", "£49.99"),
    "aod-9604": ("https://ukpeptides.com/catalog/aod-9604", "£68.00"),
    "retatrutide": ("https://ukpeptides.com/catalog/retatrutide", "£94.99"),  # already updated
    "cjc-1295": ("https://ukpeptides.com/catalog/cjc-1295", "£49.99"),  # already updated
    "igf-1-lr3": ("https://ukpeptides.com/catalog/igf-1-lr3", "£45.99"),  # already updated
    "tesamorelin": ("https://ukpeptides.com/catalog/tesamorelin", "£49.99"),
    "sermorelin": ("https://ukpeptides.com/catalog/sermorelin", "£49.99"),
    "mots-c": ("https://ukpeptides.com/catalog/mots-c", "£49.99"),
    "ghk-cu": ("https://ukpeptides.com/catalog/ghk-cu", "£24.99"),  # already updated
    "kpv": ("https://ukpeptides.com/catalog/kpv", "£49.99"),  # already updated
    "epitalon": ("https://ukpeptides.com/catalog/epitalon", "£14.00"),
    "semax": ("https://ukpeptides.com/catalog/semax", "£49.99"),
    "selank": ("https://ukpeptides.com/catalog/selank", "£49.99"),
    "bpc-157-oral": ("https://ukpeptides.com/catalog/bpc-157-oral", "£49.99"),
    "fragment-176-191": ("https://ukpeptides.com/catalog/fragment-176-191", "£68.00"),
    "hexarelin": ("https://ukpeptides.com/catalog/hexarelin", "£49.99"),
    "ipamorelin": ("https://ukpeptides.com/catalog/ipamorelin", "£49.99"),
    "ghrp-6": ("https://ukpeptides.com/catalog/ghrp-6", "£49.99"),
    "pt-141-bremelanotide": ("https://ukpeptides.com/catalog/pt-141", "£29.99"),
    "kisspeptin-10": ("https://ukpeptides.com/catalog/kisspeptin-10", "£49.99"),
    "cerebrolysin": ("https://ukpeptides.com/catalog/cerebrolysin", "£52.00"),
    "p21": ("https://ukpeptides.com/catalog/p21", "£38.00"),
    "dihexa": ("https://ukpeptides.com/catalog/dihexa", "£48.00"),
    "noopept": ("https://ukpeptides.com/catalog/noopept", "£15.00"),
    "phenylpiracetam": ("https://ukpeptides.com/catalog/phenylpiracetam", "£18.00"),
    "pramipexole": ("https://ukpeptides.com/catalog/pramipexole", "£22.00"),
    "bpc-157-tb-500-blend": ("https://ukpeptides.com/catalog/bpc-157-tb-500-blend", "£44.99"),
    "gonadorelin": ("https://ukpeptides.com/catalog/gonadorelin", "£24.00"),
    "dsip": ("https://ukpeptides.com/catalog/dsip", "£28.00"),
    "oxytocin": ("https://ukpeptides.com/catalog/oxytocin", "£20.00"),
}

# Only update items where we confirmed the catalog URL actually works
# (these are verified by web scraping)
confirmed_working_urls = {
    "bpc-157": ("https://ukpeptides.com/catalog/bpc-157", "£29.99"),
    "retatrutide": ("https://ukpeptides.com/catalog/retatrutide", "£94.99"),
    "cjc-1295": ("https://ukpeptides.com/catalog/cjc-1295", "£49.99"),
    "igf-1-lr3": ("https://ukpeptides.com/catalog/igf-1-lr3", "£45.99"),
    "ghk-cu": ("https://ukpeptides.com/catalog/ghk-cu", "£24.99"),
    "kpv": ("https://ukpeptides.com/catalog/kpv", "£49.99"),
    "sermorelin": ("https://ukpeptides.com/catalog/sermorelin", "£49.99"),
    "ipamorelin": ("https://ukpeptides.com/catalog/ipamorelin", "£49.99"),
    "ghrp-6": ("https://ukpeptides.com/catalog/ghrp-6", "£49.99"),
    "pt-141-bremelanotide": ("https://ukpeptides.com/catalog/pt-141", "£29.99"),
    "oxytocin": ("https://ukpeptides.com/catalog/oxytocin", "£20.00"),
    "tesamorelin": ("https://ukpeptides.com/catalog/tesamorelin", "£49.99"),
    "melanotan-ii": ("https://ukpeptides.com/catalog/melanotan-ii", "£15.00"),
}

updates_count = 0
for compound in data:
    slug = compound.get("slug", "")
    if slug in confirmed_working_urls:
        new_url, new_price = confirmed_working_urls[slug]
        for source in compound.get("sources", []):
            if source.get("vendor") == "UK Peptides":
                old_url = source.get("url", "")
                old_price = source.get("price", "")
                source["url"] = new_url
                source["price"] = new_price
                updates_count += 1
                print(f"UPDATED: {slug} - UK Peptides")
                print(f"  URL: {old_url} -> {new_url}")
                print(f"  Price: {old_price} -> {new_price}")

with open('/Users/time4you/viralpeps/src/data/compounds.json', 'w') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"\nTotal updates: {updates_count}")
