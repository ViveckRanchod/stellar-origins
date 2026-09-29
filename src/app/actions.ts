"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { account, final } from "@/content";
import { galaxyScores, requireUser, resumePath, supabase } from "@/lib/supabase";

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
  const db = await supabase();
  // ponytail: PKCE link only works in the browser that asked for it. Other-device links need a custom
  // Supabase email template using {{ .TokenHash }} + verifyOtp.
  const { error } = await db.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/auth/reset` });
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
  redirect(next);
}

export async function saveCustomize(max: number, form: FormData) {
  const picked = form.getAll("options");
  if (picked.includes("skip") && picked.length > 1) redirect(`/character/customize?error=${encodeURIComponent("Choose Skip or some elements, not both.")}`);
  if (picked.length > max) redirect(`/character/customize?error=${encodeURIComponent(`Pick at most ${max}.`)}`);
  await save("customize", form);
  redirect("/character/future");
}

export async function submitFinal(form: FormData) {
  await save("group", form);
  await emailResults();
  redirect("/done");
}

// Sends the results email via Resend (https://resend.com, free tier) if RESEND_API_KEY is set.
// Failures are logged, never block the student.
async function emailResults() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return console.warn("RESEND_API_KEY not set, skipping results email");

  const { user } = await requireUser();
  const scores = await galaxyScores();
  const text = [final.email.intro, "", ...scores.map((g) => `${g.name}: ${g.percent}%`)].join("\n");
  // TODO: add disruption + other answers to the email body if wanted.

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.EMAIL_FROM ?? "Stellar Origins <onboarding@resend.dev>",
      to: [user.email],
      subject: final.email.subject,
      text,
    }),
  });
  if (!res.ok) console.error("Results email failed", res.status, await res.text());
}
