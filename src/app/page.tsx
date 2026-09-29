import { LinkButton, Title } from "@/components/kit";
import { landing } from "@/content";

// 1. Landing page
export default function Landing() {
  return (
    <main className="mx-auto flex min-h-[calc(100dvh-var(--nav-h,0px))] max-w-3xl flex-col items-center gap-10 px-4 pb-8 text-center">
      <div className="flex flex-1 flex-col items-center justify-center gap-10 pt-10">
        <Title text={landing.welcome} cosmic className="text-5xl leading-[1.11] tracking-[-0.5px] sm:text-[72px]" />
        <div className="aurora w-full max-w-md" />
        <figure className="flex flex-col gap-3">
          <blockquote className="text-lg text-ash">“{landing.quote}”</blockquote>
          <figcaption className="text-sm text-fog">{landing.quoteBy}</figcaption>
        </figure>
        <LinkButton href="/signup">{landing.button}</LinkButton>
      </div>
      <footer className="flex flex-col items-center gap-3">
        <p className="font-mono text-[11px] tracking-[0.14em] text-lavender uppercase">{landing.presentedBy}</p>
        {/* eslint-disable-next-line @next/next/no-img-element -- small static logo, no optimisation needed */}
        <img src={landing.logo} alt={landing.logoAlt} width={480} height={606} className="h-auto w-36 sm:w-44" />
      </footer>
    </main>
  );
}
