# Features layer

## Purpose

`features` owns complete reusable use cases and user scenarios with a clear
input, state transition, validation, or result.

## Allowed dependencies

Features may import `entity` and `shared`. Introduce a feature only for a stable
scenario that can be reused or reasoned about independently.

## Forbidden ownership

A visual section, one-line click handler, local disclosure state, or page-only
formatter does not become a feature. Features never import `widgets` or
`pages`.

## Public API

Every feature slice exposes its consumer contract through `index.ts`; external
consumers do not bypass the slice API or import server-only modules from a
client entry.

## Portfolio examples

Switching the current document language without a client-side state store.
