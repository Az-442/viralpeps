import re, json, urllib.request, ssl

js = open('/tmp/peptx_app.js', encoding='utf-8', errors='ignore').read()
base = re.search(r'https://([a-z0-9]+)\.supabase\.co', js).group(1)
keys = sorted(set(re.findall(r'eyJ[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,}', js)), key=len)
key = keys[-1]
print("PROJECT:", base)
print("KEY len:", len(key), key[:30], "...")

HDR = {"apikey": key, "Authorization": "Bearer " + key, "User-Agent": "Mozilla/5.0"}
ctx = ssl._create_unverified_context()

def get(path):
    u = f"https://{base}.supabase.co/rest/v1/{path}"
    req = urllib.request.Request(u, headers=HDR)
    return json.loads(urllib.request.urlopen(req, timeout=25, context=ctx).read().decode())

try:
    data = get("product_variants?select=*&limit=3")
    print("SAMPLE product_variants:", json.dumps(data, indent=2)[:1500])
except Exception as e:
    print("product_variants ERR", str(e)[:200])

try:
    p = get("products?select=*&limit=2")
    print("SAMPLE products:", json.dumps(p, indent=2)[:1200])
except Exception as e:
    print("products ERR", str(e)[:200])
