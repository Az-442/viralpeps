#!/usr/bin/env python3
"""Fix the sources array formatting that my script broke."""
import re

with open('src/data/compounds.json', 'r') as f:
    data = f.read()

# The pattern is: a source entry ending with "}\n  ]" instead of "}\n    ]"
# We need to find all closing "}\n  ]" that appear before "\"longDescription\""
# and fix the indentation

# Use regex to find and fix the bad patterns
# Pattern: closing brace at wrong indent, then array close, then longDescription
# Replace "  }\\n  ]\\n    \"longDescription\"" with "    }\\n  ],\\n    \"longDescription\""

# The issue is our add_sources.py added entries with wrong indentation
# Let me find all "}\n  ]\n    \"longDescription\"" patterns
pattern = r'(      "image": ".*?"\n)(      "dosage": ".*?"\n)?(  }\n)(  \]\n)(    "longDescription")'

# Alternative approach - simpler
# Find "}\n  ]\n    \"longDescription\"" and replace with "}\n  ],\n    \"longDescription\""
data = data.replace('}\n  ]\n    "longDescription"', '}\n  ],\n    "longDescription"')
# Also fix "}\n  ]\n    "faq""
data = data.replace('}\n  ]\n    "faq"', '}\n  ],\n    "faq"')

with open('src/data/compounds.json', 'w') as f:
    f.write(data)

print("Fixed formatting")

# Validate
import json
try:
    with open('src/data/compounds.json') as f:
        parsed = json.load(f)
    print(f'Valid JSON! {len(parsed)} entries')
except json.JSONDecodeError as e:
    print(f'Still broken: {e}')
