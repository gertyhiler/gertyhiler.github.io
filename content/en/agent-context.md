## Start with the repository

I use coding agents in everyday engineering work. My starting point is project documentation: what the system does, where decisions live, and which constraints a change must respect.

A useful context file should help someone make the next decision. It should explain the project rather than repeat generic advice about writing good code.

## Give the task a boundary

Before implementation, describe the behavior that should change and how to verify it. Separate the facts already established from assumptions that still need checking.

For this portfolio, the boundary is concrete: content lives in Git, pages are exported as static files, and there is no server to operate. A feature that needs a database would change that decision.

## Make the result reviewable

A change should come with a small explanation: what changed, why it changed, what was checked, and what remains uncertain. Running a build is useful evidence, but it does not show whether a page reads well on a phone.

```text
Understand the task
  → inspect the project
  → implement a bounded change
  → check behavior and review the diff
  → report evidence and remaining questions
```

## Keep the process close to the work

I want the public example to live in a real repository that I use and maintain. This website is a place to develop that example, with its decisions and checks visible alongside the code.

The next step is to demonstrate a complete change through an issue and a reviewed pull request. That example is still to be published.
