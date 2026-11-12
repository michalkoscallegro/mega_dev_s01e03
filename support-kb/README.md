# kb — the support knowledge base

**kb** = knowledge base. What the support desk knows about how our products break, written
down where the code can keep it honest.

One desk takes reports for every product we run: `sched-prod` (calendar invites for about
300k people) and the rest. When something
goes wrong, the reports reach the desk first. This kb is how the desk triages them, what each
incident turned out to be, and why we decided what we decided.

## What's here

```
src/routes/kb/      the pages (.svx: Markdown with components)
  triage/           how the desk handles incoming reports
  incidents/        one page per big ticket
  decisions/        numbered decision records
src/lib/kb/         components and the logic they run
src/lib/layouts/    the frame every page shares
src/lib/data/       exports from the ticket system
```

## Conventions

- Words in the page, logic in `src/lib` (imported as `#lib/…`). A number that can be computed belongs in a component.
- Every page starts with frontmatter: `title`, `owner`, `status`, `reviewed`.
- A decision is never edited after it is accepted. A new record replaces it.
- A page you add is signed: its frontmatter carries your `signature` and it ends with `<RenderStamp {signature} />`, so the desk knows who wrote it.

## Owners

Support desk. Decision records: whoever signed them.

## Render this export

With Node.js 24+, run `npm ci`, then `npm run check`, `npm run build`, and `npm test`.
The SvelteKit/mdsvex build compiles the original `.svx` pages and runs their imported Svelte
components; it does not replace them with a hand-written HTML summary.
The static site, including its CSS and JavaScript, is committed under `rendered/`.
Serve that directory as a static site, or run `npm run dev` and open
`http://127.0.0.1:5173/kb/incidents/4471-follow-up/`.

The signed follow-up lives at `src/routes/kb/incidents/4471-follow-up/+page.svx`.
Its rendered counterpart is `rendered/kb/incidents/4471-follow-up/index.html`.
It links the two public GitHub issues. Decision 0002 supersedes decision 0001 without
editing the accepted historical record; current triage uses the new rule.
Report counts and the desk reference are computed from source data and the signature.

---

Exported 2026-10-04 from the `support` repo, `apps/kb/` → `src/`.
