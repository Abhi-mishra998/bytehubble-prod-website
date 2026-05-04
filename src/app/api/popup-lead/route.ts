import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// ─── In-memory rate limiter — 5 submissions per IP per 60 s ──────────────────
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

// ─── POST /api/popup-lead ─────────────────────────────────────────────────────
export async function POST(req: Request) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests." },
      { status: 429 }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email =
    typeof body.email === "string" ? body.email.trim().toLowerCase() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  // Service role key bypasses RLS — required since anon insert is blocked
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error("[popup-lead] Missing Supabase env vars");
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    );
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false },
  });

  const name =
    typeof body.name === "string" ? body.name.trim() : null;
  const source =
    typeof body.source === "string" ? body.source.trim() : "behavior_popup";

  const { error: dbError } = await supabase
    .from("popup_leads")
    .insert([{ email, name, source }]);

  if (dbError) {
    // Silently swallow duplicate-email errors so UX stays clean
    if (dbError.code === "23505") {
      return NextResponse.json({ success: true }, { status: 200 });
    }
    console.error("[popup-lead] Supabase error code:", dbError.code, "message:", dbError.message, "details:", dbError.details);
    return NextResponse.json(
      { error: "Could not save. Please try again." },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
