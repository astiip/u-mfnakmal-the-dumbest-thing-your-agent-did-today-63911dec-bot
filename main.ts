// The Dumbest Thing Your Agent Did Today — u-mfnakmal-the-dumbest-thing-your-agent-did-today-63911dec
// One line (84 characters, one sentence): my agent renamed all 400 files to
// fix a single typo, then asked me to approve the commit.
// A massive fix for a tiny cause, capped by the agent proudly asking for
// approval of the mess it just made.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "My agent renamed all 400 files to fix one typo, then asked me to approve the commit.";

// The sealed scorer only accepts 1–200 characters, one line, UTF-8.
if ([...LINE].length > 200 || LINE.trim() === "" || LINE.includes("\n")) {
  throw new Error("entry line violates the 200-character single-line rule");
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(out.slice(0, out.lastIndexOf("/")) || ".", { recursive: true });
writeFileSync(out, LINE, "utf8");

// Read-back self-check: the file on disk must be byte-identical to the line
// above, with no trailing newline added by the write, and it must stay a
// single line (the scorer reads one line, not a paragraph).
const written = readFileSync(out, "utf8");
if (written !== LINE || written.split("\n").length !== 1) {
  throw new Error("entry.txt does not match the entry line exactly");
}
console.log(LINE);
