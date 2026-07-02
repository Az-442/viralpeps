# Supplier Onboarding SOP — ViralPeps

## Step 0: Ask First
NEVER add a supplier to vendors.json without explicit user instruction.

## Step 1: Browse Website
Collect: logo, product images, shipping info, payment methods, rating, company registration.

## Step 2: Check Existing Data
Use `node -e "..."` to check compounds.json for existing source entries.

## Step 3: Verify Every Product URL by Browsing (CRITICAL)
**Do NOT guess slug patterns.** For every single compound this supplier sells:
1. Browse the supplier's actual website (`browser_navigate`)
2. Navigate to each product page or the full product catalog
3. Extract the EXACT URL from the page (`browser_console` to get all product links)
4. Test each URL with `curl -sI -o /dev/null -w %{http_code} "URL"` — must return 200
5. Only then save the URL in compounds.json

Common mistakes to avoid:
- Guessing "bpc-157" when the real slug is "bpc-157-5mg-10mg" or "bpc-157-peptide-10mg"
- Assuming the URL pattern based on another supplier's site
- Adding a path segment that doesn't exist (e.g. `/product/` when the site uses `/buy-peptide/peptides/`)

## Step 4: Download Real Product Images
- Download from the supplier's actual website — no placeholders, no copies
- **VALIDATE EVERY FILE:** `file -b {file}.webp` — must NOT say "HTML document"
- Delete any HTML files masquerading as .webp

## Step 5: Add Logo
Download to `public/images/vendors/{slug}.png`.

## Step 6: Add to vendors.json
Use the exact same structure as existing entries.

## Step 7: Update vendor-stats.ts (ALL_VISIBLE_COUNTS)
Set the visible count. Must match actual profile listing count.

## Step 8: Build, Deploy & Verify URLs Live
`npm run build` → commit → push → verify live

**URL verification on deploy:**
```bash
curl -sL 'https://www.viralpeps.co.uk/vendors/{slug}' | python3 -c "
import sys, re
html = sys.stdin.read()
for m in re.finditer(r'href=\"(https://[^\"]+)\"[^>]*>View Deal', html):
    print(m.group(1))
"
```
Then test every "View Deal" URL to confirm they return 200.

## THE COUNTING RULE
Card count = Banner count = Profile listing count. ALL must match.

## Brit/New Wave Pattern (Proven Working)
- Real images from real websites
- **Every URL manually verified by browsing the supplier's site**
- File validation after every download
- Count from actual visible profile entries
