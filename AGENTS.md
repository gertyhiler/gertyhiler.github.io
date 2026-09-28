# Portfolio engineering rules

Read `.agents/AGENTS.md` and `docs/agents/project-map.md` first. Read `DESIGN.md` before UI work. Documentation is English; visitor copy supports EN/RU.

## Product boundary

This repository owns a static Next.js portfolio: content in Git, JSON interface locales, Markdown articles, no CMS/database/runtime server. Preserve the accepted design and content unless the task changes them. CV and employment chronology are deferred. Do not invent achievements or publish client material.

## Architecture

For every `src/` change load `feature-sliced-design` and `organize-module-code`. Read `docs/code/architecture.md`, `docs/code/module-taxonomy.md`, and the affected layer README. This project's Logistics-compatible rules override generic FSD recommendations.

- Root `app/` contains thin Next.js adapters; `pages/README.md` is a Pages Router guard.
- Product layers: `pages -> widgets -> features -> entity -> shared`. Do not add `views`, `entities`, or `src/app` alongside them.
- Pages compose widgets and shared. Widgets compose features and shared; direct entity access requires a documented data adapter reason. Features import entity/shared; entity imports shared only. No same-layer cross-slice imports.
- Public compositions live in `<slice>/<slice>.tsx`; `index.ts` contains exports, never implementation. Internal `ui` is not re-exported.
- `model` roots contain only barrels. Use semantic subdirectories and role suffixes from the taxonomy, each with its matching index.
- Client-safe and server-only APIs are separate. Import `server-only` before application imports in every filesystem/server module and server barrel.
- Shared infrastructure belongs in `shared/lib/<name>`; foundational UI-kit primitives in `shared/ui`; domain-independent compound UI in `shared/components` (for example, a form composer). Domain business rules stay in entity/features. No global shared barrel.
- UI translations belong to the i18n library; article records belong to entity/article; page editorial copy belongs to its page.

## Runbook

Use `make help` as the common repository interface. Base command semantics are fixed in `docs/runbooks/command-contract.md` (Unix v1.1). `make check` runs static checks; `make verify` runs check then test without build or deployment. An unsupported test suite must fail explicitly. Run `make build` separately for static export.

## Work and verification

Preserve unrelated changes. Skills never grant commit, push, tracker mutation, deployment, or publication permission. Use the currently authorized scope; do not ask again for routine implementation steps.

Use `portfolio-test-policy` for testing decisions and `portfolio-ui-styling` for UI work. `npm run check:project` checks formatting, ESLint taxonomy, FSD boundaries, and types; `npm run build` proves static export only. Use `portfolio-browser-review` for visible changes. Review is optional and proportionate, not a repeated gate. Keep logs, screenshots, and temporary plans under ignored `.agents/work/`.

Read matching installed Next.js guides in `node_modules/next/dist/docs/` before changing framework behavior. Keep routes compatible with static export and a deployment base path. Report local checks, browser evidence, deployment, and owner acceptance separately.
