import path from "node:path";

const layers = ["pages", "widgets", "features", "entity", "shared"];
const allowed = {
  pages: ["widgets", "shared"],
  widgets: ["features", "shared"],
  features: ["entity", "shared"],
  entity: ["shared"],
  shared: ["shared"],
};
const entityAdapters = new Set([
  "article-reader",
  "selected-work",
  "writing-summary",
]);
const sharedSegments = new Set([
  "api",
  "assets",
  "components",
  "config",
  "hooks",
  "lib",
  "styles",
  "ui",
  "utils",
]);
const root = process.cwd();

export const projectBoundariesPlugin = {
  rules: {
    boundaries: {
      meta: {
        type: "problem",
        schema: [],
        messages: { invalid: "{{reason}}" },
      },
      create(context) {
        const filename = context.filename;
        const relative = path.relative(root, filename).split(path.sep);
        const inSource = relative[0] === "src";
        const layer = relative[1];
        function report(node, reason) {
          context.report({ node, messageId: "invalid", data: { reason } });
        }
        function inspect(node) {
          const specifier = node.source?.value;
          if (typeof specifier !== "string") return;
          let target;
          if (specifier.startsWith("@/"))
            target = specifier.slice(2).split("/");
          else if (specifier.startsWith(".")) {
            const resolved = path.relative(
              path.join(root, "src"),
              path.resolve(path.dirname(filename), specifier),
            );
            if (resolved.startsWith("..")) return;
            target = resolved.split(path.sep);
          } else return;
          const [targetLayer, targetSlice, ...rest] = target;
          if (!layers.includes(targetLayer)) {
            report(node, "Imports must resolve to a documented FSD layer.");
            return;
          }
          if (!inSource) return;
          const sameSlice =
            layer === targetLayer && relative[2] === targetSlice;
          if (sameSlice || (layer === "shared" && targetLayer === "shared"))
            return;
          const adapter =
            layer === "widgets" &&
            targetLayer === "entity" &&
            entityAdapters.has(relative[2]);
          if (!allowed[layer]?.includes(targetLayer) && !adapter)
            report(
              node,
              `${layer} cannot import ${targetLayer}; see the project layer matrix.`,
            );
          if (
            targetLayer !== "shared" &&
            rest.length &&
            !(rest.length === 1 && ["index", "index.server"].includes(rest[0]))
          )
            report(node, "Cross-slice imports must use a public entrypoint.");
        }
        return {
          Program(node) {
            if (inSource && !layers.includes(layer))
              report(node, `Unexpected source layer: ${layer}.`);
            if (
              inSource &&
              layer === "shared" &&
              !sharedSegments.has(relative[2])
            )
              report(
                node,
                `Unexpected shared segment: ${relative[2]}; infrastructure belongs in shared/lib.`,
              );
            if (/index\.(?:server\.)?tsx?$/.test(filename)) {
              for (const statement of node.body)
                if (
                  ![
                    "ImportDeclaration",
                    "ExportNamedDeclaration",
                    "ExportAllDeclaration",
                  ].includes(statement.type) ||
                  (statement.type === "ExportNamedDeclaration" &&
                    statement.declaration)
                )
                  report(
                    statement,
                    "Index files contain imports/re-exports only, never implementation.",
                  );
            }
          },
          ImportDeclaration: inspect,
          ExportNamedDeclaration: inspect,
          ExportAllDeclaration: inspect,
        };
      },
    },
  },
};
