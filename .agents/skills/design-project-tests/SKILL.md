---
name: design-project-tests
description: Use when adding or reviewing unit, integration, browser, screenshot, or architecture tests; deciding whether code needs a test; replacing implementation-detail assertions; or evaluating mocks and conditional-only coverage. Consumer repository testing rules take priority.
---

# Design Project Tests

Use the repository's current testing policy when it is introduced.

## Select The Smallest Valuable Test

1. State the regression or contract the test must catch.
2. Use a reviewed Playwright screenshot of the real route for visible fidelity.
3. Use Playwright interactions for meaningful UI flows, navigation, focus,
   transitions, and reduced motion.
4. Prefer a pure test for business rules, calculations, transformations, and
   non-trivial animation state machines.
5. Use integration coverage for important security, data, persistence, or
   adapter boundaries.
6. Skip a test when it would only restate static markup or implementation
   details and no meaningful failure can be named.

## Reject Low-Value Patterns

- Do not assert source fragments, CSS or Tailwind classes, DOM nesting or node
  counts, test-only `data-*` hooks, raw presentation attributes, computed
  styles, grid columns, or CSS/DOM property values.
- Do not mock every collaborator and then assert that mocks return configured values.
- Do not test a trivial branch in isolation when the observable behavior is already covered.
- Do not use snapshots as an unread assertion dump.
- Do not make screenshot tests replace behavioral checks for interactive logic.

Keep mocks at unstable or expensive boundaries and assert observable outcomes.
Deterministic local data may stabilize a browser run, but it must render the real
route and production components. Verify accessibility and interaction through
roles, accessible names, keyboard/pointer actions, focus, navigation,
persistence, and other browser-observable outcomes.

A stable semantic browser contract such as a link destination, disabled state,
or ARIA state may be asserted only when it is itself the observable navigation
or accessibility result. Do not use it as a proxy for implementation.

Existing low-value or undiscovered tests are legacy debt, not templates for new
coverage. Address one only when the current task touches its behavior; do not
turn a layout fast-fix into a repository-wide test cleanup.

## Verification

Run the narrow test command first, then the relevant project check. For visible
work, run the factual browser flow and targeted screenshot comparison at the
visual-contract viewports. Inspect an intentional new baseline before accepting
it. Confirm that each new or modified browser spec is discovered by at least one
Playwright project. Run `review-test-quality` before claiming the suite
meaningfully protects the change.
