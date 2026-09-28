---
name: portfolio-ui-styling
description: Apply the accepted portfolio design and scoped styling ownership during UI implementation or refactoring.
---

# Portfolio Ui Styling

Read `DESIGN.md` and the affected layer README. Preserve approved geometry and copy. Search shared/ui, shared/components and neighboring widgets before adding a component. Put basic UI-kit primitives, including links, in shared/ui. Reserve shared/components for reusable compound UI such as a form composer; domain business rules belong to their entity or feature. Keep CSS beside its rendering owner; shared styles hold tokens and typography only. This portfolio deliberately keeps CSS Modules instead of importing Logistics Tailwind/Figma infrastructure. Do not load client fonts or adopt 1920px canvas rules. Use the portfolio browser adapter for evidence.
