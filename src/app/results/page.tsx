import { BackLink } from "@/components/BackLink";
import { LinkButton, Title } from "@/components/kit";
import Stack from "@/components/Stack";
import { galaxyHeadings, results } from "@/content";
import { galaxyScores } from "@/lib/supabase";

// Turns **word** into bold, so profile text in content.ts can mark key words.
function Rich({ text }: { text: string }) {
  return text.split(/\*\*(.+?)\*\*/).map((part, i) => (i % 2 ? <strong key={i} className="font-semibold text-lilac">{part}</strong> : part));
}

// 8. Results: a deck of galaxy cards (top match on top), then every full profile, highest score first.
export default async function ResultsPage() {
  const scores = await galaxyScores(); // highest first

  const cards = scores.map((g, i) => (
    <article key={g.id} className="relative flex h-full w-full flex-col justify-end overflow-hidden bg-midnight select-none">
      {/* eslint-disable-next-line @next/next/no-img-element -- plain img keeps object-cover simple for the deck */}
      <img src={g.image} alt="" draggable={false} className="pointer-events-none absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
      <div className="relative flex flex-col gap-3 p-5 sm:p-10">
        <span className="badge w-fit">{results.rank(i + 1)}</span>
        <div className="flex items-end justify-between gap-4">
          <div className="flex min-w-0 flex-col gap-1">
            <h2 className="text-[28px] leading-tight sm:text-5xl">{g.name}</h2>
            <p className="text-ash">{g.tagline}</p>
          </div>
          <span className={`font-num text-[56px] leading-none font-semibold sm:text-8xl ${i === 0 ? "text-cosmic" : "text-lilac"}`}>{g.percent}%</span>
        </div>
        <div className="h-px bg-white/15">
          <div className="h-px bg-lavender" style={{ width: `${g.percent}%` }} />
        </div>
      </div>
    </article>
  ));

  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-4 [overflow-x:clip] px-4 py-4 sm:gap-6 sm:px-6 sm:py-8">
      <BackLink />
      <header className="flex flex-col items-center gap-2 text-center">
        <Title text={results.title} className="text-[32px] leading-tight tracking-[-0.2px] sm:text-5xl" />
        <p className="text-ash">{results.intro}</p>
        <p className="font-mono text-[11px] tracking-[0.14em] text-fog uppercase">{results.deckHint}</p>
      </header>

      {/* Stack puts the last card on top, so hand it lowest score first. Screen readers get the plain list below. */}
      <div aria-hidden className="relative mx-5 my-2 h-[min(60dvh,520px)] shrink-0 sm:mx-auto sm:my-4 sm:w-full sm:max-w-xl">
        <Stack cards={[...cards].reverse()} sendToBackOnClick sensitivity={120} />
      </div>

      <section className="flex flex-col gap-4">
        <h2 className="text-center text-2xl">{results.profilesTitle}</h2>
        {scores.map((g, i) => (
          <article key={g.id} className="panel flex flex-col gap-4 p-5 text-[15px] text-ash sm:p-8">
            <header className="flex items-baseline justify-between gap-4">
              <div className="flex min-w-0 flex-col gap-1">
                <span className="font-mono text-[11px] tracking-[0.14em] text-fog uppercase">{results.rank(i + 1)}</span>
                <h3 className="text-xl text-lilac sm:text-2xl">{g.name}</h3>
                <p className="italic">{g.tagline}</p>
              </div>
              <span className={`font-num text-3xl font-semibold ${i === 0 ? "text-cosmic" : "text-lilac"}`}>{g.percent}%</span>
            </header>
            {i === 0 && <p className="font-semibold text-lilac">{g.topMatch}</p>}
            <p><Rich text={g.description} /></p>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-lilac">{galaxyHeadings.feel}:</h4>
              <ul className="list-disc space-y-1 pl-5">{g.feel.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <div className="flex flex-col gap-2">
              <h4 className="font-semibold text-lilac">{galaxyHeadings.offered}:</h4>
              <ul className="list-disc space-y-1 pl-5">{g.offered.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
            <p><strong className="font-semibold text-lilac">{galaxyHeadings.success}</strong> {g.success}</p>
            <p>{g.closing}</p>
          </article>
        ))}
      </section>

      <LinkButton href="/intermission/disruption">{results.button}</LinkButton>
    </main>
  );
}
