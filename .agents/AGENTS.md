# Repository agent layer

Root `AGENTS.md` owns engineering policy; `docs/agents/project-map.md` routes knowledge. This layout follows the Logistics project workflow.

## Zones

- `local/`: ignored machine-local settings; never shell-source or print secrets.
- `tmp/`: ignored disposable exports and raw output.
- `work/`: ignored handoffs, plans, screenshots and unfinished research.
- `reports/`: durable reports only when requested.
- `prompts/`, `scripts/`, `schemas/`: stable automation inputs only when used.
- `skills/`: flat discoverable packages, one directory per skill.

Only `.gitkeep` is tracked in empty zones. GitHub Issues in `gertyhiler/gertyhiler.github.io` is the task tracker. When no issue is assigned, the user request is the work contract; do not invent issue IDs or introduce another tracker.

## Skills and precedence

`skills-lock.json` preserves the installed-source records copied with reusable skills. External/shared copies remain unchanged. Local adapters use the `portfolio-*` prefix and are not in the lock file. `docs/agents/skill-port.md` explains the port and omissions.

- Load `feature-sliced-design` + `organize-module-code` for source changes; project naming and taxonomy override the generic baseline.
- `portfolio-ui-styling` applies the accepted design instead of Logistics Figma dimensions, fonts or CMS rules.
- `portfolio-test-policy` overrides broad TDD recipes: test critical behavior, not implementation details.
- `portfolio-browser-review` owns this project's viewports and static-hosting checks.
- `github-matt-workflow` adapts planning skills to direct GitHub Issues when configured. See `docs/agents/issue-tracker.md` and `triage-labels.md`.

Small tasks need focused implementation and checks. Use wayfinder/to-spec/to-tickets only when uncertainty or scale justifies them. Upstream examples that commit automatically, spawn reviewers, mandate TDD, or assume a tracker do not override user authorization or these rules. An unavailable tool is a limitation, not permission to invent its result.

No mandatory acceptance-audit loop, time tracking, model calls in hooks, or parallel agent fan-out. One useful architecture review after structural work is sufficient. Local checks do not prove publication or human acceptance.

For generic `qa-browser-review` or `design-match-review` requests, apply the portfolio adapter and DESIGN.md dimensions instead of the source project canvas. Figma/CMS-related skill paths are optional capabilities only; do not introduce those systems to make a skill runnable.
