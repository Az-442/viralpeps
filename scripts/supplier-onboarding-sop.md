# Supplier Onboarding SOP — ViralPeps

## Step 0: Ask First
NEVER add a supplier to vendors.json without explicit user instruction.

## Step 1: Browse Website
Collect: logo, product images, shipping info, payment methods, rating, company registration.

## Step 2: Check Existing Data
Use `node -e "..."` to check compounds.json for existing source entries.

## Step 3: Download Real Product Images
- Download from the supplier's actual website — no placeholders, no copies
- Name files to match compound slugs
- **VALIDATE EVERY FILE:** `file -b {file}.webp` — must NOT say "HTML document"
- Delete any HTML files masquerading as .webp

## Step 4: Add Logo
Download to `public/images/vendors/{slug}.png`.

## Step 5: Add to vendors.json
Use the exact same structure as existing entries.

## Step 6: Update vendor-stats.ts (ALL_VISIBLE_COUNTS)
Set the visible count. Must match actual profile listing count.

## Step 7: Build & Deploy
`npm run build` → commit → push → verify live

## THE COUNTING RULE
Card count = Banner count = Profile listing count. ALL must match. Use getVisibleCount().

## Brit/New Wave Pattern (Proven Working)
- Real images from real websites
- File validation after every download
- Count from actual visible profile entries
- User confirmed: "Uploaded perfectly"
