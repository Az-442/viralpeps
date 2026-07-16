import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, result, from_tool } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    // Map lead magnet titles to MailerLite group IDs
    const GROUP_MAP: Record<string, string> = {
      "Recon Guide": "193000229768791327",
      "GLP-1 Chart": "193000229925029164",
      "Price Drops": "193000230078121276",
      "Newsletter": "193000230234359172",
      "Tool Results": "193157271247652469",
    };

    let groupId = GROUP_MAP.Newsletter; // default
    if (from_tool) {
      groupId = GROUP_MAP["Tool Results"];
    } else if (result) {
      if (result.includes("Reconstitution")) groupId = GROUP_MAP["Recon Guide"];
      else if (result.includes("GLP-1")) groupId = GROUP_MAP["GLP-1 Chart"];
      else if (result.includes("Overpay")) groupId = GROUP_MAP["Price Drops"];
    }

    const body: Record<string, unknown> = {
      email,
      groups: [groupId],
      status: "active",
    };

    if (result) {
      body.fields = { tool_result: result };
    }

    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.json();
      // 409 = already subscribed — that's fine
      if (res.status === 409) {
        return NextResponse.json({ ok: true, message: "Already subscribed" });
      }
      return NextResponse.json({ error: err.message || "Failed" }, { status: 500 });
    }

    const data = await res.json();
    return NextResponse.json({ ok: true, subscriber: data.data });
  } catch (err) {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
