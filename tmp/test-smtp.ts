// Throwaway SMTP test — sends a test email via the site's SMTP sender.
import { sendFormEmail } from "../src/lib/smtp-send";

async function main() {
  const result = await sendFormEmail({
    subject: "ViralPeps SMTP test",
    text: "This is a test email from the ViralPeps SMTP sender. If you can read this, form submissions will deliver to info@viralpeps.co.uk.",
  });
  console.log("RESULT:", JSON.stringify(result, null, 2));
  process.exit(result.ok ? 0 : 1);
}

main();
