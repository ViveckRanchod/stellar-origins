import { LinkButton, Title } from "@/components/kit";
import { landing } from "@/content";

// 1. Landing page
export default function Landing() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center gap-10 px-4 text-center">
      <Title text={landing.welcome} cosmic className="text-5xl leading-[1.11] tracking-[-0.5px] sm:text-[72px]" />
      <div className="aurora w-full max-w-md" />
      <figure className="flex flex-col gap-3">
        <blockquote className="text-lg text-ash">“{landing.quote}”</blockquote>
        <figcaption className="text-sm text-fog">{landing.quoteBy}</figcaption>
      </figure>
      <LinkButton href="/signup">{landing.button}</LinkButton>
    </main>
  );
}
