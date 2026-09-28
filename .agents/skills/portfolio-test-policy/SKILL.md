---
name: portfolio-test-policy
description: Choose meaningful tests and verification for the static portfolio; overrides generic TDD recipes.
---

# Portfolio Test Policy

Add tests for critical observable behavior, integration contracts or high-impact regressions. Do not test mock calls, source strings, CSS classes, DOM nesting or trivial private helpers. Validate static export, route/locale behavior and server/client boundaries when those change. Screenshot baselines require owner visual acceptance. Run focused checks, then the project gate; a passing build is not browser or deployment proof.
