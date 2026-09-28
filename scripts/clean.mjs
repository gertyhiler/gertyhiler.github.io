import { execFileSync } from "node:child_process";
import { lstatSync, readdirSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const artifacts = [".next", "out", "tsconfig.tsbuildinfo"];

function rejectSymlinks(path) {
  const stat = lstatSync(path, { throwIfNoEntry: false });
  if (!stat) return;
  if (stat.isSymbolicLink()) throw new Error(`Refusing symbolic link: ${path}`);
  if (stat.isDirectory()) {
    for (const entry of readdirSync(path)) rejectSymlinks(join(path, entry));
  }
}

try {
  // Validate every path before deleting anything. Missing Git metadata fails closed.
  for (const artifact of artifacts) {
    const tracked = execFileSync("git", ["ls-files", "-z", "--", artifact], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    });
    if (tracked) throw new Error(`Refusing tracked artifact: ${artifact}`);
    rejectSymlinks(join(root, artifact));
  }
  for (const artifact of artifacts) {
    rmSync(join(root, artifact), { recursive: true, force: true });
  }
  console.log(`Removed generated artifacts: ${artifacts.join(", ")}`);
} catch (error) {
  console.error(`Clean refused: ${error.message}`);
  process.exitCode = 1;
}
