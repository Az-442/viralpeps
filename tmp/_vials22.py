import os
for v in ['kpv-vial.png','aod-9604-vial.png','mots-c-vial.png']:
    p = 'public/images/compounds/' + v
    print(p, os.path.exists(p), os.path.getsize(p) if os.path.exists(p) else '')
