import re, sys, os

def normalise(path):
    raw = open(path, 'rb').read()
    # collapse backslash-runs of length >=2 before n, ', " down to a single backslash
    out = re.sub(rb'\\{2,}n', rb'\\n', raw)
    out = re.sub(rb"\\{2,}'", rb"\\'", out)
    out = re.sub(rb'\\{2,}"', rb'\\"', out)
    changed = (out != raw)
    if changed:
        open(path, 'wb').write(out)
    return changed

def check(path):
    raw = open(path, 'rb').read()
    bad = []
    for m in re.finditer(rb'(\\{2,})(n|\'|")', raw):
        bad.append(m.group(0))
    return bad

for f in sys.argv[1:]:
    ch = normalise(f)
    bad = check(f)
    print(f, "normalised=", ch, "remaining-multi-escapes=", len(bad), bad[:5])
