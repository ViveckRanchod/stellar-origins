import { Title } from "@/components/kit";
import { final, landing } from "@/content";

// 14. Final screen
export default function DonePage() {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-var(--nav-h,0px))] max-w-2xl flex-col items-center justify-center gap-6 px-4 text-center">
      <Title text={final.title} cosmic className="text-5xl leading-tight sm:text-[56px]" />
      <div className="aurora w-full max-w-sm" />
      <div className="flex flex-col gap-4 text-lg text-ash">
        {final.thanks.map((para) => (
          <p key={para}>{para}</p>
        ))}
      </div>
      <p className="text-sm text-fog">{final.message}</p>
      {/* eslint-disable-next-line @next/next/no-img-element -- small static logo, same as the landing page */}
      <img src={landing.logo} alt={landing.logoAlt} width={480} height={606} className="mt-4 h-auto w-36 sm:w-44" />
    </main>
  );
}
