import { saveStep } from "@/app/actions";
import { Page, Questions, Submit } from "@/components/kit";
import { disruption } from "@/content";

// 11. Answer a few questions (solo)
export default function DisruptionQuestions() {
  const c = disruption.questions;
  return (
    <Page badge={disruption.activityName} title={c.title} subtitle={c.intro}>
      <form action={saveStep.bind(null, "disruption-questions", "/disruption/chat")} className="flex flex-col gap-8">
        <Questions items={c.items} />
        <Submit>{c.button}</Submit>
      </form>
    </Page>
  );
}
