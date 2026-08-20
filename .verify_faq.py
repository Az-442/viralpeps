import json, re
path='src/data/compounds.json'
data=open(path,'rb').read().decode('utf-8')
lines=data.split('\n')

def runs_in_line(ln):
    a=ln.find('<a href')
    if a==-1: return None
    seg=ln[a:ln.find('>',a)+1]
    rr=[]; c=0
    for ch in seg:
        if ch=='\\':
            c+=1
        else:
            if c: rr.append(c)
            c=0
    if c: rr.append(c)
    return rr

bad=[]
for n,ln in enumerate(lines,1):
    if '<a href' in ln:
        rr=runs_in_line(ln)
        if rr and max(rr)>1:
            bad.append((n,rr))
print('Lines with over-escaped links (max run >1):', bad)

j=json.loads(data)
for slug in ['pinealon','dihexa','cerebrolysin','survodutide','mazdutide']:
    for c in j:
        if c.get('slug')==slug:
            faq=c.get('faq',[])
            linked=[q for q in faq if '<a href=' in q['answer']]
            print("{}: {} questions, {} with internal links".format(slug, len(faq), len(linked)))
            for q in linked:
                hs=re.findall(r'/research/[a-z0-9-]+|/compounds/[a-z0-9-]+', q['answer'])
                print("    Q: {}  links: {}".format(q['question'][:50], hs))
