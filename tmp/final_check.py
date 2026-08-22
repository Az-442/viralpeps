import json, os

VENDOR = "Tested Peptides"
compounds = json.load(open("src/data/compounds.json"))
vendors = json.load(open("src/data/vendors.json"))

# 1. vendor exists with matching name
v = next((v for v in vendors if v["slug"] == "tested-peptides"), None)
print("Vendor found:", bool(v), "| name:", v and v["name"])
print("Vendor slug matches name check:", v and v["name"] == VENDOR)

# 2. every Tested Peptides source has an image pointing to a file that exists
missing_file = []
missing_image = []
n = 0
for c in compounds:
    for s in c.get("sources", []):
        if s.get("vendor") == VENDOR:
            n += 1
            img = s.get("image")
            if not img:
                missing_image.append(c["id"])
                continue
            local = img.lstrip("/")
            if not os.path.exists(local):
                missing_file.append(f"{c['id']} -> {local}")

print(f"\nTotal TP sources: {n}")
print("Sources missing image field:", missing_image)
print("Sources whose image file does NOT exist on disk:", missing_file)

# 3. verify each image path is the local webp convention
bad_path = []
for c in compounds:
    for s in c.get("sources", []):
        if s.get("vendor") == VENDOR:
            if not s.get("image","").startswith("/images/products/tested-peptides/"):
                bad_path.append(c["id"])
print("Sources with non-local image paths:", bad_path)

# 4. All 22 product webp files present
expected = sorted(os.listdir("public/images/products/tested-peptides"))
print("\nProduct image files on disk:", len(expected))
print("Vendor logo exists:", os.path.exists("public/images/vendors/tested-peptides.png"))
