import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ─── Rate limiter — 5 per IP per 60 s ────────────────────────────────────────
const rateMap = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) return true;
  hits.push(now);
  rateMap.set(ip, hits);
  return false;
}

// ─── POST /api/lead ───────────────────────────────────────────────────────────
export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const str = (v: unknown) =>
    typeof v === "string" ? v.trim() : "";

  const name = str(body.name);
  const email = str(body.email).toLowerCase();
  const role = str(body.role);
  const source = str(body.source) || "website_popup";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  if (name && name.length < 2) {
    return NextResponse.json(
      { error: "Name must be at least 2 characters." },
      { status: 400 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error("[lead] Missing Supabase env vars");
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    );
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false },
  });

  const { error: dbError } = await supabase
    .from("popup_leads")
    .insert([{ email, name: name || null, source, role: role || null }]);

  if (dbError) {
    // Duplicate email — treat as success so UX stays clean
    if (dbError.code === "23505") {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    console.error("[lead] Supabase error code:", dbError.code, "message:", dbError.message, "details:", dbError.details);
    return NextResponse.json(
      { error: "Could not save. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
