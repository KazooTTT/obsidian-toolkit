# Obsidian Toolkit

KazooTTT 的个人 Obsidian 命令合集插件。把各种零散的自用工作流命令收进一个插件，随时间慢慢加功能。

- **插件 ID**：`obsidian-toolkit`
- **仓库**：https://github.com/KazooTTT/obsidian-toolkit （私有）
- **本地源码**：`/Users/kazoottt/personal/obsidian-toolkit/`

## 功能

### 大纲复制（Outline Copy）

把**当前激活的 Markdown 笔记**的标题大纲复制到剪贴板，不生成任何文件，方便粘贴到笔记、Issue、聊天或 Code Review 里。

| 命令 | 效果 |
|------|------|
| `复制当前笔记大纲为 Markdown 标题 / Copy outline as Markdown headings` | 只输出 `#`/`##`… 标题行，保留原始层级 |
| `复制当前笔记大纲为 Tree / Copy outline as Tree` | 输出 `tree` 命令风格的层级树，根节点是文件名 |

Tree 输出的特点：

- 使用标准 tree 符号（`├──` `└──` `│`）
- 跳级的标题（例如 `##` 直接到 `####`）会插入 `(无标题)` 占位，方便发现层级问题
- 以文档中最浅的标题层级作为树根

示例：

```text
我的笔记.md
├── 背景
│   ├── 问题
│   └── (无标题)
│       └── 细节
└── 结论
```

行为约定：

- 数据源是 Obsidian metadata cache 的标题解析结果，不自己解析 Markdown
- 执行命令前**不会隐式保存**笔记（避免触发 sync / git / linter 副作用）
- 当前没有 Markdown 笔记、或笔记没有任何标题时，弹中文 Notice 提示，**不动剪贴板**

## 安装

### 从源码构建并部署到 Vault

```bash
npm install
npm run deploy   # 构建并复制到 vault 的 .obsidian/plugins/obsidian-toolkit/
```

然后在 Obsidian「设置 → 第三方插件」中启用 **Obsidian Toolkit**。

### BRAT

仓库是私有的，BRAT 需要配置 GitHub Token 后添加 `KazooTTT/obsidian-toolkit`。

## 开发

```bash
npm run dev        # watch 模式
npm run build      # 构建
npm test           # Vitest 单测（大纲格式化是纯函数，不依赖 Obsidian）
```

### 发布

```bash
npm run release:patch   # 或 release:minor / release:major
```

用 bumpp 同步升级 `package.json` 与 `manifest.json` 的版本号、打 tag 并推送。之后把 `manifest.json`、`main.js`、`styles.css` 上传到 GitHub Release，供 BRAT 安装。

## 设计要点

- 大纲格式化逻辑是纯函数（`src/outline/format*.ts`），可以在不启动 Obsidian 的情况下测试
- Obsidian API 边界保持很薄，方便以后往这个插件里加新命令
- 详细需求见 [PRD.md](PRD.md)
