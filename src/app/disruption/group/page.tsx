import { submitFinal } from "@/app/actions";
import { Page, Questions, Submit } from "@/components/kit";
import { disruption } from "@/content";

// 13. More questions (with group) → Submit sends the results email
export default function GroupQuestions() {
  const c = disruption.group;
  return (
    <Page badge={disruption.activityName} title={c.title} subtitle={c.intro}>
      <form action={submitFinal} className="flex flex-col gap-8">
        <Questions items={c.items} />
        <Submit>{c.button}</Submit>
      </form>
    </Page>
  );
}
