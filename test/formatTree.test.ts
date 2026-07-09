import { describe, expect, it } from "vitest";
import { formatTree } from "../src/outline/formatTree";

describe("formatTree", () => {
  it("uses the file name as the root", () => {
    expect(formatTree("note.md", [{ heading: "A", level: 1 }])).toBe("note.md\n└── A");
  });

  it("renders standard tree glyphs", () => {
    expect(formatTree("note.md", [
      { heading: "A", level: 1 },
      { heading: "B", level: 2 },
      { heading: "C", level: 2 },
      { heading: "D", level: 1 },
    ])).toBe("note.md\n├── A\n│   ├── B\n│   └── C\n└── D");
  });

  it("uses the shallowest heading in the document as the root level", () => {
    expect(formatTree("note.md", [
      { heading: "B", level: 2 },
      { heading: "C", level: 3 },
    ])).toBe("note.md\n└── B\n    └── C");
  });

  it("adds placeholder nodes for skipped heading levels", () => {
    expect(formatTree("note.md", [
      { heading: "B", level: 2 },
      { heading: "D", level: 4 },
    ])).toBe("note.md\n└── B\n    └── (无标题)\n        └── D");
  });

  it("merges placeholder nodes under the same parent and skipped level", () => {
    expect(formatTree("note.md", [
      { heading: "A", level: 1 },
      { heading: "C", level: 3 },
      { heading: "D", level: 3 },
    ])).toBe("note.md\n└── A\n    └── (无标题)\n        ├── C\n        └── D");
  });

  it("adds an initial placeholder when earlier headings are deeper than the shallowest document level", () => {
    expect(formatTree("note.md", [
      { heading: "C", level: 3 },
      { heading: "B", level: 2 },
    ])).toBe("note.md\n├── (无标题)\n│   └── C\n└── B");
  });
});
