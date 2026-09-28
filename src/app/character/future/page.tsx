import { saveStep } from "@/app/actions";
import { Page, Submit, TextField } from "@/components/kit";
import { characterBuild } from "@/content";

// 5. Where are you heading for the future? (optional)
export default function FuturePage() {
  const c = characterBuild.future;
  return (
    <Page badge={characterBuild.activityName} title={c.title}>
      <form action={saveStep.bind(null, "future", "/intermission/culture")} className="flex flex-col gap-8">
        <TextField name="future" label={c.question} placeholder={c.placeholder} hint={c.hint} />
        <Submit>{c.button}</Submit>
      </form>
    </Page>
  );
}
