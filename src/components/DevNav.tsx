import CardNav, { type CardNavItem } from "@/components/CardNav";

// Every page, grouped by activity, with the components it's built from (kit.tsx unless noted).
// ponytail: hand-kept list; update it when a page or its components change.
const items: CardNavItem[] = [
  {
    label: "Start & character",
    bgColor: "#10093a",
    textColor: "#f4f0ff",
    links: [
      { label: "Landing", href: "/", note: "Title, LinkButton" },
      { label: "Sign up / log in", href: "/signup", note: "Page, Notice, Submit, ui/Input" },
      { label: "Choose avatar", href: "/character/avatar", note: "Page, ChoiceGrid, TextField" },
      { label: "Customise", href: "/character/customize", note: "Page, ChoiceGrid, TextField" },
      { label: "Future self", href: "/character/future", note: "Page, TextField, Submit" },
    ],
  },
  {
    label: "Culture fit",
    bgColor: "#1a1150",
    textColor: "#f4f0ff",
    links: [
      { label: "Intermission", href: "/intermission/culture", note: "Intermission" },
      { label: "Quiz, question 1", href: "/quiz/1", note: "Page, Submit" },
      { label: "Quiz, question 20", href: "/quiz/20", note: "Page, Submit" },
      { label: "Results", href: "/results", note: "Title, Stack deck, LinkButton" },
    ],
  },
  {
    label: "Disruption",
    bgColor: "#241a66",
    textColor: "#f4f0ff",
    links: [
      { label: "Intermission", href: "/intermission/disruption", note: "Intermission" },
      { label: "Assigned disruption", href: "/disruption", note: "Page, Picture (uses a slot if signed in)" },
      { label: "Questions", href: "/disruption/questions", note: "Page, Questions, Submit" },
      { label: "Move and regroup", href: "/disruption/chat", note: "Page, Questions, Submit" },
      { label: "Done", href: "/done", note: "Title" },
    ],
  },
];

// Dev page nav (React Bits CardNav), shown everywhere while nobody else is using the site.
// It sits in the page flow; --nav-h lets full-height pages subtract it.
// ponytail: remove <DevNav /> from layout.tsx before real students use it (--nav-h then falls back to 0).
export function DevNav() {
  return (
    <>
      <style>{`:root{--nav-h:72px}`}</style>
      <CardNav
        logo="Stellar Origins · dev"
        items={items}
        cta={{ label: "Start", href: "/signup" }}
        className="mt-3"
        baseColor="#060317"
        menuColor="#f4f0ff"
        buttonBgColor="#ffffff"
        buttonTextColor="#000000"
      />
    </>
  );
}
