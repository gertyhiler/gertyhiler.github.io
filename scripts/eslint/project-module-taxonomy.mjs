import { existsSync, readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);

const semanticDirectories = Object.freeze({
  adapters: { pattern: /\.adapter\.ts$/u, patternLabel: "*.adapter.ts" },
  constants: {
    pattern: /\.constants\.ts$/u,
    patternLabel: "*.constants.ts",
  },
  contexts: {
    pattern: /\.context\.tsx?$/u,
    patternLabel: "*.context.ts or *.context.tsx",
  },
  data: { pattern: /\.data\.ts$/u, patternLabel: "*.data.ts" },
  helpers: {
    pattern: /\.helpers?\.ts$/u,
    patternLabel: "*.helper.ts or *.helpers.ts",
  },
  mappers: { pattern: /\.mapper\.ts$/u, patternLabel: "*.mapper.ts" },
  queries: { pattern: /\.query\.ts$/u, patternLabel: "*.query.ts" },
  schemas: { pattern: /\.schemas\.ts$/u, patternLabel: "*.schemas.ts" },
  store: { pattern: /\.store\.ts$/u, patternLabel: "*.store.ts" },
  types: { pattern: /\.types\.ts$/u, patternLabel: "*.types.ts" },
  utils: {
    pattern: /\.utils?\.ts$/u,
    patternLabel: "*.util.ts or *.utils.ts",
  },
});

const fsdSliceLayers = new Set(["entity", "features", "pages", "widgets"]);
const reactSliceLayers = new Set(["features", "pages", "widgets"]);
const modelOwnedDirectories = new Set([
  ...Object.keys(semanticDirectories),
  "cms",
  "hooks",
  "providers",
]);

const cmsModules = {
  pattern: /\.(?:collection|global|plugin)\.ts$/u,
  patternLabel: "*.collection.ts, *.global.ts, or *.plugin.ts",
  serverOnly: true,
};

const reactHooks = {
  pattern: /^use-[a-z0-9]+(?:-[a-z0-9]+)*\.ts$/u,
  patternLabel: "use-*.ts",
};

const payloadHooks = {
  pattern: /\.hook\.ts$/u,
  patternLabel: "*.hook.ts",
  serverOnly: true,
};

const serverProviders = {
  pattern: /\.provider\.ts$/u,
  patternLabel: "*.provider.ts",
  serverOnly: true,
};

function getDirectoryContract(directoryParts) {
  const directory = directoryParts.at(-1);
  const parent = directoryParts.at(-2);

  if (directory === "cms") return cmsModules;
  if (directory === "hooks") {
    return parent === "cms" ? payloadHooks : reactHooks;
  }
  if (directory === "providers") return serverProviders;
  return semanticDirectories[directory];
}

function implementationFiles(directory) {
  return readdirSync(directory, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name !== "index.ts" &&
        entry.name !== "index.server.ts" &&
        /\.[cm]?[jt]sx?$/u.test(entry.name),
    )
    .map((entry) => entry.name)
    .sort();
}

function isServerOnlyFile(directory, filename) {
  return (
    filename.includes(".server.") ||
    readFileSync(path.join(directory, filename), "utf8").includes(
      'import "server-only"',
    )
  );
}

function expectedIndexes(directory, contract, files) {
  if (contract.serverOnly) return ["index.server.ts"];

  const hasServerOnlyFiles = files.some((filename) =>
    isServerOnlyFile(directory, filename),
  );
  const hasClientSafeFiles = files.some(
    (filename) => !isServerOnlyFile(directory, filename),
  );

  return [
    ...(hasClientSafeFiles ? ["index.ts"] : []),
    ...(hasServerOnlyFiles ? ["index.server.ts"] : []),
  ];
}

function indexExportsFile(indexContents, filename) {
  const withoutExtension = filename.replace(/\.[cm]?[jt]sx?$/u, "");
  return (
    indexContents.includes(`"./${filename}"`) ||
    indexContents.includes(`'./${filename}'`) ||
    indexContents.includes(`"./${withoutExtension}"`) ||
    indexContents.includes(`'./${withoutExtension}'`)
  );
}

function sliceEntryPoints(directory) {
  return ["index.ts", "index.server.ts"].filter((entrypoint) =>
    existsSync(path.join(directory, entrypoint)),
  );
}

const projectModuleTaxonomyRule = {
  meta: {
    docs: {
      description:
        "Enforce the repository module taxonomy as a strict override of generic FSD segments.",
    },
    messages: {
      invalidName:
        "Files in '{{directory}}' must be named {{patternLabel}} or use its required index entrypoint.",
      missingExport:
        "'{{expectedIndex}}' must export '{{filename}}' from the '{{directory}}' directory.",
      missingIndex:
        "The '{{directory}}' directory must contain '{{expectedIndex}}'.",
      missingServerOnly:
        "Server-only index '{{expectedIndex}}' must import 'server-only'.",
      modelRootImplementation:
        "The model root is a taxonomy boundary and may contain only index.ts or index.server.ts barrels.",
      misplacedLibrary:
        "An internal slice library must live under 'model/lib', not at the slice root.",
      misplacedModelDirectory:
        "The '{{directory}}' responsibility belongs under the owning slice's 'model' directory.",
      serverLeak:
        "Client-safe index 'index.ts' must not export server-only module '{{filename}}'.",
      missingPublicComponent:
        "React slice '{{slice}}' must own its public component at '{{expectedComponent}}'.",
      missingPublicComponentExport:
        "A React slice entrypoint must export its root public component '{{expectedComponent}}'.",
      publicUiExport:
        "Slice entrypoints must not export internal modules from the 'ui' directory; export the root public component instead.",
    },
    schema: [],
    type: "problem",
  },
  create(context) {
    return {
      Program(node) {
        const filename = path.resolve(context.filename);
        const relativeFilename = path.relative(repositoryRoot, filename);
        const parts = relativeFilename.split(path.sep);

        if (parts[0] !== "src" || parts.length < 3) return;

        const basename = parts.at(-1);
        const directoryParts = parts.slice(0, -1);
        const directory = directoryParts.at(-1);
        const contract = getDirectoryContract(directoryParts);

        if (fsdSliceLayers.has(parts[1])) {
          const modelIndex = directoryParts.indexOf("model", 2);
          const directoryIndex = directoryParts.length - 1;
          const libraryIndex = directoryParts.indexOf("lib", 2);

          if (
            libraryIndex !== -1 &&
            (modelIndex === -1 || libraryIndex !== modelIndex + 1)
          ) {
            context.report({ messageId: "misplacedLibrary", node });
            return;
          }

          if (
            modelOwnedDirectories.has(directory) &&
            (modelIndex === -1 || directoryIndex <= modelIndex)
          ) {
            context.report({
              data: { directory },
              messageId: "misplacedModelDirectory",
              node,
            });
            return;
          }
        }

        const absoluteDirectory = path.dirname(filename);
        const hasRootReactComponent = readdirSync(absoluteDirectory, {
          withFileTypes: true,
        }).some((entry) => entry.isFile() && entry.name.endsWith(".tsx"));
        const isReactSliceEntrypoint =
          reactSliceLayers.has(parts[1]) &&
          (basename === "index.ts" || basename === "index.server.ts") &&
          (existsSync(path.join(absoluteDirectory, "ui")) ||
            hasRootReactComponent);

        if (isReactSliceEntrypoint) {
          const contents = readFileSync(filename, "utf8");
          const entrypoints = sliceEntryPoints(absoluteDirectory);
          const expectedComponent = `${path.basename(absoluteDirectory)}.tsx`;
          const expectedComponentPath = path.join(
            absoluteDirectory,
            expectedComponent,
          );

          if (/from\s+["']\.\/ui\//u.test(contents)) {
            context.report({ messageId: "publicUiExport", node });
          }

          if (basename === entrypoints[0]) {
            if (!existsSync(expectedComponentPath)) {
              context.report({
                data: {
                  expectedComponent,
                  slice: path.basename(absoluteDirectory),
                },
                messageId: "missingPublicComponent",
                node,
              });
            } else if (
              !entrypoints.some((entrypoint) =>
                indexExportsFile(
                  readFileSync(
                    path.join(absoluteDirectory, entrypoint),
                    "utf8",
                  ),
                  expectedComponent,
                ),
              )
            ) {
              context.report({
                data: { expectedComponent },
                messageId: "missingPublicComponentExport",
                node,
              });
            }
          }
        }

        if (
          directory === "model" &&
          basename !== "index.ts" &&
          basename !== "index.server.ts"
        ) {
          context.report({ messageId: "modelRootImplementation", node });
          return;
        }

        if (contract === undefined) return;

        const files = implementationFiles(absoluteDirectory);
        const indexes = expectedIndexes(absoluteDirectory, contract, files);

        if (!indexes.includes(basename) && !contract.pattern.test(basename)) {
          context.report({
            data: { directory, patternLabel: contract.patternLabel },
            messageId: "invalidName",
            node,
          });
        }

        if (basename === files[0]) {
          for (const expectedIndex of indexes) {
            if (!existsSync(path.join(absoluteDirectory, expectedIndex))) {
              context.report({
                data: { directory, expectedIndex },
                messageId: "missingIndex",
                node,
              });
            }
          }
        }

        if (files.includes(basename)) {
          const serverOnly =
            contract.serverOnly ||
            isServerOnlyFile(absoluteDirectory, basename);
          const expectedIndex = serverOnly ? "index.server.ts" : "index.ts";
          const expectedIndexPath = path.join(absoluteDirectory, expectedIndex);

          if (
            existsSync(expectedIndexPath) &&
            !indexExportsFile(readFileSync(expectedIndexPath, "utf8"), basename)
          ) {
            context.report({
              data: { directory, expectedIndex, filename: basename },
              messageId: "missingExport",
              node,
            });
          }
        }

        if (basename === "index.server.ts") {
          const contents = readFileSync(filename, "utf8");
          if (!contents.includes('import "server-only"')) {
            context.report({
              data: { expectedIndex: basename },
              messageId: "missingServerOnly",
              node,
            });
          }
        }

        if (basename === "index.ts") {
          const contents = readFileSync(filename, "utf8");
          for (const implementation of files) {
            if (
              isServerOnlyFile(absoluteDirectory, implementation) &&
              indexExportsFile(contents, implementation)
            ) {
              context.report({
                data: { filename: implementation },
                messageId: "serverLeak",
                node,
              });
            }
          }
        }
      },
    };
  },
};

export const projectModuleTaxonomyPlugin = {
  rules: { "module-taxonomy": projectModuleTaxonomyRule },
};
