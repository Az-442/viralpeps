// Builds the ViralPeps Weekly Price Drops HTML from the fresh scrape snapshot.
// Does NOT send. Writes /tmp/vp-price-drops-21sep.html for review/staging.
import fs from 'fs';

const snap = JSON.parse(fs.readFileSync('scripts/price-drops-latest.json', 'utf8'));
const deals = snap.deals;

function row(d) {
  const dose = d.dosage ? ' ' + d.dosage : '';
  const url = 'https://viralpeps.co.uk/compounds/' + d.slug;
  return `
  <tr>
    <td style="padding:14px 12px;border-bottom:1px solid #eef2f7;">
      <a href="${url}" style="color:#1f2937;font-weight:600;font-size:15px;text-decoration:none;">${d.compound}${dose}</a>
      <div style="color:#6b7280;font-size:12px;margin-top:3px;">at ${d.supplier}</div>
    </td>
    <td style="padding:14px 12px;border-bottom:1px solid #eef2f7;text-align:right;white-space:nowrap;">
      <span style="color:#9ca3af;text-decoration:line-through;font-size:13px;">${d.original}</span><br>
      <span style="color:#111827;font-weight:700;font-size:16px;">${d.current}</span>
    </td>
    <td style="padding:14px 12px;border-bottom:1px solid #eef2f7;text-align:right;white-space:nowrap;">
      <span style="display:inline-block;background:#eef2ff;color:#4f46e5;font-weight:700;font-size:12px;padding:4px 9px;border-radius:999px;">−${d.pct}</span>
      <div style="color:#059669;font-size:12px;font-weight:600;margin-top:4px;">SAVE ${d.save}</div>
    </td>
  </tr>`;
}

const html = `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>This Week's Top Peptide Deals</title></head>
<body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f5f7;">
<tr><td align="center" style="padding:24px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.08);">

    <tr><td style="background:linear-gradient(135deg,#4f46e5,#6366f1);padding:30px 24px;text-align:center;">
      <div style="color:#ffffff;font-size:26px;font-weight:800;letter-spacing:2px;">VIRALPEPS</div>
      <div style="color:#c7d2fe;font-size:13px;margin-top:6px;letter-spacing:.5px;">UK Peptide Price Comparison</div>
    </td></tr>

    <tr><td style="padding:28px 24px 8px;">
      <h1 style="margin:0;color:#111827;font-size:21px;line-height:1.35;">🔥 This Week's Top Peptide Deals</h1>
      <p style="margin:10px 0 0;color:#4b5563;font-size:14px;line-height:1.6;">
        We track live prices across ${deals.length}+ suppliers every day so you don't have to.
        Here are the biggest savings on the site right now.
      </p>
    </td></tr>

    <tr><td style="padding:8px 24px 0;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
        <tr>
          <td style="color:#9ca3af;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;padding:12px;">Compound</td>
          <td style="color:#9ca3af;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;padding:12px;text-align:right;">Price</td>
          <td style="color:#9ca3af;font-size:11px;font-weight:700;letter-spacing:.6px;text-transform:uppercase;padding:12px;text-align:right;">Saving</td>
        </tr>
        ${deals.map(row).join('\n')}
      </table>
    </td></tr>

    <tr><td align="center" style="padding:28px 24px 8px;">
      <a href="https://viralpeps.co.uk" style="display:inline-block;background:#4f46e5;color:#ffffff;font-weight:700;font-size:15px;text-decoration:none;padding:14px 32px;border-radius:8px;">View All Deals &rarr;</a>
    </td></tr>

    <tr><td style="padding:16px 24px 24px;">
      <p style="margin:0;color:#6b7280;font-size:12px;line-height:1.6;text-align:center;">
        Savings compare the cheapest vs. most expensive verified UK supplier for the same product.
        ViralPeps compares prices &mdash; we do not sell or supply products.
      </p>
    </td></tr>

    <tr><td style="background:#f9fafb;padding:20px 24px;border-top:1px solid #eef2f7;">
      <p style="margin:0;color:#9ca3af;font-size:11px;line-height:1.6;text-align:center;">
        You're receiving this because you subscribed to Price Drops at viralpeps.co.uk.<br>
        <a href="{$unsubscribe}" style="color:#4f46e5;text-decoration:underline;">Unsubscribe</a>
      </p>
    </td></tr>

  </table>
</td></tr></table>
</body></html>`;

fs.writeFileSync('/tmp/vp-price-drops-21sep.html', html);
console.log('WROTE /tmp/vp-price-drops-21sep.html');
console.log('deals:', deals.length);
console.log('unsubscribe tag present:', html.includes('{$unsubscribe}'));
console.log('bytes:', Buffer.byteLength(html));
console.log('links:', (html.match(/compounds\//g) || []).length);
