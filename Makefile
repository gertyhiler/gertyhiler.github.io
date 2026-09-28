# Unix runbook contract v1.1: docs/runbooks/command-contract.md.
SHELL := /bin/sh
.DEFAULT_GOAL := help
.NOTPARALLEL:

NPM ?= npm

.PHONY: help doctor setup install dev stop fmt check test verify build clean preview deployment-validate

##@ Unix runbook v1.1
help: ## Show commands and side effects; the default target changes nothing
	@printf 'Portfolio — Unix runbook v1.1\n\n  First run: make setup\n  Develop:   make dev\n  Checks:    make check\n  Export:    make build\n'
	@awk 'BEGIN {FS = ":.*## "} /^##@/ {printf "\n%s\n", substr($$0, 5)} /^[a-zA-Z0-9_-]+:.*## / {printf "  %-20s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

doctor: ## Diagnose required tools and lockfile; installs nothing
	@failed=0; \
	for tool in git node "$(NPM)"; do \
		if command -v "$$tool" >/dev/null 2>&1; then printf 'OK: %s\n' "$$tool"; \
		else printf 'ERROR: missing %s\n' "$$tool" >&2; failed=1; fi; \
	done; \
	if command -v node >/dev/null 2>&1; then \
		node -e 'if (Number(process.versions.node.split(".")[0]) < 24) { console.error("ERROR: Node.js 24 or later required"); process.exit(1); }' || failed=1; \
	fi; \
	if test -f package-lock.json; then printf 'OK: package-lock.json\n'; \
	else printf 'ERROR: missing package-lock.json\n' >&2; failed=1; fi; \
	exit $$failed

setup: doctor ## Install locked dependencies (network); preserve config and lockfile
	$(NPM) ci

install: setup ## Compatibility alias for setup

dev: ## Run Next.js on localhost:3000 in foreground; stop with Ctrl-C
	$(NPM) run dev

stop: ## No background services are owned; foreground servers use Ctrl-C
	@printf 'No checkout-managed background services. Stop dev/preview with Ctrl-C in their terminal.\n'

fmt: ## Rewrite supported source and documentation formatting
	$(NPM) run format

check: ## Run formatting, lint, FSD and type checks without production build
	$(NPM) run check:project

test: ## Unsupported: no autonomous behavioral test suite is configured yet
	@printf 'Unsupported: no autonomous behavioral test suite is configured. Architecture checks are in make check.\n' >&2
	@exit 2

verify: check test ## Sequential check then test; currently fails at unsupported test; no build

build: ## Generate the static out/ artifact; does not publish
	$(NPM) run build

clean: ## Remove fixed generated paths; refuse tracked files, symlinks or missing Git metadata
	node scripts/clean.mjs

##@ Portfolio operations
preview: ## Serve existing out/ on localhost:4317 in foreground; requires Python 3
	@test -f out/index.html || { printf 'Run make build first.\n' >&2; exit 1; }
	python3 -m http.server 4317 --bind 127.0.0.1 --directory out

deployment-validate: ## Check workflow YAML syntax and formatting locally; no build or deployment
	$(NPM) exec -- prettier --check .github/workflows/*.yml
