import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const apiKey = process.env.MAILERLITE_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Server config error" }, { status: 500 });
    }

    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, groups: [], status: "active" }),
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
