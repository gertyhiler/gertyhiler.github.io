---
name: figma-json-to-ui-block
description: Use when Figma JSON, frame measurements, layer dumps, or measured screenshots must become a bounded production UI block.
---

# Figma JSON To UI Block

Coordinate design input and evidence. Do not duplicate repository policy or the project skills.

## Inputs

Collect the Figma JSON or measurements, reference screenshot and frame size, section name, route, intended slice, source assets, states, and behavior notes. Keep raw exports under `.agents/work/design-references/<section>/`, not runtime source.

If missing input would force invented assets, behavior, ownership, or geometry, record the blocker and stop.

## Required Capabilities And Gates

- Contract: consume the normalized evidence contract supplied by the owning
  task.
- Ownership: `organize-module-code` and `feature-sliced-design`.
- Styling: the consumer project's styling rules or adapter; add `figma-container-query-layout` only for the
  geometry mode it owns.
- Content: `model-content-data` only when extracted content or CMS readiness is
  in scope.
- Tests: `design-project-tests` records meaningful coverage or a no-test reason.
- Review is optional; if used, select one reviewer for the primary concern.

Normalize the inputs, choose bounded ownership, implement through the selected
project capabilities, and run task-appropriate mechanical and rendered checks.
Load only the capabilities needed by the task.

## Evidence

Return the input paths, contract path, selected skills and docs, ownership decision, executor scope, checks, screenshots or browser evidence, reviewer findings, no-test rationale when applicable, and unresolved blockers. Do not claim visual completion without rendered evidence.
