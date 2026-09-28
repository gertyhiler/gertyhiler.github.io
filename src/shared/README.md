# Shared layer

## Purpose

`shared` owns project-wide technical building blocks that do not know about a
portfolio business entity or user scenario.

## Allowed dependencies

Shared segments may depend on other shared segments but import no upper FSD
layer. Stable technical infrastructure may expose separate client-safe and
server-only entry points.

## Forbidden ownership

Business rules and helpers that name Projects, News, Leads, SEO records, or
another domain belong in the owning entity or feature. `shared/ui` is reserved
for UI-kit primitives such as links. `shared/components` owns domain-independent
compound UI that combines primitives or coordinates richer behavior. Business
logic still belongs in its entity or feature.

## Public API

Expose focused APIs per shared segment and never add a top-level `shared`
barrel. Keep server-only exports out of client-safe `index.ts` files.

## Portfolio examples

The i18n library, design tokens and the SiteLink UI-kit primitive.
