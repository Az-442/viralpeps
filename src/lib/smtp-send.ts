import net from "net";

/**
 * Minimal SMTP client using Node's built-in `net` module.
 * Sends a plain-text email over STARTTLS to a GoDaddy / Microsoft 365
 * SMTP server (smtp.office365.com). No third-party dependencies.
 *
 * This is intentionally minimal: it supports exactly the AUTH LOGIN +
 * MAIL FROM / RCPT TO / DATA flow needed to deliver form submissions
 * to the site owner's inbox. It does NOT verify recipient existence and
 * does not support attachments.
 */

const SMTP_HOST = "smtp.office365.com";
const SMTP_PORT = 587;
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SEND_TO = process.env.INFO_EMAIL || "info@viralpeps.co.uk";

function encodeRFC2047(value: string): string {
  // MIME base64 encode a header value for non-ASCII characters.
  return `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`;
}

function readResponse(socket: net.Socket, timeoutMs = 15000): Promise<string> {
  return new Promise((resolve, reject) => {
    let buffer = "";
    const onData = (chunk: Buffer) => {
      buffer += chunk.toString("utf8");
      // A complete SMTP reply ends with "N\r\n" (space or CRLF after the code).
      if (/\r\n$/.test(buffer) && buffer.includes(" ")) {
        cleanup();
        resolve(buffer.trim());
      }
    };
    const onError = (err: Error) => {
      cleanup();
      reject(err);
    };
    const onTimeout = () => {
      cleanup();
      reject(new Error("SMTP read timeout"));
    };
    const cleanup = () => {
      socket.off("data", onData);
      socket.off("error", onError);
      socket.off("timeout", onTimeout);
    };
    socket.on("data", onData);
    socket.on("error", onError);
    socket.on("timeout", onTimeout);
    socket.setTimeout(timeoutMs);
  });
}

function expectCode(reply: string, code: number): void {
  if (!reply.startsWith(String(code))) {
    throw new Error(`SMTP expected ${code}, got: ${reply}`);
  }
}

export async function sendFormEmail(opts: {
  subject: string;
  text: string;
}): Promise<{ ok: true; messageId?: string } | { ok: false; error: string }> {
  const { subject, text } = opts;

  if (!SMTP_USER || !SMTP_PASS) {
    return { ok: false, error: "SMTP_USER / SMTP_PASS not configured" };
  }

  const socket = net.createConnection({ host: SMTP_HOST, port: SMTP_PORT });
  socket.setTimeout(20000);

  try {
    // 220 greeting
    let reply = await readResponse(socket);
    expectCode(reply, 220);

    // EHLO
    socket.write("EHLO viralpeps.co.uk\r\n");
    reply = await readResponse(socket);
    if (!reply.includes("250")) {
      throw new Error(`EHLO failed: ${reply}`);
    }

    // STARTTLS — MS365 requires it on port 587.
    socket.write("STARTTLS\r\n");
    reply = await readResponse(socket);
    expectCode(reply, 220);

    // Upgrade the socket to TLS.
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const tls = require("tls");
    const tlsSocket = tls.connect(
      { socket, servername: SMTP_HOST, rejectUnauthorized: true },
      () => {
        // TLS handshake complete — but the existing reader is for the raw socket.
        // We relay the data via the original socket object.
      }
    );

    // Re-run EHLO over TLS, then AUTH LOGIN, then send.
    const sendOverTls = async () => {
      // EHLO (again, required after STARTTLS)
      tlsSocket.write("EHLO viralpeps.co.uk\r\n");
      await new Promise<void>((res, rej) => {
        const onData = (chunk: Buffer) => {
          if (/\r\n$/.test(chunk.toString("utf8"))) {
            tlsSocket.off("data", onData);
            res();
          }
        };
        tlsSocket.on("data", onData);
        tlsSocket.once("error", rej);
      });

      // AUTH LOGIN
      tlsSocket.write("AUTH LOGIN\r\n");
      await new Promise<void>((res, rej) => {
        const onData = (chunk: Buffer) => {
          if (chunk.toString("utf8").startsWith("334")) {
            tlsSocket.off("data", onData);
            res();
          }
        };
        tlsSocket.on("data", onData);
        tlsSocket.once("error", rej);
      });

      // Username (base64)
      tlsSocket.write(`${Buffer.from(SMTP_USER, "utf8").toString("base64")}\r\n`);
      await new Promise<void>((res, rej) => {
        const onData = (chunk: Buffer) => {
          if (chunk.toString("utf8").startsWith("334")) {
            tlsSocket.off("data", onData);
            res();
          }
        };
        tlsSocket.on("data", onData);
        tlsSocket.once("error", rej);
      });

      // Password (base64)
      tlsSocket.write(`${Buffer.from(SMTP_PASS, "utf8").toString("base64")}\r\n`);
      await new Promise<void>((res, rej) => {
        const onData = (chunk: Buffer) => {
          if (chunk.toString("utf8").startsWith("235")) {
            tlsSocket.off("data", onData);
            res();
          } else if (chunk.toString("utf8").startsWith("535")) {
            rej(new Error("SMTP authentication failed — check username/password"));
          }
        };
        tlsSocket.on("data", onData);
        tlsSocket.once("error", rej);
      });

      // MAIL FROM
      tlsSocket.write(`MAIL FROM:<${SMTP_USER}>\r\n`);
      await new Promise<void>((res, rej) => {
        const onData = (chunk: Buffer) => {
          if (chunk.toString("utf8").startsWith("250")) {
            tlsSocket.off("data", onData);
            res();
          }
        };
        tlsSocket.on("data", onData);
        tlsSocket.once("error", rej);
      });

      // RCPT TO
      tlsSocket.write(`RCPT TO:<${SEND_TO}>\r\n`);
      await new Promise<void>((res, rej) => {
        const onData = (chunk: Buffer) => {
          if (chunk.toString("utf8").startsWith("250")) {
            tlsSocket.off("data", onData);
            res();
          } else {
            rej(new Error(`RCPT TO rejected for ${SEND_TO}: ${chunk.toString("utf8")}`));
          }
        };
        tlsSocket.on("data", onData);
        tlsSocket.once("error", rej);
      });

      // DATA
      tlsSocket.write("DATA\r\n");
      await new Promise<void>((res, rej) => {
        const onData = (chunk: Buffer) => {
          if (chunk.toString("utf8").startsWith("354")) {
            tlsSocket.off("data", onData);
            res();
          }
        };
        tlsSocket.on("data", onData);
        tlsSocket.once("error", rej);
      });

      // Message
      const date = new Date().toUTCString();
      const encodedSubject = encodeRFC2047(subject);
      const message =
        `Date: ${date}\r\n` +
        `From: ViralPeps <${SMTP_USER}>\r\n` +
        `To: ${SEND_TO}\r\n` +
        `Subject: ${encodedSubject}\r\n` +
        `MIME-Version: 1.0\r\n` +
        `Content-Type: text/plain; charset=UTF-8\r\n` +
        `Content-Transfer-Encoding: 8bit\r\n` +
        `\r\n` +
        text +
        `\r\n.\r\n`;
      tlsSocket.write(message);

      // 250 after DATA
      await new Promise<void>((res, rej) => {
        const onData = (chunk: Buffer) => {
          if (chunk.toString("utf8").startsWith("250")) {
            tlsSocket.off("data", onData);
            res();
          }
        };
        tlsSocket.on("data", onData);
        tlsSocket.once("error", rej);
      });

      // QUIT
      tlsSocket.write("QUIT\r\n");
      tlsSocket.end();
    };

    await sendOverTls();
    return { ok: true };
  } catch (err) {
    socket.destroy();
    const message = err instanceof Error ? err.message : String(err);
    return { ok: false, error: message };
  } finally {
    socket.destroy();
  }
}
