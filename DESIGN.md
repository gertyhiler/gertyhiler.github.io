# Portfolio design contract

Status: owner accepted the Paco-inspired visual direction. Preserve it during architecture work.

## Visual source

The current approved local pages are the visual reference. Paco Coursey's site informed the restraint; no source code, fonts, or assets were copied. Logistics contributes engineering conventions, not its client design.

## Tokens

Canonical values live in `src/shared/styles/tokens.css`: white paper, graphite text, muted text, hairline borders, restrained green links, quiet code-block background. Typography uses Arial/Helvetica for body and Georgia for display with Cyrillic system fallbacks. Content shell is 840px including padding; desktop padding 40px, mobile 24px; composition breakpoint 600px.

## Ownership and styling

Shared CSS contains reset, tokens and typography only. Page layout styles live beside page composition. Widget/feature CSS Modules own their rendered regions. Ordinary global selectors must not couple unrelated regions. The UI kit lives in `shared/ui`: foundational primitives such as `SiteLink`, including project-specific base-path handling. `shared/components` is reserved for reusable compound UI that combines primitives or coordinates richer behavior, such as a form composer. Domain business rules remain in their owning entity or feature.

The portfolio retains scoped CSS Modules to preserve the accepted implementation without introducing a styling-framework migration. This is an explicit adapter difference from Logistics' Tailwind-first contract. If Tailwind is adopted, migrate deliberately while preserving the same tokens and geometry; do not inherit Logistics fonts, 1920px canvas, Figma aliases, or CMS assumptions.

## Behavior

Keep readable natural-height text, keyboard focus, EN/RU labels, language-preserving document navigation and reduced-motion behavior. No decorative animation or imagery is needed. Markdown uses the article reader's scoped typography.

## Verification

Run project checks and build. Inspect real static pages at desktop and mobile widths, route transitions and language switching. An accepted screenshot is evidence; do not create or replace automated baselines to make a changed design appear correct.
