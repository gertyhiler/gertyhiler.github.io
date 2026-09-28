---
name: review
description: Use for one optional, read-only review of a changed module, page, diff, or delivery result.
---

# Review

Review is optional. Use it only when another pass would materially improve
confidence, and select one reviewer for the task's primary concern. Do not fan
out capabilities into separate reviewers or require another review after fixes.

Load only applicable project skills:

- correctness and regressions: code review;
- FSD ownership, boundaries, or duplication: architecture/DRY review;
- visible UI: design and real-route browser evidence;
- interactions: browser and accessibility evidence.

Inspect the requested scope, its direct consumers, relevant tests, and available
evidence. Run targeted checks only when useful. Keep the review read-only.

Report findings first with file and line references, then open questions,
verification performed, and residual risk. If no material finding exists, say
so plainly. Accepted fixes return to ordinary implementation; no follow-up
review is automatic.
