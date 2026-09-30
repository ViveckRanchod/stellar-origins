import { LinkButton, Notice, Page } from "@/components/kit";
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
      <div className="panel flex flex-col gap-4 p-6 text-ash sm:p-8">
        {d.description.map((para) => (
          <p key={para}>{para}</p>
        ))}
      </div>
      <LinkButton href="/disruption/questions">{disruption.assignedButton}</LinkButton>
    </Page>
  );
}
