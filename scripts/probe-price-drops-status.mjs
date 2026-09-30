// Read-only-ish status probe + authoritative write probe for MailerLite.
// Does NOT send: creates a draft campaign only if the account is active,
// and deletes the draft immediately afterwards.
import fs from "fs";

const line = fs.readFileSync(".env.local", "utf8").split("\n").find(l => l.startsWith("MAILERLITE_API_KEY="));
if (!line) { console.error("key missing"); process.exit(1); }
const KEY = line.slice("MAILERLITE_API_KEY=".length).trim();
const H = { Authorization: "Bearer " + KEY, "Content-Type": "application/json", Accept: "application/json" };
const BASE = "https://connect.mailerlite.com/api";

const acc = await fetch(BASE + "/account", { headers: H });
const accJson = await acc.json();
const status = accJson?.data?.status;
console.log("GET /account ->", acc.status, "| status:", status, "| updated_at:", accJson?.data?.updated_at);

if (status !== "active") {
  const probe = await fetch(BASE + "/campaigns", {
    method: "POST",
    headers: H,
    body: JSON.stringify({
      name: "PROBE-PRICE-DROPS-STATUS " + new Date().toISOString(),
      type: "regular",
      emails: [{ subject: "probe", from_name: "ViralPeps", from: "info@viralpeps.co.uk", content: "<p>probe</p>" }],
      groups: ["193000230078121276"],
    }),
  });
  console.log("PROBE POST /campaigns ->", probe.status);
  console.log((await probe.text()).slice(0, 300));
  process.exit(2);
}

console.log("Account ACTIVE — write path open.");
