---
name: review-styling
description: Review Tailwind, CSS Modules, BEM selectors, tokens, container queries, cqw formulas, flow versus absolute positioning, states, and reusable visual effects. Use for CSS or Tailwind diffs, Figma section styling, responsive layout, container-query work, hover and animation effects, or when custom CSS may duplicate project primitives. Review only; do not implement fixes.
---

# Review Styling

Read the repository's current styling and UI-primitive policy when introduced. Load its local styling adapter, `tailwind-design-system`, and `figma-container-query-layout` only as relevant.

## Review

1. Determine whether Tailwind can express each ordinary layout, spacing, typography, token, and state rule clearly.
2. For each CSS Module, verify a documented exception: dense geometry, complex selector, keyframe, generated content, or repeated formula.
3. Fail CSS Module selectors kept only for ordinary geometry such as
   `position`, `inset`, `top`, `left`, `width`, `height`, `z-index`,
   `overflow`, `border`, `radius`, `gap`, or simple colors when Tailwind
   utilities express them clearly. A passing `lint:styles` does not prove the
   selector deserves to exist.
4. Check CSS Module selectors against project BEM naming.
5. Find arbitrary values that should be tokens and copied `cqw` formulas that need an abstraction.
6. Inspect changed Tailwind candidates with the installed Tailwind v4
   canonicalizer or IntelliSense `suggestCanonicalClasses` diagnostics. Treat
   every warning as a review finding until the class is canonicalized or the
   reviewer proves that the suggestion is not equivalent. A passing
   `lint:styles` is not proof that IntelliSense warnings are absent.
   Run `pnpm lint:tailwind:intellisense`; APPROVED requires fresh complete
   extension-backed evidence with `errors=0` and `warnings=0`. A clean
   Stylelint or canonicalizer result cannot substitute for this command.
7. Check content flow, natural-height text, absolute-position exceptions, overflow, and container ownership.
8. Search for an existing primitive, variant, effect, or wrapper before accepting new styling infrastructure.
9. For visible changes, require browser and design-match evidence; do not infer fidelity from class names.

Apply the severity and verdict contract from `review` and cite file/line evidence. Return findings, open questions, verification, residual risk, and the project verdict. Do not edit the reviewed files.
