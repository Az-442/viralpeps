lines = open('tmp/_kw22_typecheck.ts').read().split('\n')
l = lines[106]
print("len", len(l))
print(repr(l[1200:1400]))
