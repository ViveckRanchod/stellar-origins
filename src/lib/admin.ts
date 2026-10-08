import { createClient } from "@supabase/supabase-js";
import { admin, characterBuild, disruption, disruptions, galaxies, questions, type GalaxyId } from "@/content";
import { supabase } from "@/lib/supabase";

// Admin = signed in with one of the allowed emails.
// ponytail: "Confirm email" is off, so an admin email nobody has signed up with yet could be claimed by anyone.
// Both admins should have an account; turning email confirmation on closes this for good.
export async function adminUser() {
  const { data } = await (await supabase()).auth.getClaims();
  const email = data?.claims.email?.toLowerCase();
  return email && admin.emails.includes(email) ? email : null;
}

export type Student = {
  id: string;
  email: string;
  first: string;
  last: string;
  created: string;
  day: string;
  answers: Record<string, Record<string, string>>;
  disruption?: string;
  scores: Record<GalaxyId, number>; // percent per galaxy
};

const dayOf = (iso: string) => new Date(iso).toLocaleDateString("en-CA", { timeZone: admin.timeZone }); // YYYY-MM-DD

// Every student, grouped into sessions by sign-up day. Reads past the student-only rules with the admin key.
// ponytail: loads everyone on each visit, fine for a few hundred students; filter by day in SQL if it gets slow.
export async function loadStudents(): Promise<Student[] | null> {
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return null;
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, key, { auth: { persistSession: false } });

  const users = [];
  for (let page = 1; ; page++) {
    const { data, error } = await db.auth.admin.listUsers({ page, perPage: 1000 });
    if (error) throw error;
    users.push(...data.users);
    if (data.users.length < 1000) break;
  }
  // Supabase returns at most 1000 rows per request, so page through.
  const responses: { user_id: string; step: string; answer: Record<string, string> }[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db.from("responses").select("user_id, step, answer").range(from, from + 999);
    if (error) throw error;
    responses.push(...data);
    if (data.length < 1000) break;
  }
  const { data: slots } = await db.from("disruption_slots").select("user_id, disruption").not("user_id", "is", null);

  return users
    .filter((u) => !admin.emails.includes(u.email?.toLowerCase() ?? ""))
    .map((u) => {
      const answers = Object.fromEntries(responses.filter((r) => r.user_id === u.id).map((r) => [r.step, r.answer]));
      const quiz = questions.map((_, i) => answers[`q${i + 1}`]?.galaxy).filter(Boolean);
      const pct = (g: string) => (quiz.length ? Math.round((100 * quiz.filter((x) => x === g).length) / quiz.length) : 0);
      return {
        id: u.id,
        email: u.email ?? "",
        first: u.user_metadata.first_name ?? "",
        last: u.user_metadata.last_name ?? "",
        created: u.created_at,
        day: dayOf(u.created_at),
        answers,
        disruption: slots?.find((s) => s.user_id === u.id)?.disruption ?? answers.disruption?.disruption,
        scores: { A: pct("A"), B: pct("B"), C: pct("C"), D: pct("D") },
      };
    })
    .sort((a, b) => a.created.localeCompare(b.created));
}

// Reached the end (results emailed automatically), or already sent their results.
export const alreadyEmailed = (s: Student) => !!(s.answers.group || s.answers.disruption || s.answers.emailed);

export const topGalaxy = (s: Student) =>
  Object.values(s.scores).some(Boolean) ? (Object.keys(s.scores) as GalaxyId[]).sort((a, b) => s.scores[b] - s.scores[a])[0] : undefined;

const cb = characterBuild;
const reflection = disruption.questions.items;
const regroup = disruption.chat.items;

// One column per thing a student answered: the CSV export and the student detail view both use this list.
export const columns: [string, (s: Student) => string | number | undefined][] = [
  ["First name", (s) => s.first],
  ["Surname", (s) => s.last],
  ["Email", (s) => s.email],
  ["Signed up", (s) => new Date(s.created).toLocaleString("en-GB", { timeZone: admin.timeZone })],
  [`${cb.avatar.title}: star chosen`, (s) => s.answers.avatar?.avatar?.replace("avatar_", "Star ")],
  ["Why this star", (s) => s.answers.avatar?.justification],
  [`${cb.customize.title}: accessory`, (s) => admin.accessories[s.answers.customize?.accessory]],
  ["Why this accessory", (s) => s.answers.customize?.justification],
  [`${cb.future.title}: heading toward`, (s) => s.answers.future?.future],
  ["Why this is meaningful", (s) => s.answers.future?.future_why],
  ["What would need to be true", (s) => s.answers.future?.future_needs],
  ...(Object.keys(galaxies) as GalaxyId[]).map((g): (typeof columns)[number] => [`${galaxies[g].name} %`, (s) => s.scores[g]]),
  ["Disruption", (s) => (s.disruption ? disruptions[s.disruption]?.name : undefined)],
  ...reflection.map((q, i): (typeof columns)[number] => [`Reflection: ${q.title}`, (s) => s.answers["disruption-questions"]?.[`answer_${i + 1}`]]),
  ...regroup.map((q, i): (typeof columns)[number] => [`Regroup: ${q.title}`, (s) => s.answers.group?.[`answer_${i + 1}`]]),
];

// Student text starting with = + - @ would run as a formula in Excel, so it gets a leading '.
const cell = (v: unknown) => `"${String(v ?? "").replace(/^[=+\-@]/, "'$&").replaceAll('"', '""')}"`;
export const toCsv = (students: Student[]) =>
  [columns.map(([h]) => h), ...students.map((s) => columns.map(([, f]) => f(s)))].map((r) => r.map(cell).join(",")).join("\r\n");
