# Widgets layer

## Purpose

`widgets` owns independently meaningful page regions. A portfolio page section or
a coherent site-wide shell may become a widget when it owns composition and
responsive behavior.

## Allowed dependencies

Widgets may compose `features` and `shared`. A widget receives page-owned presentation data or uses a documented article adapter. The data flow stays `source data -> adapter/mapper -> UI`; no CMS is present.

## Forbidden ownership

Widgets do not own content schemas, import raw entity data-access or generated
types, or hide a complete reusable user scenario inside section rendering.
Direct entity imports require a deliberate adapter or data-prefetch reason.

## Public API

Each widget slice exposes only its supported composition contract through
`index.ts`; consumers do not import its internal `ui`, `model`, or `lib` files.

## Portfolio examples

Site shell, intro, selected work, personal projects, writing and article reader.
