import { cookies } from "next/headers";
import { saveStep } from "@/app/actions";
import { Page, Submit, TextField } from "@/components/kit";
import { Wardrobe } from "@/components/Wardrobe";
import { characterBuild } from "@/content";
import { savedAnswer } from "@/lib/supabase";

// 4. Customise character: one accessory (or none) + required justification
export default async function CustomizePage() {
  const c = characterBuild.customize;
  // Chosen on the previous step (see saveStep). ponytail: falls back to character 1 when browsing without one.
  const character = Number((await cookies()).get("character")?.value.split(".")[0]) || 1;
  const saved = await savedAnswer("customize");
  return (
    <Page badge={characterBuild.activityName} title={c.title} subtitle={c.instruction} wide hideCharacter>
      <form action={saveStep.bind(null, "customize", "/character/future")} className="flex flex-col gap-8">
        <Wardrobe character={character} saved={Number(saved.accessory?.split("_")[1]) || 0} />
        <TextField
          name="justification"
          label={c.justification}
          hint={c.justificationHint}
          placeholder={c.justificationPlaceholder}
          defaultValue={saved.justification}
          required
        />
        <Submit>{c.button}</Submit>
      </form>
    </Page>
  );
}
