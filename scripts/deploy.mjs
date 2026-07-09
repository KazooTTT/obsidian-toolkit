import { copyFile, mkdir, stat } from "node:fs/promises";
import { join } from "node:path";

const targetDir = "/Users/kazoottt/personal/quartz/content/.obsidian/plugins/obsidian-toolkit";
const files = ["main.js", "manifest.json"];

await mkdir(targetDir, { recursive: true });

for (const file of files) {
  await copyFile(file, join(targetDir, file));
}

try {
  await stat("styles.css");
  await copyFile("styles.css", join(targetDir, "styles.css"));
} catch (error) {
  if (error?.code !== "ENOENT") throw error;
}

console.log(`Deployed Obsidian Toolkit to ${targetDir}`);
