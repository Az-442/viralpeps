import sys, re
p = sys.argv[1]
raw = open(p, 'rb').read()
# count backslash runs before n, ', "
def runs(b, ch):
    from collections import Counter
    c = Counter()
    i = 0
    while i < len(b):
        if b[i:i+1] == b'\\':
            j = i
            while j < len(b) and b[j:j+1] == b'\\':
                j += 1
            if j < len(b) and b[j:j+1] == ch:
                c[j - i] += 1
            i = j
        else:
            i += 1
    return dict(c)
print(p, "backslash-run lengths before n:", runs(raw, b'n'))
print(p, "backslash-run lengths before ':", runs(raw, b"'"))
print(p, "literal-\\\\n (double-backslash-n) occurrences:", raw.count(b'\\\\n'))
print(p, "real newline count:", raw.count(b'\n'))
