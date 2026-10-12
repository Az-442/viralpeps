import re
s = open('src/data/research-content.ts').read()
m = re.search(r"'pt-141-vs-melanotan-ii-uk':\s*\{", s)
print("found at", m.start() if m else None)
print(s[m.start():m.start()+2200])
