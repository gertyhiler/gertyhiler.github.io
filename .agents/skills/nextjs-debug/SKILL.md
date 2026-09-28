---
name: nextjs-debug
description: Use for flaky local Next.js browser or frontend bugs that need temporary client or server JSONL tracing, reproduction, evidence-based repair, post-fix validation, and mandatory instrumentation cleanup.
---

# Next.js JSONL Trace Debugging

## Purpose

Use this skill when a bug is intermittent, browser-only, timing-sensitive, or otherwise not provable from tests/static inspection. The goal is to collect real runtime state, make a narrow fix from evidence, verify with post-fix traces, and remove all temporary instrumentation.

## Required Capabilities And Gates

- Runtime evidence: local trace endpoint plus a reproducible browser path.
- Safety: no secrets or production instrumentation; all temporary files are
  removed after post-fix proof.
- Verification: focused regression evidence and a cleanup search.
- This debugging process adds no reviewer requirement.

## Workflow

1. **Define the symptom and reproduction surface**
   - Record the exact page/route, viewport, user action, expected state, and broken state.
   - Write a short reproduction checklist for the human tester before adding logs.
   - Do not assume the root cause from screenshots alone.

2. **Inspect code and state the hypotheses**
   - Trace the rendering/data path in the codebase.
   - List 2-3 concrete hypotheses that can be proven or disproven with runtime fields.
   - Decide what fields must be logged before writing instrumentation.

3. **Create a temporary local trace endpoint**
   - Add a dev-only endpoint such as `POST /api/trace`.
   - Write newline-delimited JSON to a local report path such as `reports/dev-traces/<case>.jsonl`.
   - Each event should include timestamp, event name, route/context, stable entity identifiers, and the relevant runtime snapshot.
   - Never log secrets, cookies, tokens, credentials, raw personal data, or full production URLs with secrets.

4. **Instrument the suspected path**
   - Add small `fetch("/api/trace", { method: "POST", ... })` calls around lifecycle edges and decision points.
   - Log both the input state and the rendered/effective state when debugging UI.
   - Keep instrumentation noisy enough to prove timing/order, but scoped to the affected component/route.
   - Make instrumentation easy to remove: avoid mixing it into the fix logic.

5. **Wait for reproduction**
   - Tell the user the exact route and steps to use.
   - Do not conclude until the user says the bug was reproduced or the traces clearly show the failure.

6. **Read the JSONL logs**
   - Parse the report and separate transient states from stable broken states.
   - Compare good and bad entities/events.
   - State which hypotheses were disproven and which one remains supported by evidence.

7. **Fix from the evidence**
   - Make the smallest code change that addresses the supported root cause.
   - Keep temporary trace logs while validating the fix if the failure was flaky.

8. **Validate post-fix**
   - Ask the user to reproduce again or run the same route locally.
   - Read fresh traces and check the specific failure predicate, not just screenshots.
   - Example: if decoded images were stuck on skeleton, count decoded images still carrying the skeleton/hidden class after a late timeout.

9. **Cleanup**
   - When the user confirms the fix and traces support it, remove:
     - all `fetch("/api/trace", ...)` instrumentation;
     - the temporary trace endpoint;
     - generated JSONL reports unless the user explicitly wants to keep them;
     - any temporary package/build artifacts created only for the investigation.
   - Verify the cleanup with search, e.g. `rg "/api/trace|dev-traces|trace\\("`.

## Trace Endpoint Pattern

Use the host framework's normal API route mechanism. For a Next.js App Router project, the endpoint shape is:

```ts
import { mkdir, appendFile } from "node:fs/promises";
import path from "node:path";

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return Response.json({ ok: false }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const dir = path.join(process.cwd(), "reports", "dev-traces");
  await mkdir(dir, { recursive: true });
  await appendFile(
    path.join(dir, "case-name.jsonl"),
    `${JSON.stringify({ ts: new Date().toISOString(), body })}\n`,
  );

  return Response.json({ ok: true });
}
```

## Client Trace Pattern

```ts
function traceClientEvent(event: string, payload: Record<string, unknown>) {
  if (process.env.NODE_ENV === "production") return;

  void fetch("/api/trace", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ type: "case-name", event, ...payload }),
  }).catch(() => {});
}
```

## Output Discipline

When reporting back, lead with evidence:

- What was reproduced.
- What the trace proved.
- What was fixed.
- What post-fix trace predicate now passes.
- What instrumentation remains or was removed.
