#!/usr/bin/env python3
"""Fix the closing brace issue and properly structure the file."""

FILE = "src/data/compound-tabs.tsx"

with open(FILE, 'r') as f:
    content = f.read()

# The batch2 script added entries AFTER the closing }; which broke the structure
# We need to find and fix the pattern.
# Currently we have:
#   },
# };
#
# (batch entries that are now outside the object)
#
# We need to MOVE these entries INSIDE the object (before the closing };)

# First, find the correct closing };
# The file should end with compoundTabs object closed by };
# followed by export default compoundTabs;

# Let's find where the object properly closes
# The actual structure should be:
#   ...references...],
#   },
# };

# Find the first }; that's followed by export default
idx_export = content.find('export default compoundTabs;')
idx_closing = content.rfind('};', 0, idx_export)

print(f"Found export default at index {idx_export}")
print(f"Found closing }}; at index {idx_closing}")
print(f"Chars after closing: {repr(content[idx_closing:idx_closing+50])}")

# Check what's between the closing }; and export default
between = content[idx_closing+2:idx_export]
print(f"Between }}; and export: {repr(between[:200])}")
