# Entity layer

## Purpose

`entity` owns business data represented by one content collection or table, or by a cohesive group of related tables forming one domain concept. A
slice owns its schema, access rules, queries, mutations, validation, and record
mapping.

## Allowed dependencies

Entities import `shared` only. Unrelated collections remain separate slices,
while tightly coupled records may share one cohesive domain boundary.

## Forbidden ownership

Do not create one entity per column or one global content-access folder. Speculative
collections are forbidden: introduce a schema only after a local page or
section proves its fields, nesting, relations, and editorial ownership.
Filesystem and storage-specific types stay inside the server-side data boundary.

## Public API

Each entity slice exposes client-safe contracts through `index.ts` and keeps
filesystem access and build-time queries in explicit server-only entry points.
Consumers must not import slice internals.

## Portfolio examples

Article metadata and build-time Markdown loading. No CMS is present.
