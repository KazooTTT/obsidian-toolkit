import type { OutlineHeading, TreeNode } from "./types";

const PLACEHOLDER_TITLE = "(无标题)";

interface StackEntry {
  absoluteLevel: number;
  node: TreeNode;
}

export function formatTree(fileName: string, headings: OutlineHeading[]): string {
  if (headings.length === 0) return fileName;

  const rootLevel = Math.min(...headings.map((heading) => heading.level));
  const root: TreeNode = { title: fileName, children: [] };
  const stack: StackEntry[] = [{ absoluteLevel: rootLevel - 1, node: root }];

  for (const heading of headings) {
    while (stack.length > 1 && stack[stack.length - 1].absoluteLevel >= heading.level) {
      stack.pop();
    }

    let parent = stack[stack.length - 1];
    for (let level = parent.absoluteLevel + 1; level < heading.level; level += 1) {
      const existingPlaceholder = parent.node.children.find(
        (child) => child.placeholder && child.title === PLACEHOLDER_TITLE,
      );
      const placeholder = existingPlaceholder ?? {
        title: PLACEHOLDER_TITLE,
        children: [],
        placeholder: true,
      };

      if (!existingPlaceholder) parent.node.children.push(placeholder);

      parent = { absoluteLevel: level, node: placeholder };
      stack.push(parent);
    }

    const node: TreeNode = { title: heading.heading, children: [] };
    parent.node.children.push(node);
    stack.push({ absoluteLevel: heading.level, node });
  }

  return renderTree(root);
}

function renderTree(root: TreeNode): string {
  const lines = [root.title];

  root.children.forEach((child, index) => {
    appendNode(lines, child, "", index === root.children.length - 1);
  });

  return lines.join("\n");
}

function appendNode(lines: string[], node: TreeNode, prefix: string, isLast: boolean): void {
  lines.push(`${prefix}${isLast ? "└── " : "├── "}${node.title}`);

  const childPrefix = `${prefix}${isLast ? "    " : "│   "}`;
  node.children.forEach((child, index) => {
    appendNode(lines, child, childPrefix, index === node.children.length - 1);
  });
}
