#!/usr/bin/env python3
import json, subprocess
# Load HEAD vendors and current vendors
head = json.loads(subprocess.run(['git','show','HEAD:src/data/vendors.json'],capture_output=True,text=True).stdout)
cur  = json.load(open('src/data/vendors.json'))
hm={x['slug']:x for x in head}
out=[]
for x in cur:
    sl=x['slug']
    if sl not in hm:
        out.append((sl,'NEW-ENTRY')); continue
    old=hm[sl]
    # compare all fields except _autoChecks
    for k in old:
        if k=='_autoChecks': continue
        if k in x and old[k]!=x[k]:
            out.append((sl,f'field {k} changed: {old[k]!r} -> {x[k]!r}'))
    # _autoChecks differences summary
    oa=old.get('_autoChecks',{}); ca=x.get('_autoChecks',{})
    if oa!=ca:
        # signal changes only
        sigs=['coa','ruo','reviews','shipping','contact','live']
        chg=[s for s in sigs if oa.get(s)!=ca.get(s)]
        if chg:
            out.append((sl,'_autoChecks signal change: '+str({s:(oa.get(s),ca.get(s)) for s in chg})))
print("Non-spx-labs changes count:", len(out))
for sl,msg in out[:40]:
    print(" ", sl, "=>", msg)
