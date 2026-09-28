import { LinkButton, Page, Picture } from "@/components/kit";
import { results } from "@/content";
import { galaxyScores } from "@/lib/supabase";

// 8. Results: percentage per galaxy, all galaxy profiles, highest first
export default async function ResultsPage() {
  const scores = await galaxyScores();
  return (
    <Page title={results.title} subtitle={results.intro} wide>
      <div className="grid gap-4 sm:grid-cols-2">
        {scores.map((g, i) => (
          <article key={g.id} className="panel flex flex-col gap-4 p-6 sm:p-8">
            <div className="flex items-center gap-4">
              <Picture src={g.image} label={g.name} className="w-14" />
              <div className="flex flex-col">
                <h2 className="text-2xl">{g.name}</h2>
                <p className="text-sm text-fog">{g.tagline}</p>
              </div>
              <span className={`ml-auto font-heading text-[32px] ${i === 0 ? "text-cosmic" : "text-lilac"}`}>{g.percent}%</span>
            </div>
            <div className="h-px bg-steel">
              <div className="h-px bg-lavender" style={{ width: `${g.percent}%` }} />
            </div>
            <p className="text-[15px] text-ash">{g.description}</p>
          </article>
        ))}
      </div>
      <LinkButton href="/intermission/disruption">{results.button}</LinkButton>
    </Page>
  );
}
