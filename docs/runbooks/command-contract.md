# Repository command contract

Version: **1.1**. Platform: **Unix** (macOS/Linux), GNU Make and POSIX shell.
Adapted from the Logistics runbook contract. The command meanings are shared;
implementation belongs to this repository. No external runner is required.

| Command       | Contract and local implementation                                                                                                                                                                                         |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `make help`   | List commands and material side effects. Bare `make` does the same and changes nothing.                                                                                                                                   |
| `make doctor` | Diagnose Git, Node.js 24+, npm and the lockfile. Do not install, repair, start services or display secrets. No env file is required.                                                                                      |
| `make setup`  | Repeatably prepare the checkout with `npm ci`; network access may be needed. Preserve configuration, data and locked versions. No global installs or hooks.                                                               |
| `make dev`    | Run the primary development process in the foreground on localhost:3000.                                                                                                                                                  |
| `make stop`   | Stop only checkout-owned background services, preserving data. This project owns none; this command explains how to stop foreground processes with Ctrl-C.                                                                |
| `make fmt`    | Intentionally format source and documentation files.                                                                                                                                                                      |
| `make check`  | Static formatting, lint, architecture and type checks, without source fixes or production build. Generated route types/cache are disposable artifacts.                                                                    |
| `make test`   | Run the complete autonomous test suite once, without watch mode. Currently unsupported: reports the absent behavioral suite and exits nonzero.                                                                            |
| `make verify` | Run check, then test, stopping on failure. No production build, browser E2E, baseline updates or deployment. Currently cannot pass until a behavioral suite exists.                                                       |
| `make build`  | Create the distributable static `out/` artifact without publishing it.                                                                                                                                                    |
| `make clean`  | Delete only `.next`, `out` and `tsconfig.tsbuildinfo`. Validate all paths before deletion; refuse tracked files, symlinks anywhere in these paths, or unavailable Git metadata. Preserve dependencies, env and user data. |

## Execution rules

Required failures and missing tools propagate a nonzero exit status. Unsupported
operations must explain their limitation and fail instead of reporting success.
Aggregates preserve ordering even with `make -j`; `.NOTPARALLEL` applies globally.
Checks may create disposable local artifacts but must not fix source files.
Base commands never deploy, modify shared databases or access infrastructure.
Broad `git clean` is forbidden.

`make install` is a compatibility alias for setup. `make preview` serves an
existing export on localhost:4317 using Python 3 in the foreground; it does not
build. `make deployment-validate` parses workflow YAML and checks formatting with
Prettier locally, without build, SSH, publication or deployment. It does not
validate GitHub expressions, repository settings or runtime action behavior.

Stop foreground servers before cleaning their artifacts. Clean deliberately refuses when Git metadata is unavailable to verify
tracked-file protection.

## Adoption and changes

The README owns local requirements and operating instructions; `make help` is
the executable command index. Validate sequencing, failure propagation and
cleanup boundaries when changing the runbook. Breaking changes to shared
command meanings require a major version; compatible additions require a minor
version. Local implementations do not change the contract version.
