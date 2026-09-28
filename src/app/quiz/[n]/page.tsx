import { notFound } from "next/navigation";
import { saveStep } from "@/app/actions";
import { Page, Submit } from "@/components/kit";
import { questions, quiz } from "@/content";

// ponytail: sort-shuffle is slightly biased, fine for 4 options. A fresh order on every request is intended.
const shuffle = <T,>(a: T[]) => a.toSorted(() => Math.random() - 0.5);

// 7. Culture fit quiz, one page per question. Answer order is shuffled on every load.
export default async function QuizPage({ params }: PageProps<"/quiz/[n]">) {
  const n = Number((await params).n);
  const question = questions[n - 1];
  if (!question) notFound();

  const isLast = n === questions.length;
  const answers = shuffle(question.answers);

  return (
    <Page badge={quiz.activityName} title={question.text}>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-fog">{quiz.progress(n, questions.length)}</p>
        <div className="h-px bg-steel">
          <div className="h-px bg-lavender" style={{ width: `${(n / questions.length) * 100}%` }} />
        </div>
      </div>
      <form action={saveStep.bind(null, `q${n}`, isLast ? "/results" : `/quiz/${n + 1}`)} className="flex flex-col gap-3">
        {answers.map((a) => (
          <label
            key={a.galaxy}
            className="panel flex cursor-pointer items-center gap-3 px-5 py-4 text-ash transition-colors hover:bg-indigo has-checked:bg-indigo has-checked:text-lilac has-checked:ring-1 has-checked:ring-lavender"
          >
            {/* Only the galaxy id is stored, so answer text can be edited later without breaking results */}
            <input type="radio" name="galaxy" value={a.galaxy} required className="accent-lavender" />
            {a.text}
          </label>
        ))}
        <div className="mt-5 flex flex-col">
          <Submit>{isLast ? quiz.last : quiz.next}</Submit>
        </div>
      </form>
    </Page>
  );
}
