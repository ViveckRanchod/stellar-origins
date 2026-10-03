import { LinkButton, Notice, Page } from "@/components/kit";
import { disruption } from "@/content";
import { myDisruption } from "@/lib/supabase";

// 10. Assigned disruption. /disruption?d=d2 previews another one while signed out.
export default async function DisruptionPage({ searchParams }: PageProps<"/disruption">) {
  const d = await myDisruption((await searchParams).d);
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
