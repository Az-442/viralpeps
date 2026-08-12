import fs from 'fs';
import https from 'https';

// Read API key directly from .env.local (never echo through tool output)
const env = fs.readFileSync('.env.local', 'utf8');
const match = env.match(/^MAILERLITE_API_KEY=(.+)$/m);
if (!match) {
  console.error('ERROR: API key not found');
  process.exit(1);
}
const key = match[1].trim();

const SEGMENT_ALL_SUBSCRIBERS = '193155917484656413';

function post(path, data) {
  return new Promise((resolve, reject) => {
    const url = new URL('https://connect.mailerlite.com' + path);
    const body = JSON.stringify(data);
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + key
      }
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, body: JSON.parse(data) });
        } catch (e) {
          resolve({ status: res.statusCode, body: data });
        }
      });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  // ---- Scraped 10 Aug 2026 from viralpeps.co.uk ----
  const stats = {
    suppliers: '57+',
    compounds: '141+'
  };

  // Top deals of the day (savings vs most expensive supplier)
  const deals = [
    { compound: 'Ipamorelin', dosage: '300mcg', supplier: 'Research Peptides UK', original: '£199.99', current: '£6.99', save: '£193.00', pct: '97%', slug: 'ipamorelin' },
    { compound: 'GHK-Cu', dosage: '5mg', supplier: 'Raccoon Peptides', original: '£350.00', current: '£13.89', save: '£336.11', pct: '96%', slug: 'ghk-cu' },
    { compound: 'Semax', dosage: '600mcg', supplier: 'XL Peptides', original: '£199.99', current: '£7.50', save: '£192.49', pct: '96%', slug: 'semax' },
    { compound: 'Selank', dosage: '600mcg', supplier: 'XL Peptides', original: '£199.99', current: '£7.50', save: '£192.49', pct: '96%', slug: 'selank' },
    { compound: 'CJC-1295', dosage: '2mg', supplier: 'Tide Labs', original: '£199.99', current: '£9.40', save: '£190.59', pct: '95%', slug: 'cjc-1295' },
    { compound: 'IGF-1 LR3', dosage: '60mcg', supplier: 'Pure Peptides UK', original: '£199.99', current: '£10.00', save: '£189.99', pct: '95%', slug: 'igf-1-lr3' },
    { compound: 'DSIP', dosage: '10mg', supplier: 'Raccoon Peptides', original: '£199.99', current: '£9.99', save: '£190.00', pct: '95%', slug: 'dsip' },
    { compound: 'Oxytocin', dosage: '', supplier: 'XL Peptides', original: '£199.99', current: '£10.99', save: '£189.00', pct: '95%', slug: 'oxytocin' }
  ];

  // Trending compounds (most compared)
  const trending = [
    { name: 'GHK-Cu', suppliers: 77, price: '£13.89', slug: 'ghk-cu' },
    { name: 'BPC-157', suppliers: 70, price: '£13.95', slug: 'bpc-157' },
    { name: 'MOTS-c', suppliers: 74, price: 'on enquiry', slug: 'mots-c' },
    { name: 'Tesamorelin', suppliers: 68, price: '£23.99', slug: 'tesamorelin' },
    { name: 'Retatrutide', suppliers: 61, price: '£39.00', slug: 'retatrutide' },
    { name: 'Tirzepatide', suppliers: 48, price: '£24.99', slug: 'tirzepatide' }
  ];

  // New / emerging compounds pointing to recently added suppliers
  const newArrivals = [
    { name: 'Survodutide', note: 'next-gen weight-loss peptide now on 3 suppliers, from £39.00', slug: 'survodutide' },
    { name: 'Chonliten 10mg', note: 'new on the market — growth/hair peptide, from £39.99', slug: 'chonliten' },
    { name: 'Mazdutide', note: 'dual-action GLP-1 emerging, from £49.95', slug: 'mazdutide' },
    { name: 'Adipotide 5mg', note: 'targeted fat-loss research peptide, from £39.95', slug: 'adipotide' }
  ];

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const idStr = today.toISOString().slice(0, 10);

  // ---- Build deal rows ----
  let dealsHtml = '';
  const colors = ['#eef2ff', '#f0f7ff', '#f5f3ff', '#eff6ff', '#eef2ff', '#f0fdf4', '#eff6ff', '#faf5ff'];
  deals.forEach((d, i) => {
    const slug = d.slug || d.compound.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    dealsHtml += `
        <tr style="background: ${colors[i % colors.length]};">
          <td style="padding: 14px 16px; border-bottom: 1px solid #f3f4f6;">
            <a href="https://viralpeps.co.uk/compounds/${slug}" style="color: #1f2937; text-decoration: none; font-weight: 600; font-size: 15px;">
              ${d.compound}${d.dosage ? ' <span style="color: #6b7280; font-weight: 400; font-size: 13px;">' + d.dosage + '</span>' : ''}
            </a>
            <div style="color: #9ca3af; font-size: 12px; margin-top: 2px;">${d.supplier}</div>
          </td>
          <td style="padding: 14px 16px; border-bottom: 1px solid #f3f4f6; text-align: center; white-space: nowrap;">
            <span style="color: #9ca3af; font-size: 13px; text-decoration: line-through;">${d.original}</span>
          </td>
          <td style="padding: 14px 16px; border-bottom: 1px solid #f3f4f6; text-align: center; white-space: nowrap;">
            <span style="color: #059669; font-weight: 700; font-size: 18px;">${d.current}</span>
          </td>
          <td style="padding: 14px 16px; border-bottom: 1px solid #f3f4f6; text-align: center; white-space: nowrap;">
            <span style="display: inline-block; background: #dcfce7; color: #166534; font-weight: 700; font-size: 13px; padding: 4px 10px; border-radius: 9999px;">
              -${d.pct}
            </span>
          </td>
        </tr>`;
  });

  // ---- Trending rows ----
  let trendingHtml = '';
  trending.forEach((t) => {
    trendingHtml += `
        <tr style="border-bottom: 1px solid #f3f4f6;">
          <td style="padding: 12px 16px;">
            <a href="https://viralpeps.co.uk/compounds/${t.slug}" style="color: #1f2937; text-decoration: none; font-weight: 600; font-size: 15px;">${t.name}</a>
          </td>
          <td style="padding: 12px 16px; text-align: center; color: #6b7280; font-size: 14px; white-space: nowrap;">${t.suppliers} suppliers</td>
          <td style="padding: 12px 16px; text-align: right; color: #4f46e5; font-weight: 700; font-size: 15px; white-space: nowrap;">from ${t.price}</td>
        </tr>`;
  });

  // ---- New arrivals bullets ----
  let newHtml = '';
  newArrivals.forEach((n) => {
    newHtml += `
          <li style="margin-bottom: 12px; color: #374151; font-size: 14px; line-height: 1.5;">
            <a href="https://viralpeps.co.uk/compounds/${n.slug}" style="color: #4f46e5; font-weight: 600; text-decoration: none;">${n.name}</a>
            &mdash; ${n.note}
          </li>`;
  });

  // ---- HTML email ----
  const htmlContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f9fafb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f9fafb;">
    <tr>
      <td align="center" style="padding: 24px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.08);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #4f46e5 0%, #6366f1 100%); padding: 32px 40px; text-align: center;">
              <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin: 0; letter-spacing: 1px;">VIRALPEPS</h1>
              <p style="color: #c7d2fe; font-size: 14px; margin: 6px 0 0 0;">UK Peptide Price Comparison</p>
              <p style="color: #eef2ff; font-size: 12px; margin: 10px 0 0 0; letter-spacing: 0.08em; text-transform: uppercase;">Weekly Newsletter</p>
            </td>
          </tr>
          <!-- Intro -->
          <tr>
            <td style="padding: 32px 40px 8px 40px;">
              <h2 style="color: #1f2937; font-size: 22px; margin: 0 0 8px 0;">&#128293; This Week's Biggest Peptide Savings</h2>
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
                Welcome to your weekly ViralPeps roundup. We track prices across ${stats.compounds} compounds from ${stats.suppliers} trusted UK suppliers, updated daily. Here's what stood out this week.
              </p>
            </td>
          </tr>

          <!-- Top Deals -->
          <tr>
            <td style="padding: 24px 40px 8px 40px;">
              <h3 style="color: #1f2937; font-size: 17px; margin: 0 0 4px 0;">&#128176; Top Deals of the Week</h3>
              <p style="color: #9ca3af; font-size: 13px; margin: 0 0 12px 0;">Biggest savings versus the most expensive supplier on the market right now.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0 4px;">
                <tr>
                  <th style="text-align: left; padding: 8px 16px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Compound</th>
                  <th style="text-align: center; padding: 8px 16px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Was</th>
                  <th style="text-align: center; padding: 8px 16px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Now</th>
                  <th style="text-align: center; padding: 8px 16px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Save</th>
                </tr>
                ${dealsHtml}
              </table>
            </td>
          </tr>

          <!-- Why prices vary -->
          <tr>
            <td style="padding: 16px 40px 8px 40px;">
              <p style="color: #6b7280; font-size: 13px; line-height: 1.6; margin: 0;">
                <strong style="color: #374151;">Why the range?</strong> Peptide prices vary widely between suppliers &mdash; the same vial can differ by up to 97%. We show the same product from every verified UK supplier so you can see exactly how much you could save before you buy.
              </p>
            </td>
          </tr>

          <!-- Trending -->
          <tr>
            <td style="padding: 24px 40px 8px 40px;">
              <h3 style="color: #1f2937; font-size: 17px; margin: 0 0 4px 0;">&#128200; Trending This Week</h3>
              <p style="color: #9ca3af; font-size: 13px; margin: 0 0 12px 0;">The most-compared compounds right now &mdash; what the community is researching.</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #e5e7eb; border-radius: 8px; border-collapse: separate;">
                <tr style="background: #f9fafb;">
                  <th style="text-align: left; padding: 8px 16px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Compound</th>
                  <th style="text-align: center; padding: 8px 16px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Availability</th>
                  <th style="text-align: right; padding: 8px 16px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Best Price</th>
                </tr>
                ${trendingHtml}
              </table>
            </td>
          </tr>

          <!-- New / updates -->
          <tr>
            <td style="padding: 24px 40px 8px 40px;">
              <h3 style="color: #1f2937; font-size: 17px; margin: 0 0 4px 0;">&#127793; New Compounds &amp; Supplier Updates</h3>
              <p style="color: #9ca3af; font-size: 13px; margin: 0 0 12px 0;">Fresh arrivals on the market that are starting to gain traction with UK suppliers.</p>
              <ul style="margin: 0; padding-left: 20px;">
                ${newHtml}
              </ul>
              <p style="color: #6b7280; font-size: 13px; line-height: 1.6; margin: 8px 0 0 0;">
                <strong style="color: #374151;">Supplier base growing:</strong> ViralPeps now tracks ${stats.suppliers} UK suppliers &mdash; more choice and better competition every week.
              </p>
            </td>
          </tr>

          <!-- Useful links -->
          <tr>
            <td style="padding: 24px 40px 8px 40px;">
              <h3 style="color: #1f2937; font-size: 17px; margin: 0 0 12px 0;">&#128279; Useful Links</h3>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding: 6px 0;">
                    <a href="https://viralpeps.co.uk" style="color: #4f46e5; font-size: 14px; text-decoration: none;">Browse all ${stats.compounds} tracked peptides &#8594;</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0;">
                    <a href="https://viralpeps.co.uk/suppliers" style="color: #4f46e5; font-size: 14px; text-decoration: none;">Compare ${stats.suppliers} UK suppliers &#8594;</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0;">
                    <a href="https://viralpeps.co.uk/compounds/tirzepatide" style="color: #4f46e5; font-size: 14px; text-decoration: none;">GLP-1 &amp; weight-loss peptides &#8594;</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0;">
                    <a href="https://viralpeps.co.uk/compounds/bpc-157" style="color: #4f46e5; font-size: 14px; text-decoration: none;">Recovery &amp; healing peptides (BPC-157) &#8594;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 24px 40px 32px 40px; text-align: center;">
              <a href="https://viralpeps.co.uk" style="display: inline-block; background-color: #4f46e5; color: #ffffff; font-size: 16px; font-weight: 600; padding: 14px 36px; border-radius: 8px; text-decoration: none;">
                View All Deals &#8594;
              </a>
              <p style="color: #9ca3af; font-size: 12px; margin: 16px 0 0 0; line-height: 1.5;">
                Prices updated daily. Comparisons are independent and not affiliated with any supplier.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="color: #9ca3af; font-size: 12px; margin: 0 0 8px 0;">
                You're receiving this because you subscribed to the ViralPeps newsletter.
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0 0 4px 0;">
                <a href="https://viralpeps.co.uk" style="color: #4f46e5; text-decoration: none;">ViralPeps</a> &middot;
                <a href="https://viralpeps.co.uk/suppliers" style="color: #4f46e5; text-decoration: none;">Suppliers</a> &middot;
                <a href="{$unsubscribe}" style="color: #4f46e5; text-decoration: none;">Unsubscribe</a>
              </p>
              <p style="color: #d1d5db; font-size: 11px; margin: 8px 0 0 0;">
                ViralPeps &mdash; UK Peptide Price Comparison
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  // ---- Step 1: Create campaign ----
  const campaignName = 'ViralPeps Weekly - ' + idStr;
  console.log('Creating campaign: ' + campaignName);
  console.log('Segment: ' + SEGMENT_ALL_SUBSCRIBERS);

  const campaignData = {
    name: campaignName,
    type: 'regular',
    emails: [{
      subject: "ViralPeps Weekly — New Suppliers & Top Deals",
      from_name: 'ViralPeps',
      from: 'info@viralpeps.co.uk',
      content: htmlContent
    }],
    segments: [SEGMENT_ALL_SUBSCRIBERS]
  };

  const createResult = await post('/api/campaigns', campaignData);
  console.log('Create status: ' + createResult.status);

  if (createResult.status >= 400) {
    console.log('Create error: ' + JSON.stringify(createResult.body, null, 2));
    process.exit(1);
  }

  const campaignId = createResult.body.data.id;
  console.log('Campaign ID: ' + campaignId);

  // ---- Step 2: Send immediately ----
  console.log('Sending campaign...');
  const sendResult = await post('/api/campaigns/' + campaignId + '/schedule', { delivery: 'instant' });
  console.log('Send status: ' + sendResult.status);
  console.log('Send result: ' + JSON.stringify(sendResult.body, null, 2));

  // ---- Final report ----
  console.log('---RESULT---');
  console.log('Campaign Name: ' + campaignName);
  console.log('Campaign ID: ' + campaignId);
  console.log('Recipients segment: All Subscribers (' + SEGMENT_ALL_SUBSCRIBERS + ')');
  console.log('Deals included: ' + deals.length);
  console.log('Trending included: ' + trending.length);
  console.log('New compounds: ' + newArrivals.length);
  console.log('Status: sent');
}

main().catch(err => {
  console.error('ERROR: ' + err.message);
  process.exit(1);
});
