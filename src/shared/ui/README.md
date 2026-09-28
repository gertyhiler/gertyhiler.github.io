# UI kit

## Purpose

Basic, domain-independent visual primitives live here: links and, when needed,
buttons, inputs, and other foundational controls. Project-specific technical
behavior does not make a primitive a compound component. `SiteLink`, for example,
wraps a native anchor and handles the deployment base path.

## Ownership and public API

Keep each primitive in its own named directory with an `index.ts` public API.
Import the link through `@/shared/ui/site-link`. Keep styling beside its owner
and use the shared design tokens. Do not introduce speculative primitives.

Primitives may use shared technical libraries, but cannot depend on
`shared/components` or upper FSD layers. Reusable compound UI belongs in
`shared/components`; domain-specific behavior belongs in its entity or feature.
