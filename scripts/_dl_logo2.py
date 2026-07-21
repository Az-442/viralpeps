import urllib.request
import ssl
req = urllib.request.Request('https://chiltonlabs.co.uk/wp-content/uploads/2023/11/cropped-chilton-edit-1.png', headers={'User-Agent': 'Mozilla/5.0'})
ctx = ssl._create_unverified_context()
try:
    with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
        data = resp.read()
        with open('chilton-labs.png', 'wb') as f:
            f.write(data)
        print('Downloaded', len(data), 'bytes')
except Exception as e:
    print('Error:', type(e).__name__, str(e)[:200])
