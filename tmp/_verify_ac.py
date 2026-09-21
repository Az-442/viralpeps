import json
v = json.load(open('src/data/vendors.json'))
for slug in ("vialverse", "kings-bio-labs", "claripep"):
    x = [y for y in v if y["slug"] == slug]
    if not x:
        print(f"{slug}: MISSING!")
        continue
    x = x[0]
    ac = x.get("_autoChecks") or {}
    ev = ac.get("evidence") or {}
    score = 0; ticks = []
    if ac.get("coa"):      score += 25; ticks.append("Lab-Tested")
    if ac.get("ruo"):      score += 5;  ticks.append("Compliant")
    if ac.get("reviews"):  score += 10; ticks.append("Reviews")
    if ac.get("shipping"): score += 5;  ticks.append("Shipping")
    if ac.get("contact"):  score += 10; ticks.append("Contact")
    print(f"{slug:16} {x['name']:16} checkedAt={ac.get('checkedAt')} ev.coa={ev.get('coa')!r:22} ruo={ev.get('ruo')!r:20} rev={ev.get('reviews')!r:12} ship={ev.get('shipping')!r:10} cont={ev.get('contact')!r}")
    print(f"{'':16} TrustScore = {score}/100  ticks={ticks}")
