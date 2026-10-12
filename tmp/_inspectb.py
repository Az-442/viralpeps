raw = open('/tmp/kw22_b.ts','rb').read()
# find the line containing 'different questions'
idx = raw.find(b'different questions')
print("byte idx", idx)
print(repr(raw[idx-100:idx+80]))
# count real newlines vs escaped across file
print("real NL:", raw.count(b'\n'), "escaped \\n:", raw.count(b'\\n'))
