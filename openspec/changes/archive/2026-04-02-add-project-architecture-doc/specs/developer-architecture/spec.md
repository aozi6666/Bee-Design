## ADDED Requirements

### Requirement: 架构说明文档存在且路径固定

仓库 SHALL 在 `docs/架构说明.md` 提供一份项目架构说明文档，作为 monorepo 结构、包职责与开发工作流的单一事实入口（人类与自动化流程均可引用）。

#### Scenario: 贡献者定位架构文档

- **WHEN** 贡献者需要了解仓库分层与构建方式
- **THEN** 其 SHALL 能在 `docs/架构说明.md` 找到文档且无需依赖外部专有链接即可理解主体结构

### Requirement: 文档覆盖 monorepo 与包边界

架构说明 MUST 描述根工作区管理方式（pnpm workspace）、各 package/app 目录职责、`packages` 与 `apps` 之间的依赖方向，以及 `@aozi6666/bee-utils` 与 `@aozi6666/bee-design` 的关系。

#### Scenario: 核对依赖方向

- **WHEN** 读者查阅「包与目录」或同等章节
- **THEN** 文档 MUST 标明工具库被组件库以 workspace 协议依赖、文档站依赖组件库等关键依赖关系

### Requirement: 文档覆盖构建、测试与质量门禁

架构说明 MUST 概括主要 npm/pnpm 脚本（例如组件构建、测试、类型检查、文档站 Storybook 开发与构建）以及 Turborepo 在 `turbo.json` 中的任务关系（如 `build` 依赖 `^build`）。

#### Scenario: 新成员运行文档站

- **WHEN** 读者遵循文档中的「常用命令」或同等章节
- **THEN** 其 SHALL 能够找到启动 Storybook 文档开发与构建静态站点对应的命令名称

### Requirement: 文档与 OpenSpec 工作流对齐

架构说明 MUST 包含简短说明：OpenSpec 变更位于 `openspec/changes/`，典型流程为 propose → apply → archive，并建议在进行 propose 时将本文档或 `openspec/config.yaml` 中 context 一并提供给协作者或 AI。

#### Scenario: propose 前引用上下文

- **WHEN** 有人准备新建 OpenSpec 变更
- **THEN** 其 SHALL 能从架构说明中得知应结合本文档与 `openspec/config.yaml` 以减少重复背景描述

### Requirement: 重大变更时同步更新架构说明

当变更引入以下任一类改动时，对应 OpenSpec 变更的实施任务 MUST 包含对 `docs/架构说明.md` 的增量更新（或明确记为无需更新的理由）：新增顶层 package/app、变更包名或 workspace 协议关系、变更主要构建工具链或核心脚本、变更 OpenSpec 目录约定。

#### Scenario: 新增 workspace 包

- **WHEN** 某变更在 `packages/` 或 `apps/` 下新增可发布或可作为依赖的包
- **THEN** 该变更的 `tasks.md` SHALL 包含核对并更新架构说明的任务项，且 apply 完成后文档与实际结构一致
