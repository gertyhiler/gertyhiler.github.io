---
name: review-delivery-readiness
description: Use when release, deployment, migration, or external runtime readiness is the task's primary uncertainty.
---

# Review Delivery Readiness

Use this only as the task's single optional reviewer. Stay read-only and apply
the shared severity contract from `review`.

Check only evidence relevant to the requested delivery: exact revision, named
mechanical commands, runtime or visual proof, deployment target, rollback or
irreversibility concerns, and explicitly deferred scope. Do not require build,
browser, publication, or clean-tree evidence when the task does not claim it.
For every executed command, record its exit code; do not infer success from a
summary alone.

Return findings first, then verified evidence, missing evidence, residual risk,
and a compact verdict. This review does not accept or close the Issue and does
not dispatch another reviewer.
