---
name: review-architecture-reuse
description: Review changes for FSD ownership, public API boundaries, module organization, shared primitive reuse, duplicated components, hooks, utilities, effects, and unnecessary abstraction. Use for architecture reviews, shared-component decisions, flat model folders, structural refactors, and diffs that add reusable-looking code. Review only; do not implement fixes.
---

# Review Architecture And Reuse

Read the repository's current architecture, code-organization, and UI-primitive policy when introduced. Load `feature-sliced-design`, `organize-module-code`, and the repository's local styling adapter as applicable.

## Review

1. Identify the changed contract and its real owner.
2. Check FSD layer direction, slice public APIs, and server/client boundaries.
3. Search for equivalent primitives, variants, hooks, utilities, effects, and neighboring implementations.
4. Distinguish justified local composition from a fork of a shared concept.
5. Check `model`, `lib`, `ui`, constants, queries, state, helpers, and tests for clear responsibility.
6. Reject speculative abstractions without a stable contract; also reject duplicate implementations hidden behind local names.
7. Cite file and line evidence for every finding.

Apply the severity and verdict contract from `review`. Lead with findings, then open questions, verification, residual risk, and the project verdict. Do not edit code during review.
