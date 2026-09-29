import Link from "next/link";
import { requestReset, setPassword, signIn, signUp } from "@/app/actions";
import { Notice, Page, Submit } from "@/components/kit";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { account } from "@/content";

// 2. Account create (and sign-in for returning students via ?mode=login)
export default async function SignupPage({ searchParams }: PageProps<"/signup">) {
  const { mode, error } = await searchParams;
  const login = mode === "login";
  const f = account.fields;

  // Forgotten password: ?mode=forgot asks for the email, ?mode=reset (after the email link) sets a new one.
  if (mode === "forgot" || mode === "reset") {
    const forgot = mode === "forgot";
    return (
      <Page title={forgot ? account.forgotTitle : account.resetTitle} subtitle={forgot ? account.forgotIntro : undefined}>
        <Notice>{error}</Notice>
        <form action={forgot ? requestReset : setPassword} className="panel flex flex-col gap-5 p-6 sm:p-8">
          {forgot ? (
            <Field name="email" type="email" autoComplete="email" {...f.email} />
          ) : (
            <Field name="password" type="password" minLength={6} autoComplete="new-password" {...f.password} label={account.resetPassword} />
          )}
          <Submit>{forgot ? account.forgotButton : account.resetButton}</Submit>
        </form>
        <p className="text-center text-sm text-fog">
          <Link href="/signup?mode=login" className="text-lavender hover:text-lilac">
            Back to sign in
          </Link>
        </p>
      </Page>
    );
  }

  return (
    <Page title={login ? account.loginTitle : account.title} subtitle={login ? undefined : account.intro}>
      <Notice>{error}</Notice>
      <form action={login ? signIn : signUp} className="panel flex flex-col gap-5 p-6 sm:p-8">
        <Field name="email" type="email" autoComplete="email" {...f.email} />
        {!login && (
          <div className="grid gap-5 sm:grid-cols-2">
            <Field name="first_name" autoComplete="given-name" {...f.firstName} />
            <Field name="last_name" autoComplete="family-name" {...f.lastName} />
          </div>
        )}
        <Field name="password" type="password" minLength={6} autoComplete={login ? "current-password" : "new-password"} {...f.password} />
        {login && (
          <Link href="/signup?mode=forgot" className="-mt-2 self-end text-sm text-lavender hover:text-lilac">
            {account.forgotLink}
          </Link>
        )}

        {!login && (
          <>
            <div className="aurora" />
            <p className="text-sm text-fog">{account.privacyNotice}</p>
            <label className="flex items-start gap-3 text-sm text-ash">
              <input type="checkbox" name="privacy" required className="mt-0.5 accent-lavender" />
              {account.privacyConsent}
            </label>
          </>
        )}
        <Submit>{login ? account.loginButton : account.button}</Submit>
      </form>

      <p className="text-center text-sm text-fog">
        {login ? "New here? " : "Already have an account? "}
        <Link href={login ? "/signup" : "/signup?mode=login"} className="text-lavender hover:text-lilac">
          {login ? "Create an account" : "Sign in"}
        </Link>
      </p>
    </Page>
  );
}

function Field({ label, name, ...props }: { label: string; name: string } & React.ComponentProps<"input">) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name} className="text-ash">
        {label}
      </Label>
      <Input id={name} name={name} required className="h-11 sm:h-10" {...props} />
    </div>
  );
}
