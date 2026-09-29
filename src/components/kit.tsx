import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BackLink } from "@/components/BackLink";
import SplitText from "@/components/SplitText";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Question } from "@/content";

// Pill CTA. Mobile first: full-width 48px on phones, content-width from sm.
// White pill with a soft white glow; glows brighter on hover, presses in on tap, arrow nudges forward.
const cta = cn(
  buttonVariants(),
  "group/cta h-12 w-full gap-2 rounded-full px-7 text-[15px] font-medium sm:h-11 sm:w-auto",
  "bg-white text-black shadow-[0_0_24px_-8px_rgb(255_255_255/0.6)] hover:bg-white",
  "transition-[transform,box-shadow,background-color] duration-200 hover:shadow-[0_0_36px_-4px_rgb(255_255_255/0.75)] active:scale-[0.97] active:bg-lilac",
);

function Arrow() {
  return <ArrowRight aria-hidden className="size-4 transition-transform duration-200 group-hover/cta:translate-x-0.5" />;
}

// Page/hero title: letters rise in on load (React Bits SplitText). `cosmic` keeps the gradient by animating per line.
export function Title({ text, cosmic, className }: { text: string; cosmic?: boolean; className?: string }) {
  return (
    <SplitText
      tag="h1"
      text={text}
      className={cn(cosmic && "[&_.split-line]:text-cosmic", className)}
      splitType={cosmic ? "lines" : "chars"}
      delay={cosmic ? 120 : 30}
      duration={0.8}
      ease="power3.out"
      from={{ opacity: 0, y: 40 }}
      to={{ opacity: 1, y: 0 }}
      threshold={0}
      rootMargin="0px"
      textAlign="center"
    />
  );
}

export function Page({
  badge,
  title,
  subtitle,
  wide,
  children,
}: {
  badge?: string;
  title: string;
  subtitle?: string;
  wide?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <main className={cn("mx-auto flex flex-col gap-6 px-4 py-4 sm:gap-8 sm:px-6 sm:py-12", wide ? "max-w-4xl" : "max-w-xl")}>
      <BackLink />
      <header className="flex flex-col items-center gap-4 text-center">
        {badge && <span className="badge">{badge}</span>}
        <Title text={title} className="text-[32px] leading-tight tracking-[-0.2px] sm:text-5xl" />
        {subtitle && <p className="text-lg text-ash">{subtitle}</p>}
      </header>
      {children}
    </main>
  );
}

export function Submit({ children }: { children: React.ReactNode }) {
  return (
    <Button type="submit" className={cn(cta, "sm:self-end")}>
      {children}
      <Arrow />
    </Button>
  );
}

export function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={cn(cta, "sm:self-center")}>
      {children}
      <Arrow />
    </Link>
  );
}

export function Notice({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="panel px-4 py-3 text-sm text-lavender">
      {children}
    </p>
  );
}

export function TextField({
  name,
  label,
  placeholder,
  hint,
  required,
}: {
  name: string;
  label: string;
  placeholder?: string;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} className="text-[15px] leading-snug text-lilac">
        {label}
      </Label>
      {hint && <p className="text-sm text-fog">{hint}</p>}
      <Textarea id={name} name={name} placeholder={placeholder} required={required} rows={4} />
    </div>
  );
}

// Image, or a placeholder circle until real art is added in content.ts.
export function Picture({ src, label, className }: { src: string; label: string; className?: string }) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element -- works with any Supabase bucket URL without next.config setup
    return <img src={src} alt={label} className={cn("aspect-square w-full rounded-full object-cover", className)} />;
  }
  return (
    <div
      aria-hidden
      className={cn("grid aspect-square w-full place-items-center rounded-full border border-fog/30 bg-indigo text-fog", className)}
    >
      <span className="text-xs">image</span>
    </div>
  );
}

// Selectable cards backed by native radio/checkbox inputs.
export function ChoiceGrid({
  name,
  type,
  options,
  required,
}: {
  name: string;
  type: "radio" | "checkbox";
  options: { id: string; name: string; description: string; image: string }[];
  required?: boolean;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {options.map((o) => (
        <label
          key={o.id}
          className="panel flex cursor-pointer flex-col items-center gap-3 p-4 text-center transition-colors hover:bg-indigo has-checked:bg-indigo has-checked:ring-1 has-checked:ring-lavender has-focus-visible:ring-2 has-focus-visible:ring-lavender"
        >
          <input type={type} name={name} value={o.id} required={required} className="sr-only" />
          <Picture src={o.image} label={o.name} className="max-w-24" />
          <span className="text-[15px] font-medium text-lilac">{o.name}</span>
          <span className="text-sm text-fog">{o.description}</span>
        </label>
      ))}
    </div>
  );
}

// Renders a list of content questions: free text, or single choice when `options` is set.
// Answers are stored as answer_1, answer_2, ... in question order.
export function Questions({ items }: { items: Question[] }) {
  return items.map((q, i) =>
    q.options ? (
      <fieldset key={i} className="flex flex-col gap-2">
        <legend className="mb-2 text-[15px] text-lilac">{q.text}</legend>
        {q.options.map((opt) => (
          <label key={opt} className="panel flex cursor-pointer items-center gap-3 px-4 py-3 text-ash has-checked:bg-indigo has-checked:text-lilac">
            <input type="radio" name={`answer_${i + 1}`} value={opt} required className="accent-lavender" />
            {opt}
          </label>
        ))}
      </fieldset>
    ) : (
      <TextField key={i} name={`answer_${i + 1}`} label={q.text} required />
    ),
  );
}

export function Intermission({ title, lines, href, button }: { title: string; lines: string[]; href: string; button: string }) {
  return (
    <Page title={title}>
      <div className="panel flex flex-col gap-3 p-6 text-center text-ash sm:p-8">
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
      <LinkButton href={href}>{button}</LinkButton>
    </Page>
  );
}
