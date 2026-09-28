import { Intermission } from "@/components/kit";
import { intermission2 } from "@/content";

// 9. Intermission 2 → "Hit next" → assigned disruption
export default function DisruptionIntermission() {
  return <Intermission {...intermission2} href="/disruption" />;
}
