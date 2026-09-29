import Link from "next/link";

// Every page in flow order, with the components it's built from (kit.tsx unless noted).
// ponytail: hand-kept list; update it when a page or its components change.
const pages = [
  { path: "/", name: "Landing", uses: "LinkButton" },
  { path: "/signup", name: "Sign up / log in", uses: "Page, Notice, Submit, ui/Input, ui/Label" },
  { path: "/character/avatar", name: "Choose avatar", uses: "Page, ChoiceGrid, TextField, Submit" },
  { path: "/character/customize", name: "Customise", uses: "Page, ChoiceGrid, TextField, Notice, Submit" },
  { path: "/character/future", name: "Future self", uses: "Page, TextField, Submit" },
  { path: "/intermission/culture", name: "Intermission: culture", uses: "Intermission" },
  { path: "/quiz/1", name: "Quiz (1 of 20)", uses: "Page, Submit" },
  { path: "/results", name: "Results", uses: "Page, Picture, LinkButton" },
  { path: "/intermission/disruption", name: "Intermission: disruption", uses: "Intermission" },
  { path: "/disruption", name: "Assigned disruption (uses a slot if signed in)", uses: "Page, Picture, Notice, LinkButton" },
  { path: "/disruption/questions", name: "Disruption questions", uses: "Page, Questions, Submit" },
  { path: "/disruption/chat", name: "Group chat", uses: "Page, LinkButton" },
  { path: "/disruption/group", name: "Group questions", uses: "Page, Questions, Submit" },
  { path: "/done", name: "Done", uses: "(plain markup)" },
];

// Floating page index, shown everywhere including production while nobody else is using the site.
// ponytail: remove <DevNav /> from layout.tsx before real students use it.
export function DevNav() {
  return (
    <details className="fixed top-4 right-4 z-50">
      <summary className="badge h-11 cursor-pointer list-none px-4">Dev · pages</summary>
      <nav className="panel absolute top-full right-0 mt-2 max-h-[70dvh] w-[min(22rem,calc(100vw-2rem))] overflow-y-auto p-2">
        <p className="px-3 py-2 text-xs text-fog">All pages use Galaxy (background). On production you need to be signed in to open most pages.</p>
        <ul>
          {pages.map((p) => (
            <li key={p.path}>
              <Link href={p.path} className="flex flex-col rounded-[5px] px-3 py-2 hover:bg-indigo">
                <span className="text-sm text-lilac">{p.name}</span>
                <span className="font-mono text-[11px] text-fog">
                  {p.path} · {p.uses}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </details>
  );
}
