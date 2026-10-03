import { saveStep } from "@/app/actions";
import { AvatarPicker } from "@/components/AvatarPicker";
import { Page, Submit, TextField } from "@/components/kit";
import { characterBuild } from "@/content";
import { savedAnswer } from "@/lib/supabase";

// 3. Character build: choose 1 of 5 characters from the spinning menu + required justification
export default async function AvatarPage() {
  const c = characterBuild.avatar;
  const saved = await savedAnswer("avatar");
  return (
    <Page badge={characterBuild.activityName} title={c.title} subtitle={c.instruction} wide hideCharacter>
      <form action={saveStep.bind(null, "avatar", "/character/customize")} className="flex flex-col gap-8">
        <AvatarPicker saved={Number(saved.avatar?.split("_")[1]) - 1} />
        <TextField name="justification" label={c.justification} placeholder={c.justificationPlaceholder} defaultValue={saved.justification} required />
        <Submit>{c.button}</Submit>
      </form>
    </Page>
  );
}
