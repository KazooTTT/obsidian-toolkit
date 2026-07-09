import { describe, expect, it } from "vitest";
import { formatMarkdownHeadings } from "../src/outline/formatMarkdownHeadings";

it("keeps parsed heading text and original heading levels", () => {
  expect(formatMarkdownHeadings([
    { heading: "A", level: 1 },
    { heading: "B", level: 2 },
    { heading: "C", level: 3 },
  ])).toBe("# A\n## B\n### C");
});
