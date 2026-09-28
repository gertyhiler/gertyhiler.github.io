---
name: organize-module-code
description: Use when creating, moving, reviewing, or refactoring files in an FSD src tree, especially flat model folders, unclear helpers or libs, widget composition roots, contexts, stores, public APIs, shared hooks, utilities, effects, and repeated cross-widget behavior.
---

# Organize Module Code

Follow the repository's current architecture and code-organization policy when introduced. Load `feature-sliced-design` for layer and import rules.

## Place Ownership First

1. Identify the narrowest FSD slice that owns the behavior.
2. Search shared and neighboring slices before creating a helper, hook, effect, or higher-order component.
3. Promote code to `shared` only when it has a stable cross-domain contract and at least one credible consumer beyond the original slice.
4. Expose a public API only when another slice imports it.

## Organize Responsibilities

Keep a small module flat only while every file has one obvious concern. When `model` contains multiple concerns, group and name them explicitly:

- static release data and stable behavioral constants;
- domain-aware pure helpers;
- React lifecycle and local-state hooks;
- dependency-injection contexts;
- mutable shared-state stores;
- queries or transport adapters;
- colocated tests for meaningful behavior.

Use role-bearing names such as `*.constants.ts`, `*.helpers.ts`, `*.query.ts`, or a responsibility directory when that improves scanning. Do not use `model` as a miscellaneous file store.

Classify by the narrowest real responsibility:

```text
domain-independent pure operation -> utility
domain-aware pure operation -> helper
React lifecycle or local state -> hook
DI across a component subtree -> context
mutable shared state and transitions -> store
cohesive internal subsystem with its own boundary -> lib
```

There is no generic `state` folder. A hook may own local React state, and pure
state calculations remain helpers. Create `model/store` only for a real store or
state machine. Treat `lib` as an internal module that may have its own helpers,
types, constants, or adapters—not as the default destination for a helper,
mapper, or miscellaneous support code.

A section widget may keep its public composition root at the slice root while
`ui/` owns local visual components. Export cross-slice consumption through
`index.ts`; do not export internal folders merely because they exist.

## Reuse Gate

Before adding code, search for equivalent components, hooks, calculations, media-query helpers, isomorphic layout effects, motion primitives, and visual effects. Prefer extending a stable contract over cloning implementation. Keep feature-specific orchestration local even when it composes shared utilities.

Run `review-architecture-reuse` after structural changes.
