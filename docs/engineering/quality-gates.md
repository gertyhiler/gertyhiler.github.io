# Quality gates

| Command                     | Evidence                                                          |
| --------------------------- | ----------------------------------------------------------------- |
| `npm run format:check`      | Authored application/docs/tool formatting                         |
| `npm run lint`              | Next/TypeScript/a11y lint, module taxonomy and project boundaries |
| `npm run test:architecture` | Steiger FSD checks with documented local exceptions               |
| `npm run typecheck`         | Generated route types and strict TypeScript                       |
| `npm run check:project`     | All checks above                                                  |
| `npm run build`             | Static export, including build-time server-only content reads     |
| `npm run check`             | Project gate plus production export                               |

The common entrypoints are `make check` (project checks) and `make build` (static export). `make verify` runs check then test, without a build; it currently fails because `make test` explicitly reports the absent autonomous behavioral suite. The legacy `npm run check` remains a checks-plus-build convenience, not the meaning of `make check`. See the [Unix runbook contract](../runbooks/command-contract.md) and `make help`. No command publishes or runs an agent/model. Existing skill copies are not reformatted: their source payloads remain intact.

Tests should protect important observable behavior. Do not add tests of CSS classes, file strings, private helpers or configured mock calls. Browser checks cover the actual exported routes, keyboard navigation, locale switching, overflow and console errors. Check local asset references against exported output. Do not claim production, CI, screenshot baseline or human approval from a successful local build.
