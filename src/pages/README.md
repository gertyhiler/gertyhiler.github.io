# Pages layer

## Purpose

`pages` owns complete public pages and route-level composition. Root `app/`
files stay thin Next.js adapters that render a page slice public API.

## Allowed dependencies

Pages may import `widgets` and `shared`. Route-specific orchestration and
metadata belong here; lower layers never import `pages`.

## Forbidden ownership

Do not put reusable business scenarios, content schemas, or large
visual sections directly in a page composition.

## Public API

Every page slice exposes its route component and supported metadata through its
own `index.ts`. Other slices must not import page internals.

## Portfolio examples

Home and article route composition.
