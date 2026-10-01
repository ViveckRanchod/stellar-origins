"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ArrowLeft } from "lucide-react";

const KEY = "signup-draft";
const FIELDS = ["email", "first_name", "last_name"]; // never the password

// Keeps what was typed in the sign-up / sign-in form (for this tab) so a trip to the privacy page and back loses nothing.
export function KeepDraft() {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const form = ref.current?.closest("form");
    if (!form) return;
    let draft: Record<string, string> = {};
    try {
      draft = JSON.parse(sessionStorage.getItem(KEY) ?? "{}");
    } catch {}
    for (const name of FIELDS) {
      const input = form.elements.namedItem(name) as HTMLInputElement | null;
      if (input && !input.value && draft[name]) input.value = draft[name];
    }
    const save = (e: Event) => {
      const { name, value } = e.target as HTMLInputElement;
      if (!FIELDS.includes(name)) return;
      draft[name] = value;
      try {
        sessionStorage.setItem(KEY, JSON.stringify(draft));
      } catch {}
    };
    form.addEventListener("input", save);
    return () => form.removeEventListener("input", save);
  }, []);
  return <span ref={ref} hidden />;
}

// Back from the privacy page. Arrived from our own link → step back in history (so the browser's own back
// button stays in step too); opened directly → go to the sign-up or sign-in page.
export function PrivacyBack({ href, label, fromLink }: { href: string; label: string; fromLink: boolean }) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={(e) => {
        if (fromLink && window.history.length > 1) {
          e.preventDefault();
          router.back();
        }
      }}
      className="-ml-3 inline-flex h-11 items-center gap-2 self-start rounded-full px-3 text-[15px] text-fog transition-colors hover:text-lilac"
    >
      <ArrowLeft aria-hidden className="size-4" />
      {label}
    </Link>
  );
}
