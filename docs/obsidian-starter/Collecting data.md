# Collecting data

Everyone's answers are stored in **Supabase** (the site's database).

1. Go to https://supabase.com/dashboard and open the **stellar_origins** project.
2. Click **SQL Editor** in the left menu, then **New query**.
3. Open https://github.com/ViveckRanchod/stellar-origins/blob/main/docs/data-queries.sql
   and copy ONE of the five queries (query 5 is the easiest) (from its `-- 1.` line down to its `;`).
4. Paste it into the editor and click **Run**.
5. Click **Export** above the results, then **CSV**. Open it in Excel or Google Sheets.

| Query | What you get |
|---|---|
| 1 | Every answer, one row per student per step |
| 2 | Each student's galaxy percentages |
| 3 | Which disruption each student got |
| 4 | Everyone who signed up |
| 5 | **One row per student with every answer in its own column** (best for a spreadsheet) |

These queries only read data; they can't change or delete anything.

**Make sense of it with Claude:** in a normal Claude chat, attach the CSV and ask, for example:
"This is the answers export from our workshop site. Summarise the galaxy results across the group and list anyone who didn't finish."
