import type { OutlineHeading } from "./types";

export function formatMarkdownHeadings(headings: OutlineHeading[]): string {
  return headings
    .map((heading) => `${"#".repeat(heading.level)} ${heading.heading}`)
    .join("\n");
}
