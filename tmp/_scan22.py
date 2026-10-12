import re
for f in ['/tmp/kw22_a.ts','/tmp/kw22_b.ts','/tmp/kw22_c.ts']:
    src = open(f).read()
    # handle both \n real newlines inside the file
    for ln, line in enumerate(src.split('\n'), 1):
        s = line.rstrip()
        if not s: continue
        # lines that are field values opening with quote should end with either , or quote+,
        if re.match(r"^\s*(body|title|answer|question|value|label|pullQuote|slug|compoundSlug\d?):\s*", s):
            # count quotes: opening quote after colon
            m = re.match(r"^\s*[a-zA-Z]+\d?:\s*(['\"])", s)
            if m:
                q = m.group(1)
                # the value ends before trailing ', or ',
                if not (s.endswith(q + ',') or s.endswith(q) or s.endswith(q + ']') or s.endswith(q + ' }')):
                    print(f, ln, "SUSPECT END:", repr(s[-40:]))
