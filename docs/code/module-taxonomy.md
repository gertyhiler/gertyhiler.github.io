# Module taxonomy

Read before creating or moving support code. This is the English adaptation of the Logistics glossary; project semantics override the generic FSD skill.

First identify the narrowest owner. Then choose the technical role. Promote into Shared only for domain-independent infrastructure or demonstrated cross-slice reuse.

| Role      | Meaning                                                                | Location and filename                                  |
| --------- | ---------------------------------------------------------------------- | ------------------------------------------------------ |
| Utility   | Pure technical operation, no domain, IO or lifecycle                   | `shared/utils/*.util.ts` or internal library utilities |
| Helper    | Pure operation aware of its owner's domain or shape                    | `model/helpers/*.helper.ts`                            |
| Mapper    | Converts source/domain/UI contracts                                    | `model/mappers/*.mapper.ts`                            |
| Hook      | React lifecycle, local state or composition                            | `model/hooks/use-*.ts`                                 |
| Library   | Cohesive subsystem, IO/SDK boundary or infrastructure with its own API | `model/lib/<name>` or `shared/lib/<name>`              |
| Data      | Static source records                                                  | `model/data/*.data.ts`                                 |
| Types     | Named owner contracts                                                  | `model/types/*.types.ts`                               |
| Constants | Stable behavioral constants                                            | `model/constants/*.constants.ts`                       |
| Query     | Data query contract                                                    | `model/queries/*.query.ts`                             |
| Store     | Real shared state machine/store                                        | `model/store/*.store.ts`                               |
| Context   | Dependency injection across React subtree                              | `model/contexts/*.context.tsx`                         |
| Adapter   | External/system contract boundary                                      | `model/adapters/*.adapter.ts`                          |
| Schema    | Validation contract                                                    | `model/schemas/*.schemas.ts`                           |

No generic `state` bucket. `model` roots contain barrels only. Slice-root `hooks` and `lib` are forbidden. A single small function is not automatically a library.

Every semantic directory has `index.ts` for client-safe exports and/or `index.server.ts` for server-only exports. Export each implementation from its matching entrypoint. Server barrels import `server-only`; client barrels cannot re-export server modules.

Public React composition lives at `<slice>/<slice>.tsx`. Internal visual components live in `ui/` and stay private. The UI kit lives in `shared/ui`: basic primitives such as links, even when adapted to project routing. Reusable compound UI that combines primitives or coordinates richer behavior belongs in `shared/components` (for example, a form composer). Domain-specific business logic and compositions remain in their owning entity, feature, or widget. Do not add a root Shared barrel.

ESLint enforces placement, suffixes, indexes and exports. It cannot decide whether an operation is meaningfully a helper or library. Review that distinction separately.
