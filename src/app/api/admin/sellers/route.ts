import { NextRequest, NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { hashPassword, newApiKey, newBadgeToken } from "@/lib/seller-auth";
import { getOwnerFromRequest } from "@/lib/owner-auth";
import { revokeAllSessions } from "@/lib/session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// POST /api/admin/sellers — owner-side seller account management.
// Body: { slug, action, ...args }
//   suspend | activate | revoke-affiliate | delete
//   reset-password   { password }
//   rotate            { what: "api_key" | "badge_token" | "both" }
//   edit             { fields: { name?, email?, commission_rate?, active? } }
//   set-verified     { entityType?, paymentMethod? }
const ACTIONS = new Set([
  "suspend",
  "activate",
  "revoke-affiliate",
  "delete",
  "reset-password",
  "rotate",
  "edit",
  "set-verified",
]);

function bad(msg: string, status = 400) {
  return NextResponse.json({ ok: false, error: msg }, { status });
}

export async function POST(request: NextRequest) {
  // ── OWNER GATE ──────────────────────────────────────────────────────────
  // This endpoint reads and rotates every seller's api_key / badge_token and
  // can delete accounts. It must never be reachable without an owner session.
  const owner = await getOwnerFromRequest(request);
  if (!owner) {
    return NextResponse.json({ ok: false, error: "unauthorised" }, { status: 401 });
  }
  // ────────────────────────────────────────────────────────────────────────

  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") return bad("invalid json");

    const slug = String((body as Record<string, unknown>).slug ?? "").trim().toLowerCase();
    const action = String((body as Record<string, unknown>).action ?? "").trim();

    if (!slug) return bad("slug required");
    if (!ACTIONS.has(action)) return bad("unknown action");

    const found = await sql`SELECT id, slug, name, email, active, affiliate_joined_at FROM sellers WHERE slug = ${slug}`;
    if ((found.rowCount ?? 0) === 0) return bad("seller not found", 404);
    const seller = found.rows[0];

    switch (action) {
      case "suspend": {
        await sql`UPDATE sellers SET active = false WHERE slug = ${slug}`;
        // Killing the session forces an immediate logout.
        await revokeAllSessions("seller", Number(seller.id));
        return NextResponse.json({ ok: true });
      }

      case "activate": {
        await sql`UPDATE sellers SET active = true WHERE slug = ${slug}`;
        return NextResponse.json({ ok: true });
      }

      case "revoke-affiliate": {
        await sql`UPDATE sellers SET affiliate_joined_at = NULL WHERE slug = ${slug}`;
        return NextResponse.json({ ok: true });
      }

      case "delete": {
        await revokeAllSessions("seller", Number(seller.id));
        await sql`DELETE FROM seller_profiles WHERE seller_slug = ${slug}`;
        await sql`DELETE FROM sellers WHERE slug = ${slug}`;
        return NextResponse.json({ ok: true });
      }

      case "reset-password": {
        const password = String((body as Record<string, unknown>).password ?? "");
        if (password.length < 8) return bad("password must be at least 8 characters");
        await sql`UPDATE sellers SET password_hash = ${hashPassword(password)} WHERE slug = ${slug}`;
        // A password reset is the one place every existing session SHOULD die.
        await revokeAllSessions("seller", Number(seller.id));
        return NextResponse.json({ ok: true });
      }

      case "rotate": {
        const what = String((body as Record<string, unknown>).what ?? "both");
        const apiKey = what === "badge_token" ? null : newApiKey(slug);
        const badgeToken = what === "api_key" ? null : newBadgeToken();
        if (apiKey && badgeToken) {
          await sql`UPDATE sellers SET api_key = ${apiKey}, badge_token = ${badgeToken} WHERE slug = ${slug}`;
        } else if (apiKey) {
          await sql`UPDATE sellers SET api_key = ${apiKey} WHERE slug = ${slug}`;
        } else if (badgeToken) {
          await sql`UPDATE sellers SET badge_token = ${badgeToken} WHERE slug = ${slug}`;
        } else {
          return bad("what must be api_key, badge_token or both");
        }
        return NextResponse.json({ ok: true, api_key: apiKey, badge_token: badgeToken });
      }

      case "edit": {
        const raw = (body as Record<string, unknown>).fields;
        if (!raw || typeof raw !== "object") return bad("fields required");
        const f = raw as Record<string, unknown>;
        const cols: string[] = [];
        const vals: unknown[] = [];

        if (f.name !== undefined) { cols.push("name"); vals.push(String(f.name)); }
        if (f.email !== undefined) {
          const email = String(f.email).trim().toLowerCase();
          if (!email.includes("@")) return bad("invalid email");
          cols.push("email"); vals.push(email);
        }
        if (f.active !== undefined) { cols.push("active"); vals.push(Boolean(f.active)); }
        if (f.commission_rate !== undefined) {
          const rate = Number(f.commission_rate);
          if (!Number.isFinite(rate) || rate < 0 || rate > 100) return bad("commission_rate must be 0-100");
          cols.push("commission_rate"); vals.push(rate);
        }
        if (cols.length === 0) return bad("no editable fields supplied");

        const sets = cols.map((c, i) => `${c} = $${i + 2}`).join(", ");
        await sql.query(`UPDATE sellers SET ${sets} WHERE slug = $1`, [slug, ...vals]);
        return NextResponse.json({ ok: true });
      }

      case "set-verified": {
        const entityType = (body as Record<string, unknown>).entityType;
        const paymentMethod = (body as Record<string, unknown>).paymentMethod;
        const exists = await sql`SELECT 1 FROM seller_profiles WHERE seller_slug = ${slug}`;
        if ((exists.rowCount ?? 0) === 0) {
          await sql`INSERT INTO seller_profiles (seller_slug) VALUES (${slug})`;
        }
        if (entityType !== undefined) {
          await sql`UPDATE seller_profiles SET entity_type = ${entityType as string}, entity_type_verified = ${entityType as string}, review_status = 'approved', updated_at = now() WHERE seller_slug = ${slug}`;
        }
        if (paymentMethod !== undefined) {
          await sql`UPDATE seller_profiles SET payment_method = ${paymentMethod as string}, payment_method_verified = ${paymentMethod as string}, review_status = 'approved', updated_at = now() WHERE seller_slug = ${slug}`;
        }
        return NextResponse.json({ ok: true });
      }

      default:
        return bad("unhandled action");
    }
  } catch (err) {
    console.error("[admin/sellers] error", err);
    return NextResponse.json({ ok: false, error: "server error" }, { status: 500 });
  }
}
