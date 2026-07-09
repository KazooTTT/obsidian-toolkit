import { Notice, Plugin } from "obsidian";
import { formatMarkdownHeadings } from "./formatMarkdownHeadings";
import { formatTree } from "./formatTree";
import { getActiveMarkdownFile } from "./getActiveMarkdownFile";
import type { OutlineHeading } from "./types";

export function registerOutlineCommands(plugin: Plugin): void {
  plugin.addCommand({
    id: "copy-outline-as-markdown-headings",
    name: "复制当前笔记大纲为 Markdown 标题 / Copy outline as Markdown headings",
    callback: async () => {
      await copyOutline(plugin, "markdown");
    },
  });

  plugin.addCommand({
    id: "copy-outline-as-tree",
    name: "复制当前笔记大纲为 Tree / Copy outline as Tree",
    callback: async () => {
      await copyOutline(plugin, "tree");
    },
  });
}

async function copyOutline(plugin: Plugin, format: "markdown" | "tree"): Promise<void> {
  const file = getActiveMarkdownFile(plugin.app);
  if (!file) {
    new Notice("当前标签页不是 Markdown 笔记");
    return;
  }

  const headings = plugin.app.metadataCache.getFileCache(file)?.headings ?? [];
  if (headings.length === 0) {
    new Notice("当前笔记没有标题");
    return;
  }

  const outlineHeadings: OutlineHeading[] = headings.map((heading) => ({
    heading: heading.heading,
    level: heading.level,
  }));

  const text = format === "markdown"
    ? formatMarkdownHeadings(outlineHeadings)
    : formatTree(file.name, outlineHeadings);

  await navigator.clipboard.writeText(text);
  new Notice(format === "markdown" ? "已复制 Markdown 大纲" : "已复制 Tree 大纲");
}
