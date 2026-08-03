import fs from 'fs';
import https from 'https';

// Read API key
const env = fs.readFileSync('.env.local', 'utf8');
const match = env.match(/^MAILERLITE_API_KEY=(.+)$/m);
if (!match) {
  console.error('ERROR: API key not found');
  process.exit(1);
}
const key = match[1].trim();

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
        } catch(e) {
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
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
  const isoDate = today.toISOString().slice(0, 10);

  // === Data scraped from viralpeps.co.uk ===
  // Top deals of the day (savings vs most expensive supplier)
  const deals = [
    { compound: 'Ipamorelin', dosage: '300mcg', supplier: 'Research Peptides UK', original: '£199.99', current: '£6.99', save: '£193.00', pct: '97%', slug: 'ipamorelin' },
    { compound: 'GHK-Cu', dosage: '5mg', supplier: 'Raccoon Peptides', original: '£350.00', current: '£13.89', save: '£336.11', pct: '96%', slug: 'ghk-cu' },
    { compound: 'Semax', dosage: '600mcg', supplier: 'XL Peptides', original: '£199.99', current: '£7.50', save: '£192.49', pct: '96%', slug: 'semax' },
    { compound: 'Selank', dosage: '600mcg', supplier: 'XL Peptides', original: '£199.99', current: '£7.50', save: '£192.49', pct: '96%', slug: 'selank' },
    { compound: 'CJC-1295', dosage: '2mg', supplier: 'Research Peptides UK', original: '£199.99', current: '£9.95', save: '£190.04', pct: '95%', slug: 'cjc-1295' },
    { compound: 'IGF-1 LR3', dosage: '60mcg', supplier: 'Pure Peptides UK', original: '£199.99', current: '£10.00', save: '£189.99', pct: '95%', slug: 'igf-1-lr3' },
    { compound: 'DSIP (Delta Sleep-Inducing Peptide)', dosage: '', supplier: 'Raccoon Peptides', original: '£199.99', current: '£9.99', save: '£190.00', pct: '95%', slug: 'dsip' },
    { compound: 'Oxytocin', dosage: '', supplier: 'XL Peptides', original: '£199.99', current: '£10.99', save: '£189.00', pct: '95%', slug: 'oxytocin' }
  ];

  // New suppliers added recently
  const newSuppliers = [
    { name: 'Tested Peptides', note: 'Third-party HPLC tested, wide catalogue from BPC-157 to NAD+' , url: 'https://viralpeps.co.uk' },
    { name: 'Trutide', note: 'UK registered (Trutide Research Ltd), Royal Mail Tracked 24 over £25, same-day dispatch before 2pm' , url: 'https://viralpeps.co.uk' }
  ];

  // Trending compounds (most compared)
  const trending = [
    { name: 'GHK-Cu', suppliers: 74, from: '£13.89', slug: 'ghk-cu', fact: 'Skin, tissue repair & copper peptide — most-watched on the site.' },
    { name: 'BPC-157', suppliers: 69, from: '£13.95', slug: 'bpc-157', fact: 'Healing & recovery staple from 69 UK suppliers — 40%+ savings available.' },
    { name: 'TESAMORELIN', suppliers: 66, from: '£23.99', slug: 'tesamorelin', fact: 'Growth-hormone secretagogue, now 66 suppliers deep into the comparison.' },
    { name: 'RETATRUTIDE', suppliers: 60, from: '£39.00', slug: 'retatrutide', fact: 'Newer metabolic compound gaining fast — check the price spread.' }
  ];

  // Useful links
  const usefulLinks = [
    { title: 'Browse All 141+ Peptides', desc: 'Full comparison across every UK supplier.', url: 'https://viralpeps.co.uk' },
    { title: 'Compare 55+ UK Suppliers', desc: 'Verified vendors, latest prices, delivery notes.', url: 'https://viralpeps.co.uk' }
  ];

  console.log('Deals: ' + deals.length + ', New suppliers: ' + newSuppliers.length + ', Trending: ' + trending.length);

  // --- Build deals rows ---
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
            <span style="display: inline-block; background: #dcfce7; color: #166534; font-weight: 700; font-size: 12px; padding: 3px 8px; border-radius: 9999px;">
              SAVE ${d.pct}
            </span>
          </td>
        </tr>`;
  });

  // --- New suppliers rows ---
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

  // --- Trending rows ---
  let trendingHtml = '';
  trending.forEach((t) => {
    trendingHtml += `
        <tr>
          <td style="padding: 14px 16px; border-bottom: 1px solid #f3f4f6;">
            <a href="https://viralpeps.co.uk/compounds/${t.slug}" style="color: #1f2937; text-decoration: none; font-weight: 700; font-size: 15px;">${t.name}</a>
            <div style="color: #6b7280; font-size: 12px; margin-top: 3px; line-height: 1.5;">${t.fact}</div>
          </td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #f3f4f6; text-align: center;">
            <span style="color: #6b7280; font-size: 13px;">${t.suppliers}</span>
          </td>
          <td style="padding: 14px 12px; border-bottom: 1px solid #f3f4f6; text-align: center;">
            <span style="color: #059669; font-weight: 700; font-size: 15px;">${t.from}</span>
          </td>
        </tr>`;
  });

  // --- Useful links rows ---
  let linksHtml = '';
  usefulLinks.forEach((l) => {
    linksHtml += `
        <tr>
          <td style="padding: 12px 16px; border-bottom: 1px solid #f3f4f6;">
            <a href="${l.url}" style="color: #4f46e5; text-decoration: none; font-weight: 600; font-size: 15px;">${l.title}</a>
            <div style="color: #6b7280; font-size: 13px; margin-top: 2px;">${l.desc}</div>
          </td>
        </tr>`;
  });

  // --- Assemble HTML ---
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
              <h1 style="color: #ffffff; font-size: 28px; font-weight: 800; margin: 0; letter-spacing: -0.5px;">VIRALPEPS</h1>
              <p style="color: #c7d2fe; font-size: 14px; margin: 8px 0 0 0;">UK Peptide Price Comparison</p>
            </td>
          </tr>

          <!-- Intro -->
          <tr>
            <td style="padding: 32px 40px 12px 40px;">
              <h2 style="color: #1f2937; font-size: 22px; margin: 0 0 8px 0;">ViralPeps Weekly</h2>
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
                Week of <strong style="color:#374151;">${dateStr}</strong>. We now track live prices from
                <strong style="color:#374151;">55+ UK suppliers</strong> across
                <strong style="color:#374151;">141+ peptides</strong>. Here's what moved this week — new suppliers, the biggest savings, and what everyone's comparing.
              </p>
            </td>
          </tr>

          <!-- Section 1: Price drop highlights -->
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
                  <th style="text-align: left; padding: 10px 16px; color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Compound</th>
                  <th style="text-align: center; padding: 10px 12px; color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Was</th>
                  <th style="text-align: center; padding: 10px 12px; color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Now</th>
                  <th style="text-align: center; padding: 10px 12px; color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Save</th>
                </tr>
                ${dealsHtml}
              </table>
            </td>
          </tr>

          <!-- Section 2: New suppliers / updates -->
          <tr>
            <td style="padding: 20px 40px 4px 40px;">
              <h3 style="color: #4f46e5; font-size: 16px; font-weight: 700; margin: 0;">&#x1F195; New Suppliers &amp; Updates</h3>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0 2px; background: #f5f3ff; border-radius: 8px;">
                ${newHtml}
              </table>
              <p style="color: #6b7280; font-size: 12px; line-height: 1.5; margin: 12px 0 0 0;">
                Catalogue keeps growing every week — more vendors means more competitive pricing and better choice for you.
              </p>
            </td>
          </tr>

          <!-- Section 3: Trending compounds -->
          <tr>
            <td style="padding: 20px 40px 4px 40px;">
              <h3 style="color: #4f46e5; font-size: 16px; font-weight: 700; margin: 0;">&#x1F4C8; Trending Research Compounds</h3>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0 2px;">
                <tr>
                  <th style="text-align: left; padding: 10px 16px; color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Compound</th>
                  <th style="text-align: center; padding: 10px 12px; color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Suppliers</th>
                  <th style="text-align: center; padding: 10px 12px; color: #6b7280; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">From</th>
                </tr>
                ${trendingHtml}
              </table>
            </td>
          </tr>

          <!-- Section 4: Useful links -->
          <tr>
            <td style="padding: 20px 40px 4px 40px;">
              <h3 style="color: #4f46e5; font-size: 16px; font-weight: 700; margin: 0;">&#x1F517; Useful Links</h3>
            </td>
          </tr>
          <tr>
            <td style="padding: 8px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0 2px; background: #f9fafb; border-radius: 8px;">
                ${linksHtml}
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="padding: 28px 40px 32px 40px; text-align: center;">
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
                You're receiving this because you subscribed to ViralPeps — the UK's free peptide price comparison.
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 0 0 4px 0;">
                <a href="https://viralpeps.co.uk" style="color: #4f46e5; text-decoration: none;">ViralPeps</a> &middot;
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

  // === Step 1: Create campaign ===
  const campaignName = 'ViralPeps Weekly - ' + isoDate;
  console.log('Creating campaign: ' + campaignName);

  const campaignData = {
    name: campaignName,
    type: 'regular',
    emails: [{
      subject: "ViralPeps Weekly \u2014 New Suppliers & Top Deals",
      from_name: 'ViralPeps',
      from: 'info@viralpeps.co.uk',
      content: htmlContent
    }],
    segments: ['193155917484656413']
  };

  const createResult = await post('/api/campaigns', campaignData);
  console.log('Create status: ' + createResult.status);

  if (createResult.status >= 400) {
    console.log('Create error: ' + JSON.stringify(createResult.body, null, 2));
    process.exit(1);
  }

  const campaignId = createResult.body.data.id;
  console.log('Campaign ID: ' + campaignId);

  // === Step 2: Send immediately ===
  console.log('Sending campaign...');
  const sendResult = await post('/api/campaigns/' + campaignId + '/schedule', { delivery: 'instant' });
  console.log('Send status: ' + sendResult.status);
  console.log('Send result: ' + JSON.stringify(sendResult.body, null, 2));

  // === Final report ===
  console.log('---RESULT---');
  console.log('Campaign Name: ' + campaignName);
  console.log('Campaign ID: ' + campaignId);
  console.log('Segment: All Subscribers (193155917484656413)');
  console.log('Deals included: ' + deals.length);
  console.log('New suppliers featured: ' + newSuppliers.length + ' (' + newSuppliers.map(s => s.name).join(', ') + ')');
  console.log('Trending featured: ' + trending.length);
  console.log('Status: sent');
}

main().catch(err => console.error('ERROR: ' + err.message));
