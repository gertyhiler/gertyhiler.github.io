---
name: model-content-data
description: Use when extracting copy or section data, designing typed content contracts, preparing future or runtime CMS integration, passing normalized content through component trees, or reviewing data and constants placed in model folders.
---

# Model Content Data

Use the repository's current content and CMS policy when it is introduced.

## Choose The Boundary

1. Keep one-off static copy inline when extraction adds no reuse, testing, localization, or delivery value.
2. Extract repeated or independently maintained release content behind a typed contract and name it as data under the owning slice.
3. Let a widget root consume its deterministic slice-owned data directly when no page-level coordination exists.
4. Pass normalized content through explicit props from its composition owner into lower components.
5. Introduce a provider only when several descendants need the same runtime dependency or prop threading obscures a real boundary.
6. Add an adapter and mapper only when a real external payload exists and differs from the internal contract.

Do not require a page prop solely for future CMS support. Do not add a provider,
adapter, mapper, or port before its runtime boundary exists. Do not scatter
anonymous constants through `model` or create content objects whose only purpose
is to replace a single local literal with an import.

## CMS Readiness

- Keep text natural-height and stress-check shorter and longer content.
- Separate content identifiers and data contracts from visual geometry.
- Keep defaults deterministic and explicit.
- Avoid coupling components directly to a vendor payload.
- Keep CMS clients, vendor DTOs, queries, and CMS-specific adapters in pages or
  widgets for the current project phase.
- Pass only normalized internal contracts into features, entity, shared, and
  lower components; they must not know that data came from a CMS.
- Place data, constants, adapters, queries, contexts, and stores according to
  `organize-module-code`.

Run `review-architecture-reuse` when the boundary affects several component layers.
