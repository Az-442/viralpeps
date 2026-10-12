import re, os, subprocess, sys

ROOT = '/Users/time4you/viralpeps'
parts = ['/tmp/kw22_a.ts', '/tmp/kw22_b.ts', '/tmp/kw22_c.ts']

# extract interfaces
src = open(os.path.join(ROOT, 'src/data/research-content.ts')).read()
i = src.find('export interface ResearchPageContent')
j = src.find('const content: Record<string, ResearchPageContent>')
iface = src[i:j]

body = "\n".join(open(p).read() for p in parts)
mod = iface + "\n\nconst x: Record<string, ResearchPageContent> = {\n" + body + "\n};\nexport default x;\n"
tmp = os.path.join(ROOT, 'tmp', '_kw22_typecheck.ts')
open(tmp, 'w').write(mod)
r = subprocess.run([os.path.join(ROOT, 'node_modules/.bin/tsc'), '--noEmit', '--strict',
                    '--target', 'es2020', '--moduleResolution', 'node',
                    '--skipLibCheck', tmp], capture_output=True, text=True, cwd=ROOT)
print("EXIT", r.returncode)
print(r.stdout[-4000:])
print(r.stderr[-2000:])
