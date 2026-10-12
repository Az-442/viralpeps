import re
lines = open('tmp/_kw22_typecheck.ts').read().split('\n')
l = lines[106]
# find single quotes not preceded by backslash
qs = [(m.start(), l[max(0,m.start()-3):m.start()+3]) for m in re.finditer(r"'", l)]
print("num single quotes:", len(qs))
# find any that are not escaped
for pos, ctx in qs:
    if pos == 0 or l[pos-1] != '\\':
        print("UNESCAPED at", pos, repr(ctx))
