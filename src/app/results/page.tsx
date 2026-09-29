import { BackLink } from "@/components/BackLink";
import { LinkButton, Title } from "@/components/kit";
import Stack from "@/components/Stack";
import { results } from "@/content";
import { galaxyScores } from "@/lib/supabase";

// 8. Results: a full-height deck of galaxy cards, top match on top, then lower scores underneath.
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
        <p className="max-w-prose text-[15px] text-lilac/80">{g.description}</p>
      </div>
    </article>
  ));

  return (
    <main className="mx-auto flex h-[calc(100dvh-var(--nav-h,0px))] max-w-3xl flex-col gap-4 [overflow-x:clip] px-4 py-4 sm:gap-6 sm:px-6 sm:py-8">
      <BackLink />
      <header className="flex flex-col items-center gap-2 text-center">
        <Title text={results.title} className="text-[32px] leading-tight tracking-[-0.2px] sm:text-5xl" />
        <p className="text-ash">{results.intro}</p>
        <p className="font-mono text-[11px] tracking-[0.14em] text-fog uppercase">{results.deckHint}</p>
      </header>

      {/* Stack puts the last card on top, so hand it lowest score first. Screen readers get the plain list below. */}
      <div aria-hidden className="relative mx-5 my-2 min-h-0 flex-1 sm:mx-auto sm:my-4 sm:w-full sm:max-w-xl">
        <Stack cards={[...cards].reverse()} sendToBackOnClick sensitivity={120} />
      </div>
      <ol className="sr-only">
        {scores.map((g, i) => (
          <li key={g.id}>
            {results.rank(i + 1)}: {g.name}, {g.percent}%. {g.tagline}. {g.description}
          </li>
        ))}
      </ol>

      <LinkButton href="/intermission/disruption">{results.button}</LinkButton>
    </main>
  );
}
