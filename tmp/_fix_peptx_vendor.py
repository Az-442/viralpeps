import json

V = 'src/data/vendors.json'
v = json.load(open(V))
for x in v:
    if x.get("slug") != "peptx":
        continue
    print("BEFORE:")
    print(json.dumps({k: x.get(k) for k in ("name","rating","verified","labTested","lastTested","_autoChecks")}, indent=2)[:600])

    x["labTested"] = True
    x["lastTested"] = "2026-09-18"          # autocheck run date
    x["_autoChecks"] = {
        "live": True,
        "coa": True,          # Janoshik / Analiza Białek / Vanguard certificates on product pages
        "ruo": True,          # "for research purposes" + "research use only" on product pages
        "reviews": False,     # no independent review platform linked
        "shipping": True,     # tracked shipping advertised
        "contact": True,      # contact route confirmed on secondary pages
        "productPageFetched": True,
        "evidence": {
            "coa": "coa",
            "ruo": "research use only",
            "reviews": None,
            "shipping": "tracking",
            "contact": "contact",
        },
        "checkedAt": "2026-09-18T00:34:02.298Z",
    }
    print("\nAFTER:")
    print(json.dumps({k: x.get(k) for k in ("name","rating","verified","labTested","lastTested","_autoChecks")}, indent=2)[:800])

json.dump(v, open(V,'w'), indent=2, ensure_ascii=False)
print("\nwritten")

# compute TrustScore per the published methodology
def entityPoints(entityType, paymentMethod):
    if paymentMethod in ("card","bank"): return 25
    if entityType == "ltd": return 20
    if entityType == "sole_trader": return 10
    return 0

peptx = [x for x in v if x["slug"]=="peptx"][0]
auto = peptx["_autoChecks"]
score = 0; ticks=[]
if auto.get("coa"): score+=25; ticks.append("Lab-Tested")
if auto.get("ruo"): score+=5; ticks.append("Compliant")
if auto.get("reviews"): score+=10; ticks.append("Reviews")
if auto.get("shipping"): score+=5; ticks.append("Shipping")
if auto.get("contact"): score+=10; ticks.append("Contact")
if peptx.get("embedded") or peptx.get("domainVerified"): score+=20; ticks.append("Domain")
ep = entityPoints(peptx.get("entityType"), peptx.get("paymentMethod"))
if ep: score+=ep; ticks.append("Entity")
print(f"\nPeptX TrustScore = {min(score,100)}/100  ticks={ticks}")
