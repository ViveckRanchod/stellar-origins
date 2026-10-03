import { submitFinal } from "@/app/actions";
import { Page, Questions, Submit } from "@/components/kit";
import { disruption } from "@/content";
import { savedAnswer } from "@/lib/supabase";

// 12. Move and regroup: discuss with the others on the same disruption, then answer → Submit sends the results email
export default async function ChatPage() {
  const c = disruption.chat;
  const saved = await savedAnswer("group");
  return (
    <Page badge={disruption.activityName} title={c.title} subtitle={c.instruction}>
      <form action={submitFinal} className="flex flex-col gap-8">
        <Questions items={c.items} saved={saved} />
        <Submit>{c.button}</Submit>
      </form>
    </Page>
  );
}
