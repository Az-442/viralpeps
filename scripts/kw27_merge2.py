#!/usr/bin/env python3
"""kw27 merge v2 — explicit seam, verified once, fail loudly."""
import re
import sys

WT = "/Users/time4you/viralpeps/.wt/kw27"
NL = chr(10)
CONTENT = WT + "/src/data/research-content.ts"
REG = WT + "/src/data/research.ts"
FRAGS = ["/tmp/kw27_art1.txt", "/tmp/kw27_art2.txt", "/tmp/kw27_art3.txt"]

SEAM = "  ]," + NL + "}," + NL + NL + "};" + NL + "export default content;"

src = open(CONTENT, encoding="utf-8").read()
n = src.count(SEAM)
print("seam count:", n, "len:", len(SEAM))
if n != 1:
    sys.stderr.write("FATAL: seam count %d\n" % n)
    raise SystemExit(1)

out = []
for f in FRAGS:
    t = open(f, encoding="utf-8").read().rstrip()
    if not t.endswith(","):
        t += ","
    out.append(t)
ins = (NL + NL).join(out)

# The seam's own "  ]," and "}," close the ORIGINAL last entry.
# Re-emit them, then the new blocks, then the terminator.
REPL = "  ]," + NL + "}," + NL + NL + ins + NL + NL + "};" + NL + "export default content;"
src = src.replace(SEAM, REPL, 1)
open(CONTENT, "w", encoding="utf-8").write(src)
print("content written")

# ---- registry ----
reg = open(REG, encoding="utf-8").read()
boundary = reg.find("export const compoundList")
print("boundary at", boundary)

REGISTRY = open("/tmp/kw27_registry.txt", encoding="utf-8").read().rstrip()
if not REGISTRY.endswith(","):
    REGISTRY += ","

# anchor: the last entry of the guides array immediately before ];
tail_start = reg.rfind("];", 0, boundary)
print("tail_start", tail_start, "context:", repr(reg[tail_start - 40:tail_start + 4]))
insert_at = tail_start
# walk back from '];' over the newline to the closing brace of the last entry,
# which has NO trailing comma before '];' in this file.
prefix = reg[:insert_at].rstrip("\n")
assert prefix.endswith("},") or prefix.endswith("}"), prefix[-40:]
if prefix.endswith("},"):
    pass
else:
    prefix = prefix + ","
newreg = prefix + NL + NL + REGISTRY + NL + reg[insert_at:]
open(REG, "w", encoding="utf-8").write(newreg)
print("registry written")

# ---- verify ----
c = open(CONTENT, encoding="utf-8").read()
for s in ["survodutide-suppliers-uk", "buy-epitalon-uk", "follistatin-344-for-muscle-growth"]:
    print("content key", s, len(re.findall(r'["\']' + s + r'["\']\s*:', c)))
r = open(REG, encoding="utf-8").read()
b = r.find("export const compoundList")
print("new boundary", b)
for s in ["survodutide-suppliers-uk", "buy-epitalon-uk", "follistatin-344-for-muscle-growth"]:
    i = r.find('"' + s + '"')
    print("  registry", s, "at", i, "OK" if 0 < i < b else "*** OUTSIDE GUIDES ***")
