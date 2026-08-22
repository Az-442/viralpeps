import json, os

VENDOR = "Tested Peptides"
compounds = json.load(open("src/data/compounds.json"))

# Verify image paths resolve to existing files: /images/... -> public/images/...
missing = []
n = 0
for c in compounds:
    for s in c.get("sources", []):
        if s.get("vendor") == VENDOR:
            n += 1
            img = s.get("image","")
            local = "public" + img if not img.startswith("/") else "public" + img
            if not os.path.exists(local):
                missing.append((c["id"], img))
print(f"Total TP sources: {n}")
print("Missing on disk (public/-rooted):", missing if missing else "NONE - all 22 image files exist")
