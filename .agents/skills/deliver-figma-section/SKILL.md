---
name: deliver-figma-section
description: Use when an accepted site section must be built or revised from Figma, exported design data, a visual reference, or a section screenshot.
---

# Deliver Figma Section

Orchestrate existing domain skills; do not duplicate their instructions. Follow the repository's current Figma-delivery policy when introduced and keep runtime artifacts under ignored `.agents/work/`.

## Required Intake

Collect or locate:

- section name, route, selector, and target FSD slice;
- Figma node or JSON/measurements;
- reference screenshots and frame dimensions;
- source assets;
- behavior, states, copy exceptions, and scope;
- target desktop viewports, defaulting to `1280`, `1440`, `1920`, and `2440`
  where the project contract applies.

Do not invent missing brand assets or behavior. Stop and escalate when absence would change the visual contract.

## Required Capabilities And Gates

- Evidence: use `section-visual-contract-loop` when a reproducible visual
  comparison is needed.
- Ownership and styling: the consumer project's styling adapter, `organize-module-code`,
  `feature-sliced-design`, and `figma-container-query-layout` only when the
  contract requires scalable geometry.
- Tests: `design-project-tests` chooses meaningful behavioral coverage.
- Mechanical evidence: task-relevant format, lint, types, architecture, and
  tests.
- Review is optional. If used, select one reviewer for design/browser or
  architecture/DRY, whichever is the primary concern.

Prepare safe inputs, inspect reuse, define the contract, implement the bounded
FSD slice, run applicable checks, and collect rendered evidence at the agreed
viewports. A tracked spec/plan is needed only when the scope has design decisions
or multiple independently useful tasks.

## Output Contract

Return links or paths for applicable artifacts, implementation scope, evidence,
checks, reviewer findings when used, and task state. Do not claim
visual completion from source inspection alone.
