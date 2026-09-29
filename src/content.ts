// ─────────────────────────────────────────────────────────────────────────────
// ALL SITE COPY LIVES HERE. Mirrors "Site content template.md" section by section.
// Replace every "TODO" string. Keys/ids (A–D, d1–d4) are referenced by the database,
// so change the text freely but keep ids stable once students have started.
//
// Images: put files in /public/... and use "/avatars/1.png", or paste a public
// Supabase Storage bucket URL ("https://<project>.supabase.co/storage/v1/object/public/...").
// Empty image = a placeholder circle is shown.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: "Stellar Origins",
};

// 1. Landing page
export const landing = {
  welcome: "Welcome to Stellar Origins",
  quote: "TODO: an inspiring quote goes here.",
  quoteBy: "TODO: Quote attribution",
  button: "Begin",
};

// 2. Account create
export const account = {
  title: "Create your account",
  intro: "TODO: Short intro text for sign-up.",
  fields: {
    email: { label: "Email", placeholder: "you@school.edu" },
    firstName: { label: "Name", placeholder: "TODO" },
    lastName: { label: "Surname", placeholder: "TODO" },
    password: { label: "Password", placeholder: "At least 6 characters" },
  },
  privacyNotice:
    "TODO: Privacy notice. Explain what is collected (name, email, answers), why, and how long it's kept.",
  privacyConsent: "I have read and agree to the privacy notice",
  button: "Create account",
  // Returning students
  loginTitle: "Welcome back",
  loginButton: "Sign in",
};

// Activity 1 – Character build (every choice needs a justification)
export const characterBuild = {
  activityName: "Character build",

  // 3. Choose your avatar (exactly 5)
  avatar: {
    title: "Choose your avatar",
    instruction: "TODO: Choose an avatar from the 5 below.",
    options: [
      { id: "avatar_1", name: "TODO Avatar 1", description: "TODO", image: "" },
      { id: "avatar_2", name: "TODO Avatar 2", description: "TODO", image: "" },
      { id: "avatar_3", name: "TODO Avatar 3", description: "TODO", image: "" },
      { id: "avatar_4", name: "TODO Avatar 4", description: "TODO", image: "" },
      { id: "avatar_5", name: "TODO Avatar 5", description: "TODO", image: "" },
    ],
    justification: "Why did you choose this avatar?",
    justificationPlaceholder: "TODO",
    button: "Next",
  },

  // 4. Customise character (8 options, pick 0–2)
  customize: {
    title: "Customise your character",
    instruction: "TODO: Choose none, one or two of the options below.",
    max: 2,
    options: [
      { id: "opt_1", name: "TODO Option 1", description: "TODO", image: "" },
      { id: "opt_2", name: "TODO Option 2", description: "TODO", image: "" },
      { id: "opt_3", name: "TODO Option 3", description: "TODO", image: "" },
      { id: "opt_4", name: "TODO Option 4", description: "TODO", image: "" },
      { id: "opt_5", name: "TODO Option 5", description: "TODO", image: "" },
      { id: "opt_6", name: "TODO Option 6", description: "TODO", image: "" },
      { id: "opt_7", name: "TODO Option 7", description: "TODO", image: "" },
      { id: "opt_8", name: "TODO Option 8", description: "TODO", image: "" },
    ],
    justification: "Why did you make these choices?",
    justificationPlaceholder: "TODO",
    button: "Next",
  },

  // 5. Where are you heading? (optional question)
  future: {
    title: "Where are you heading for the future?",
    question: "TODO: The future question.",
    placeholder: "TODO",
    hint: "This question is optional.",
    button: "Next",
  },
};

// 6. Intermission 1
export const intermission1 = {
  title: "TODO: Intermission title",
  lines: [
    "TODO: The next activity shows where you would fit.",
    "TODO: What you're about to do next.",
    "TODO: It's a 20-question quiz.",
  ],
  button: "Start the quiz",
};

// Activity 2 – Culture fit. Galaxy ids (A–D) are stored with every quiz answer.
export type GalaxyId = "A" | "B" | "C" | "D";

// Images: public-domain NASA/ESA Hubble photos, see public/galaxies/CREDITS.txt
export const galaxies: Record<GalaxyId, { name: string; tagline: string; description: string; image: string }> = {
  A: { name: "TODO Galaxy A", tagline: "TODO", description: "TODO: Profile description.", image: "/galaxies/whirlpool.jpg" },
  B: { name: "TODO Galaxy B", tagline: "TODO", description: "TODO: Profile description.", image: "/galaxies/sombrero.jpg" },
  C: { name: "TODO Galaxy C", tagline: "TODO", description: "TODO: Profile description.", image: "/galaxies/barred-spiral.jpg" },
  D: { name: "TODO Galaxy D", tagline: "TODO", description: "TODO: Profile description.", image: "/galaxies/antennae.jpg" },
};

export const quiz = {
  activityName: "Choose your culture fit",
  progress: (n: number, total: number) => `Question ${n} of ${total}`,
  next: "Next",
  last: "See my results",
};

// 7. The 20 questions. Answers are shuffled on screen; each is tied to one galaxy.
// Add/remove entries freely, the quiz length follows this array.
const q = (text: string): { text: string; answers: { text: string; galaxy: GalaxyId }[] } => ({
  text,
  answers: [
    { text: "TODO answer (Galaxy A)", galaxy: "A" },
    { text: "TODO answer (Galaxy B)", galaxy: "B" },
    { text: "TODO answer (Galaxy C)", galaxy: "C" },
    { text: "TODO answer (Galaxy D)", galaxy: "D" },
  ],
});
// ponytail: q() stamps placeholder answers. When filling in, replace q("...") with
// { text: "...", answers: [{ text: "...", galaxy: "A" }, ...] }.
export const questions = [
  q("TODO Question 1"),
  q("TODO Question 2"),
  q("TODO Question 3"),
  q("TODO Question 4"),
  q("TODO Question 5"),
  q("TODO Question 6"),
  q("TODO Question 7"),
  q("TODO Question 8"),
  q("TODO Question 9"),
  q("TODO Question 10"),
  q("TODO Question 11"),
  q("TODO Question 12"),
  q("TODO Question 13"),
  q("TODO Question 14"),
  q("TODO Question 15"),
  q("TODO Question 16"),
  q("TODO Question 17"),
  q("TODO Question 18"),
  q("TODO Question 19"),
  q("TODO Question 20"),
];

// 8. Results
export const results = {
  title: "Your galaxies",
  intro: "TODO: Intro text for results.",
  deckHint: "Swipe or tap the card to see your next galaxy",
  rank: (n: number) => `#${n} match`,
  button: "Continue",
};

// 9. Intermission 2
export const intermission2 = {
  title: "TODO: Intermission title",
  lines: ["TODO: You are going to be assigned a disruption!"],
  button: "Hit next",
};

// 10. Disruptions. Ids d1–d4 must match supabase/schema.sql.
export const disruptions: Record<string, { name: string; description: string; image: string }> = {
  d1: { name: "TODO Disruption 1", description: "TODO: Scenario description.", image: "" },
  d2: { name: "TODO Disruption 2", description: "TODO: Scenario description.", image: "" },
  d3: { name: "TODO Disruption 3", description: "TODO: Scenario description.", image: "" },
  d4: { name: "TODO Disruption 4", description: "TODO: Scenario description.", image: "" },
};

// A question is free text, unless it has `options` (then it's a single choice).
export type Question = { text: string; options?: string[] };

// Activity 3 – Disruption
export const disruption = {
  activityName: "Disruption",
  assignedTitle: "Your disruption",
  noneLeft: "All disruptions have been assigned. Please ask a facilitator.",
  assignedButton: "Continue",

  // 11. Answer a few questions. Same for every disruption.
  // ponytail: shared list; for per-disruption questions, move this into each disruption above.
  questions: {
    title: "Answer a few questions",
    intro: "TODO: Intro text.",
    items: [
      { text: "TODO Question 1" },
      { text: "TODO Question 2" },
      { text: "TODO Question 3 (choice example)", options: ["TODO A", "TODO B", "TODO C"] },
    ] as Question[],
    button: "Next",
  },

  // 12. Chat to your friends
  chat: {
    title: "Chat to your friends",
    instruction: "TODO: Instruction text.",
    prompts: ["TODO Discussion prompt 1", "TODO Discussion prompt 2", "TODO Discussion prompt 3"],
    time: "TODO: Suggested time, e.g. 10 minutes",
    button: "Next",
  },

  // 13. More questions (with group)
  group: {
    title: "More questions (with your group)",
    intro: "TODO: Intro text.",
    items: [{ text: "TODO Question 1" }, { text: "TODO Question 2" }, { text: "TODO Question 3" }] as Question[],
    button: "Submit",
  },
};

// 14. Final screen + results email
export const final = {
  title: "Thanks for participating!",
  message: "Check your inbox for your results.",
  closing: "TODO: Optional closing line.",
  email: {
    subject: "Your Stellar Origins results",
    intro: "TODO: Email intro text.",
  },
};
