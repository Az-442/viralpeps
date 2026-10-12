NL = chr(10)
src = open('/Users/time4you/viralpeps/src/data/research-content.ts','rb').read().decode('utf-8')

candidates = {
  '2s-2s': '  ],' + NL + '},' + NL + NL + '};' + NL + 'export default content;',
  'none-none': '],' + NL + '},' + NL + NL + '};' + NL + 'export default content;',
  '4s-2s': '    ],' + NL + '  },' + NL + '};' + NL + 'export default content;',
}
for k,v in candidates.items():
    print(k, src.count(v))

print("=== raw tail 400 chars ===")
print(repr(src[-400:]))
