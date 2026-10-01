"use server";

import { createClient } from "@supabase/supabase-js";
import { readFile } from "node:fs/promises";
import path from "node:path";
import nodemailer from "nodemailer";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { account, final } from "@/content";
import { feedbackReport } from "@/lib/feedbackReport";
import { resultsEmail } from "@/lib/resultsEmail";
import { rememberCharacter, reportData, requireUser, resumePath, supabase } from "@/lib/supabase";

function back(mode: string, msg: string): never {
  redirect(`/signup?mode=${mode}&error=${encodeURIComponent(msg)}`);
}

export async function signUp(form: FormData) {
  const email = String(form.get("email") ?? "").trim();
  const password = String(form.get("password") ?? "");
  const first_name = String(form.get("first_name") ?? "").trim();
  const last_name = String(form.get("last_name") ?? "").trim();
  if (!email || !first_name || !last_name || password.length < 6) back("signup", "Please fill in every field.");
  if (form.get("privacy") !== "on") back("signup", "Please accept the privacy notice.");

  const db = await supabase();
  const { data, error } = await db.auth.signUp({
    email,
    password,
    options: { data: { first_name, last_name, privacy_accepted_at: new Date().toISOString() } },
  });
  if (error) back("signup", error.message);
  // Supabase "Confirm email" is on → no session yet. Turn it off in Auth settings for a smoother workshop.
  if (!data.session) back("login", "Check your email to confirm your account, then sign in.");
  redirect("/character/avatar");
}

export async function signIn(form: FormData) {
  const db = await supabase();
  const { error } = await db.auth.signInWithPassword({
    email: String(form.get("email") ?? "").trim(),
    password: String(form.get("password") ?? ""),
  });
  if (error) back("login", error.message);
  redirect(await resumePath());
}

export async function requestReset(form: FormData) {
  const email = String(form.get("email") ?? "").trim();
  const origin = (await headers()).get("origin");
  // Implicit flow (not the PKCE default of @supabase/ssr) so the email link works on any device or browser.
  // RecoveryLink (layout.tsx) picks up the session from the link.
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { flowType: "implicit", persistSession: false },
  });
  const { error } = await db.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/` });
  if (error) back("forgot", error.message);
  back("login", account.forgotSent); // same message whether or not the email exists
}

export async function setPassword(form: FormData) {
  const password = String(form.get("password") ?? "");
  if (password.length < 6) back("reset", "Passwords need at least 6 characters.");
  const { db } = await requireUser();
  const { error } = await db.auth.updateUser({ password });
  if (error) back("reset", error.message);
  redirect(await resumePath());
}

// Stores every field of a step's form as one JSON answer, then moves on.
async function save(step: string, form: FormData) {
  const answer: Record<string, string | string[]> = {};
  for (const key of new Set(form.keys())) {
    if (key.startsWith("$")) continue; // Next.js internal fields
    const values = form.getAll(key).map(String);
    answer[key] = values.length > 1 ? values : values[0];
  }
  const { db, user } = await requireUser();
  const { error } = await db.from("responses").upsert({ user_id: user.id, step, answer, updated_at: new Date().toISOString() });
  if (error) throw error;
}

export async function saveStep(step: string, next: string, form: FormData) {
  await save(step, form);
  if (step === "avatar") await rememberCharacter(form.get("avatar"));
  if (step === "customize") await rememberCharacter(null, form.get("accessory"));
  redirect(next);
}

export async function submitFinal(form: FormData) {
  await save("group", form);
  after(emailResults); // runs after the student has moved on to /done, so PDF-making never keeps them waiting
  redirect("/done");
}

// Sends the results email from a Gmail account (GMAIL_USER + GMAIL_APP_PASSWORD, a Google "App password"),
// with the feedback report PDF and the blank documents attached. Failures are logged, never block the student.
// ponytail: Gmail caps at ~500 emails/day, fine for a workshop; move to a mail service with a domain if that's outgrown.
async function emailResults() {
  const { GMAIL_USER: user, GMAIL_APP_PASSWORD: pass } = process.env;
  if (!user || !pass) return console.warn("GMAIL_USER / GMAIL_APP_PASSWORD not set, skipping results email");

  const origin = (await headers()).get("origin") ?? "https://stellar-origins.vercel.app";
  const { html, text } = resultsEmail(origin);
  const { user: student, report } = await reportData();
  const attachments = [{ filename: final.report.fileName, content: await feedbackReport(report) }];
  for (const d of final.documents) {
    const pdf = await readFile(path.join(process.cwd(), "public/documents", d.file)).catch(() => null);
    if (pdf) attachments.push({ filename: d.name, content: pdf });
  }

  await nodemailer
    .createTransport({ service: "gmail", auth: { user, pass } })
    .sendMail({ from: `Stellar Origins <${user}>`, to: student.email, subject: final.email.subject, html, text, attachments })
    .catch((e) => console.error("Results email failed", e));
}
