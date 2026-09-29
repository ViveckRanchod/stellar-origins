"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { questions } from "@/content";

// Every step in flow order (site flow.canvas). Back goes to the previous entry, not browser history,
// so it never lands on the login page or skips around after a redirect.
const steps = [
  "/",
  "/signup",
  "/character/avatar",
  "/character/customize",
  "/character/future",
  "/intermission/culture",
  ...questions.map((_, i) => `/quiz/${i + 1}`),
  "/results",
  "/intermission/disruption",
  "/disruption",
  "/disruption/questions",
  "/disruption/chat",
  "/disruption/group",
];

export function BackLink() {
  const i = steps.indexOf(usePathname());
  if (i < 1) return null; // landing, done, or an unknown page
  return (
    <Link
      href={steps[i - 1]}
      className="-ml-3 inline-flex h-11 items-center gap-2 self-start rounded-full px-3 text-[15px] text-fog transition-colors hover:text-lilac"
    >
      <ArrowLeft aria-hidden className="size-4" />
      Back
    </Link>
  );
}
