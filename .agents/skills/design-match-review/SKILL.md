---
name: design-match-review
description: Read-only project visual review workflow for checking the implemented Next.js page or section against a Figma frame, screenshot, or design mock. Use for pixel/design compliance, layout drift, typography mismatch, spacing mismatch, asset mismatch, responsive visual QA, or when the user asks whether the implementation matches the design. Produces findings and never implements fixes.
---

# Design Match Review

Use this skill when the source of truth is a design frame or screenshot and the task is to judge the rendered UI. Load `review` and use its severity and verdict contract.

## Inputs

- Source Figma frame, screenshot, or exported measurements.
- Rendered local URL or target component/page.
- Supported viewport(s), defaulting to the current release desktop width when the user does not specify.

## Process

1. Identify the target route or component and the source design artifact.
2. Start or reuse the dev server.
3. Capture the rendered page at the agreed viewport with a browser tool or Playwright.
4. Compare in this order:
   - macro layout: section height, composition, alignment, and rhythm;
   - desktop scaling: content/query containers scale up to the approved 1920px
     boundary, then stay capped and centered; approved full-bleed backgrounds
     may continue to the viewport edges;
   - proportional scaling: compare nested cards, media, grid tracks, and text at
     both reference and intermediate widths; do not infer descendant scaling
     from the section root alone;
   - typography: font family, size, weight, line-height, letter spacing; for a
     confirmed fluid pair, verify that `clamp()` reaches the Figma token values
     at both declared endpoints and follows the correct viewport (`vw`) or
     capped query-container (`cqw`) scale model between them;
   - spacing and coordinates for 1:1 sections;
   - colors, opacity, borders, radii, shadows, and blur;
   - assets: source match, crop, resolution, object-fit, alt text, loading behavior, and visible optimization artifacts;
   - UI-kit fit: existing primitives/tokens were used or consciously rejected when their defaults conflict with the design;
   - content resilience: text blocks have natural height and do not clip when copy length changes;
   - layout method: content uses grid/flex/flow; absolute positioning is limited to decorative/art/overlap layers unless documented;
   - interaction states and motion where relevant.
5. Classify findings by severity and map each issue to a concrete file or FSD slice when possible.

## Output

```markdown
## Findings

- [P1] src/widgets/hero/ui/hero.tsx:42 - headline position differs from frame by ~40px; update container-query coordinate.
- [P2] app/globals.css:18 - body text appears heavier than mock; verify font weight mapping.

## Checked

- Source: <frame/screenshot>
- Rendered: <url>
- Viewport: <width x height>
- Tools: <browser/playwright/manual>

## Verdict

- <approve | approve-with-follow-up | block>
```

## Guardrails

- Do not edit implementation or reference artifacts. Route accepted findings to a separate executor.
- Do not overfit a desktop screenshot when the user is asking for fluid behavior.
- For responsive or scalable layout changes, do not review only the canonical
  Figma widths. Include the project boundary/interpolation matrix `375`, `599`,
  `600`, `1280`, `1440`, `1920`, and `2440` unless the approved task narrows it.
- Do not invent exact pixel numbers when you only performed a visual comparison; mark approximations as approximate.
- Do not accept bounded content that continues scaling beyond 1920px without an
  explicit section-level exception. Do not mistake a full-bleed background for
  permission to scale the inner composition beyond the cap.
- Do not accept fixed-height text blocks by default.
- Do not accept an unexplained fluid `vw` coefficient, a `clamp()` hidden in a
  CSS variable, or a viewport-based type scale inside a bounded composition
  that must follow its query container.
- Do not accept hand-drawn icons, logos, brand marks, or image assets when the source asset is missing.

## Related Skills

- `figma-container-query-layout` for executor guidance after review.
- `web-design-reviewer` for general UI code quality issues.
- `accessibility` for deep accessibility findings.
- `qa-browser-review` for broader browser smoke and interaction QA.
