import { saveStep } from "@/app/actions";
import { Page, Submit, TextField } from "@/components/kit";
import { characterBuild } from "@/content";

// 5. Looking ahead: three optional questions
export default function FuturePage() {
  const c = characterBuild.future;
  return (
    <Page badge={characterBuild.activityName} title={c.title} subtitle={c.hint}>
      <form action={saveStep.bind(null, "future", "/intermission/culture")} className="flex flex-col gap-8">
        <TextField name="future" label={c.question} placeholder={c.placeholder} />
        <TextField name="future_why" label={c.why} />
        <TextField name="future_needs" label={c.needs} />
        <Submit>{c.button}</Submit>
      </form>
    </Page>
  );
}
