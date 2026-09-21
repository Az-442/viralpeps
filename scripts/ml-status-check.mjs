import fs from 'fs';
import https from 'https';

const env = fs.readFileSync('.env.local', 'utf8');
const m = env.match(/^MAILERLITE_API_KEY=(.+)$/m);
if (!m) { console.error('ERROR: MAILERLITE_API_KEY not found in .env.local'); process.exit(1); }
const key = m[1].trim();

function get(p) {
  return new Promise((res, rej) => {
    https.get({ hostname: 'connect.mailerlite.com', path: p, headers: { Accept: 'application/json', Authorization: 'Bearer ' + key } }, r => {
      let d = '';
      r.on('data', c => d += c);
      r.on('end', () => res({ status: r.statusCode, body: d }));
    }).on('error', rej);
  });
}

const a = await get('/api/account');
console.log('ACCOUNT HTTP', a.status);
try {
  const j = JSON.parse(a.body);
  console.log('account id:', j.data.id, '| name:', j.data.name, '| STATUS:', j.data.status, '| updated_at:', j.data.updated_at, '| domain_auth:', j.data.domain_auth);
} catch (e) {
  console.log(a.body.slice(0, 400));
}
