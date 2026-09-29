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
// (A = galaxy 1, B = 2, C = 3, D = 4.)
export type GalaxyId = "A" | "B" | "C" | "D";

// A galaxy profile on the results page. Wrap words in **double stars** to show them in bold.
export type Galaxy = {
  name: string;
  tagline: string;
  topMatch: string; // shown first, only on the student's highest-scoring galaxy
  description: string;
  feel: string[]; // "What working here would likely feel like"
  offered: string[]; // "What you could expect to be offered"
  success: string; // "How success gets defined here"
  closing: string;
  image: string;
};

export const galaxyHeadings = {
  feel: "What working here would likely feel like",
  offered: "What you could expect to be offered",
  success: "How success gets defined here:",
};

// Images: placeholder public-domain NASA/ESA Hubble photos until the real ones arrive, see public/galaxies/CREDITS.txt
export const galaxies: Record<GalaxyId, Galaxy> = {
  A: {
    name: "Andromeda Galaxy",
    tagline: "“With every voice we forge ahead together.”",
    topMatch:
      "You will most likely fit into Andromeda Galaxy, since you have more alignment with connection, collaboration, and belonging than with competition, structure, or constant reinvention.",
    description:
      "Andromeda Galaxy is a people-first culture built on trust, respect, diversity and inclusion, where relationships come first and success is shared rather than individually claimed. Meaning here comes through **Unification**: people feel their work matters because they belong to something bigger than themselves, and because their contributions help others succeed.",
    feel: [
      "Team-based collaboration, open communication, and a real say in decisions that affect your work",
      "Leaders who act as mentors and coaches, not just directors",
      "A strong social support network and a genuine sense of community",
    ],
    offered: [
      "Flexible working arrangements and additional wellbeing leave",
      "Peer mentoring, volunteer days, and ongoing professional development support",
    ],
    success:
      "not by individual competition, but by how well you collaborate, support colleagues, and contribute to the people and communities around you.",
    closing:
      "If this feels close to how you already think about your ideal career, that’s not a coincidence; it reflects real alignment between what you value and how this kind of organisation actually operates. If parts of it feel off, that’s useful too; it tells you something about what you don’t want, which matters just as much.",
    image: "/galaxies/whirlpool.jpg",
  },
  B: {
    name: "Phoenix Cluster",
    tagline: "“Growing daily, flourishing for tomorrow.”",
    topMatch:
      "You will most likely fit into the Phoenix Cluster, since you align more with growth, curiosity, and innovation than with stability, structure, or shared consensus.",
    description:
      "Phoenix Cluster is a culture built around learning, experimentation, and possibility. Meaning here comes through **Individuation**: people find fulfilment in their own development, in mastering new skills, and in seeing themselves grow through the challenges their work presents.",
    feel: [
      "High autonomy, project-based work, and permission to try things that might not work",
      "Leaders who act as visionaries and sponsors of new ideas, rather than close supervisors",
      "A fast-moving, flexible environment that rewards curiosity over caution",
    ],
    offered: [
      "Study assistance, conference funding, and professional certification support",
      "Innovation and research grants, plus a personal learning budget",
    ],
    success:
      "by innovative outcomes, creative problem-solving, and how much you’ve learned, not just by what you’ve delivered.",
    closing:
      "If this feels close to how you already think about your ideal career, that’s real alignment between what you value and how this kind of organisation operates, not a coincidence. If parts of it feel off, that’s worth noting too, it points to what you’d find frustrating rather than energising.",
    image: "/galaxies/sombrero.jpg",
  },
  C: {
    name: "Nexus Point",
    tagline: "“As one we rise, bound for greatness.”",
    topMatch:
      "You will most likely fit into Nexus Point, since you have more alignment with achievement, ambition, and visible impact than with steady process or collective belonging.",
    description:
      "Nexus Point is a fast-paced, results-driven culture where performance is visible and rewarded. Meaning here comes through **Contribution**: people find fulfilment in seeing clear evidence that their effort produced something that mattered, whether that’s a client outcome, a target hit, or a measurable shift in performance.",
    feel: [
      "Goal-oriented, high-performance, fast-moving work",
      "Leaders who act as competitors and strategic drivers, pushing for ambitious outcomes",
      "A strong focus on client results and visible success",
    ],
    offered: [
      "Performance-based bonuses, referral incentives, and formal recognition programs",
      "Fast-track leadership development and executive mentoring",
      "Above-market pay, weighted toward performance-based reward rather than flat security",
    ],
    success:
      "by achieving strategic goals, growth, and measurable impact, success is something you can point to and prove.",
    closing:
      "If this feels close to how you already think about your ideal career, that’s real alignment, not a coincidence. If parts of it feel off, particularly the pace or the emphasis on visible achievement, that’s worth paying attention to as well.",
    image: "/galaxies/barred-spiral.jpg",
  },
  D: {
    name: "Triangulum Galaxy",
    tagline: "“Connected through trust, built for purpose.”",
    topMatch:
      "You will most likely fit into Triangulum Galaxy, since you have more alignment with stability, integrity, and professional structure than with fast change or high-risk experimentation.",
    description:
      "Triangulum Galaxy is a structured, dependable culture built on integrity, accountability, and consistency. Meaning here comes through **Self-Connection**: people find fulfilment when their work reflects who they are, and when they can act with integrity inside clear, dependable systems.",
    feel: [
      "Clearly defined roles, established procedures, and predictable expectations",
      "Leaders who act as coordinators and stewards, ensuring things run properly and ethically",
      "Long-term planning and a stable, structured environment",
    ],
    offered: [
      "Structured career pathways and strong employment security",
      "Retirement benefits, wellness programs, and long-service recognition",
      "Predictable salary progression, weighted toward long-term security rather than performance bonuses",
    ],
    success:
      "by reliability, consistency, and professional conduct, doing things properly, and being someone others can depend on.",
    closing:
      "If this feels close to how you already think about your ideal career, that’s real alignment, not a coincidence. If parts of it feel off, particularly the pace of change or the emphasis on structure, that’s useful to notice too.",
    image: "/galaxies/antennae.jpg",
  },
};

export const quiz = {
  activityName: "Chart Your Galaxy",
  progress: (n: number, total: number) => `Question ${n} of ${total}`,
  next: "Next",
  last: "See my results",
};

// 7. The 20 questions. Answers are shuffled on screen; each is tied to one galaxy.
// Add/remove entries freely, the quiz length follows this array.
// q(question, [Galaxy A answer, Galaxy B answer, Galaxy C answer, Galaxy D answer])
const q = (text: string, [a, b, c, d]: [string, string, string, string]) => ({
  text,
  answers: [
    { text: a, galaxy: "A" as GalaxyId },
    { text: b, galaxy: "B" as GalaxyId },
    { text: c, galaxy: "C" as GalaxyId },
    { text: d, galaxy: "D" as GalaxyId },
  ],
});
export const questions = [
  q("What type of accomplishment would make you most proud?", [
    "Completing an important project alongside a close-knit team that supported one another throughout the process.",
    "Being part of the first team to develop a groundbreaking solution nobody has attempted before.",
    "Delivering results that immediately improved organisational performance.",
    "Ensuring a project was completed correctly, ethically, and according to established standards.",
  ]),
  q("Which organisational benefit would add the most value to your career?", [
    "Flexible work arrangements that support wellbeing and work-life balance.",
    "Ongoing education funding and opportunities to continuously learn.",
    "Recognition programs and rewards for high performance.",
    "Structured career pathways and long-term employment security.",
  ]),
  q("At work, I am most motivated when...", [
    "People collaborate and achieve goals together.",
    "I am learning and pushing beyond what I thought was possible.",
    "I can see the direct impact of my efforts.",
    "I know I am fulfilling my responsibilities to a high standard.",
  ]),
  q("Which statement resonates most?", [
    "“Success is something we achieve together.”",
    "“Success comes from exploring new possibilities.”",
    "“Success comes from delivering exceptional results.”",
    "“Success comes from doing things properly and consistently.”",
  ]),
  q("An ideal workplace would be one that...", [
    "Creates strong relationships and values community.",
    "Encourages experimentation and innovation.",
    "Operates at a fast pace with ambitious goals.",
    "Has clear expectations and dependable systems.",
  ]),
  q("Which leader would inspire you most?", [
    "A leader who mentors and supports people.",
    "A leader who encourages bold thinking and new ideas.",
    "A leader who drives performance and achievement.",
    "A leader who models professionalism and integrity.",
  ]),
  q("What do you value most in colleagues?", [
    "Trust and cooperation.",
    "Curiosity and creativity.",
    "Drive and ambition.",
    "Reliability and accountability.",
  ]),
  q("Which work environment sounds most appealing?", [
    "A collaborative community where everyone contributes.",
    "A dynamic environment where new ideas constantly emerge.",
    "A competitive workplace focused on results.",
    "A stable organisation with clear structures and roles.",
  ]),
  q("What type of contribution is most meaningful to you?", [
    "Strengthening a team and helping others succeed.",
    "Creating something innovative that changes how things are done.",
    "Producing outcomes that create visible success.",
    "Maintaining quality and consistency that others can depend upon.",
  ]),
  q("How would you prefer to spend your professional development budget?", [
    "Team retreats and collaborative learning experiences.",
    "Advanced certifications and exploratory learning opportunities.",
    "Leadership and performance coaching.",
    "Professional accreditation and long-term career development.",
  ]),
  q("What keeps people engaged at work?", [
    "Strong relationships and belonging.",
    "Opportunities to grow and innovate.",
    "Achievement, recognition, and success.",
    "Stability, fairness, and clear expectations.",
  ]),
  q("If you joined a new organisation, what would you be drawn to first?", [
    "The quality of relationships.",
    "The openness to new ideas.",
    "The pace and energy.",
    "The professionalism and structure.",
  ]),
  q("What makes work truly meaningful?", [
    "Feeling connected to others.",
    "Becoming the best version of myself.",
    "Making a significant impact.",
    "Acting consistently with my values and responsibilities.",
  ]),
  q("Which organisation would you choose?", [
    "An organisation known for employee wellbeing and collaboration.",
    "An organisation known for innovation and being first.",
    "An organisation known for market leadership and success.",
    "An organisation known for reliability and reputation.",
  ]),
  q("What type of challenge excites you most?", [
    "Building relationships across teams.",
    "Creating something entirely new.",
    "Achieving ambitious targets.",
    "Improving systems and processes.",
  ]),
  q("What would make you want to stay with an organisation long-term?", [
    "Feeling a sense of belonging.",
    "Having opportunities to learn and grow.",
    "Being given opportunities to achieve and advance within my career.",
    "Having a stable environment that aligns with my values.",
  ]),
  q("How would you like to be perceived as most in your environment?", [
    "Supportive teammate.",
    "Innovative thinker.",
    "High achiever.",
    "Trusted professional.",
  ]),
  q("What future would you prefer?", [
    "A career in which I can build meaningful relationships.",
    "A career in which I can continue to grow and discover new things about my industry.",
    "A career where I can influence the environment and industry direction around me.",
    "A career that I perceive to be purposeful and aligns with my values and responsibilities.",
  ]),
  q("Which work philosophy aligns best with you?", [
    "“Let’s work and grow together.”",
    "“Let’s work to create something new.”",
    "“Let’s stay competitive and relevant, making things happen every day.”",
    "“Let’s ensure we uphold high standards, acting in a professional and ethical manner.”",
  ]),
  q("Which question matters most to you?", [
    "Where do I belong?",
    "Who can I become?",
    "What impact can I make?",
    "How can I live and work according to my values and responsibilities?",
  ]),
];

// 8. Results
export const results = {
  title: "Your galaxies",
  intro: "TODO: Intro text for results.",
  deckHint: "Swipe or tap the card to see your next galaxy",
  profilesTitle: "Your galaxy profiles",
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
