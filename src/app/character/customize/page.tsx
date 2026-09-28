import { saveCustomize } from "@/app/actions";
import { ChoiceGrid, Notice, Page, Submit, TextField } from "@/components/kit";
import { characterBuild } from "@/content";

// 4. Customise character: pick 0–2 of 8 options + required justification
export default async function CustomizePage({ searchParams }: PageProps<"/character/customize">) {
  const { error } = await searchParams;
  const c = characterBuild.customize;
  return (
    <Page badge={characterBuild.activityName} title={c.title} subtitle={c.instruction} wide>
      <Notice>{error}</Notice>
      <form action={saveCustomize.bind(null, c.max)} className="flex flex-col gap-8">
        <ChoiceGrid name="options" type="checkbox" options={c.options} />
        <TextField name="justification" label={c.justification} placeholder={c.justificationPlaceholder} required />
        <Submit>{c.button}</Submit>
      </form>
    </Page>
  );
}
