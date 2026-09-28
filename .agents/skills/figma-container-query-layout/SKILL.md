---
name: figma-container-query-layout
description: Implement pixel-faithful Figma sections with CSS container queries, cqw units, aspect-ratio containers, proportional coordinates, UI-kit checks, and Tailwind v4 integration. Use when converting fixed Figma frames, JSON exports, or precise visual compositions into responsive Next.js/FSD UI blocks, especially when the user asks for 1:1 layout, container-query scaling, cqw, proportional sections, or breakpoint-free desktop scaling.
---

# Figma Container Query Layout

Use this skill for exact visual sections where the Figma composition matters more than a generic flex/grid rewrite.

For scalable desktop compositions, use cqw layout inside a centered query
container capped at 1920px by default. The outer section remains full width so
approved backgrounds and full-bleed decorative layers can continue to the
viewport edges. Scaling the entire composition beyond 1920px requires an
explicit section-level visual contract.

## Preflight Visual Contract

Before writing component code, create a compact visual contract in the working notes or response:

- Figma frame size and minimum guaranteed width.
- Target desktop widths, including `1280`, `1440`, `1920`, and `2440` unless the user narrows the scope.
- Scale model: full-width outer shell plus a centered cqw content/query
  container capped at 1920px by default. Record any section that intentionally
  scales its entire composition beyond that boundary.
- UI-kit candidates: existing primitives, shared components, tokens, and variants to inspect before custom controls.
- Source assets: repo assets, Figma exports, vectors, rasters, icons, and logos. Do not redraw brand graphics, icons, or images; use source assets or ask for them.
- Typography source: font family, size, line-height, letter-spacing, weight, transform, color, and opacity.
- Layer split: decorative/art/overlap layers versus content layers.
- Exceptions: any content layer that truly needs absolute positioning and why.

## Core Pattern

Build each precise section as a proportional desktop composition:

1. Outer shell: full available width and `position: relative`. Place
   backgrounds, fills, and full-bleed decorative media here when they must
   extend beyond the content boundary.
2. Composition container: centered, `width: 100%`, `max-width: 1920px`, and
   `container-type: inline-size`. Use `min-height` or `aspect-ratio` from the
   Figma frame when the section is purely visual.
3. Bounded decorative children: absolute positioning in percentages derived
   from Figma `x`, `y`, `width`, and `height` inside the composition container.
4. Typography and strokes: use `cqw` so they scale with the bounded composition
   container, not the viewport or full-bleed shell. For a confirmed
   mobile/desktop type pair, keep Figma endpoint sizes in `var(--text-*)` and
   use the full literal
   `text-[clamp(var(--text-mobile),calc(...cqw),var(--text-desktop))]` utility
   on the text node with existing Figma `var(--text-*)` endpoints; calculate
   the middle term from the measured endpoints.
5. Content zones: use normal flow, CSS grid, or flex. Text, forms, navigation,
   lists, and CMS-backed content should not be absolutely positioned unless
   there is a documented overlap requirement.
6. Tailwind: use for tokens, simple spacing, color, and state styling; use local CSS or CSS variables for dense coordinate maps.
7. UI-kit: inspect existing project/shadcn primitives and tokens before building one-off controls. If a primitive's default focus, size, color, or state styling conflicts with the Figma contract, document the mismatch and either add a proper variant/wrapper or build a section-local control.

## Coordinate Conversion

For a Figma frame `W x H` and an element `(x, y, w, h)`:

```text
left = x / W * 100%
top = y / H * 100%
width = w / W * 100%
height = h / H * 100%
font-size = fontPx / W * 100cqw
```

Prefer `aspect-ratio` for media and cards when the height should follow width.

Do not copy Figma text-layer `height` into CSS for real content. All text is natural-height by default, especially when it may later come from a CMS. Use Figma height only as a measurement of the reference state. Preserve the design with width, typography, line-height, margins, gaps, and section `min-height`.

## Placement

- Section composition belongs in the owning FSD slice, usually `src/widgets/<section>` or `src/features/<capability>`.
- Shared helpers for coordinate math may live in `src/shared/lib` only after at least two slices need them.
- shadcn primitives stay in `src/shared/ui`; project wrappers go to `src/shared/components`.

## Implementation Rules

- Keep route files in root `app/` thin; do not put layout math in routes.
- Preserve semantic HTML even when positioning visually: headings remain headings, navigation remains navigation, buttons remain buttons.
- Avoid viewport-scaling type (`vw`) inside bounded sections; use `cqw`.
- Do not hide a fluid type formula in a CSS variable or generated alias: its
  full literal `clamp()` stays in the text consumer's Tailwind class, while only
  endpoint values remain Figma-derived `var(--text-*)` tokens. Do not duplicate
  them as section-local `--heading-min/max` variables.
- Cap the content/query container at 1920px by default; do not use the
  full-width outer shell as the query container for bounded content.
- Keep backgrounds and full-bleed decorative layers outside the capped
  container only when their visual contract requires viewport-wide coverage.
- Scale the entire section beyond 1920px only when the approved section
  contract explicitly overrides the default cap.
- Use `absolute` only for decorative, background, art, and true overlap layers. Prefer grid/flex/padding/gap for content.
- Keep navigation links, buttons, and form controls content-sized first: text plus padding, gap, line-height, radius, and state styles. Fixed width/height is allowed only when the design requires an equal cell, exact icon button, or fixed hitbox.
- Keep all text natural-height by default. Do not add fixed heights to headings, paragraphs, nav labels, captions, or CMS text unless the user explicitly approves clipping.
- Do not draw or approximate icons, logos, brand marks, or image assets. Search the repository/Figma export first, then ask for the source asset. Use clearly marked temporary placeholders only with user approval.
- Avoid adding many breakpoints to chase pixels. Use container-scale first, then one deliberate composition switch only if the source design has a separate mobile/tablet frame.
- Keep long coordinate lists readable: group related elements, name constants by Figma layer, and avoid anonymous magic numbers in JSX.
- Use `min-width: 0` and `overflow-wrap: anywhere` for text that can receive real content.
- Respect `prefers-reduced-motion` for animated positioned elements.

## Review Checklist

- The section uses `container-type: inline-size` when `cqw` is used.
- The content/query container is centered and capped at 1920px unless the
  section has an explicit full-composition ultrawide exception.
- Full-bleed backgrounds continue outside the cap without causing bounded
  content or composition artwork to scale beyond 1920px.
- The wrapper aspect ratio or `min-height` matches the chosen Figma-derived scale model.
- Existing UI-kit primitives/tokens were inspected before custom controls were introduced.
- Every absolute coordinate belongs to a decorative/art/overlap layer and was derived from Figma dimensions or documented as a deliberate adjustment.
- The layout does not horizontally overflow at the supported widths.
- Text remains readable, natural-height, and does not overlap adjacent layers when copy length changes.
- Text, forms, navigation, and CMS-backed content use flow layout unless an exception is documented.
- Assets come from the repository/Figma/user-provided files rather than hand-drawn approximations.
- Decorative layers are marked `aria-hidden` or rendered through CSS backgrounds.
- Meaningful media has real `alt` text.

## Related Skills

- `figma-json-to-ui-block` for the project-specific JSON-export to FSD implementation process.
- `design-match-review` for comparing the rendered result against a Figma frame or screenshot.
- `feature-sliced-design` for layer and slice boundaries.
- `tailwind-design-system` for Tailwind v4 token and utility discipline.
