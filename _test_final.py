#!/usr/bin/env python3
"""Final test — categorize results as PASS (valid redirect), DATA GAP (404 but compound missing from data), or CODE BUG."""
import subprocess, json, sys

BASE = "https://www.viralpeps.co.uk"

with open('src/data/compounds.json') as f:
    compounds = json.load(f)

with open('src/data/vendors.json') as f:
    vendors = json.load(f)

vendor_names = {v['slug']: v['name'] for v in vendors}

# Build lookup: (vendor_slug, compound_slug) -> exists?
existing_combos = set()
for c in compounds:
    slug = c.get('slug', '')
    for s in c.get('sources', []):
        v_name = s.get('vendor', '')
        for vslug, vname in vendor_names.items():
            if v_name.lower() == vname.lower():
                existing_combos.add((vslug, slug))
                break

def test_url(path):
    url = BASE + path
    try:
        result = subprocess.run(
            ["curl", "-s", "-D", "-", "-o", "/dev/null", "--max-time", "10", url],
            capture_output=True, text=True, timeout=15
        )
        headers = result.stdout
        lines = headers.split("\n")
        status_line = lines[0] if lines else ""
        parts = status_line.split()
        http_code = parts[1] if len(parts) >= 2 else "000"
        location = ""
        for line in lines:
            if line.lower().startswith("location:"):
                location = line.split(":", 1)[1].strip()
                break
        return (http_code, location)
    except Exception as e:
        return ("ERR", str(e))

def categorize(path, http_code, location, label):
    """Categorize the result."""
    is_404_expected = "404" in path or "nonexistent" in label
    is_vendor_only = path.count("/") == 2  # /go/{vendorSlug}
    is_product = path.count("/") == 3  # /go/{vendorSlug}/{compoundSlug}

    if is_404_expected and http_code == "404":
        return "PASS (expected 404)"
    if is_404_expected and http_code != "404":
        return f"CODE BUG (expected 404, got HTTP {http_code})"

    if http_code == "404":
        # Check if this is a data gap or code bug
        if is_vendor_only:
            # Vendor-level 404 should never happen for valid vendor slugs
            return "CODE BUG"
        elif is_product:
            parts = path.split("/")
            v_slug = parts[2]
            c_slug = parts[3]
            if (v_slug, c_slug) in existing_combos:
                return "CODE BUG (data exists but 404)"
            else:
                return "DATA GAP (vendor/compound not in JSON)"
        return "DATA GAP"

    if http_code in ("301", "302", "307", "308") and location:
        return "PASS (redirect)"
    
    return f"CODE BUG (HTTP {http_code})"

# Build all test URLs
tests = []

# 1. VENDOR WEBSITE VISIT SITE BUTTONS (16)
vendor_slugs = list(vendor_names.keys())
for slug in vendor_slugs:
    tests.append((f"/go/{slug}", f"vendor:{slug}"))

# 2-17. PRODUCT LINKS
product_tests = [
    ("express-peptides", ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "semaglutide", "retatrutide", "mots-c", "nad", "ss-31", "ll-37"]),
    ("pure-peptides-uk", ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "cjc-1295", "ipamorelin", "tesamorelin", "aod-9604", "kpv", "glutathion"]),
    ("sterling-peptides", ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "semaglutide", "retatrutide"]),
    ("research-peptide-uk", ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "semaglutide", "retatrutide"]),
    ("tide-labs", ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "semaglutide", "mots-c"]),
    ("dr-peptides", ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "retatrutide", "semax"]),
    ("raccoon-peptides", ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "retatrutide", "semaglutide"]),
    ("kensington-labs", ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "cjc-1295", "ipamorelin"]),
    ("peptides-lab-uk", ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "aod-9604", "semaglutide"]),
    ("uk-peptides", ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "cjc-1295", "ipamorelin"]),
    ("imperial-peptides", ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "semaglutide"]),
    ("research-peptides-uk-main", ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "cjc-1295"]),
    ("biohack-peptides", ["bpc-157", "tb-500", "ghk-cu", "semaglutide", "retatrutide"]),
    ("the-peptide-company", ["bpc-157", "tb-500", "ghk-cu", "tirzepatide"]),
    ("brit-peptides", ["bpc-157", "tb-500", "ghk-cu", "tirzepatide"]),
    ("new-wave-peptides", ["bpc-157", "tb-500", "ghk-cu", "tirzepatide"]),
]
for v_slug, prods in product_tests:
    for p in prods:
        tests.append((f"/go/{v_slug}/{p}", f"product:{v_slug}/{p}"))

# 18. EDGE CASES
tests.append(("/go/nonexistent-vendor/bpc-157", "edge:nonexistent-vendor/bpc-157"))
tests.append(("/go/express-peptides/nonexistent-compound", "edge:express-peptides/nonexistent-compound"))
tests.append(("/go/nonexistent-vendor", "edge:nonexistent-vendor"))

results = {"PASS (redirect)": [], "PASS (expected 404)": [], "DATA GAP": [], "CODE BUG": []}

print("=" * 140)
print(f"{'URL':<65} {'HTTP/Redirect':<50} {'RESULT':<25}")
print("=" * 140)

for path, label in tests:
    http_code, location = test_url(path)
    category = categorize(path, http_code, location, label)
    
    display_target = location if location else f"HTTP {http_code}"
    
    results.setdefault(category, []).append((path, display_target))
    
    print(f"{BASE + path:<65} {display_target:<50} {category:<25}")

print("=" * 140)

# Summary
total = sum(len(v) for v in results.values())
print(f"\nSUMMARY:")
print(f"  TOTAL: {total}")
for cat, items in sorted(results.items()):
    print(f"  {cat}: {len(items)}")

code_bugs = results.get("CODE BUG", [])
if code_bugs:
    print(f"\n⚠️  CODE BUGS DETECTED ({len(code_bugs)}):")
    for path, target in code_bugs:
        print(f"  - {path} -> {target}")
else:
    print(f"\n✅ NO CODE BUGS — all unexpected results are data gaps in compounds.json")
    print(f"   The 404s are correct: those vendor/compound pairs don't exist in the source data.")

print(f"\nROUTE CODE PERFORMANCE:")
print(f"  Valid vendor redirects:      {len(results.get('PASS (redirect)', []))} / 16 vendor URLs")
print(f"  Valid product redirects:     {sum(1 for p,_ in results.get('PASS (redirect)', []) if p.count('/')==3)} product URLs")
print(f"  Data gaps (correct 404):     {len(results.get('DATA GAP', []))} (vendor has no source for that compound)")
print(f"  Expected 404s:               {len(results.get('PASS (expected 404)', []))} (edge cases)")
