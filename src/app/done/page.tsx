import { restart } from "@/app/actions";
import { Submit, Title } from "@/components/kit";
import { final } from "@/content";
import { browseAll } from "@/lib/supabase";

// 14. Final screen
export default function DonePage() {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-var(--nav-h,0px))] max-w-2xl flex-col items-center justify-center gap-6 px-4 text-center">
      <Title text={final.title} cosmic className="text-5xl leading-tight sm:text-[56px]" />
      <div className="aurora w-full max-w-sm" />
      <p className="text-lg text-ash">{final.message}</p>
      <p className="text-sm text-fog">{final.closing}</p>
      {browseAll && (
        <form action={restart} className="mt-6 flex flex-col">
          <Submit>{final.restart}</Submit>
        </form>
      )}
    </main>
  );
}
