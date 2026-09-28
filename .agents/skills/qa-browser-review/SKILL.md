---
name: qa-browser-review
description: Read-only browser QA workflow for a Next.js site. Use when checking a local build or dev server for visible regressions, console errors, routing errors, hydration issues, responsive overflow, broken assets, interaction bugs, or release readiness with Playwright or browser inspection. Produces findings and never edits the implementation.
---

# QA Browser Review

Use this skill for runtime QA after implementation, before release, and before UI approval. Load `review` and use its severity and verdict contract. Browser interaction may change ephemeral page state, but the reviewer must not edit repository files or repair findings.

## Scope

Default route: `/`.
Default checks: desktop release viewport plus any viewport the user names. When
responsive behavior, the `600px` composition boundary, or scalable section
geometry changes, check `375`, `599`, `600`, `1280`, `1440`, `1920`, and
`2440` widths.
This matrix covers both Figma reference widths and intermediate/boundary
behavior; checking only `375` and `1440` is insufficient.

## Process

1. Start or reuse the dev server.
2. Open the target route with the Browser plugin or Playwright automation.
3. Check:
   - page loads without Next.js overlay or runtime error;
   - console has no uncaught errors;
   - network has no missing local assets;
   - first viewport has no incoherent overlap;
   - no horizontal scroll at checked widths;
   - content/query containers scale through the desktop range, cap and center at
     1920px, and do not keep growing at 2440px unless the section explicitly
     overrides the project contract;
   - approved full-bleed backgrounds continue to the viewport edges above
     1920px without forcing bounded content to scale;
   - nested cards, media, grid tracks, and text scale together between reference
     widths instead of mixing physical pixels with the section `--spacing`
     basis;
   - text blocks use natural height and do not clip with realistic longer/shorter copy when the section is CMS-backed;
   - image assets render cleanly; for pale vector-like rasters, inspect `currentSrc`, response format, natural size, and visible compression artifacts when quality is in question;
   - interactive controls respond to mouse and keyboard;
   - focus-visible styles are present;
   - motion respects `prefers-reduced-motion` when relevant.
4. Click, type, hover, or keyboard through meaningful controls instead of only taking a screenshot.
5. Capture screenshots only when they help diagnose or prove a visual issue.
6. Report findings with file/route evidence and exact viewport.

## UI Approval Gate

For visible UI changes, this skill is mandatory before saying approved, complete, or visually verified.

`pnpm check` is not enough. The agent must run browser automation that actually exercises the interface.

Minimum automation:

- open `/` or the target route;
- set the agreed viewport, defaulting to the desktop release width when unspecified;
- wait for the page to render;
- inspect console errors and missing asset responses;
- click or keyboard through every meaningful visible control in scope;
- verify focus-visible behavior for keyboard-reachable controls;
- check horizontal overflow;
- for responsive/scalable changes, check `375`, `599`, `600`, `1280`, `1440`,
  `1920`, and `2440`, including the content cap, full-bleed layers, descendant
  proportions, and horizontal overflow;
- stress-check CMS-backed text when text length can vary;
- take a screenshot if visual evidence is needed.

If Playwright/browser automation is unavailable, say so explicitly and do not claim UI approval.

## Playwright Notes

Use the Browser plugin when available. Otherwise use Playwright directly.

Useful commands and APIs:

```bash
npx playwright test
npx playwright codegen http://localhost:3000
```

```ts
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.keyboard.press("Tab");
await page.screenshot({ path: "reports/qa/home-1280.png", fullPage: true });
await browser.close();
```

Keep screenshots and traces as ignored runtime evidence under `.agents/work/`. Do not add tracked artifacts during the review; route any requested publication artifact to a separate executor.

## Verification Commands

Use the repo gate when code changed:

```bash
pnpm check
```

Use browser checks for visible work. Do not claim visual QA from static checks alone.

## Output

```markdown
## QA Findings

- [P1] / at 1280x900 - hero CTA overlaps headline after hydration.
- [P2] / at 1440x900 - console logs missing asset `/studio/hero.webp`.

## Checked

- Commands: pnpm check
- Browser: <tool>
- Viewports: <list>

## Verdict

- <approve | approve-with-follow-up | block>
```

If there are no findings, state what was checked and name any gaps. Route accepted findings to a separate executor.
