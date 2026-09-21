#!/usr/bin/env python3
import re
raw = open('/tmp/spxlab_home.html', encoding='utf-8', errors='ignore').read()
# find custom-logo context
i = raw.find('class="custom-logo"')
print(raw[max(0,i-400):i+200])
