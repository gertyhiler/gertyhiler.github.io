---
name: review-test-quality
description: Review tests for meaningful regression value, correct test level, observable outcomes, mock boundaries, edge cases, screenshot strategy, and false confidence. Use for test files, testing infrastructure, coverage plans, UI or visual testing decisions, file-content assertions, mock-heavy suites, or release reviews where tests are cited as evidence. Review only; do not implement fixes.
---

# Review Test Quality

Read the repository's current testing policy when introduced and load `design-project-tests`.

## Review

For every added or relied-upon test, answer:

1. What practical regression does it catch?
2. Does it assert observable behavior rather than source text or implementation detail?
3. Is the level appropriate: pure, integration, browser interaction, or visual screenshot?
4. Are mocks limited to unstable or expensive boundaries?
5. Would the test still pass if the feature looked or behaved incorrectly?
6. Are high-impact failure and edge cases represented?
7. Is missing coverage more honest than a green low-value test?

Reject source-file string checks, CSS/class assertions, DOM shape or node counts,
internal or presentational attribute/property checks, computed-style assertions,
mock-only assertions, trivial conditional coverage, and DOM-presence tests
presented as visual evidence. A stable semantic browser contract such as a link
destination, disabled state, or ARIA state is valid only when it is itself the
observable navigation or accessibility outcome. Require screenshots of the real
route for visual fidelity. Require browser interaction evidence when meaningful
controls, transitions, or user-visible states exist; do not invent interaction
work for a static section. Keep business rules, calculations, and complex state
transitions in deterministic tests. Confirm every new or modified browser spec
is included in at least one Playwright project before accepting it as pipeline
evidence. Treat existing low-value or undiscovered tests as legacy debt, not
precedent; require scoped cleanup only when the current task touches the
protected behavior.

Apply the severity and verdict contract from `review` and cite the test plus the protected behavior. Return findings, open questions, executed or missing verification, residual risk, and the project verdict. Do not change tests during review.
