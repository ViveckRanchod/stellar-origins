import { LinkButton, Notice, Page, Picture } from "@/components/kit";
import { disruption, disruptions } from "@/content";
import { requireUser } from "@/lib/supabase";

// 10. Assigned disruption. assign_disruption() pops the next slot from the stack
// (see supabase/schema.sql) and returns the same one on every later visit.
export default async function DisruptionPage() {
  const { db } = await requireUser();
  const { data: id, error } = await db.rpc("assign_disruption");
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
      <div className="panel flex flex-col items-center gap-6 p-8 text-center">
        <Picture src={d.image} label={d.name} className="max-w-40" />
        <p className="text-ash">{d.description}</p>
      </div>
      <LinkButton href="/disruption/questions">{disruption.assignedButton}</LinkButton>
    </Page>
  );
}
