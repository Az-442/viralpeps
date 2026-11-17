import { readFileSync } from 'fs';
import { createClient } from '@vercel/postgres';

const creds = JSON.parse(readFileSync('/Users/time4you/.hermes/credentials.json', 'utf8'));
const vt = creds.vercel.token;
const pid = creds.vercel.project_id;
const team = creds.vercel.team_id;

const envUrl = `https://api.vercel.com/v9/projects/${pid}/env?teamId=${team}`;
const envRes = await fetch(envUrl, { headers: { Authorization: `Bearer ${vt}` } });
const envData = await envRes.json();
const target = envData.envs.find((e) => e.key === 'POSTGRES_URL_NON_POOLING');
const decUrl = `https://api.vercel.com/v9/projects/${pid}/env/${target.id}?teamId=${team}&decrypt=true`;
const decRes = await fetch(decUrl, { headers: { Authorization: `Bearer ${vt}` } });
const decData = await decRes.json();
const connStr = decData.value;

const client = createClient({ connectionString: connStr });
await client.connect();
const r = await client.query(
  `ALTER TABLE sellers ADD COLUMN IF NOT EXISTS affiliate_joined_at TIMESTAMPTZ`
);
console.log('ALTER result rows:', r.rowCount, '| command:', r.command);
await client.end();
