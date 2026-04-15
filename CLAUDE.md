# CLAUDE.md — Bee Design (Cream_Design)

> 面向 Claude Code 的项目上下文。更完整的架构说明见 `docs/架构说明.md`；变更规范见 `openspec/config.yaml`。

## Repo Overview

**Monorepo**: pnpm workspaces + Turborepo  
**Package manager**: pnpm 9.x (`pnpm@9.15.9`)  
**Language**: TypeScript 5.9, React 18/19 (peer), ESM-first

| Package               | npm                     | 职责                                                                                                          |
| --------------------- | ----------------------- | ------------------------------------------------------------------------------------------------------------- |
| `packages/utils`      | `@aozi6666/bee-utils`   | 工具函数（clamp, pick/omit, mergeRefs, getScrollParent…）                                                     |
| `packages/components` | `@aozi6666/bee-design`  | UI 组件库（Button, Input, Menu, Upload, AutoComplete, Icon, Progress, Tabs, Transition）+ ConfigProvider/i18n |
| `apps/docs-site`      | `@bee-design/docs-site` | Storybook 10 + Vite 文档站                                                                                    |

**依赖方向（严格单向）**: `utils` ← `components` ← `docs-site`  
禁止 `utils` 依赖 `components`。

---

## Commands

### 常用开发

```bash
pnpm install              # 安装所有依赖
pnpm docs:dev             # 启动 Storybook（默认 http://localhost:6006）
pnpm format               # Prettier 格式化
pnpm format:check         # 格式检查（CI 用）
```

### 单包操作（推荐在涉及单包改动时使用）

```bash
pnpm --filter @aozi6666/bee-design <script>   # 操作组件包
pnpm --filter @aozi6666/bee-utils <script>    # 操作工具包
pnpm -C packages/components test              # 等价于 pnpm components:test
```

### 构建

```bash
pnpm components:build     # 组件库全量构建（types + ESM/CJS/UMD + CSS）
pnpm utils:build          # 工具库构建（ESM + CJS via tsc）
pnpm docs:build           # Storybook 静态构建
pnpm turbo:build          # Turbo 全量并行构建（自动处理上游依赖顺序）
```

### 测试

```bash
pnpm components:test      # Jest（交互模式）
pnpm components:test:ci   # Jest CI 模式（CI=true，无 watch）
pnpm turbo:test           # Turbo 聚合测试
```

> **注意**：测试依赖 `@aozi6666/bee-utils` 的 CJS 产物（`moduleNameMapper` 指向 `dist/cjs/index.js`）。  
> 测试前需先执行 `pnpm utils:build`，否则测试会因找不到模块而失败。

### 类型检查 & Lint

```bash
pnpm components:typecheck # tsc --noEmit（组件包）
pnpm utils:typecheck      # tsc --noEmit（工具包）
pnpm turbo:typecheck      # 全量类型检查

pnpm turbo:lint           # ESLint 全量
pnpm lint                 # ESLint（仅 packages/ + apps/，max-warnings 5）
pnpm stylelint            # Stylelint（SCSS/CSS）
```

### 发布前检查（完整流水线）

```bash
pnpm release
# 等价于：utils:typecheck → utils:build → components:typecheck
#         → components:test:ci → components:lint → components:build
```

---

## Key Rules

### 组件开发规范

- 每个新组件**必须同时新建**：
  - `ComponentName/__tests__/ComponentName.test.tsx`（Jest + Testing Library）
  - `ComponentName/ComponentName.stories.tsx`（Storybook story）
- 组件从 `packages/components/src/index.ts` 统一导出
- 样式写在 `src/styles/` 下对应 SCSS 文件，通过 `src/styles/index.scss` 聚合
- CSS 类名遵循项目现有风格（BEM 变体），使用 `classnames` 库拼接

### 依赖管理

- **外部依赖必须加到 Rollup externals**（`rollup/rollup.*.config.js`），不打包进产物：
  - 已有：`react`, `react-dom`, `axios`, `classnames`, `lodash`, `@aozi6666/bee-utils`, `react-transition-group`
- 新增 `dependencies` 中的包需同步更新三个 Rollup config 的 `external` 列表
- `peerDependencies`（react/react-dom）不得打包进 bundle

### 跨包变更流程

- 涉及多包 API 变更、新增 workspace 包、或修改 `exports` 字段时：
  1. 先在 `openspec/changes/<name>/` 新建 proposal
  2. 写 `proposal.md` → `design.md` → `specs/` → `tasks.md`
  3. 按 `tasks.md` 勾选实现，完成后 archive

### Commit 规范（commitlint 强制）

```
feat(button): 新增 loading 状态
fix(input): 修复前缀图标对齐问题
docs(menu): 更新 Storybook story
chore(build): 升级 rollup 至 4.x
test(upload): 补充拖拽上传单测
```

格式：`<type>(<scope>): <subject>`  
scope 取组件名小写或包名（`utils`, `components`, `docs`）。

### 文档同步

修改以下内容时需同步更新 `docs/架构说明.md`：

- 新增/移除 workspace 包
- 包名或 `exports` 重大变更
- 构建链或根脚本职责变更

---

## Build Outputs（组件库）

| 格式  | 路径                                    |
| ----- | --------------------------------------- |
| ESM   | `packages/components/dist/index.esm.js` |
| CJS   | `packages/components/dist/index.cjs`    |
| UMD   | `packages/components/dist/index.umd.js` |
| Types | `packages/components/dist/index.d.ts`   |
| CSS   | `packages/components/dist/index.css`    |

用户引入样式：`import '@aozi6666/bee-design/style.css'`

---

## CI（GitHub Actions）

| Workflow                 | 触发               | 任务                                      |
| ------------------------ | ------------------ | ----------------------------------------- |
| `ci.yml` → `agent-check` | push/PR → main     | `turbo:typecheck`（快速，与 verify 并行） |
| `ci.yml` → `verify`      | push/PR → main     | `pnpm release` + `docs:build`（全量）     |
| `deploy-docs.yml`        | push → main / 手动 | Storybook → GitHub Pages                  |
| `publish-components.yml` | 手动/tag           | npm 发布                                  |

CI 中测试使用 `components:test:ci`（`CI=true jest`，无交互）。

---

## Project References

- 架构详述：`docs/架构说明.md`
- 变更规范：`openspec/config.yaml`
- GitHub：https://github.com/aozi6666/Bee-Design
- 组件 npm：`@aozi6666/bee-design@0.3.1`
- 工具 npm：`@aozi6666/bee-utils@0.1.0`
