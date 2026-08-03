#!/usr/bin/env python3
import json
try:
    with open('src/data/compounds.json') as f:
        data = json.load(f)
    print(f'Valid JSON with {len(data)} top-level entries')
except json.JSONDecodeError as e:
    print(f'JSON Error: {e}')
