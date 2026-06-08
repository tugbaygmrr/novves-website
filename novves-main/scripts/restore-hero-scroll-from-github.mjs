#!/usr/bin/env node
/** Restore scroll-video-section.tsx from GitHub main (original working scroll). */
import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");
const REPO = path.join(ROOT, "..");
const REL = "novves-main/src/components/scroll-video-section.tsx";

const src = execSync(`git show Enter/main:${REL}`, { cwd: REPO, encoding: "utf8" });
const out = path.join(ROOT, "src/components/scroll-video-section.tsx");
fs.writeFileSync(out, src, "utf8");
new TextDecoder("utf-8", { fatal: true }).decode(fs.readFileSync(out));
console.log("OK restored from Enter/main");
