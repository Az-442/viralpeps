import re
s = open('src/data/research-content.ts').read()
# grab the ResearchPageContent interface if present, else from research-content
i = s.find('export interface ResearchPageContent')
if i >= 0:
    print(s[i:i+2500])
else:
    print("interface not in research-content.ts")
    # look in research.ts / types
for f in ['src/data/research.ts','src/types/research.ts']:
    try:
        t=open(f).read()
        j=t.find('ResearchPageContent')
        if j>=0:
            print("FOUND in", f)
            print(t[max(0,j-200):j+2200])
            break
    except Exception as e:
        pass
