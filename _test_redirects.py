#!/usr/bin/env python3
"""Test all /go/ redirect URLs for ViralPeps."""
import subprocess, json, sys, time

BASE = "https://www.viralpeps.co.uk"

def test_url(path, label=""):
    """Test a redirect URL using curl. Returns (path, final_url, status_code, pass/fail, expected_desc)."""
    url = BASE + path
    try:
        result = subprocess.run(
            ["curl", "-s", "-o", "/dev/null", "-w", "%{http_code}\t%{redirect_url}", "-L", url],
            capture_output=True, text=True, timeout=15
        )
        parts = result.stdout.strip().split("\t")
        http_code = parts[0] if len(parts) > 0 else "000"
        redirect_url = parts[1] if len(parts) > 1 else ""
        if http_code == "404":
            return (url, f"HTTP 404", "PASS" if "404" in path or "nonexistent" in label else "FAIL")
        elif redirect_url:
            return (url, redirect_url, "PASS")
        else:
            return (url, f"HTTP {http_code} (no redirect)", "FAIL")
    except Exception as e:
        return (url, f"ERROR: {e}", "FAIL")

# Build all test URLs
tests = []

# 1. VENDOR WEBSITE VISIT SITE BUTTONS (16)
vendor_slugs = [
    "uk-peptides", "pure-peptides-uk", "sterling-peptides", "research-peptide-uk",
    "imperial-peptides", "tide-labs", "express-peptides", "dr-peptides",
    "the-peptide-company", "research-peptides-uk-main", "raccoon-peptides",
    "kensington-labs", "peptides-lab-uk", "biohack-peptides", "brit-peptides",
    "new-wave-peptides"
]
for slug in vendor_slugs:
    tests.append((f"/go/{slug}", f"vendor:{slug}"))

# 2. PRODUCT LINKS - Express Peptides
express_products = ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "semaglutide", "retatrutide", "mots-c", "nad", "ss-31", "ll-37"]
for p in express_products:
    tests.append((f"/go/express-peptides/{p}", f"product:express-peptides/{p}"))

# 3. PRODUCT LINKS - Pure Peptides UK
pure_products = ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "cjc-1295", "ipamorelin", "tesamorelin", "aod-9604", "kpv", "glutathion"]
for p in pure_products:
    tests.append((f"/go/pure-peptides-uk/{p}", f"product:pure-peptides-uk/{p}"))

# 4. PRODUCT LINKS - Sterling Peptides
sterling_products = ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "semaglutide", "retatrutide"]
for p in sterling_products:
    tests.append((f"/go/sterling-peptides/{p}", f"product:sterling-peptides/{p}"))

# 5. PRODUCT LINKS - Research Peptides UK
research_products = ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "semaglutide", "retatrutide"]
for p in research_products:
    tests.append((f"/go/research-peptide-uk/{p}", f"product:research-peptide-uk/{p}"))

# 6. PRODUCT LINKS - Tide Labs
tide_products = ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "semaglutide", "mots-c"]
for p in tide_products:
    tests.append((f"/go/tide-labs/{p}", f"product:tide-labs/{p}"))

# 7. PRODUCT LINKS - Dr P Research
dr_products = ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "retatrutide", "semax"]
for p in dr_products:
    tests.append((f"/go/dr-peptides/{p}", f"product:dr-peptides/{p}"))

# 8. PRODUCT LINKS - Raccoon Peptides
raccoon_products = ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "retatrutide", "semaglutide"]
for p in raccoon_products:
    tests.append((f"/go/raccoon-peptides/{p}", f"product:raccoon-peptides/{p}"))

# 9. PRODUCT LINKS - Kensington Labs
kensington_products = ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "cjc-1295", "ipamorelin"]
for p in kensington_products:
    tests.append((f"/go/kensington-labs/{p}", f"product:kensington-labs/{p}"))

# 10. PRODUCT LINKS - Peptides Lab UK
peptideslab_products = ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "aod-9604", "semaglutide"]
for p in peptideslab_products:
    tests.append((f"/go/peptides-lab-uk/{p}", f"product:peptides-lab-uk/{p}"))

# 11. PRODUCT LINKS - UK Peptides
ukp_products = ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "cjc-1295", "ipamorelin"]
for p in ukp_products:
    tests.append((f"/go/uk-peptides/{p}", f"product:uk-peptides/{p}"))

# 12. PRODUCT LINKS - Imperial Peptides UK
imperial_products = ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "semaglutide"]
for p in imperial_products:
    tests.append((f"/go/imperial-peptides/{p}", f"product:imperial-peptides/{p}"))

# 13. PRODUCT LINKS - Research Peptides (main)
research_main_products = ["bpc-157", "tb-500", "ghk-cu", "tirzepatide", "cjc-1295"]
for p in research_main_products:
    tests.append((f"/go/research-peptides-uk-main/{p}", f"product:research-peptides-uk-main/{p}"))

# 14. PRODUCT LINKS - Biohack Peptides
biohack_products = ["bpc-157", "tb-500", "ghk-cu", "semaglutide", "retatrutide"]
for p in biohack_products:
    tests.append((f"/go/biohack-peptides/{p}", f"product:biohack-peptides/{p}"))

# 15. PRODUCT LINKS - The Peptide Company
tpc_products = ["bpc-157", "tb-500", "ghk-cu", "tirzepatide"]
for p in tpc_products:
    tests.append((f"/go/the-peptide-company/{p}", f"product:the-peptide-company/{p}"))

# 16. PRODUCT LINKS - Brit Peptides
brit_products = ["bpc-157", "tb-500", "ghk-cu", "tirzepatide"]
for p in brit_products:
    tests.append((f"/go/brit-peptides/{p}", f"product:brit-peptides/{p}"))

# 17. PRODUCT LINKS - New Wave Peptides
newwave_products = ["bpc-157", "tb-500", "ghk-cu", "tirzepatide"]
for p in newwave_products:
    tests.append((f"/go/new-wave-peptides/{p}", f"product:new-wave-peptides/{p}"))

# 18. EDGE CASES (3)
tests.append((f"/go/nonexistent-vendor/bpc-157", "edge:nonexistent-vendor/bpc-157"))
tests.append((f"/go/express-peptides/nonexistent-compound", "edge:express-peptides/nonexistent-compound"))
tests.append((f"/go/nonexistent-vendor", "edge:nonexistent-vendor"))

print("=" * 120)
print(f"{'URL':<60} {'Redirect Target / HTTP Status':<40} {'RESULT':<10}")
print("=" * 120)

passed = 0
failed = 0
results = []

for path, label in tests:
    url, redirect_target, status = test_url(path, label)
    results.append((url, redirect_target, status))
    if status == "PASS":
        passed += 1
    else:
        failed += 1
    print(f"{url:<60} {redirect_target:<40} {status:<10}")
    sys.stdout.flush()

print("=" * 120)
print(f"TOTAL: {len(tests)} | PASSED: {passed} | FAILED: {failed}")
print("=" * 120)

if failed > 5:
    print("\n⚠️  MORE THAN 5 FAILURES — INVESTIGATION REQUIRED")
    
sys.exit(0 if failed <= 5 else 1)
