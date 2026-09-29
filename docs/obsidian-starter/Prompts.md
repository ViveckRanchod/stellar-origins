# Prompts for Claude

Paste these into Claude Desktop → **Code** tab → **Cloud** session on the `stellar-origins` repository.
Claude already knows the house rules from the repository, so short, plain requests are fine.

## First time: check everything works
> Read CLAUDE.md, then tell me in plain words how this site is organised and how you'll handle my change requests. Don't change anything yet.

## Make a change
> Please make these changes to the site:
> - (paste items from Change requests)
>
> Open a pull request and send me the preview link. Don't merge until I say so.

## Add or swap an image
First upload the image on GitHub: open the repository → `public` folder → **Add file** → **Upload files** → **Commit changes**. Then:
> I uploaded (file name) to the public folder. Use it for (which page / which galaxy / which avatar). Open a PR with a preview link.

## Publish (deploy) a change
> The preview looks good. Merge it and tell me when it's live.

## Undo the last change
> The last change that went live has a problem. Undo it (revert it), give me the preview, and merge once I confirm.

## Ask a question without changing anything
> Without changing anything: (your question, e.g. "which page shows the disruption questions?")
