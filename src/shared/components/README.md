# Compound components

## Purpose

This directory is reserved for reusable, domain-independent UI that combines
several UI-kit primitives or coordinates more complex interaction and state.
A form composer is an example: it could combine fields, controls, validation
feedback, and submission state into one reusable interface.

Basic primitives such as links belong in `shared/ui`, even when they include
project-specific technical behavior. Domain business rules belong in their
owning entity or feature, and page sections belong in widgets.

## Dependencies and future structure

Compound components may use `shared/ui` and shared technical libraries. They
must not import upper FSD layers. Add a component and its focused public API
only when a real use case requires it.

There are no compound components yet. This README is intentionally the only
file here; do not add placeholder implementations or an empty export barrel.
