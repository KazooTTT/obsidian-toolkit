# PRD: Obsidian Toolkit Outline Copy Commands

## Problem Statement

The user wants a personal Obsidian plugin collection that can grow over time with custom commands. The first useful feature is exporting the outline of the currently active Markdown tab without creating extra files. The outline needs to be easy to paste into notes, issues, chats, and reviews, either as plain Markdown heading lines or as a command-line-style tree that exposes heading hierarchy problems.

## Solution

Build a private Obsidian plugin named `Obsidian Toolkit`. The plugin registers two commands that operate on the currently active Markdown note and copy an outline to the clipboard:

- `复制当前笔记大纲为 Markdown 标题 / Copy outline as Markdown headings`
- `复制当前笔记大纲为 Tree / Copy outline as Tree`

The plugin uses Obsidian metadata cache headings rather than a custom Markdown parser. It does not force-save the active note before export. When there is no active Markdown note or no headings, it shows a Chinese Notice and does not overwrite the clipboard.

## User Stories

1. As an Obsidian user, I want a personal plugin collection, so that I can keep adding small custom workflow commands in one place.
2. As an Obsidian user, I want the plugin name to include Obsidian-oriented language, so that I can identify it quickly in the plugin list.
3. As an Obsidian user, I want Chinese command names with English search keywords, so that I can find commands by either Chinese or English terms.
4. As an Obsidian user, I want to copy the outline of the currently active Markdown tab, so that the command follows the note I am actually looking at.
5. As an Obsidian user, I want non-Markdown tabs to be rejected clearly, so that graph, canvas, settings, PDF, or plugin views do not produce confusing output.
6. As an Obsidian user, I want no-heading notes to leave my clipboard untouched, so that an accidental command does not destroy useful clipboard content.
7. As an Obsidian user, I want Markdown heading output to contain only heading lines, so that I can paste a clean outline back into Markdown.
8. As an Obsidian user, I want Markdown heading output to preserve the original heading levels, so that the outline reflects the source note rather than silently fixing it.
9. As an Obsidian user, I want Markdown heading output to use Obsidian's parsed heading text, so that standard Markdown heading parsing is respected.
10. As an Obsidian user, I want tree output to include the file name as the root node, so that pasted output clearly identifies the source note.
11. As an Obsidian user, I want tree output to use standard tree glyphs, so that it looks like command-line `tree` output.
12. As an Obsidian user, I want tree output to show heading text without Markdown `#` prefixes, so that the tree structure itself communicates hierarchy.
13. As an Obsidian user, I want headings with wiki links, tags, inline code, and other heading text to be preserved as parsed by Obsidian, so that the outline remains faithful to my note.
14. As an Obsidian user, I want the tree root level to be the shallowest heading level in the document, so that documents starting at `##` are handled naturally.
15. As an Obsidian user, I want skipped heading levels to be visible in tree output, so that hierarchy problems are easy to spot.
16. As an Obsidian user, I want skipped heading levels to be represented with `(无标题)`, so that missing intermediate headings are explicit.
17. As an Obsidian user, I want repeated skipped headings under the same parent and level to share one placeholder, so that the tree stays readable.
18. As an Obsidian user, I want the plugin to avoid implicit saves, so that copying an outline does not trigger sync, git, linter, or other side effects.
19. As an Obsidian user, I want success and failure feedback in Chinese, so that the plugin feels native to my workflow.
20. As a plugin maintainer, I want the source project outside the Quartz content vault, so that plugin source history is separate from personal knowledge-base content.
21. As a plugin maintainer, I want a deploy command to copy build artifacts into the vault plugin directory, so that local installation is repeatable.
22. As a plugin maintainer, I want the outline behavior implemented behind pure formatting functions, so that the tricky tree behavior can be tested without Obsidian.
23. As a plugin maintainer, I want the Obsidian API boundary to stay thin, so that future toolkit commands can be added without turning the plugin entrypoint into a large mixed module.
24. As a plugin maintainer, I want a private GitHub repository, so that the plugin can be versioned independently without being published publicly.

## Implementation Decisions

- Create a standalone private Obsidian plugin project named `Obsidian Toolkit` with plugin id `obsidian-toolkit`.
- Keep the source project outside the Quartz content vault and deploy compiled plugin artifacts into the active vault's local plugin directory.
- Use npm, TypeScript, esbuild, and Vitest.
- Register two commands only: copy current note outline as Markdown headings, and copy current note outline as Tree.
- Use the active Obsidian Markdown file as the only source.
- Use Obsidian metadata cache headings as the heading source.
- Do not force-save before reading headings.
- Do not implement file export in the first version.
- Do not implement a settings tab in the first version.
- For Markdown heading output, emit parsed heading text with the original heading level.
- For tree output, use the file name including `.md` as root.
- For tree output, use standard `tree` glyphs.
- For tree output, calculate the document root heading level as the shallowest heading level found across all headings.
- For tree output, insert `(无标题)` placeholder nodes for skipped intermediate heading levels.
- Merge placeholder nodes when they represent the same missing level under the same parent.
- Show Chinese Obsidian Notice messages for success and failure states.

## Testing Decisions

- Test the highest practical seam outside Obsidian: the pure outline formatter functions.
- Good tests assert user-visible output strings, not implementation details of stacks or intermediate nodes.
- Test Markdown heading formatting preserves heading levels and parsed text.
- Test tree formatting includes the file name root.
- Test standard tree connector rendering.
- Test root-level calculation from the shallowest heading in the document.
- Test skipped heading levels create `(无标题)` placeholders.
- Test placeholder merging for repeated skipped levels under the same parent.
- Test the case where earlier headings are deeper than the eventual shallowest heading.
- Do not unit test Obsidian command registration, clipboard writes, or Notice rendering in the first version; keep those as thin integration behavior verified manually in Obsidian.

## Out of Scope

- Exporting outlines to Markdown files.
- Exporting outlines for selected text, folders, the whole vault, canvas files, PDFs, or non-Markdown views.
- A settings page.
- Multiple vault deployment configuration.
- Setext heading support beyond what Obsidian metadata cache provides.
- Custom Markdown parsing.
- Automatic heading repair.
- Publishing the plugin publicly.
- Supporting mobile-specific behavior beyond not marking the plugin desktop-only.

## Further Notes

The first version should bias toward a small, stable toolkit skeleton. The outline feature should establish the project shape for future commands: keep Obsidian lifecycle code thin, keep feature behavior in focused modules, and put test coverage around pure functions where behavior is easiest to specify.
