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
  // Forgotten password
  forgotLink: "Forgot your password?",
  forgotTitle: "Reset your password",
  forgotIntro: "Enter your email and we'll send you a link to choose a new password.",
  forgotButton: "Send reset link",
  forgotSent: "If that email has an account, a reset link is on its way. Open it on this device.",
  resetTitle: "Choose a new password",
  resetPassword: "New password",
  resetButton: "Save password",
};

// Activity 1 – Character build (every choice needs a justification).
// Wrap words in **double stars** to show them in bold (titles, instructions and question labels).
export const characterBuild = {
  activityName: "Choose Your Star",

  // 3. Choose your avatar (exactly 5)
  avatar: {
    title: "Choose Your Star",
    instruction: "Choose an avatar from the 5 below that you are drawn to.",
    options: [
      { id: "avatar_1", name: "TODO Avatar 1", description: "TODO", image: "" },
      { id: "avatar_2", name: "TODO Avatar 2", description: "TODO", image: "" },
      { id: "avatar_3", name: "TODO Avatar 3", description: "TODO", image: "" },
      { id: "avatar_4", name: "TODO Avatar 4", description: "TODO", image: "" },
      { id: "avatar_5", name: "TODO Avatar 5", description: "TODO", image: "" },
    ],
    justification: { text: "What about this one draws you to it? What does your choice represent or reflect about you?" } as Question,
    justificationPlaceholder: "TODO",
    button: "Next",
  },

  // 4. Customise character (8 options, pick 0–2)
  customize: {
    title: "Make It Yours",
    instruction: "Customise your character by choosing **up to two** elements that you would add to it.",
    max: 2,
    skip: "Skip, I don’t want to customise my character",
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
    justification: {
      title: "What do your choices represent for you?",
      text: "For each element, consider: **What does this represent, and why is it meaningful to you?**",
    } as Question,
    justificationHint: "If you choose not to customise your character, select “Skip” and briefly explain why.",
    justificationPlaceholder: "TODO",
    button: "Next",
  },

  // 5. Looking ahead (all optional)
  future: {
    title: "Looking Ahead",
    hint: "This question is optional.",
    question: "Complete the sentence: **In the future, I’m heading toward…**",
    placeholder: "TODO",
    why: "Then consider: **Why is this meaningful to me?**",
    needs: "What is one thing that would need to be true for me to move toward it?",
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

// 10. Disruptions. Ids d1–d4 must match supabase/schema.sql. Each student is handed one, in turn (d1, d2, d3, d4, d1, …).
// `description` is a list of paragraphs.
export const disruptions: Record<string, { name: string; description: string[]; image: string }> = {
  d1: {
    name: "Restructuring",
    description: [
      "You have spent two years as the HR Business Partner for two departments, gradually building strong relationships with managers and employees. People come to you for guidance, and you take pride in supporting both the people and the business.",
      "This morning, leadership announces that the two departments will merge into one function next month. You can see the logic behind the decision. The current structure has caused duplication and confusion, and you have previously suggested that a more integrated structure could work better.",
      "However, the new structure has not been finalised yet. Leadership says there is “some overlap in HR support roles”, but no one can tell you exactly what this means for your position. Your manager tells you privately that she does not yet know whether your role will continue as it is, change significantly, or disappear altogether.",
      "You support the change, but you are now uncertain where you fit in the future you helped advocate for.",
    ],
    image: "",
  },
  d2: {
    name: "Project cancellation",
    description: [
      "Eight months ago, you proposed a new employee wellbeing and engagement initiative. It was not an obvious priority for the organisation, but you believed it could genuinely make a difference for employees.",
      "You developed the proposal, secured a modest budget and led the project from its launch. Over time, the initiative became something you were proud to be associated with. Recent engagement results showed a positive shift in the areas the programme was designed to address.",
      "This morning, you receive an email informing you that the initiative is being deprioritised with immediate effect and the working group is being disbanded. You later learn that another team’s initiative has been chosen instead. It costs less and has outcomes that are easier to demonstrate to senior leadership.",
      "Your project did not fail. However, the work you cared about is no longer a priority, and the organisation has moved on.",
      "You still believe employee wellbeing matters. You are now left wondering how, or whether, you can continue pursuing that purpose through your work.",
    ],
    image: "",
  },
  d3: {
    name: "Leadership change",
    description: [
      "Your Head of Talent has led the Learning and Development function for three years. You have become accustomed to her leadership style. She gives you space to work independently, trusts you to solve problems and supports you publicly, even when she challenges you privately.",
      "At the same time, you have sometimes felt frustrated by her reluctance to address certain performance issues within the team. You value the autonomy she gives you, but you also recognise the limitations of her leadership style.",
      "She announces that she is leaving the organisation. Two weeks later, her replacement arrives from the Finance division. Your new manager takes a very different approach: they are highly involved, strongly focused on measurable outcomes, and expect clear evidence of return on investment from every programme.",
      "Within your first month, you are asked to provide more frequent reports, justify decisions that previously required little explanation and obtain approval for changes you would previously have made independently.",
      "Nothing about your job title has changed. But the way you experience and perform your work has.",
    ],
    image: "",
  },
  d4: {
    name: "Resource cut",
    description: [
      "You manage an employee wellbeing programme that has gradually become an important part of the organisation. It is relationship-focused, and its impact is not always easy to capture in a quarterly report, but employees regularly attend, and several have privately told you that the programme made a meaningful difference during difficult periods.",
      "You have spent the past year building the programme largely through your own initiative. The budget has never been large, but it has been enough to keep the programme running consistently.",
      "During this quarter’s planning meeting, you are told that the programme’s budget will be reduced by more than half as part of a company-wide efficiency drive. Leadership explains that the programme’s impact is “difficult to measure”. You know this is a fair criticism. Although you have collected positive feedback, you never built a strong system to demonstrate longer-term outcomes.",
      "You are now expected to deliver similar outcomes with significantly fewer resources. No one has suggested that the programme is unimportant, but the way you can deliver it has fundamentally changed.",
      "You still believe the work matters. You now have to decide what that means when you cannot do the work in the same way.",
    ],
    image: "",
  },
};

// A question is free text, unless it has `options` (then it's a single choice).
// `title` is an optional bold heading shown above the question.
export type Question = { title?: string; text: string; options?: string[] };


// Activity 3 – Disruption
export const disruption = {
  activityName: "Disruption",
  assignedTitle: "Your disruption",
  noneLeft: "All disruptions have been assigned. Please ask a facilitator.",
  assignedButton: "Continue",

  // 11. Individual reflection. Same questions for every disruption.
  // ponytail: shared list; for per-disruption questions, move this into each disruption above.
  questions: {
    title: "Individual Reflection",
    intro: "TODO: Intro text.",
    items: [
      {
        title: "What matters?",
        text: "What is your first reaction to the disruption, and what does it reveal about what matters most to you at work? Think about the value, relationship, contribution or sense of purpose that feels most affected.",
      },
      {
        title: "Reconnect with purpose",
        text: "Before the disruption, what made this work meaningful to you? Has the disruption changed that purpose, or mainly changed how you can pursue it?",
      },
      {
        title: "Craft your response",
        text: "What is one realistic change you could make to your tasks, relationships or perspective that could help you reconnect with that value or purpose? What would this protect for you?",
      },
    ] as Question[],
    button: "Next",
  },

  // 12. Move and regroup (with others who have the same disruption). Submit sends the results email.
  chat: {
    title: "Move and Regroup",
    instruction: "Find other stars who have been assigned the same scenario and discuss it with them.",
    items: [
      {
        title: "Different perspectives",
        text: "How did your responses differ, even when you were responding to the same type of disruption? What does this tell us about the role of individual values in experiencing meaning at work?",
      },
      {
        title: "Different ways of crafting",
        text: "What different ways did your group identify to respond? Which involved changing what you do, who you work with or lean on, or how you think about the work?",
      },
      {
        title: "The bigger picture",
        text: "Where can job crafting help people maintain or reconstruct meaning, and where are there limits to what an individual can change?",
      },
    ] as Question[],
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
