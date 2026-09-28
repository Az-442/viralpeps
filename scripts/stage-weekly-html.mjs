// Render the ViralPeps Weekly newsletter HTML to a file without any API calls.
// Used to stage the email while the MailerLite account is terminated.
// Run from repo root: node scripts/stage-weekly-html.mjs
import fs from 'fs';

const data = JSON.parse(fs.readFileSync('scripts/weekly-newsletter-latest.json', 'utf8'));
const deals = data.deals, trending = data.trending, newSuppliers = data.new_suppliers;

const dateStr = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
const isoDate = new Date().toISOString().slice(0, 10);
const colors = ['#fef2f2', '#fff7ed', '#fefce8', '#f0fdf4', '#eff6ff', '#faf5ff', '#fdf2f8', '#f0fdfa'];

let dealsHtml = '';
deals.forEach((d, i) => {
  const slug = d.slug || d.compound.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  dealsHtml += `
        <tr style="background: ${colors[i % colors.length]};">
          <td style="padding: 14px 16px; border-bottom: 1px solid #f3f4f6;">
            <a href="https://viralpeps.co.uk/compounds/${slug}" style="color: #1f2937; text-decoration: none; font-weight: 600; font-size: 14px;">
              ${d.compound}${d.dosage ? ' <span style="color: #6b7280; font-weight: 400; font-size: 12px;">' + d.dosage + '</span>' : ''}
            </a>
            <div style="color: #9ca3af; font-size: 11px; margin-top: 2px;">${d.supplier}</div>
          </td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #f3f4f6; text-align: center;">
            <span style="color: #9ca3af; font-size: 12px; text-decoration: line-through;">${d.original}</span>
          </td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #f3f4f6; text-align: center;">
            <span style="color: #059669; font-weight: 700; font-size: 16px;">${d.current}</span>
          </td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #f3f4f6; text-align: center;">
            <span style="display: inline-block; background: #dcfce7; color: #166534; font-weight: 700; font-size: 12px; padding: 3px 8px; border-radius: 9999px;">SAVE ${d.pct}</span>
          </td>
        </tr>`;
});

let newHtml = '';
newSuppliers.forEach((s, i) => {
  newHtml += `
        <tr>
          <td style="padding: 14px 16px; border-bottom: 1px solid #f3f4f6;">
            <div style="color: #1f2937; font-weight: 700; font-size: 15px;">${i + 1}. ${s.name}</div>
            <div style="color: #6b7280; font-size: 13px; margin-top: 3px; line-height: 1.5;">${s.note}</div>
          </td>
        </tr>`;
});

let trendingHtml = '';
trending.forEach(t => {
  trendingHtml += `
        <tr>
          <td style="padding: 14px 16px; border-bottom: 1px solid #f3f4f6;">
            <a href="https://viralpeps.co.uk/compounds/${t.slug}" style="color: #1f2937; text-decoration: none; font-weight: 700; font-size: 15px;">${t.name}</a>
            <div style="color: #6b7280; font-size: 12px; margin-top: 3px; line-height: 1.5;">${t.fact}</div>
          </td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #f3f4f6; text-align: center;"><span style="color: #6b7280; font-size: 13px;">${t.suppliers}</span></td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #f3f4f6; text-align: center;"><span style="color: #059669; font-weight: 700; font-size: 15px;">${t.from}</span></td>
        </tr>`;
});

const usefulLinks = [
  { title: 'Compare All ' + data.site_stats.peptides_tracked + '+ Peptides', desc: 'Live prices across every ' + data.site_stats.verified_suppliers + ' verified UK supplier.', url: 'https://viralpeps.co.uk' },
  { title: 'Top Deals Today', desc: 'Refreshed daily — biggest saving vs. the most expensive supplier.', url: 'https://viralpeps.co.uk' },
  { title: 'Reconstitution & Storage Guides', desc: 'Practical research guides: dosing maths, storage, handling.', url: 'https://viralpeps.co.uk/guides' }
];

let linksHtml = '';
usefulLinks.forEach(l => {
  linksHtml += `
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6;">
            <a href="${l.url}" style="color: #4f46e5; text-decoration: none; font-weight: 600; font-size: 15px;">${l.title}</a>
            <div style="color: #6b7280; font-size: 13px; margin-top: 2px;">${l.desc}</div>
          </td>
        </tr>`;
});

const htmlContent = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb;">
    <tr>
      <td align="center" style="padding: 24px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
          <tr>
            <td style="background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">VIRALPEPS</h1>
              <p style="color: #c7d2fe; font-size: 14px; margin: 8px 0 0 0;">UK Peptide Price Comparison</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 32px 40px 12px 40px;">
              <h2 style="color: #1f2937; font-size: 22px; margin: 0 0 8px 0;">ViralPeps Weekly</h2>
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
                Week of <strong style="color:#374151;">${dateStr}</strong>. We now track live prices from
                <strong style="color:#374151;">${data.site_stats.verified_suppliers}+ UK suppliers</strong> across
                <strong style="color:#374151;">${data.site_stats.peptides_tracked}+ peptides</strong>. Here's what moved this week.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px 4px 40px;">
              <h3 style="color: #4f46e5; font-size: 16px; font-weight: 700; margin: 0 0 4px 0;">&#x1F525; This Week's Biggest Savings</h3>
              <p style="color: #9ca3af; font-size: 12px; margin: 0;"><em>Lowest price found vs. the most expensive UK supplier, checked today.</em></p>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0 4px;">
                <tr>
                  <th style="text-align: left; padding: 10px 16px; color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase;">Compound</th>
                  <th style="text-align: center; padding: 10px 12px; color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase;">Was</th>
                  <th style="text-align: center; padding: 10px 12px; color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase;">Now</th>
                  <th style="text-align: center; padding: 10px 12px; color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase;">Save</th>
                </tr>
                ${dealsHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px 4px 40px;"><h3 style="color: #4f46e5; font-size: 16px; font-weight: 700; margin: 0;">&#x1F195; New Suppliers &amp; Updates</h3></td>
          </tr>
          <tr>
            <td style="padding: 8px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0 2px; background: #f5f3ff; border-radius: 8px;">${newHtml}</table>
              <p style="color: #6b7280; font-size: 12px; line-height: 1.5; margin: 12px 0 0 0;">More vendors every week means more competitive pricing and better choice for you.</p>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px 4px 40px;"><h3 style="color: #4f46e5; font-size: 16px; font-weight: 700; margin: 0;">&#x1F4C8; Trending Research Compounds</h3></td>
          </tr>
          <tr>
            <td style="padding: 8px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0 2px;">
                <tr>
                  <th style="text-align: left; padding: 10px 16px; color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase;">Compound</th>
                  <th style="text-align: center; padding: 10px 12px; color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase;">Suppliers</th>
                  <th style="text-align: center; padding: 10px 12px; color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase;">From</th>
                </tr>
                ${trendingHtml}
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 20px 40px 4px 40px;"><h3 style="color: #4f46e5; font-size: 16px; font-weight: 700; margin: 0;">&#x1F517; Useful Links</h3></td>
          </tr>
          <tr>
            <td style="padding: 8px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0 2px; background: #f9fafb; border-radius: 8px;">${linksHtml}</table>
            </td>
          </tr>
          <tr>
            <td style="padding: 28px 40px 32px 40px; text-align: center;">
              <a href="https://viralpeps.co.uk" style="display: inline-block; background-color: #4f46e5; color: #ffffff; font-size: 16px; font-weight: 600; padding: 14px 36px; border-radius: 8px; text-decoration: none;">View All Deals &#8594;</a>
              <p style="color: #9ca3af; font-size: 12px; margin: 16px 0 0 0; line-height: 1.5;">Prices updated daily. Comparisons are independent and not affiliated with any supplier.</p>
            </td>
          </tr>
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px 0;">You're receiving this because you subscribed to ViralPeps — the UK's free peptide price comparison.</p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0 0 4px 0;">
                <a href="https://viralpeps.co.uk" style="color: #4f46e5; text-decoration: none;">ViralPeps</a> &middot;
                <a href="{$unsubscribe}" style="color: #4f46e5; text-decoration: none;">Unsubscribe</a>
              </p>
              <p style="color: #d1d5db; font-size: 11px; margin: 8px 0 0 0;">ViralPeps &mdash; UK Peptide Price Comparison</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

const out = `/tmp/vp-weekly-newsletter-${isoDate}.html`;
fs.writeFileSync(out, htmlContent);
console.log('Wrote ' + out + ' (' + htmlContent.length + ' bytes)');
console.log('deals: ' + deals.length + ' | trending: ' + trending.length + ' | newSuppliers: ' + newSuppliers.length);
console.log('stats: ' + data.site_stats.peptides_tracked + ' peptides / ' + data.site_stats.verified_suppliers + ' suppliers');
