import { saveStep } from "@/app/actions";
import { Page, Questions, Submit } from "@/components/kit";
import { disruption } from "@/content";
import { myDisruption, savedAnswer } from "@/lib/supabase";

// 11. Answer a few questions (solo). The scenario opens in a pop-up (native popover, no JS) to look back at.
export default async function DisruptionQuestions() {
  const c = disruption.questions;
  const [d, saved] = await Promise.all([myDisruption(), savedAnswer("disruption-questions")]);
  return (
    <Page badge={disruption.activityName} title={c.title} subtitle={c.intro}>
      {d && (
        <>
          <button type="button" popoverTarget="my-disruption" className="panel self-center rounded-full px-5 py-2.5 text-sm text-lilac transition-colors hover:bg-indigo">
            {disruption.viewButton}
          </button>
          <div
            id="my-disruption"
            popover="auto"
            className="panel m-auto max-h-[85svh] w-[calc(100%-2rem)] max-w-xl overflow-y-auto p-6 text-ash backdrop:bg-black/70 sm:p-8"
          >
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-semibold text-lilac">{d.name}</h2>
              {d.description.map((para) => (
                <p key={para}>{para}</p>
              ))}
              <button type="button" popoverTarget="my-disruption" popoverTargetAction="hide" className="self-end rounded-full bg-white px-5 py-2 text-sm text-black">
                {disruption.closeButton}
              </button>
            </div>
          </div>
        </>
      )}
      <form action={saveStep.bind(null, "disruption-questions", "/disruption/chat")} className="flex flex-col gap-8">
        <Questions items={c.items} saved={saved} />
        <Submit>{c.button}</Submit>
      </form>
    </Page>
  );
}
