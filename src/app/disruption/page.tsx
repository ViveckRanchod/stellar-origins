import { LinkButton, Notice, Page, Picture } from "@/components/kit";
import { disruption, disruptions } from "@/content";
import { pageUser } from "@/lib/supabase";

// 10. Assigned disruption. assign_disruption() pops the next slot from the stack
// (see supabase/schema.sql) and returns the same one on every later visit.
export default async function DisruptionPage({ searchParams }: PageProps<"/disruption">) {
  const { db, user } = await pageUser();
  // Signed-out preview browsing: show a sample instead of using up a slot. /disruption?d=d2 previews another one.
  const { d: sample } = await searchParams;
  const { data: id, error } = user
    ? await db.rpc("assign_disruption")
    : { data: typeof sample === "string" && sample in disruptions ? sample : Object.keys(disruptions)[0], error: null };
  if (error) throw error;

  const d = disruptions[id as string];
  if (!d)
    return (
      <Page badge={disruption.activityName} title={disruption.assignedTitle}>
        <Notice>{disruption.noneLeft}</Notice>
      </Page>
    );

  return (
    <Page badge={disruption.activityName} title={d.name}>
      <div className="panel flex flex-col items-center gap-6 p-6 sm:p-8">
        <Picture src={d.image} label={d.name} className="max-w-40" />
        <div className="flex flex-col gap-4 text-ash">
          {d.description.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </div>
      </div>
      <LinkButton href="/disruption/questions">{disruption.assignedButton}</LinkButton>
    </Page>
  );
}
