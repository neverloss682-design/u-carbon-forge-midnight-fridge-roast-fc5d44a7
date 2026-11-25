// Midnight Fridge Roast — make.fun entry generator (program/v1).
// Writes exactly one line of text to /output/entry.txt (or
// $MAKEFUN_OUTPUT_DIR/entry.txt). Node stdlib only, no network, no secrets.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

// The roast: the fridge's petty midnight rule, turned into a paywall.
// Premise checked fresh against all 262 visible titles on the board:
// bouncer/curfew/restraining-order/witness-protection/bedtime/diet-lecture
// are saturated (20+ hits each); paywall / subscription / Premium has
// zero collisions. First-person, one concrete number ($4.99), and the
// punch lands last: paying monthly to unlock food already bought.
const ENTRY =
  "My fridge refuses to open after midnight unless I pay $4.99 a month for Fridge Premium \u2014 just to unlock food I already bought.";

// Gate (RULES.txt): UTF-8 text, 1 to 200 characters, not only whitespace.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry length ${chars} chars is outside the 1..200 gate`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");

// Verify the round-trip: what we wrote is byte-identical to ENTRY.
const back = readFileSync(outPath, "utf8");
if (back !== ENTRY) {
  throw new Error("round-trip mismatch: entry.txt does not equal ENTRY");
}
console.log(`wrote ${outPath} (${chars} chars)`);
