## Context

仓库为基于 **pnpm workspace** 的 monorepo（根包名 `bee-design-workspace`）：`packages/utils`（`@aozi6666/bee-utils`）、`packages/components`（`@aozi6666/bee-design`）、`apps/docs-site`（Storybook 文档站）。组件库使用 Rollup 产出 ESM/CJS/UMD 与 CSS；工具库为 tsc 双构建；文档站依赖 workspace 组件包。已接入 **OpenSpec**（`openspec/`、`openspec/changes/`）与 Cursor skills/commands。提案目标是在仓库中落地一份可维护的架构说明 Markdown，供 propose / apply / archive 引用。

## Goals / Non-Goals

**Goals:**

- 在仓库内新增单一入口的架构文档（文件名与路径在任务中固化），结构与事实与当前代码、`package.json`、`turbo.json` 一致。
- 文档明确包边界、依赖方向、常用脚本、构建产物路径，以及与 OpenSpec 工作流的衔接（如何引用本文档做 context）。
- 规格层通过 `developer-architecture` 能力约束文档必备章节与维护规则。

**Non-Goals:**

- 不修改任何运行时或公开 npm API 行为。
- 不在此变更中重写组件 API 文档或 Storybook 全部内容（仅说明 docs-site 的职责与启动方式）。

## Decisions

1. **文档路径**：采用 `docs/架构说明.md`，与现有 `docs/` 目录一致，避免仓库根目录过多顶层 Markdown；文件名满足「架构说明」诉求且便于中文检索。
2. **语言与受众**：正文采用简体中文，面向本仓库贡献者与 AI 代理；技术名词（包名、脚本名、目录名）保持英文原样。
3. **事实来源**：以仓库内已存在配置为准；不臆测未在仓库中出现的部署环境；若将来与上游 fork 不一致，以本仓库为准更新文档。
4. **OpenSpec 衔接**：可选在 `openspec/config.yaml` 的 `context` 中增加一行指向 `docs/架构说明.md`，降低后续 propose 的重复说明成本（在 tasks 中列为可选子任务）。

## Risks / Trade-offs

- **文档漂移** — 架构改动后文档过时 → 在规格中要求 major 结构调整或脚本变更时在对应变更的 tasks 中纳入「同步更新架构说明」检查项；apply 完成前人工扫一眼相关章节。
- **双语混排** — 中文说明与英文标识符并存可能影响搜索 → 在文档顶部用目录与固定英文小标题（如 Packages、Scripts）兼顾检索。

## Migration Plan

不适用（纯新增文档与规格）。发布后贡献者只需在新增大作时打开 `docs/架构说明.md` 校对是否需增删章节。

## Open Questions

- 若团队更希望架构文档位于仓库根目录（例如 `ARCHITECTURE.md`），可在 apply 阶段将路径改为根目录并同步规格与 `config.yaml` 引用；当前设计优先 `docs/` 聚合。
