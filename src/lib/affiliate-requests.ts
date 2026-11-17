export const AFFILIATE_REQUESTS_REPO = "Az-442/viralpeps";
export const AFFILIATE_REQUESTS_PATH = "affiliate-requests/log.json";

export interface AffiliateRequest {
  slug: string;
  name: string;
  email: string;
  commissionRate: number;
  requestedAt: string;
}

// Reads the affiliate join requests log from the GitHub repo (written at runtime
// by POST /api/sellers/join-affiliate). Returns [] when unset or missing.
export async function getAffiliateRequests(): Promise<AffiliateRequest[]> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return [];

  const url = `https://api.github.com/repos/${AFFILIATE_REQUESTS_REPO}/contents/${AFFILIATE_REQUESTS_PATH}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
    },
    cache: "no-store",
  });

  if (res.status === 404) return [];
  if (!res.ok) return [];

  try {
    const data = await res.json();
    const raw = Buffer.from(data.content || "", "base64").toString("utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((r): r is AffiliateRequest => !!r && typeof r.slug === "string")
      .sort((a, b) => (a.requestedAt < b.requestedAt ? 1 : -1));
  } catch {
    return [];
  }
}
