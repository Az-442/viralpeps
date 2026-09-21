// Render-check: verify the newsletter template + data are complete. No MailerLite calls.
import fs from 'fs';

const src = fs.readFileSync('/Users/time4you/viralpeps/send-viralpeps-weekly.mjs', 'utf8');
const checks = ['VIRALPEPS', 'This Week', 'New Suppliers', 'Trending Research', 'Useful Links', '$unsubscribe', '#4f46e5', 'from_name', 'info@viralpeps.co.uk', '193155917484656413'];
checks.forEach(c => console.log((src.includes(c) ? 'OK   ' : 'MISS ') + c));

const data = JSON.parse(fs.readFileSync('/Users/time4you/viralpeps/scripts/weekly-newsletter-latest.json', 'utf8'));
console.log('deals:', data.deals.length, '| trending:', data.trending.length, '| newSuppliers:', data.new_suppliers.length);
console.log('stats:', data.site_stats.peptides_tracked, 'peptides /', data.site_stats.verified_suppliers, 'suppliers');
