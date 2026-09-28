---
name: github-matt-workflow
description: Adapt Matt Pocock planning and implementation skills to a repository that uses GitHub Issues, direct gh commands, and proportionate verification.
---

# GitHub Matt Workflow Adapter

Read the consumer repository's issue-tracker, domain, and triage documentation
when the selected Matt flow needs them. Upstream skills remain unchanged; this
adapter translates their runtime, authorization, and verification assumptions
to a direct GitHub workflow.

- Use Matt's complete `triage` state machine and canonical labels unchanged.
  Connect it directly to GitHub through the repository tracker contract. Do not
  introduce a second state machine in GitHub Project fields or a custom wrapper.

- Small work: one Issue, implementation, focused checks, result. No compulsory spec.
- Multi-session work: use wayfinder for uncertain decisions, to-spec for the
  accepted contract, and to-tickets for useful independent implementation slices.
- Keep specs and decision maps in their owning GitHub Issue. Local supporting
  artifacts go under `.agents/work/`, never a second task database.
- An upstream Skill-tool call means load the named installed skill. Do not
  invent unavailable tools, roles, or model capabilities.
- Keep the red-green-refactor loop, but apply it only to critical observable
  behavior, regressions, or meaningful contracts. For an obvious existing public
  seam, implementation authorization is enough; do not stop for another seam
  approval. Do not add tests for visual details, reversible configuration, or
  every small change.
- Review spec compliance and correctness proportionately. Reviewer fan-out,
  repeated audits, and automatic commits in upstream examples are not required.
- The user's explicit action authorization and `.agents/AGENTS.md` govern
  implementation, closure, and publication. No flow grants deployment permission.
- Preserve upstream source provenance. Update reusable skills from their source,
  not by editing external payloads to encode local policies.

Canonical upstream: https://github.com/mattpocock/skills
