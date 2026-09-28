import { saveStep } from "@/app/actions";
import { ChoiceGrid, Page, Submit, TextField } from "@/components/kit";
import { characterBuild } from "@/content";

// 3. Character build: choose 1 of 5 avatars + required justification
export default function AvatarPage() {
  const c = characterBuild.avatar;
  return (
    <Page badge={characterBuild.activityName} title={c.title} subtitle={c.instruction} wide>
      <form action={saveStep.bind(null, "avatar", "/character/customize")} className="flex flex-col gap-8">
        <ChoiceGrid name="avatar" type="radio" options={c.options} required />
        <TextField name="justification" label={c.justification} placeholder={c.justificationPlaceholder} required />
        <Submit>{c.button}</Submit>
      </form>
    </Page>
  );
}
