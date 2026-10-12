src = open('/Users/time4you/viralpeps/src/data/research.ts').read()
i = src.find('export const compoundList')
print("compoundList at", i)
print(repr(src[i-300:i+40]))
