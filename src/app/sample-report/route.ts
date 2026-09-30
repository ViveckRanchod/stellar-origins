import { feedbackReport } from "@/lib/feedbackReport";
import { browseAll } from "@/lib/supabase";

// Testing only: /sample-report shows the feedback report PDF filled with made-up answers. Off once browseAll is.
const long = "I picked this one because it feels calm but full of energy, like it is always moving forward. ".repeat(3);

export async function GET() {
  if (!browseAll) return new Response("Not found", { status: 404 });
  const pdf = await feedbackReport({
    name: "Sample Student",
    date: "30 September 2026",
    scores: [
      { id: "A", percent: 45 },
      { id: "C", percent: 25 },
      { id: "B", percent: 20 },
      { id: "D", percent: 10 },
    ],
    answers: {
      avatar: { avatar: "avatar_2", justification: long },
      customize: { accessory: "accessory_1", justification: "It shows the path I want to follow." },
      future: { future: "Leading a small team", future_why: "", future_needs: "More confidence speaking up" },
      "disruption-questions": { answer_1: long, answer_2: "It mostly changed how.", answer_3: long },
      group: { answer_1: "We all cared about different things.", answer_2: long, answer_3: "" },
    },
  });
  return new Response(new Uint8Array(pdf), { headers: { "Content-Type": "application/pdf" } });
}
