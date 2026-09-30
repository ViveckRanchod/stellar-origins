import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Refreshes the Supabase session cookie on every request and keeps signed-out users on public pages.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });
  const db = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => request.cookies.getAll(),
      setAll(list, headers) {
        list.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        list.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        Object.entries(headers).forEach(([k, v]) => response.headers.set(k, v));
      },
    },
  });

  const { data } = await db.auth.getClaims(); // checked locally, also refreshes an expired session
  const path = request.nextUrl.pathname;
  const isPublic = path === "/" || path === "/signup";
  // Same rule as browseAll in lib/supabase.ts (currently open everywhere, restore before launch).
  const browseAll = true;
  if (!data && !isPublic && !browseAll) return NextResponse.redirect(new URL("/signup?mode=login", request.url));
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
