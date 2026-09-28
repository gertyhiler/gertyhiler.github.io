# Logistics workflow port

Source checkout HEAD at inspection: `4bc9ff4`. Reusable packages were copied unchanged from the owner's Logistics checkout, including their references and UI metadata. `skills-lock.json` retains the matching original source records, including shared organization skills. The owner authorized publication of the shared organization packages on 2026-09-28. Upstream license notices are retained in `THIRD_PARTY_NOTICES.md` and `docs/third-party/`.

Included: FSD/module organization; architecture and reuse review; planning/spec/ticket/triage flows; GitHub adapter; implementation/debugging/review; design and accessibility guidance; UI/logic prototyping; Next.js and React guidance. Local corrections live in `portfolio-*` adapters.

Adapted contracts: layer READMEs, root agent router, agent zones and precedence, project map, domain/tracker routing, semantic glossary, quality commands and design policy.

The ESLint module-taxonomy implementation is copied from Logistics. The project-boundary rule adds the explicit layer matrix and validates that alternate layers/shared segments cannot creep back in. Steiger configuration preserves the same documented compatibility exceptions, without unrelated Projects-widget exceptions.

Not copied: client content/assets/fonts, Payload models, database/migration/seed/deployment code, runtime environment values, secrets, issue history, task reports, private operational scripts, CMS preview/cache skills and client-specific Figma geometry. README files, not CMS preview, were requested by the owner.

Styling difference: preserve this accepted design using scoped CSS Modules, documented in DESIGN.md. The local styling/browser adapters take precedence over Logistics-specific dimensions in unchanged generic review packages.

Publication and an end-to-end public issue/PR example remain separate steps. This port implements the local structure and agent instructions, not that external workflow history.
