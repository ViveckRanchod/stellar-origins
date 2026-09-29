import { NextResponse, type NextRequest } from "next/server";
import { supabase } from "@/lib/supabase";

// The password reset email links here: swap the one-time code for a session, then ask for a new password.
export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const db = await supabase();
  const { error } = code ? await db.auth.exchangeCodeForSession(code) : { error: true };
  const msg = "That reset link has expired or was opened on another device. Please ask for a new one.";
  const to = error ? `/signup?mode=forgot&error=${encodeURIComponent(msg)}` : "/signup?mode=reset";
  return NextResponse.redirect(new URL(to, request.url));
}
