import { final } from "@/content";

// 14. Final screen
export default function DonePage() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-2xl flex-col items-center justify-center gap-6 px-4 text-center">
      <h1 className="text-5xl leading-tight sm:text-[56px]">
        <span className="text-cosmic">{final.title}</span>
      </h1>
      <div className="aurora w-full max-w-sm" />
      <p className="text-lg text-ash">{final.message}</p>
      <p className="text-sm text-fog">{final.closing}</p>
    </main>
  );
}
