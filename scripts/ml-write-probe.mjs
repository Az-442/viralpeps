// Confirms whether the terminated account still refuses writes.
// Creates a DRAFT campaign only (no schedule/send). If it succeeds we delete it.
import fs from 'fs';
import https from 'https';

const env = fs.readFileSync('.env.local', 'utf8');
const m = env.match(/^MAILERLITE_API_KEY=(.+)$/m);
const key = m[1].trim();

function post(path, data) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(data);
    const req = https.request({
      hostname: 'connect.mailerlite.com', path, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body), Accept: 'application/json', Authorization: 'Bearer ' + key }
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => { try { resolve({ status: res.statusCode, body: JSON.parse(d) }); } catch (e) { resolve({ status: res.statusCode, body: d }); } });
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

const probe = await post('/api/campaigns', {
  name: 'WRITE-PROBE (safe to delete) - ' + new Date().toISOString().slice(0, 16),
  type: 'regular',
  emails: [{ subject: 'probe', from_name: 'ViralPeps', from: 'info@viralpeps.co.uk', content: '<p>probe</p>' }],
  segments: ['193155917484656413']
});
console.log('CREATE PROBE HTTP', probe.status);
console.log(JSON.stringify(probe.body).slice(0, 500));
if (probe.status < 400 && probe.body?.data?.id) console.log('PROBE_CAMPAIGN_ID=' + probe.body.data.id);
