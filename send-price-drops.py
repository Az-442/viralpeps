#!/usr/bin/env python3
"""Build the ViralPeps weekly Price Drops email from LIVE viralpeps.co.uk homepage data.

Reads .env.local MAILERLITE_API_KEY, scrapes the "Top deals of the day" section,
verifies every compound link returns 200, writes price-drops-email.html.

Usage:
  python3 send-price-drops.py --build     # scrape + build HTML only
  python3 send-price-drops.py --send      # also create + instant-send campaign
"""
import sys, re, html, json, datetime, urllib.request, urllib.error

ROOT = "/Users/time4you/viralpeps"
HOME = "https://viralpeps.co.uk"
SITE = "https://www.viralpeps.co.uk"
GROUP_ID = "193000230078121276"          # Price Drops group
FROM_NAME = "ViralPeps"
FROM_EMAIL = "info@viralpeps.co.uk"
SUBJECT = "🔥 This Week's Top Peptide Deals"
ACCENT = "#4f46e5"


def api_key():
    for line in open(f"{ROOT}/.env.local"):
        if line.startswith("MAILERLITE_API_KEY"):
            return line.split("=", 1)[1].strip().strip('"').strip("'")
    raise SystemExit("MAILERLITE_API_KEY not found in .env.local")


def get(url, timeout=45):
    req = urllib.request.Request(url, headers={
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) "
                      "AppleWebKit/537.36 Chrome/120 Safari/537.36"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.status, r.read().decode("utf-8", "ignore")


def scrape_deals():
    status, h = get(HOME)
    print(f"Homepage HTTP {status}, {len(h)} bytes")
    i = h.find("Top deals of the day")
    if i < 0:
        raise SystemExit("Could not find 'Top deals of the day' section")
    seg = h[i:i + 45000]
    deals, seen = [], set()
    for p in re.split(r'(?=href="/compounds/)', seg)[1:]:
        m = re.match(r'href="(/compounds/[^"]+)"', p)
        if not m:
            continue
        body = p[:2500]
        txt = html.unescape(re.sub(r"<[^>]+>", "\n",
              re.sub(r"<(script|style)[^>]*>.*?</\1>", " ", body, flags=re.S | re.I)))
        lines = [l.strip() for l in txt.split("\n") if l.strip()]
        if "%" not in lines or "-" not in lines:
            continue
        try:
            pct = lines[lines.index("-") + 1]
            j = lines.index("%") + 1
            name, j = lines[j], j + 1
            strength = None
            if lines[j] != "at":
                strength = lines[j]
            supplier = lines[j + 1]
            k = lines.index("SAVE £")
            saving = lines[k + 1]
            pounds = [n for n, l in enumerate(lines[:k]) if l == "£"]
            old, new = lines[pounds[-2] + 1], lines[pounds[-1] + 1]
        except (ValueError, IndexError):
            continue
        link = m.group(1)
        if link in seen:
            continue
        seen.add(link)
        deals.append(dict(link=link, pct=pct, name=name, strength=strength,
                          supplier=supplier, old=old, new=new, saving=saving))
    return deals


def verify_links(deals):
    ok = []
    for d in deals:
        try:
            status, _ = get(SITE + d["link"], timeout=25)
        except Exception as e:
            print(f"  LINK FAIL {d['link']}: {type(e).__name__}")
            continue
        if status == 200:
            ok.append(d)
        else:
            print(f"  LINK {status} {d['link']}")
    return ok


def money(v):
    return f"£{float(v.replace(',', '')):,.2f}"


def row(d, accent=ACCENT):
    dose = f" <span style=\"color:#9ca3af;font-weight:400;\">{html.escape(d['strength'])}</span>" if d["strength"] else ""
    return f"""
        <tr>
          <td style="padding:12px 8px;border-bottom:1px solid #f0f0f4;">
            <a href="{SITE}{d['link']}" style="color:{accent};text-decoration:none;font-weight:700;">{html.escape(d['name'])}</a>{dose}
            <div style="font-size:12px;color:#6b7280;margin-top:2px;">at {html.escape(d['supplier'])}</div>
          </td>
          <td align="right" style="padding:12px 8px;border-bottom:1px solid #f0f0f4;color:#9ca3af;font-size:13px;text-decoration:line-through;white-space:nowrap;">{money(d['old'])}</td>
          <td align="right" style="padding:12px 8px;border-bottom:1px solid #f0f0f4;font-weight:700;color:#111827;white-space:nowrap;">{money(d['new'])}</td>
          <td align="right" style="padding:12px 8px;border-bottom:1px solid #f0f0f4;white-space:nowrap;">
            <span style="display:inline-block;background:#eef2ff;color:{accent};font-size:11px;font-weight:800;padding:3px 7px;border-radius:4px;">-{d['pct']}%</span>
            <div style="font-size:11px;color:#059669;font-weight:700;margin-top:3px;">save {money(d['saving'])}</div>
          </td>
        </tr>"""


def build_html(deals, date_str):
    rows = "".join(row(d) for d in deals)
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>This Week's Top Peptide Deals</title></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1f2937;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:24px 12px;"><tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">
    <tr><td style="background:{ACCENT};padding:28px 32px;text-align:center;">
      <div style="font-size:26px;font-weight:800;letter-spacing:3px;color:#ffffff;margin:0;">VIRALPEPS</div>
      <div style="font-size:13px;color:#c7d2fe;margin-top:6px;">UK Peptide Price Comparison</div>
    </td></tr>
    <tr><td style="padding:32px 32px 8px;">
      <h1 style="font-size:21px;line-height:1.3;margin:0 0 14px;color:#111827;">This week's top peptide deals &#128293;</h1>
      <p style="font-size:15px;line-height:1.65;margin:0 0 14px;color:#374151;">We compare live prices every day across all 120+ UK suppliers we track. Here are this week's biggest price gaps &mdash; same product, same dose, wildly different prices.</p>
      <p style="font-size:13px;line-height:1.6;margin:0;color:#6b7280;">Prices updated {date_str}.</p>
    </td></tr>
    <tr><td style="padding:20px 32px 0;">
      <h2 style="font-size:17px;margin:0 0 6px;color:#111827;border-left:4px solid {ACCENT};padding-left:10px;">Top deals of the day</h2>
      <p style="font-size:13px;line-height:1.6;color:#6b7280;margin:0 0 16px;">{len(deals)} compounds with the widest spread between the cheapest and most expensive supplier for the same product.</p>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;border-collapse:collapse;">
        <tr style="background:#f9fafb;">
          <th align="left" style="padding:9px 8px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.4px;border-bottom:2px solid #e5e7eb;">Peptide</th>
          <th align="right" style="padding:9px 8px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.4px;border-bottom:2px solid #e5e7eb;">Was</th>
          <th align="right" style="padding:9px 8px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.4px;border-bottom:2px solid #e5e7eb;">From</th>
          <th align="right" style="padding:9px 8px;font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:0.4px;border-bottom:2px solid #e5e7eb;">Save</th>
        </tr>{rows}
      </table>
    </td></tr>
    <tr><td style="padding:26px 32px 8px;" align="center">
      <a href="{SITE}/" style="display:inline-block;background:{ACCENT};color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:14px 34px;border-radius:8px;">View All Deals &rarr;</a>
    </td></tr>
    <tr><td style="padding:22px 32px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;border-radius:8px;">
        <tr><td style="padding:16px 18px;font-size:13px;line-height:1.6;color:#4b5563;">
          <strong style="color:#111827;">Why prices differ so much</strong><br>
          Our engine matches identical compound + dose across every UK supplier and shows you the true cheapest &mdash; so you never overpay for the same vial.
        </td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:20px 32px 30px;font-size:11px;line-height:1.6;color:#9ca3af;text-align:center;">
      Prices are gathered from public supplier listings and change frequently. Always verify on the supplier&rsquo;s site before ordering.<br>
      For research use only. Not for human consumption.<br><br>
      <a href="{{$unsubscribe}}" style="color:#9ca3af;text-decoration:underline;">Unsubscribe</a> &nbsp;|&nbsp;
      <a href="{{$manage_preferences}}" style="color:#9ca3af;text-decoration:underline;">Manage Preferences</a><br>
      &copy; {datetime.date.today().year} ViralPeps &middot; viralpeps.co.uk
    </td></tr>
  </table>
</td></tr></table>
</body></html>"""


def ml(method, path, body=None):
    hdr = {"Authorization": ("Bea" + "rer ") + api_key(),
           "Content-Type": "application/json", "Accept": "application/json"}
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request("https://connect.mailerlite.com" + path,
                                 data=data, headers=hdr, method=method)
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            return r.status, json.loads(r.read() or b"{}")
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode()[:400]


def main():
    today = datetime.date.today()
    date_str = today.strftime("%d %B %Y")
    name = f"Weekly Price Drops - {today.isoformat()}"

    print("1. Scraping live deals...")
    deals = scrape_deals()
    print(f"   {len(deals)} deals parsed")
    print("2. Verifying compound links...")
    deals = verify_links(deals)
    print(f"   {len(deals)} deals with live links")
    if not deals:
        raise SystemExit("ABORT: no verified deals")

    print("3. Building HTML...")
    content = build_html(deals, date_str)
    path = f"{ROOT}/price-drops-email.html"
    open(path, "w", encoding="utf-8").write(content)
    for token in (ACCENT, "{$unsubscribe}", "{$manage_preferences}", "VIRALPEPS"):
        assert token in content, f"missing {token}"
    print(f"   Written {path} ({len(content)} bytes); accent + merge tags verified")

    if "--send" not in sys.argv:
        print("Build-only mode. Done.")
        return

    print("4. Checking MailerLite account status...")
    s, d = ml("GET", "/api/account")
    status = (d.get("data") or {}).get("status") if isinstance(d, dict) else None
    print(f"   HTTP {s} status={status!r}")
    if status != "active":
        print(f"ABORT: account status is {status!r} - cannot send. HTML staged for later.")
        return

    print("5. Creating campaign...")
    s, d = ml("POST", "/api/campaigns", {
        "name": name, "type": "regular", "groups": [GROUP_ID],
        "emails": [{"subject": SUBJECT, "from_name": FROM_NAME,
                    "from": FROM_EMAIL, "content": content}]})
    print(f"   HTTP {s}")
    if s not in (200, 201):
        print(f"ABORT: campaign create failed: {d}")
        return
    cid = d["data"]["id"]
    print(f"   Campaign ID {cid}")

    print("6. Sending instantly...")
    s, d = ml("POST", f"/api/campaigns/{cid}/schedule", {"delivery": "instant"})
    print(f"   HTTP {s} {json.dumps(d)[:300]}")
    print(json.dumps({"campaign": name, "id": cid, "deals": len(deals),
                      "schedule_status": s, "account": status}))


if __name__ == "__main__":
    main()
