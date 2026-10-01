import { Page, Rich } from "@/components/kit";
import { PrivacyBack } from "@/components/PrivacyLinks";
import { account } from "@/content";

// Privacy notice, linked from sign-up and sign-in (?from=login|signup tells Back where it came from).
export default async function PrivacyPage({ searchParams }: PageProps<"/privacy">) {
  const { from } = await searchParams;
  return (
    <Page
      title={account.privacyTitle}
      hideCharacter
      back={
        <PrivacyBack
          href={from === "login" ? "/signup?mode=login" : "/signup"}
          label={account.privacyBack}
          fromLink={from === "login" || from === "signup"}
        />
      }
    >
      <div className="panel flex flex-col gap-4 p-6 text-ash sm:p-8">
        {account.privacyNotice.map((para) => (
          <p key={para}>
            <Rich text={para} />
          </p>
        ))}
      </div>
    </Page>
  );
}
