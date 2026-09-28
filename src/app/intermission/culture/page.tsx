import { Intermission } from "@/components/kit";
import { intermission1 } from "@/content";

// 6. Intermission 1 → quiz
export default function CultureIntermission() {
  return <Intermission {...intermission1} href="/quiz/1" />;
}
