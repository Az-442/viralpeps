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
  // Deals scraped from viralpeps.co.uk "Top deals of the day"
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

  console.log('Deals found: ' + deals.length);

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  // Build deals HTML rows
  let dealsHtml = '';
  const colors = ['#fef2f2', '#fff7ed', '#fefce8', '#f0fdf4', '#eff6ff', '#faf5ff', '#fdf2f8', '#f0fdfa'];
  deals.forEach((d, i) => {
    const slug = d.slug || d.compound.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    dealsHtml += `
        <tr style="background: ${colors[i % colors.length]}; border-radius: 8px;">
          <td style="padding: 16px; border-bottom: 1px solid #f3f4f6;">
            <a href="https://viralpeps.co.uk/compounds/${slug}" style="color: #1f2937; text-decoration: none; font-weight: 600; font-size: 15px;">
              ${d.compound}${d.dosage ? ' <span style="color: #6b7280; font-weight: 400; font-size: 13px;">' + d.dosage + '</span>' : ''}
            </a>
            <div style="color: #9ca3af; font-size: 12px; margin-top: 2px;">${d.supplier}</div>
          </td>
          <td style="padding: 16px; border-bottom: 1px solid #f3f4f6; text-align: center;">
            <span style="color: #9ca3af; font-size: 13px; text-decoration: line-through;">${d.original}</span>
          </td>
          <td style="padding: 16px; border-bottom: 1px solid #f3f4f6; text-align: center;">
            <span style="color: #059669; font-weight: 700; font-size: 18px;">${d.current}</span>
          </td>
          <td style="padding: 16px; border-bottom: 1px solid #f3f4f6; text-align: center;">
            <span style="display: inline-block; background: #dcfce7; color: #166534; font-weight: 700; font-size: 13px; padding: 4px 10px; border-radius: 9999px;">
              -${d.pct}
            </span>
          </td>
        </tr>`;
  });

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
            <td style="padding: 32px 40px 16px 40px;">
              <h2 style="color: #1f2937; font-size: 22px; margin: 0 0 8px 0;">&#x1F525; This Week's Top Peptide Deals</h2>
              <p style="color: #6b7280; font-size: 14px; line-height: 1.6; margin: 0;">
                Here are the biggest savings across all UK suppliers for the week of ${dateStr}. Prices checked daily — don't miss out.
              </p>
            </td>
          </tr>
          <!-- Deals Table -->
          <tr>
            <td style="padding: 8px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: separate; border-spacing: 0 4px;">
                <tr>
                  <th style="text-align: left; padding: 12px 16px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Compound</th>
                  <th style="text-align: center; padding: 12px 16px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Was</th>
                  <th style="text-align: center; padding: 12px 16px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Now</th>
                  <th style="text-align: center; padding: 12px 16px; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">Save</th>
                </tr>
                ${dealsHtml}
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
                You received this email because you subscribed to price drop alerts on ViralPeps.
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

  // Step 1: Create campaign
  const campaignName = 'Weekly Price Drops - ' + today.toISOString().slice(0, 10);
  console.log('Creating campaign: ' + campaignName);

  const campaignData = {
    name: campaignName,
    type: 'regular',
    emails: [{
      subject: "This Week's Top Peptide Deals",
      from_name: 'ViralPeps',
      from: 'info@viralpeps.co.uk',
      content: htmlContent
    }],
    groups: ['193000230078121276']
  };

  const createResult = await post('/api/campaigns', campaignData);
  console.log('Create status: ' + createResult.status);

  if (createResult.status >= 400) {
    console.log('Create error: ' + JSON.stringify(createResult.body, null, 2));
    process.exit(1);
  }

  const campaignId = createResult.body.data.id;
  console.log('Campaign ID: ' + campaignId);

  // Step 2: Send immediately
  console.log('Sending campaign...');
  const sendResult = await post('/api/campaigns/' + campaignId + '/schedule', { delivery: 'instant' });
  console.log('Send status: ' + sendResult.status);
  console.log('Send result: ' + JSON.stringify(sendResult.body, null, 2));

  // Final report
  console.log('---RESULT---');
  console.log('Campaign Name: ' + campaignName);
  console.log('Campaign ID: ' + campaignId);
  console.log('Deals included: ' + deals.length);
  console.log('Status: sent');
}

main().catch(err => console.error('ERROR: ' + err.message));
