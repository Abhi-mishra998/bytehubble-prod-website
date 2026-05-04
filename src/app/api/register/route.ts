import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendRegistrationEmail } from "@/lib/email";

// ─── In-memory rate limiter ───────────────────────────────────────────────────
// 3 submissions per IP per 60 seconds
const rateMap = new Map<string, number[]>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (hits.length >= MAX_PER_WINDOW) return true;
  hits.push(now);
  rateMap.set(ip, hits);
  return false;
}

// ─── Field validation ─────────────────────────────────────────────────────────
function validate(b: Record<string, unknown>): string | null {
  const str = (v: unknown) => typeof v === "string" ? v.trim() : "";
  if (str(b.name).length < 2)                                       return "Name must be at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str(b.email)))            return "A valid email address is required.";
  if (str(b.phone).replace(/\D/g, "").length < 7)                   return "A valid phone number is required.";
  if (!b.graduation_year)                                            return "Graduation year is required.";
  if (!b.degree)                                                     return "Degree is required.";
  if (str(b.college).length < 2)                                    return "College name is required.";
  return null;
}

// ─── POST /api/register ───────────────────────────────────────────────────────
export async function POST(req: Request) {
  // Rate limiting
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  // Parse body
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Validate
  const err = validate(body);
  if (err) return NextResponse.json({ error: err }, { status: 400 });

  // Supabase — prefer service role key (bypasses RLS), fall back to anon key
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    return NextResponse.json({ error: "Server configuration error." }, { status: 500 });
  }

  const supabase = createClient(url, key, {
    auth: { persistSession: false },
  });

  const str = (v: unknown) => typeof v === "string" ? v.trim() : "";

  const { error: dbError } = await supabase.from("training_registrations").insert([{
    name:            str(body.name),
    email:           str(body.email).toLowerCase(),
    phone:           str(body.phone),
    course:          str(body.course) || "Applied AI Engineer Mastery Program",
    graduation_year: str(body.graduation_year),
    degree:          str(body.degree),
    college:         str(body.college),
    motivation:      str(body.motivation),
    source:          str(body.source),
  }]);

  if (dbError) {
    console.error("[register] Supabase error:", dbError.message);
    return NextResponse.json(
      { error: "Could not save your registration. Please try again." },
      { status: 500 }
    );
  }

  // Send confirmation emails (async, don't block response)
  const registrationData = {
    name: str(body.name),
    email: str(body.email).toLowerCase(),
    phone: str(body.phone),
    course: str(body.course) || "Applied AI Engineer Mastery Program",
    graduation_year: str(body.graduation_year),
    degree: str(body.degree),
    college: str(body.college),
    motivation: str(body.motivation),
    source: str(body.source),
  };

  sendRegistrationEmail(registrationData).catch((err) => {
    console.error("[register] Email error:", err.message);
    // Don't fail the registration if email fails
  });

  return NextResponse.json({ success: true }, { status: 201 });
}
