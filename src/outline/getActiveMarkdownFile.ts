import type { App, TFile } from "obsidian";

export function getActiveMarkdownFile(app: App): TFile | null {
  const file = app.workspace.getActiveFile();
  if (!file || file.extension !== "md") return null;
  return file;
}
