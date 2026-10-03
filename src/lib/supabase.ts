import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { disruptions, galaxies, questions, type GalaxyId } from "@/content";

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
  return data ? { id: data.claims.sub, email: data.claims.email, user_metadata: data.claims.user_metadata ?? {} } : null;
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

// The student's earlier answer to a step, so going Back shows it filled in. {} when there is none.
export async function savedAnswer(step: string): Promise<Record<string, string | undefined>> {
  const { db, user } = await pageUser();
  if (!user) return {};
  const { data } = await db.from("responses").select("answer").eq("step", step).maybeSingle();
  return data?.answer ?? {};
}

// The student's disruption. assign_disruption() pops the next slot from the stack (see the schema) and returns
// the same one on every later visit. Signed out (preview browsing) shows `sample` (d1–d4) or the first one,
// without using up a slot. null = the stack is empty.
export async function myDisruption(sample?: unknown) {
  const { db, user } = await pageUser();
  const fallback = typeof sample === "string" && sample in disruptions ? sample : Object.keys(disruptions)[0];
  const { data: id, error } = user ? await db.rpc("assign_disruption") : { data: fallback, error: null };
  if (error) throw error;
  return disruptions[id as string] ?? null;
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

// Remembers the student's character in a cookie as "N.X" (character N, accessory X, 0 = none), matching the
// picture characterN/N.X.png. Read by the customise page and the corner badge, so no database round trip.
// avatar = "avatar_N", accessory = "accessory_X" | "none"; null keeps the current value.
export async function rememberCharacter(avatar: unknown, accessory: unknown = "none") {
  const store = await cookies();
  const n = (v: unknown) => Number(String(v).split("_")[1]) || 0;
  const character = avatar ? n(avatar) : Number(store.get("character")?.value.split(".")[0]);
  if (character) store.set("character", `${character}.${n(accessory)}`, { maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
}

export async function resumePath() {
  const { db } = await requireUser();
  const { data } = await db.from("responses").select("step, answer");
  const done = new Set(data?.map((r) => r.step));
  // Restores the corner badge on a new device.
  const answer = (step: string) => data?.find((r) => r.step === step)?.answer;
  if (answer("avatar")) await rememberCharacter(answer("avatar").avatar, answer("customize")?.accessory);
  return flow.find((f) => !done.has(f.step))?.path ?? "/done";
}

// Everything the feedback report PDF needs for the signed-in student.
export async function reportData() {
  const { db, user } = await requireUser();
  const [{ data }, scores, { data: slot }] = await Promise.all([
    db.from("responses").select("step, answer"),
    galaxyScores(),
    // Still on the stack while the email is made (released after it's sent), so read it from there.
    db.from("disruption_slots").select("disruption").eq("user_id", user.id).maybeSingle(),
  ]);
  const answers = Object.fromEntries(data?.map((r) => [r.step, r.answer]) ?? []);
  if (slot) answers.disruption = { disruption: slot.disruption };
  const m = user.user_metadata;
  return {
    user,
    report: {
      name: `${m.first_name ?? ""} ${m.last_name ?? ""}`.trim(),
      date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }),
      scores,
      answers,
    },
  };
}
