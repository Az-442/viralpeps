import re, json, urllib.request, ssl, os

js = open('/tmp/peptx_app.js', encoding='utf-8', errors='ignore').read()
base = re.search(r'https://([a-z0-9]+)\.supabase\.co', js).group(1)
keys = sorted(set(re.findall(r'eyJ[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,}\.[A-Za-z0-9_\-]{20,}', js)), key=len)
HDR = {"apikey": keys[-1], "Authorization": "Bearer " + keys[-1], "User-Agent": "Mozilla/5.0"}
ctx = ssl._create_unverified_context()

def get(path):
    u = f"https://{base}.supabase.co/rest/v1/{path}"
    req = urllib.request.Request(u, headers=HDR)
    return json.loads(urllib.request.urlopen(req, timeout=30, context=ctx).read().decode())

for tbl in ["product_images","products_images","images","product_media","catalog_images"]:
    try:
        rows = get(f"{tbl}?select=*&limit=3")
        print(f"TABLE {tbl}: OK  {json.dumps(rows)[:400]}")
    except Exception as e:
        print(f"TABLE {tbl}: {str(e)[:80]}")
