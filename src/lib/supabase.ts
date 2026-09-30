import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { galaxies, questions, type GalaxyId } from "@/content";

export async function supabase() {
  const store = await cookies();
  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll: () => store.getAll(),
      setAll(list) {
        try {
          list.forEach(({ name, value, options }) => store.set(name, value, options));
        } catch {
          // Called from a Server Component: can't set cookies there, proxy.ts refreshes the session instead.
        }
      },
    },
  });
}

// Every page can be viewed signed out (the dev nav relies on this). Saving still needs a login.
// ponytail: open everywhere while nobody uses the site (owner approved 2026-09-29). Before launch, set back to
// process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development" (here and in proxy.ts).
export const browseAll = true;

// Checks the login cookie against Supabase's public signing key, on our server: no round trip to Supabase.
// ponytail: a deleted or banned user stays signed in until their token expires (up to 1 hour).
async function currentUser(db: Awaited<ReturnType<typeof supabase>>) {
  const { data } = await db.auth.getClaims();
  return data ? { id: data.claims.sub, email: data.claims.email } : null;
}

// For pages: signed-in client + user, or bounce to login. With browseAll, user may be null.
export async function pageUser() {
  const db = await supabase();
  const user = await currentUser(db);
  if (!user && !browseAll) redirect("/signup?mode=login");
  return { db, user };
}

// For saving: always needs a real signed-in user.
export async function requireUser() {
  const db = await supabase();
  const user = await currentUser(db);
  if (!user) redirect("/signup?mode=login");
  return { db, user };
}

// Ordered steps: a returning student resumes at the page of their first unanswered step.
const flow = [
  { step: "avatar", path: "/character/avatar" },
  { step: "customize", path: "/character/customize" },
  { step: "future", path: "/character/future" },
  ...questions.map((_, i) => ({ step: `q${i + 1}`, path: i ? `/quiz/${i + 1}` : "/intermission/culture" })),
  { step: "disruption-questions", path: "/intermission/disruption" },
  { step: "group", path: "/disruption/chat" },
];

// Galaxy percentages from the student's quiz answers, highest first.
export async function galaxyScores() {
  const { db } = await pageUser();
  const { data } = await db.from("responses").select("answer").like("step", "q%");
  const counts: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 };
  data?.forEach((r) => {
    const g = r.answer?.galaxy;
    if (g in counts) counts[g]++;
  });
  const total = data?.length || 1;
  return (Object.keys(galaxies) as GalaxyId[])
    .map((id) => ({ id, ...galaxies[id], percent: Math.round((counts[id] / total) * 100) }))
    .sort((a, b) => b.percent - a.percent);
}

export async function resumePath() {
  const { db } = await requireUser();
  const { data } = await db.from("responses").select("step");
  const done = new Set(data?.map((r) => r.step));
  return flow.find((f) => !done.has(f.step))?.path ?? "/done";
}
