#!/usr/bin/env node
// Lists sample content that still needs the client's real details.
// STRICT_PLACEHOLDERS=1 turns the warning into a build failure.
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const files = ["src/content/placeholders.ts", "src/content/site.ts"];

const findings = [];
for (const file of files) {
  const lines = readFileSync(join(root, file), "utf8").split("\n");
  lines.forEach((line, i) => {
    if (/TODO\(client\)/.test(line)) findings.push({ file, line: i + 1, text: line.trim().replace(/^\/?\*+\s?|^\/\/\s?/, "") });
  });
}

const placeholderFlags = readFileSync(join(root, files[0]), "utf8").match(/placeholder(?:: true|s? =)/g)?.length ?? 0;

if (findings.length === 0 && placeholderFlags === 0) {
  console.log("✓ No placeholder content outstanding.");
  process.exit(0);
}

const bar = "─".repeat(72);
console.warn(`\n${bar}\n  ${findings.length} item(s) still need real client details\n${bar}`);
for (const f of findings) console.warn(`  • ${f.file}:${f.line}  ${f.text}`);
console.warn(`${bar}\n  Sample flags in placeholders.ts: ${placeholderFlags}`);
console.warn("  Set STRICT_PLACEHOLDERS=1 to fail the build until these are resolved.\n");

if (process.env.STRICT_PLACEHOLDERS === "1") process.exit(1);
