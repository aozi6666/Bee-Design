## 1. 架构说明文档

- [x] 1.1 新增 `docs/架构说明.md`，包含：仓库概览、目录与包一览表、`pnpm`/workspace 约定、各包职责（`@aozi6666/bee-utils`、`@aozi6666/bee-design`、`@bee-design/docs-site`）、依赖与构建产物（Rollup 多格式、CSS、工具库双构建）、根目录与分包常用脚本对照、`turbo.json` 任务依赖说明、测试与质量（Jest/Vitest/Storybook、eslint/stylelint/prettier、husky、release 脚本）、与 OpenSpec 的目录及 propose/apply/archive 协作提示
- [x] 1.2 通读 `package.json`（根与各 package/app）、`turbo.json`、`packages/components/package.json` 中的 exports/scripts，校对文档中的命令与路径与实际一致
- [x] 1.3 运行 `pnpm exec prettier --write docs/架构说明.md`（或 `pnpm format`）确保格式符合仓库规范

## 2. OpenSpec 与可选 context

- [x] 2.1 （可选）在 `openspec/config.yaml` 的 `context` 中增加简短条目，指向 `docs/架构说明.md`，便于后续 propose 时注入项目背景
- [x] 2.2 对照 `openspec/changes/add-project-architecture-doc/specs/developer-architecture/spec.md` 自查：必备章节均已覆盖、OpenSpec 协作说明已写入
