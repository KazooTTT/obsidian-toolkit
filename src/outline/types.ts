export interface OutlineHeading {
  heading: string;
  level: number;
}

export interface TreeNode {
  title: string;
  children: TreeNode[];
  placeholder?: boolean;
}
