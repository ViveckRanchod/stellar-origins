import { LinkButton, Notice, Page, Picture } from "@/components/kit";
import { disruption, disruptions } from "@/content";
import { pageUser } from "@/lib/supabase";

// 10. Assigned disruption. assign_disruption() pops the next slot from the stack
// (see supabase/schema.sql) and returns the same one on every later visit.
export default async function DisruptionPage() {
  const { db, user } = await pageUser();
  // Signed-out preview browsing: show the first disruption as a sample instead of using up a slot.
  const { data: id, error } = user ? await db.rpc("assign_disruption") : { data: Object.keys(disruptions)[0], error: null };
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
      <div className="panel flex flex-col items-center gap-6 p-6 text-center sm:p-8">
        <Picture src={d.image} label={d.name} className="max-w-40" />
        <p className="text-ash">{d.description}</p>
      </div>
      <LinkButton href="/disruption/questions">{disruption.assignedButton}</LinkButton>
    </Page>
  );
}
