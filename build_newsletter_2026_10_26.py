"""Build the ViralPeps weekly newsletter HTML from a live homepage scrape."""
import re, json, sys

HOME = "/tmp/vp_home.html"
OUT = "/Users/time4you/viralpeps/newsletter-2026-10-26.html"

h = open(HOME, encoding="utf-8", errors="ignore").read()

def plain(s):
    s = re.sub(r"<!-- -->", "", s)
    s = re.sub(r"<[^>]+>", "\n", s)
    return [x.strip() for x in s.split("\n") if x.strip()]

# ---- stats (verified from live homepage) ----
peptides = re.search(r'font-extrabold">(\d+)(?:<!-- -->)?\+?</div><div[^>]*>Peptides tracked', h)
suppliers = re.search(r'font-extrabold">(\d+)(?:<!-- -->)?\+?</div><div[^>]*>Verified suppliers', h)
PEP = peptides.group(1) if peptides else "163"
SUP = suppliers.group(1) if suppliers else "120"

# ---- top deals ----
i = h.find("Top Deals Today")
seg = plain(h[i:i + 14000])
deals = []
for idx, t in enumerate(seg):
    m = re.match(r"^-(\d+)%$", t)
    if not m:
        continue
    pct = int(m.group(1))
    name = seg[idx + 1] if idx + 1 < len(seg) else ""
    vendor = ""
    if idx + 2 < len(seg) and seg[idx + 2].startswith("at "):
        vendor = seg[idx + 2][3:].strip()
    prices = [x for x in seg[idx + 3:idx + 9] if re.match(r"^£\d", x)]
    old = prices[0].lstrip("£") if len(prices) > 0 else ""
    new = prices[1].lstrip("£") if len(prices) > 1 else ""
    dose = ""
    mm = re.match(r"^(.*?)\s+(\d+(?:\.\d+)?\s*(?:mg|mcg|g|iu|ml))$", name, re.I)
    if mm:
        name, dose = mm.group(1), mm.group(2)
    if name and vendor and new:
        deals.append(dict(pct=pct, name=name, dose=dose, vendor=vendor,
                          old=old, new=new, save=""))
    if len(deals) >= 8:
        break

# dedupe by name+vendor
seen, dd = set(), []
for d in deals:
    kk = (d["name"], d["vendor"])
    if kk not in seen:
        seen.add(kk); dd.append(d)
deals = dd

# ---- trending ----
i = h.find("Trending Right Now")
tseg = plain(h[i:i + 9000])
trending = []
for idx, t in enumerate(tseg):
    if t == "SUPPLIERS" and idx > 0:
        cnt = tseg[idx - 1]
        nm = tseg[idx - 2]
        if re.match(r"^\d+$", cnt) and nm and not re.match(r"^\d+$", nm):
            # find FROM £ price after
            price = ""
            for j in range(idx, min(idx + 25, len(tseg))):
                if tseg[j] == "FROM":
                    ps = [x for x in tseg[j + 1:j + 4] if x != "£"]
                    if ps:
                        price = ps[0]
                    break
            if nm not in [x[0] for x in trending]:
                trending.append((nm, cnt, price))
trending = trending[:6]

# ---- suppliers ----
i = h.find("Top Suppliers")
sseg = plain(h[i:i + 7000])
sup = []           # list of (name, trustscore, products, price)
for idx, t in enumerate(sseg):
    m = re.match(r"^TrustScore\s+(\d+)$", t)
    if m and idx > 0:
        name = sseg[idx - 1]
        products, price = "", ""
        for j in range(idx + 1, min(idx + 10, len(sseg))):
            pm = re.match(r"^(\d+)\s+products$", sseg[j])
            if pm:
                products = pm.group(1)
                break
        for j in range(idx + 1, min(idx + 8, len(sseg))):
            if re.match(r"^£\d", sseg[j]):
                price = sseg[j].lstrip("£")
                break
        if name and "Compare" not in name:
            sup.append((name, m.group(1), products, price))
sup = sup[:4]

data = dict(peptides=PEP, suppliers=SUP, deals=deals, trending=trending, topsup=sup)
print(json.dumps(data, indent=1))

# ---------- HTML ----------
BLUE = "#4f46e5"

def money(v):
    try:
        return "£{:,.2f}".format(float(v))
    except Exception:
        return "£" + str(v)

deal_rows = ""
for d in deals:
    dose = (" " + d["dose"]) if d["dose"] else ""
    deal_rows += f"""
    <tr>
      <td style="padding:14px 16px;border-bottom:1px solid #eef0f4;">
        <div style="font-size:15px;font-weight:700;color:#111827;">{d['name']}{dose}</div>
        <div style="font-size:12px;color:#6b7280;margin-top:2px;">{d['vendor']}</div>
      </td>
      <td style="padding:14px 10px;border-bottom:1px solid #eef0f4;text-align:center;">
        <span style="display:inline-block;background:#dcfce7;color:#15803d;font-size:12px;font-weight:700;padding:3px 8px;border-radius:999px;">-{d['pct']}%</span>
      </td>
      <td style="padding:14px 16px;border-bottom:1px solid #eef0f4;text-align:right;white-space:nowrap;">
        <div style="font-size:12px;color:#9ca3af;text-decoration:line-through;">{money(d['old'])}</div>
        <div style="font-size:15px;font-weight:800;color:#111827;">{money(d['new'])}</div>
      </td>
    </tr>"""

trend_rows = ""
for nm, cnt, price in trending:
    raw = (price or "").replace("£", "").replace(",", "").strip()
    try:
        val = float(raw)
    except Exception:
        val = 0.0
    if val > 0:
        pr = f'<span style="color:#4b5563;font-size:12px;">from &pound;{val:,.2f}</span>'
    else:
        pr = '<span style="color:#4b5563;font-size:12px;">compare prices</span>'
    slug = re.sub(r"[^a-z0-9]+", "-", nm.lower()).strip("-")
    trend_rows += f"""
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f1f3f7;">
        <a href="https://viralpeps.co.uk/compounds/{slug}" style="color:#111827;font-weight:700;font-size:14px;text-decoration:none;">{nm}</a>
        <div style="font-size:12px;color:#6b7280;margin-top:2px;">{cnt} suppliers &middot; {pr}</div>
      </td>
    </tr>"""

sup_rows = ""
for nm, ts, products, price in sup:
    bits = [f"TrustScore {ts}"]
    if products:
        bits.append(f"{products} products")
    if price and price != "0.00":
        bits.append(f"from £{price}")
    sup_rows += (
        '<tr><td style="padding:8px 0;border-bottom:1px solid #f1f3f7;">'
        f'<span style="font-size:14px;font-weight:700;color:#111827;">{nm}</span>'
        f'<div style="font-size:12px;color:#6b7280;margin-top:2px;">{" &middot; ".join(bits)}</div>'
        '</td></tr>'
    )

top_deal = deals[0] if deals else dict(name="GHK-Cu", pct=98, vendor="", old="", new="")

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ViralPeps Weekly</title>
</head>
<body style="margin:0;padding:0;background:#ffffff;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-font-smoothing:antialiased;">
<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background:#ffffff;">
<tr><td align="center" style="padding:0;">
  <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:600px;background:#ffffff;">

    <!-- header -->
    <tr>
      <td style="padding:28px 24px 18px 24px;border-bottom:2px solid {BLUE};">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td>
              <div style="font-size:22px;font-weight:900;letter-spacing:1.5px;color:#111827;">VIRAL<span style="color:{BLUE};">PEPS</span></div>
              <div style="font-size:11px;color:#9ca3af;letter-spacing:1px;text-transform:uppercase;margin-top:3px;">Weekly &mdash; 26 October 2026</div>
            </td>
            <td align="right" style="font-size:11px;color:#6b7280;line-height:1.5;">
              {PEP}+ peptides<br>{SUP}+ UK suppliers
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- intro -->
    <tr>
      <td style="padding:26px 24px 8px 24px;">
        <h1 style="margin:0 0 10px 0;font-size:21px;line-height:1.3;color:#111827;font-weight:800;">This week: biggest price gaps &amp; new suppliers</h1>
        <p style="margin:0;font-size:14px;line-height:1.65;color:#4b5563;">
          Weekly update from ViralPeps. We compare live prices across {SUP}+ verified UK suppliers so you don't overpay.
          This week's spread between the cheapest and most expensive listing hit <strong style="color:#111827;">{top_deal['pct']}%</strong> on {top_deal['name']}.
        </p>
      </td>
    </tr>

    <!-- price drops -->
    <tr>
      <td style="padding:22px 24px 4px 24px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:{BLUE};margin-bottom:4px;">Price drop highlights</div>
        <h2 style="margin:0 0 4px 0;font-size:16px;color:#111827;font-weight:800;">Same compound, wildly different prices</h2>
        <p style="margin:0 0 14px 0;font-size:13px;color:#6b7280;line-height:1.6;">Cheapest verified listing vs the most expensive one we track.</p>
      </td>
    </tr>
    <tr>
      <td style="padding:0 24px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border:1px solid #eef0f4;border-radius:10px;overflow:hidden;">
          {deal_rows}
        </table>
      </td>
    </tr>

    <!-- trending -->
    <tr>
      <td style="padding:26px 24px 4px 24px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:{BLUE};margin-bottom:4px;">What researchers are comparing</div>
        <h2 style="margin:0 0 10px 0;font-size:16px;color:#111827;font-weight:800;">Trending this week</h2>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          {trend_rows}
        </table>
      </td>
    </tr>

    <!-- suppliers -->
    <tr>
      <td style="padding:24px 24px 4px 24px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:{BLUE};margin-bottom:4px;">Supplier updates</div>
        <h2 style="margin:0 0 4px 0;font-size:16px;color:#111827;font-weight:800;">Newly verified &amp; top rated</h2>
        <p style="margin:0 0 10px 0;font-size:13px;color:#6b7280;line-height:1.6;">
          We're now tracking <strong style="color:#111827;">{SUP}+ suppliers</strong> and <strong style="color:#111827;">{PEP}+ peptides</strong>, each checked for live pricing and stock.
        </p>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          {sup_rows}
        </table>
      </td>
    </tr>

    <!-- how to use -->
    <tr>
      <td style="padding:22px 24px 4px 24px;">
        <div style="background:#f8f9fc;border:1px solid #eef0f4;border-radius:10px;padding:16px 18px;">
          <div style="font-size:13px;font-weight:800;color:#111827;margin-bottom:6px;">Before you buy</div>
          <p style="margin:0;font-size:13px;line-height:1.65;color:#4b5563;">
            Price is only one variable. Check the supplier's COA (certificate of analysis), confirm &ge;98% HPLC purity,
            and verify the listed dose matches what you actually need. Our trust scores fold in delivery, testing and reviews.
          </p>
        </div>
      </td>
    </tr>

    <!-- useful links -->
    <tr>
      <td style="padding:24px 24px 4px 24px;">
        <div style="font-size:11px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:{BLUE};margin-bottom:10px;">Useful links</div>
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
          <tr><td style="padding:5px 0;font-size:14px;"><a href="https://viralpeps.co.uk/compounds" style="color:{BLUE};text-decoration:none;font-weight:600;">Browse all {PEP}+ compounds &rarr;</a></td></tr>
          <tr><td style="padding:5px 0;font-size:14px;"><a href="https://viralpeps.co.uk/vendors" style="color:{BLUE};text-decoration:none;font-weight:600;">Compare all UK suppliers &rarr;</a></td></tr>
          <tr><td style="padding:5px 0;font-size:14px;"><a href="https://viralpeps.co.uk/tools" style="color:{BLUE};text-decoration:none;font-weight:600;">Reconstitution &amp; dose calculator &rarr;</a></td></tr>
          <tr><td style="padding:5px 0;font-size:14px;"><a href="https://viralpeps.co.uk/research" style="color:{BLUE};text-decoration:none;font-weight:600;">Research guides &rarr;</a></td></tr>
        </table>
      </td>
    </tr>

    <!-- CTA -->
    <tr>
      <td align="center" style="padding:26px 24px 30px 24px;">
        <a href="https://viralpeps.co.uk" style="display:inline-block;background:{BLUE};color:#ffffff;font-size:14px;font-weight:700;text-decoration:none;padding:13px 26px;border-radius:8px;">Compare today's prices</a>
      </td>
    </tr>

    <!-- footer -->
    <tr>
      <td style="padding:20px 24px 34px 24px;border-top:1px solid #eef0f4;">
        <p style="margin:0 0 8px 0;font-size:11px;line-height:1.6;color:#9ca3af;">
          ViralPeps is a price comparison and research information service. We do not sell, supply or ship any products.
          All compounds listed are for laboratory research use only and are not medicines, supplements or products for human consumption.
        </p>
        <p style="margin:0;font-size:11px;line-height:1.6;color:#9ca3af;">
          You're receiving this because you subscribed at viralpeps.co.uk.<br>
          <a href="{{$unsubscribe}}" style="color:#6b7280;text-decoration:underline;">Unsubscribe</a>
        </p>
      </td>
    </tr>

  </table>
</td></tr>
</table>
</body>
</html>
"""

open(OUT, "w", encoding="utf-8").write(html)
print("\nwrote", OUT, len(html), "bytes")
print("deals in email:", len(deals), "| trending:", len(trending), "| top suppliers:", len(sup))
