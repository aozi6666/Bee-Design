## Why

团队在仓库内已接入 OpenSpec（propose → apply → archive），但缺少一份集中、可引用的项目架构说明；后续写提案与执行任务时，容易重复解释 monorepo 边界、构建链路与包职责。需要在仓库根目录增加一份完整的架构文档，作为人类协作与 AI 上下文的单一事实来源。

## What Changes

- 新增根目录（或 `docs/` 下）的**项目架构说明** Markdown 文件，覆盖仓库结构、包依赖、构建与发布、文档站点、测试与质量门禁，以及与 OpenSpec 工作流的衔接方式。
- 文档内容以当前代码与 `package.json` / `turbo.json` 为准，便于 propose 时引用、apply 时对照、archive 时归档上下文。

## Capabilities

### New Capabilities

- `developer-architecture`: 定义「本仓库如何组织、如何构建与扩展」的只读参考需求；对应一份规格说明，确保架构文档的结构与维护约定一致。

### Modified Capabilities

<!-- 当前 openspec/specs/ 下无既有能力规格，无修改项。 -->

## Impact

- 新增 Markdown 文档文件（建议路径：`docs/架构说明.md` 或 `ARCHITECTURE.md`，由 design/tasks 落实）。
- 无运行时行为变更；无 **BREAKING** API 变更。
- 可选：在 `openspec/config.yaml` 的 `context` 中增加一行指向该文档，便于后续 AI 生成提案（可在 tasks 中列为可选步骤）。
