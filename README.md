# Andrew's engineering portfolio

A Next.js static portfolio with EN/RU, Markdown content and an explicit FSD/agent workflow. The visual direction and case-focused presentation are owner-approved. No employment timeline or CV is published.

## Run

Requires GNU Make, Git, Node.js 24+ and npm. Python 3 is needed only for static preview. No env file or background infrastructure is required.

```sh
make help
make setup
make dev
# http://127.0.0.1:3000/ru/
# Ctrl-C stops development.
make check
make build
make preview
# http://127.0.0.1:4317/ru/ — Ctrl-C stops preview.
```

[Unix runbook contract v1.1](docs/runbooks/command-contract.md) defines the common command interface. `make verify` runs check then test, without a build. There is no autonomous behavioral test suite yet: `make test` and therefore `make verify` explicitly fail with that explanation. Use `make check` and `make build` for the currently available validation.

`BASE_PATH=/repository-name make build` targets a project subpath; omit it for root/custom-domain hosting. The export requires no Next.js server. Root defaults to English with a no-JavaScript locale fallback.

`make fmt` rewrites formatting. `make clean` removes only `.next`, `out` and `tsconfig.tsbuildinfo`, after tracked-file and symlink checks; it refuses without Git metadata. Stop foreground servers first. Dependencies and local configuration are preserved. `make stop` reports that no background services are managed by this checkout.

## GitHub Pages

The [Pages workflow](.github/workflows/pages.yml) checks and builds pull requests
into `main`. PRs do not deploy. Pushes to `main` and manual runs on `main` publish
`out/` after a successful build through the `github-pages` environment.

Before the first run, select **Settings → Pages → Build and deployment → Source:
GitHub Actions**. Keep the publishing branch named `main` (or update the workflow
triggers and branch guards together). Configure environment protection to allow
only `main` to deploy. No personal token or hosting credentials are needed.

The workflow reads the base path from GitHub Pages metadata, supporting project
URLs, user-site URLs and custom domains. Configure a custom domain in Pages
settings and DNS, then rerun the workflow: the base path is baked into the build.
PR builds use `/preview` to exercise subpath hosting without a Pages API call.

Local preflight: `make deployment-validate`, `make check`, then `make build`.
The YAML check covers syntax and formatting, not GitHub runtime behavior.
CI uses the available project checks and build, not `make verify`, because no
autonomous behavioral test suite exists yet. A green run is not browser acceptance.

## Engineering entrypoints

- [Agent instructions](AGENTS.md) and [.agents workflow](.agents/AGENTS.md).
- [Project map](docs/agents/project-map.md).
- [Architecture](docs/code/architecture.md) and [module taxonomy](docs/code/module-taxonomy.md).
- [Design contract](DESIGN.md) and [quality gates](docs/engineering/quality-gates.md).
- [Skill provenance and adaptation](docs/agents/skill-port.md).

Root `app/` wires Next.js to `src/pages`. Product code uses `pages -> widgets -> features -> entity -> shared`; every layer has a README. The root `pages/README.md` is an intentional framework guard. Internationalization is a library under `shared/lib/i18n`; localized editorial content remains with its owner. Server-only article IO is isolated from client-safe catalog exports.

## Status

Local application and engineering structure. The repository is `gertyhiler/gertyhiler.github.io`. GitHub Pages publishes through Actions; run and deployment results are visible in the repository Actions tab. The previous HTML portfolio is preserved in `archive/portfolio-before-next-2026-09-28`. The workflow article remains a draft. Skill provenance and upstream licenses are documented in `THIRD_PARTY_NOTICES.md`. No client assets or infrastructure were copied.
