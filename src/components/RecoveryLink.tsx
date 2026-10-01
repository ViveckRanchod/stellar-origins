"use client";

import { useEffect } from "react";
import { createBrowserClient } from "@supabase/ssr";

// The password reset email lands on any page with the session in the URL hash (#access_token=…&type=recovery),
// usually "/" since that's Supabase's Site URL fallback. Sign in from it, then ask for the new password.
// The admin sign-in link (type magiclink, or signup for a new account) works the same way and opens /admin.
export function RecoveryLink() {
  useEffect(() => {
    const hash = new URLSearchParams(location.hash.slice(1));
    const error = hash.get("error_description");
    if (error) return location.replace(`/signup?mode=forgot&error=${encodeURIComponent(error.replaceAll("+", " "))}`);

    const access_token = hash.get("access_token");
    const refresh_token = hash.get("refresh_token");
    const type = hash.get("type");
    const next = type === "recovery" ? "/signup?mode=reset" : type === "magiclink" || type === "signup" ? "/admin" : null;
    if (!next || !access_token || !refresh_token) return;
    const db = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
    db.auth.setSession({ access_token, refresh_token }).then(({ error }) =>
      location.replace(error ? `/signup?mode=forgot&error=${encodeURIComponent(error.message)}` : next),
    );
  }, []);
  return null;
}
