import Link from "next/link";
import { Download } from "lucide-react";
import { adminSendResults, adminSignIn } from "@/app/actions";
import { Notice, Submit } from "@/components/kit";
import { PasswordInput } from "@/components/PasswordInput";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { admin, characterBuild, characters, disruption, disruptions, galaxies, questions, type GalaxyId } from "@/content";
import { adminUser, alreadyEmailed, columns, loadStudents, topGalaxy, type Student } from "@/lib/admin";
import { cn } from "@/lib/utils";

// Chart colours in fixed order, checked for colour-blind separation on the dark panel. A thing keeps its colour.
const palette = ["#3987e5", "#d95926", "#199e70", "#c98500", "#d55181", "#9085e9"];
const none = "#54525f";
const galaxyIds = Object.keys(galaxies) as GalaxyId[];
const galaxyColor = (g: GalaxyId) => palette[galaxyIds.indexOf(g)];

// Admin results: sessions are days. ?day= picks the session, ?user= one student in it.
export default async function AdminPage({ searchParams }: PageProps<"/admin">) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

  if (!(await adminUser())) return <Login error={one(sp.error)} />;

  const all = await loadStudents();
  if (!all) return <Shell><Notice>SUPABASE_SERVICE_ROLE_KEY isn’t set here, so results can’t be read. It is set on the live site.</Notice></Shell>;

  const days = [...new Set(all.map((s) => s.day))].reverse(); // newest first
  const day = days.includes(one(sp.day) ?? "") ? one(sp.day)! : days[0];
  const students = all.filter((s) => s.day === day);
  const selected = students.find((s) => s.id === one(sp.user));

  return (
    <Shell>
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-2">
          <span className="badge self-start">Admin</span>
          <h1 className="text-3xl tracking-tight sm:text-4xl">{admin.title}</h1>
        </div>
        {days.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <form className="flex items-center gap-2">
              <Label htmlFor="day" className="text-ash">Session</Label>
              <select id="day" name="day" defaultValue={day} className="h-10 rounded-[5px] border border-input bg-midnight px-3 text-sm">
                {days.map((d) => (
                  <option key={d} value={d}>{longDate(d)} ({all.filter((s) => s.day === d).length})</option>
                ))}
              </select>
              <button className={cn(buttonVariants({ variant: "secondary" }), "h-10")}>Show</button>
            </form>
            <a href={`/admin/export?day=${day}`} className={cn(buttonVariants(), "h-10 gap-2")}>
              <Download aria-hidden className="size-4" /> Download CSV
            </a>
          </div>
        )}
      </header>

      {!days.length ? (
        <p className="panel p-6 text-ash">No students have signed up yet.</p>
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
          <div className="flex min-w-0 flex-col gap-6">{selected ? <StudentDetail s={selected} day={day} msg={one(sp.msg)} /> : <Overview students={students} />}</div>
          <aside className="panel order-first flex max-h-[70vh] flex-col gap-1 self-start overflow-y-auto p-3 lg:order-none lg:sticky lg:top-6">
            <h2 className="px-2 pb-2 font-mono text-xs tracking-widest text-fog uppercase">
              Students ({students.length}) · {students.filter((s) => !s.answers.group).length} not finished
            </h2>
            <FilterLink href={`/admin?day=${day}`} active={!selected}>All students</FilterLink>
            {students.map((s) => (
              <FilterLink key={s.id} href={`/admin?day=${day}&user=${s.id}`} active={s.id === selected?.id}>
                <span className="flex items-center justify-between gap-2">
                  <span className="truncate">{`${s.first} ${s.last}`.trim() || s.email}</span>
                  {!s.answers.group && <span className="shrink-0 rounded-[4px] bg-[#d95926]/20 px-1.5 text-xs text-[#f0a07e]">Not finished</span>}
                </span>
              </FilterLink>
            ))}
          </aside>
        </div>
      )}
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-10">{children}</main>;
}

function Login({ error }: { error?: string }) {
  return (
    <main className="mx-auto flex max-w-md flex-col gap-6 px-4 py-16">
      <h1 className="text-center text-3xl tracking-tight">{admin.loginTitle}</h1>
      <Notice>{error}</Notice>
      <form action={adminSignIn} className="panel flex flex-col gap-5 p-6 sm:p-8">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-ash">Email</Label>
          <Input id="email" name="email" type="email" autoComplete="email" required className="h-11 sm:h-10" />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-ash">Password</Label>
          <PasswordInput id="password" name="password" autoComplete="current-password" required className="h-11 sm:h-10" />
        </div>
        <Submit>{admin.loginButton}</Submit>
      </form>
    </main>
  );
}

function FilterLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link href={href} aria-current={active ? "page" : undefined} className={cn("shrink-0 truncate rounded-[5px] px-2 py-1.5 text-sm text-ash hover:bg-indigo hover:text-lilac", active && "bg-indigo text-lilac")}>
      {children}
    </Link>
  );
}

const longDate = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "long", year: "numeric" });

type Slice = { label: string; value: number; color: string };
const tally = (students: Student[], keys: { key: string; label: string; color: string }[], pick: (s: Student) => string | undefined): Slice[] =>
  keys.map((k) => ({ label: k.label, color: k.color, value: students.filter((s) => pick(s) === k.key).length }));

function Overview({ students }: { students: Student[] }) {
  const has = (step: string) => students.filter((s) => s.answers[step]).length;
  const lastQ = `q${questions.length}`;

  // How many times each quiz answer was picked: [question, galaxy] → count.
  const picks = questions.flatMap((q, i) =>
    q.answers.map((a) => ({ q: i + 1, question: q.text, answer: a.text, galaxy: a.galaxy, n: students.filter((s) => s.answers[`q${i + 1}`]?.galaxy === a.galaxy).length })),
  );
  const answered = picks.filter((p) => p.n);
  const most = answered.toSorted((a, b) => b.n - a.n)[0];
  const least = answered.toSorted((a, b) => a.n - b.n)[0];

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Signed up" value={students.length} />
        <Stat label="Built their star" value={has("avatar")} />
        <Stat label="Finished the quiz" value={has(lastQ)} />
        <Stat label="Finished everything" value={has("group")} />
      </div>

      <Section title="Activity answers">
        <div className="grid gap-4 sm:grid-cols-2">
          <Donut
            title={`${characterBuild.avatar.title}: star chosen`}
            data={tally(students, Array.from({ length: characters.count }, (_, i) => ({ key: `avatar_${i + 1}`, label: `Star ${i + 1}`, color: palette[i] })), (s) => s.answers.avatar?.avatar)}
          />
          <Donut
            title={`${characterBuild.customize.title}: accessory`}
            data={tally(students, Object.entries(admin.accessories).map(([key, label], i) => ({ key, label, color: key === "none" ? none : palette[i] })), (s) => s.answers.customize?.accessory)}
          />
          <Donut title="Top galaxy" data={tally(students, galaxyIds.map((g) => ({ key: g, label: galaxies[g].name, color: galaxyColor(g) })), topGalaxy)} />
          <Donut title={disruption.activityName} data={tally(students, Object.entries(disruptions).map(([key, d], i) => ({ key, label: d.name, color: palette[i] })), (s) => s.disruption)} />
        </div>
      </Section>

      <Section title="Quiz highlights">
        {most ? (
          <div className="grid gap-3 sm:grid-cols-2">
            <Highlight label="Most chosen answer" p={most} />
            <Highlight label="Least chosen answer" p={least} />
          </div>
        ) : (
          <p className="text-ash">No quiz answers yet.</p>
        )}
      </Section>

      <Section title="How far students got">
        <Bars
          max={students.length}
          rows={[
            ["Signed up", students.length],
            [characterBuild.avatar.title, has("avatar")],
            [characterBuild.customize.title, has("customize")],
            [characterBuild.future.title, has("future")],
            ["Quiz question 1", has("q1")],
            [`Quiz question ${questions.length}`, has(lastQ)],
            [disruption.questions.title, has("disruption-questions")],
            [disruption.chat.title, has("group")],
          ]}
        />
      </Section>

      <Section title="Galaxy picks per quiz question">
        <Legend items={galaxyIds.map((g) => ({ label: galaxies[g].name, color: galaxyColor(g) }))} />
        <ol className="flex flex-col gap-2">
          {questions.map((q, i) => {
            const row = picks.filter((p) => p.q === i + 1);
            const total = row.reduce((n, p) => n + p.n, 0);
            return (
              <li key={i} className="grid grid-cols-[2rem_1fr_2.5rem] items-center gap-2 text-sm" title={q.text}>
                <span className="font-num text-fog">Q{i + 1}</span>
                <div className="flex h-4 gap-0.5 overflow-hidden rounded-[4px] bg-indigo">
                  {row.filter((p) => p.n).map((p) => (
                    <div key={p.galaxy} style={{ width: `${(100 * p.n) / total}%`, background: galaxyColor(p.galaxy) }} title={`Q${i + 1} · ${galaxies[p.galaxy].name}: ${p.n} (${Math.round((100 * p.n) / total)}%)`} />
                  ))}
                </div>
                <span className="text-right font-num text-ash">{total}</span>
              </li>
            );
          })}
        </ol>
        <p className="text-xs text-fog">Hover a bar for counts. The number on the right is how many answered that question.</p>
      </Section>
    </>
  );
}

function StudentDetail({ s, day, msg }: { s: Student; day: string; msg?: string }) {
  return (
    <>
      <div className="flex flex-col gap-1">
        <Link href={`/admin?day=${day}`} className="text-sm text-lavender hover:text-lilac">← All students</Link>
        <h2 className="text-2xl">{`${s.first} ${s.last}`.trim() || s.email}</h2>
        <p className="text-ash">{s.email}</p>
      </div>
      <Notice>{msg}</Notice>
      {alreadyEmailed(s) ? (
        <p className="text-sm text-fog">Results email: already sent.</p>
      ) : (
        <form action={adminSendResults} className="panel flex flex-wrap items-center justify-between gap-3 p-4">
          <input type="hidden" name="day" value={day} />
          <input type="hidden" name="user" value={s.id} />
          <span className="text-sm text-ash">Didn’t finish, so no results email yet. Send what they have so far?</span>
          <button className={cn(buttonVariants(), "h-10")}>Send results email</button>
        </form>
      )}
      <Section title="Galaxies">
        <Bars max={100} suffix="%" rows={galaxyIds.map((g) => [galaxies[g].name, s.scores[g], galaxyColor(g)])} />
      </Section>
      <Section title="Answers">
        <dl className="flex flex-col gap-4">
          {columns.slice(3).filter(([h]) => !h.endsWith(" %")).map(([h, f]) => (
            <div key={h} className="flex flex-col gap-1">
              <dt className="text-sm text-fog">{h}</dt>
              <dd className="whitespace-pre-line text-lilac">{f(s) || "—"}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="panel flex flex-col gap-4 p-5 sm:p-6">
      <h2 className="font-mono text-xs tracking-widest text-fog uppercase">{title}</h2>
      {children}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="panel flex flex-col gap-1 p-4">
      <span className="font-num text-4xl text-lilac">{value}</span>
      <span className="text-sm text-ash">{label}</span>
    </div>
  );
}

function Legend({ items }: { items: { label: string; color: string }[] }) {
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-ash">
      {items.map((i) => (
        <li key={i.label} className="flex items-center gap-2">
          <span aria-hidden className="size-2.5 rounded-full" style={{ background: i.color }} />
          {i.label}
        </li>
      ))}
    </ul>
  );
}

// Donut drawn with a CSS conic gradient; the legend beside it doubles as the data table.
function Donut({ title, data }: { title: string; data: Slice[] }) {
  const total = data.reduce((n, d) => n + d.value, 0);
  let at = 0;
  const stops = data
    .filter((d) => d.value)
    .map((d) => {
      const from = at;
      at += (360 * d.value) / total;
      return `${d.color} ${from}deg ${at - 1.5}deg, transparent ${at - 1.5}deg ${at}deg`; // small gap between slices
    });
  const ring = total ? `conic-gradient(${stops.join(",")})` : "var(--color-indigo)";
  return (
    <figure className="flex flex-col gap-3 rounded-[5px] border border-border p-4">
      <figcaption className="text-sm text-lilac">{title}</figcaption>
      <div className="flex items-center gap-4">
        <div
          role="img"
          aria-label={`${title}: ${data.map((d) => `${d.label} ${d.value}`).join(", ")}`}
          className="relative size-28 shrink-0 rounded-full [mask:radial-gradient(farthest-side,transparent_62%,#000_63%)]"
          style={{ background: ring }}
        />
        <ul className="flex min-w-0 flex-col gap-1 text-sm">
          {data.map((d) => (
            <li key={d.label} className="flex items-center gap-2 text-ash" title={`${d.label}: ${d.value}`}>
              <span aria-hidden className="size-2.5 shrink-0 rounded-full" style={{ background: d.color }} />
              <span className="truncate">{d.label}</span>
              <span className="ml-auto pl-2 font-num text-lilac">{d.value}</span>
              <span className="w-9 text-right font-num text-fog">{total ? Math.round((100 * d.value) / total) : 0}%</span>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-xs text-fog">{total} answered</p>
    </figure>
  );
}

function Bars({ rows, max, suffix = "" }: { rows: [string, number, string?][]; max: number; suffix?: string }) {
  return (
    <ul className="flex flex-col gap-2">
      {rows.map(([label, value, color]) => (
        <li key={label} className="grid grid-cols-[minmax(7rem,12rem)_1fr_3rem] items-center gap-3 text-sm" title={`${label}: ${value}${suffix}`}>
          <span className="truncate text-ash">{label}</span>
          <div className="h-3 rounded-[4px] bg-indigo">
            <div className="h-3 rounded-[4px]" style={{ width: `${max ? (100 * value) / max : 0}%`, background: color ?? palette[0] }} />
          </div>
          <span className="text-right font-num text-lilac">{value}{suffix}</span>
        </li>
      ))}
    </ul>
  );
}

function Highlight({ label, p }: { label: string; p: { q: number; question: string; answer: string; galaxy: GalaxyId; n: number } }) {
  return (
    <div className="flex flex-col gap-2 rounded-[5px] border border-border p-4">
      <span className="font-mono text-xs tracking-widest text-fog uppercase">{label}</span>
      <p className="text-sm text-ash">Q{p.q}. {p.question}</p>
      <p className="text-lilac">“{p.answer}”</p>
      <p className="flex items-center gap-2 text-sm text-ash">
        <span aria-hidden className="size-2.5 rounded-full" style={{ background: galaxyColor(p.galaxy) }} />
        {galaxies[p.galaxy].name} · <span className="font-num text-lilac">{p.n}</span> picked it
      </p>
    </div>
  );
}
