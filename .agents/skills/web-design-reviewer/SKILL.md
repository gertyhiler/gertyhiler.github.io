---
name: web-design-reviewer
description: Read-only UI code review workflow for a Next.js App Router site. Use when auditing layout, Tailwind v4 tokens, shadcn usage, responsive behavior, visual quality, typography, assets, basic accessibility, or FSD placement. Produces findings and never implements fixes.
---

# Web Design Reviewer

Use this skill to review existing UI code. It produces a ranked punch list, not a redesign or implementation. Load `review` and use its severity and verdict contract. For pixel comparison against a source frame, use `design-match-review`.

## Read First

1. Root `AGENTS.md`.
2. The target files and their nearest FSD slice.
3. `app/globals.css` for Tailwind v4 tokens and global rules.
4. `components.json` when shadcn ownership or aliases matter.
5. Relevant source design notes or screenshots if the review mentions visual intent.

## Checklist

### FSD And Ownership

- `fsd/wrong-layer`: route contains feature composition or business logic that belongs in FSD layers.
- `fsd/shared-leak`: project-specific component placed in `src/shared/ui` instead of `src/shared/components` or the owning slice.
- `fsd/barrel-server-leak`: client component imports a barrel that re-exports server-only code.

### Tailwind And Tokens

- `tokens/inline-hex`: arbitrary color literal should be a CSS variable or project token.
- `tokens/odd-spacing`: spacing breaks the local rhythm without design reason.
- `tokens/random-radius`: radius does not match the current UI language or shadcn primitive.
- `tokens/raw-shadow`: custom shadow competes with the system.

### Layout And Responsive

- `layout/horizontal-scroll`: page overflows the viewport.
- `layout/grid-bare-1fr`: image/content grid uses bare `1fr` where `minmax(0, 1fr)` is needed.
- `layout/text-overlap`: text overlaps or escapes its container at supported widths.
- `layout/fixed-text-height`: text has a fixed height even though copy can vary or come from CMS.
- `layout/unstable-format`: hover, focus, or dynamic labels resize fixed-format UI.
- `layout/container-query-missing`: 1:1 Figma section uses viewport units where container queries and `cqw` are required.
- `layout/content-container-uncapped`: bounded content or composition artwork
  keeps scaling beyond the approved 1920px container without an explicit
  section-level exception.
- `layout/full-bleed-misapplied`: a viewport-wide background or decorative
  layer causes bounded content to grow beyond 1920px, or content is capped by
  clipping the full-bleed background instead of using separate layers.
- `layout/content-absolute`: content such as text, forms, navigation, lists, or CMS-backed copy is absolutely positioned without a documented overlap requirement.
- `layout/fixed-nav-control`: nav links, buttons, or controls use fixed width/height where text plus padding/gap should define the shape.

### Visual Quality

- `visual/gradient-text`: generic gradient text without brand/design reason.
- `visual/icon-tile-card`: repeated icon-card pattern that reads generic.
- `visual/fake-metric`: invented metrics, testimonials, or proof.
- `visual/centered-everything`: every section uses the same centered composition.
- `visual/decorative-glass`: blur/glass used as decoration rather than a purposeful overlay.
- `visual/redrawn-chrome`: fake browser/device/code chrome instead of real content or screenshot.
- `visual/redrawn-asset`: icon, logo, brand mark, or image was hand-drawn instead of sourced from Figma, repository assets, or the user.
- `visual/image-optimization-artifact`: optimized raster output visibly damages pale vector-like artwork or brand graphics.

### shadcn And Components

- `shadcn/local-rebuild`: local component rebuilds a primitive already available through shadcn/Radix.
- `shadcn/style-fork`: primitive styling is forked locally when a wrapper or variant would be clearer.
- `shadcn/ui-kit-bypass`: section introduces custom controls without first checking existing UI-kit primitives, shared components, tokens, and variants.
- `shadcn/default-style-conflict`: primitive default focus, size, color, radius, or state styling conflicts with the Figma visual contract and needs a variant, wrapper, or documented local one-off.
- `component/state-gap`: interactive component misses hover, focus-visible, active, disabled, loading, error, or success state.

### Accessibility Lite

- `a11y/focus-visible`: interactive element lacks a visible focus state.
- `a11y/icon-button-label`: icon-only button/link lacks an accessible name.
- `a11y/img-alt`: meaningful image lacks alt text; decorative image is not hidden.
- `a11y/heading-order`: heading levels skip incoherently.
- `a11y/color-only`: state is communicated only with color.

Escalate to `accessibility` when a component has forms, dialogs, focus traps, ARIA complexity, or more than three accessibility issues.

## Output

```markdown
## Findings

- [P1] src/widgets/hero/ui/hero.tsx:42 - layout/text-overlap - headline overlaps CTA at 1280px.
- [P2] src/shared/components/foo.tsx:18 - shadcn/local-rebuild - local dropdown bypasses Radix keyboard behavior.

## Verification

- npm run lint: not run, review-only

## Verdict

- <approve | approve-with-follow-up | block>
```

Do not apply fixes. Route accepted findings to a separate executor with the cited evidence and suggested outcome.

## Related Skills

- `design-match-review` for source-frame comparison.
- `figma-container-query-layout` for 1:1 Figma layout fixes.
- `accessibility` for WCAG.
- `qa-browser-review` for runtime browser QA.
- `simplifying-code` for cleanup after visual fixes.
