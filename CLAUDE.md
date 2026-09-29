@AGENTS.md

# Stellar Origins: how to work on this site

The people asking for changes here are usually **not developers**. They work through Claude Code cloud
sessions (Claude Desktop → Code → Cloud, or claude.ai/code) with no local setup. Explain in plain words,
never ask them to run commands, and do the git and GitHub work for them.

Spelling is always **Stellar** (never "Steller").

## Where things live

- **All wording, questions, answers, galaxy profiles, disruptions and image paths:** `src/content.ts`.
  Most requests ("change the welcome text", "add a question") only touch this file.
  Keep ids stable (`A`–`D` galaxies, `d1`–`d4` disruptions): the database stores them.
- **Images:** `public/` (e.g. `public/galaxies/whirlpool.jpg`, referenced as `/galaxies/whirlpool.jpg`).
  Files the requester uploads to GitHub land here; list `public/` to find them.
  Only use images the requester provides or public-domain/licensed ones, and note sources in a CREDITS.txt.
- **Look and feel:** `src/app/globals.css` (colours, fonts) and `src/components/`.
- **Page order:** `src/components/BackLink.tsx` (`steps`) and `src/components/DevNav.tsx`; keep both in sync.
- **Database:** Supabase, schema in `supabase/migrations/`. Do not change the database or its security
  rules from a session; tell the requester this needs the site owner.

## Workflow for every change

1. Work on a new branch named after the change (e.g. `content/new-welcome-text`).
2. Make the change, then run `npm run lint` and `npm run build`. Fix anything that fails.
3. Commit with a short plain-English message and push.
4. Open a pull request with `gh pr create --base main` and a plain-English description of what changed.
5. Tell the requester what changed in one or two sentences, give the PR link, and give the **preview link**:
   Vercel's bot comments it on the PR within a couple of minutes
   (`gh api repos/ViveckRanchod/stellar-origins/issues/<PR number>/comments`).
6. **Only merge when the requester clearly says so** ("ship it", "merge", "publish", "deploy").
   Merge through the REST API, which works in cloud sessions:
   `gh api -X PUT repos/ViveckRanchod/stellar-origins/pulls/<PR number>/merge -f merge_method=squash`
7. Merging to `main` **is the deploy**: Vercel publishes https://stellar-origins.vercel.app automatically in
   about a minute. Confirm when it's live.

To **undo** a change that went live: open a PR that reverts the merged commit (`git revert`), share it,
and merge it once the requester confirms.

Never push straight to `main`, never force-push, and never commit secrets (`.env*` stays out of git).

## Collecting data

Answers are in Supabase, not in this repo. Point the requester to the SQL in `docs/data-queries.sql`,
which they paste into the Supabase SQL Editor and export as CSV.

## Before real students use the site (site owner)

- Remove `<DevNav />` from `src/app/layout.tsx`.
- Set `browseAll` back to `process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development"`
  in `src/lib/supabase.ts` and `src/proxy.ts`.
- Turn on email confirmation in Supabase Auth.
