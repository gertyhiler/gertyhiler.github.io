---
name: section-visual-contract-loop
description: Use when an accepted site section needs a reproducible visual contract from Figma evidence, rendered comparison, viewport checks, and runtime behavior.
---

# Section Visual Contract Loop

Own the evidence order, not styling, FSD, asset, content, or testing policy. Load those decisions from the named project skills and current repository documentation.

## Runtime Workspace

Keep untracked inputs and evidence under:

```text
.agents/work/
  design-references/<section>/
  visual-runs/<section>/<run-id>/
  agent-loop/<section>/
```

Do not commit runtime exports, screenshots, contracts, or run notes unless the user explicitly requests a tracked artifact.

## Contract

Create `.agents/work/design-references/<section>/contract.json` containing only evidence needed to reproduce the run:

- section, route, selector, and source paths;
- source frame dimensions and agreed viewports;
- scale model and any approved exceptions;
- source assets and typography evidence;
- UI-kit candidates found through the consumer project's styling rules or adapter;
- content and decorative layer classification;
- meaningful controls, states, content stress cases, and acceptance checks;
- missing inputs and blockers.

Apply the repository's styling, UI primitive, architecture, content, and testing contracts through its local styling adapter, `organize-module-code`, `model-content-data`, and `design-project-tests`. Use `figma-container-query-layout` only for the geometry mode it owns.

## Required Capabilities And Gates

- Implementation: use `figma-json-to-ui-block` when measured design input must
  become a bounded UI block.
- Mechanical: record exact task-relevant commands and results.
- Rendered evidence: compare the source and agreed resize viewports; exercise
  meaningful runtime behavior when controls or states exist.
- Review is optional. If used, select one reviewer for the primary concern.

The loop records intake, ownership, executor scope, mechanics, rendered/runtime
evidence, optional reviewer findings, and unresolved risk. Repeat only the
affected evidence after a fix.

## Run Note

Write `.agents/work/agent-loop/<section>/<run-id>.md` with inputs, contract path, executor scope, gate results, evidence paths, findings, verdicts, and unresolved risk. Never turn a missing or unrun gate into success.
