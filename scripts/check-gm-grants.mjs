#!/usr/bin/env node
/**
 * GM-grant gate.
 *
 * Compares the GM_* APIs actually referenced in src/ against the @grant
 * lines in build/HHAuto.template.js. A GM API that is used but not granted
 * throws a ReferenceError at runtime in Tampermonkey's sandbox -- typically
 * discovered only in the field when the affected feature is triggered
 * (e.g. SurveyService buttons, see BUG-001 in the 2026-07 review).
 *
 * Fails when
 *   - src/ references a GM_* identifier that is missing from the grant list
 *   - the grant list contains a GM_* entry no longer referenced in src/
 *     (unused grants widen the script's privileges for no reason)
 *
 * GM_info is exempt: Tampermonkey exposes it without a grant.
 *
 * Usage:
 *   node scripts/check-gm-grants.mjs          # check mode (CI)
 *   node scripts/check-gm-grants.mjs --list   # list usage and grants
 *
 * Exit codes:
 *   0  usage and grant list match
 *   1  mismatch found (CI must fail)
 *   2  internal error (typescript missing, template unreadable, ...)
 */
import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve, dirname, relative, join, sep } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, "..");
const srcRoot = resolve(repoRoot, "src");
const templatePath = resolve(repoRoot, "build", "HHAuto.template.js");

// GM APIs available without a @grant declaration.
const NO_GRANT_NEEDED = new Set(["GM_info"]);

function listTsFiles(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...listTsFiles(full));
    else if (name.endsWith(".ts")) out.push(full);
  }
  return out;
}

async function main() {
  const listMode = process.argv.includes("--list");
  let ts;
  try {
    ({ default: ts } = await import("typescript"));
  } catch (err) {
    console.error(`[gm-grants] cannot load typescript: ${err.message}`);
    process.exit(2);
  }

  let template;
  try {
    template = readFileSync(templatePath, "utf8");
  } catch (err) {
    console.error(`[gm-grants] cannot read ${templatePath}: ${err.message}`);
    process.exit(2);
  }

  const granted = new Set(
    [...template.matchAll(/^\/\/ @grant\s+(GM_\w+)\s*$/gm)].map((m) => m[1])
  );

  let files;
  try {
    files = listTsFiles(srcRoot);
  } catch (err) {
    console.error(`[gm-grants] cannot scan ${srcRoot}: ${err.message}`);
    process.exit(2);
  }
  if (files.length === 0) {
    console.error(`[gm-grants] no .ts files under ${srcRoot}`);
    process.exit(2);
  }

  // Identifier-level scan (AST, not regex) so GM_* names inside comments or
  // string literals do not count as usage.
  const usage = new Map(); // api -> first "file:line"
  for (const file of files) {
    const rel = relative(repoRoot, file).split(sep).join("/");
    const text = readFileSync(file, "utf8");
    const sf = ts.createSourceFile(file, text, ts.ScriptTarget.ES2019, true);
    const visit = (node) => {
      if (ts.isIdentifier(node) && /^GM_\w+$/.test(node.text)) {
        if (!usage.has(node.text)) {
          const { line } = sf.getLineAndCharacterOfPosition(node.getStart(sf));
          usage.set(node.text, `${rel}:${line + 1}`);
        }
      }
      node.forEachChild(visit);
    };
    visit(sf);
  }

  if (listMode) {
    console.log(`[gm-grants] granted: ${[...granted].sort().join(", ") || "(none)"}`);
    console.log(`[gm-grants] used in src/:`);
    for (const [api, where] of [...usage.entries()].sort()) {
      console.log(`  ${api} (first: ${where})`);
    }
    process.exit(0);
  }

  const missing = [...usage.keys()]
    .filter((api) => !granted.has(api) && !NO_GRANT_NEEDED.has(api))
    .sort();
  const unused = [...granted].filter((api) => !usage.has(api)).sort();

  let failed = false;
  if (missing.length > 0) {
    failed = true;
    console.error(`[gm-grants] FAIL: ${missing.length} GM API(s) used in src/ but not granted in build/HHAuto.template.js:`);
    for (const api of missing) console.error(`  + ${api} (first: ${usage.get(api)})`);
    console.error(`[gm-grants] Add "// @grant        <API>" to the template header, or the call`);
    console.error(`[gm-grants] throws a ReferenceError at runtime.`);
  }
  if (unused.length > 0) {
    failed = true;
    console.error(`[gm-grants] FAIL: ${unused.length} granted GM API(s) not referenced in src/:`);
    for (const api of unused) console.error(`  - ${api}`);
    console.error(`[gm-grants] Remove stale @grant lines; unused grants widen privileges.`);
  }
  if (failed) process.exit(1);

  console.log(`[gm-grants] OK: ${usage.size} GM API(s) used, grant list matches.`);
  process.exit(0);
}

main().catch((err) => {
  console.error(`[gm-grants] unexpected error: ${err.stack || err.message}`);
  process.exit(2);
});
