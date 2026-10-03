import { saveStep } from "@/app/actions";
import { Page, Submit, TextField } from "@/components/kit";
import { characterBuild } from "@/content";
import { savedAnswer } from "@/lib/supabase";

// 5. Looking ahead: three optional questions
export default async function FuturePage() {
  const c = characterBuild.future;
  const saved = await savedAnswer("future");
  return (
    <Page badge={characterBuild.activityName} title={c.title} subtitle={c.hint}>
      <form action={saveStep.bind(null, "future", "/intermission/culture")} className="flex flex-col gap-8">
        <TextField name="future" label={c.question} placeholder={c.placeholder} defaultValue={saved.future} />
        <TextField name="future_why" label={c.why} defaultValue={saved.future_why} />
        <TextField name="future_needs" label={c.needs} defaultValue={saved.future_needs} />
        <Submit>{c.button}</Submit>
      </form>
    </Page>
  );
}
