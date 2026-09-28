import { LinkButton, Page } from "@/components/kit";
import { disruption } from "@/content";

// 12. Chat to your friends (offline discussion, nothing saved)
export default function ChatPage() {
  const c = disruption.chat;
  return (
    <Page badge={disruption.activityName} title={c.title} subtitle={c.instruction}>
      <ol className="panel flex list-decimal flex-col gap-3 py-6 pr-6 pl-12 text-ash marker:text-lavender">
        {c.prompts.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ol>
      <p className="text-center text-sm text-fog">{c.time}</p>
      <LinkButton href="/disruption/group">{c.button}</LinkButton>
    </Page>
  );
}
