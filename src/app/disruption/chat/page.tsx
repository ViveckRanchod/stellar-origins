import { submitFinal } from "@/app/actions";
import { Page, Questions, Submit } from "@/components/kit";
import { disruption } from "@/content";

// 12. Move and regroup: discuss with the others on the same disruption, then answer → Submit sends the results email
export default function ChatPage() {
  const c = disruption.chat;
  return (
    <Page badge={disruption.activityName} title={c.title} subtitle={c.instruction}>
      <form action={submitFinal} className="flex flex-col gap-8">
        <Questions items={c.items} />
        <Submit>{c.button}</Submit>
      </form>
    </Page>
  );
}
