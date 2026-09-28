import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { Question } from "@/content";

// Mobile first: full-width 44px tap targets on phones, compact from sm up.
const cta = cn(buttonVariants(), "h-11 w-full px-4 text-[15px] sm:h-10 sm:w-auto");

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
    <main className={cn("mx-auto flex flex-col gap-6 px-4 py-10 sm:gap-8 sm:px-6 sm:py-24", wide ? "max-w-4xl" : "max-w-xl")}>
      <header className="flex flex-col items-center gap-4 text-center">
        {badge && <span className="badge">{badge}</span>}
        <h1 className="text-[32px] leading-tight tracking-[-0.2px] sm:text-5xl">{title}</h1>
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
    </Button>
  );
}

export function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className={cn(cta, "sm:self-center")}>
      {children}
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
      <div className="panel flex flex-col gap-3 p-8 text-center text-ash">
        {lines.map((l) => (
          <p key={l}>{l}</p>
        ))}
      </div>
      <LinkButton href={href}>{button}</LinkButton>
    </Page>
  );
}
