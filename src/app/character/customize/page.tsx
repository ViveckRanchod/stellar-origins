import { saveCustomize } from "@/app/actions";
import { ChoiceGrid, Notice, Page, Submit, TextField } from "@/components/kit";
import { characterBuild } from "@/content";

// 4. Customise character: pick 0–2 of 8 options (or Skip) + required justification
export default async function CustomizePage({ searchParams }: PageProps<"/character/customize">) {
  const { error } = await searchParams;
  const c = characterBuild.customize;
  return (
    <Page badge={characterBuild.activityName} title={c.title} subtitle={c.instruction} wide>
      <Notice>{error}</Notice>
      <form action={saveCustomize.bind(null, c.max)} className="flex flex-col gap-8">
        <ChoiceGrid name="options" type="checkbox" options={c.options} />
        <label className="panel flex w-fit cursor-pointer items-center gap-3 self-center px-5 py-3 text-ash has-checked:bg-indigo has-checked:text-lilac has-checked:ring-1 has-checked:ring-lavender">
          <input type="checkbox" name="options" value="skip" className="accent-lavender" />
          {c.skip}
        </label>
        <TextField
          name="justification"
          label={c.justification}
          hint={c.justificationHint}
          placeholder={c.justificationPlaceholder}
          required
        />
        <Submit>{c.button}</Submit>
      </form>
    </Page>
  );
}
