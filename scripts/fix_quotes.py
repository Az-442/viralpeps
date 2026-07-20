"""Fix single-quoted strings containing apostrophes in research-content.ts."""
import re

with open("src/data/research-content.ts") as f:
    content = f.read()

lines = content.split("\n")
fixes = 0
for i, line in enumerate(lines):
    stripped = line.strip()

    # Only process lines that start with body: or answer:
    if not (stripped.startswith("body: ") or stripped.startswith("answer: ")):
        continue

    # Check if it's wrapped in single quotes
    m = re.match(r"(body|answer):\s*'(.*)'\s*$", stripped)
    if not m:
        continue

    inner = m.group(2)
    if "'" in inner:
        # Contains apostrophe inside single-quoted string -> problem
        # Escape double quotes inside and switch to double-quoted
        inner_escaped = inner.replace('"', '\\"')
        new_val = '"' + inner_escaped + '"'
        new_stripped = f"{m.group(1)}: {new_val}"
        lines[i] = line.replace(stripped, new_stripped)
        fixes += 1
        print(f"Line {i+1}: Fixed '{m.group(1)}' containing apostrophe")

# Also fix references arrays where items are single-quoted with nested double quotes
# Reference strings that contain double quotes inside are fine IF they have no apostrophes
# But we should check none have both

content = "\n".join(lines)
with open("src/data/research-content.ts", "w") as f:
    f.write(content)
print(f"Done. Fixed {fixes} lines.")
