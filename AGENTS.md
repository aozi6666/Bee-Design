# AGENTS.md — Bee Design (Cream_Design)

> Agent onboarding guide for Cursor, Copilot, and other AI coding tools.  
> For Claude Code specifically, see `CLAUDE.md` (same content, Claude-optimized format).  
> Full architecture: `docs/架构说明.md` | Change process: `openspec/config.yaml`

---

## Project at a Glance

**Type**: React UI component library monorepo  
**Stack**: TypeScript 5.9 · React 18/19 (peer) · pnpm workspaces · Turborepo · Rollup · Storybook 10  
**Published packages**: `@aozi6666/bee-design` (v0.3.1) · `@aozi6666/bee-utils` (v0.1.0)

### Workspace Structure

```
.
├── packages/
│   ├── components/   → @aozi6666/bee-design   (UI components + i18n)
│   └── utils/        → @aozi6666/bee-utils    (pure utility functions)
├── apps/
│   └── docs-site/    → @bee-design/docs-site  (Storybook 10 + Vite)
├── openspec/         → spec-driven change proposals
└── docs/             → architecture docs (Chinese)
```

**Dependency direction (strict)**: `utils` ← `components` ← `docs-site`  
Never import `components` from `utils`.

---

## Startup Commands

```bash
pnpm install        # install all workspace dependencies
pnpm docs:dev       # start Storybook dev server → http://localhost:6006
```

---

## Test Commands

```bash
# Run component unit tests (Jest + jsdom + Testing Library)
pnpm components:test        # interactive / watch mode
pnpm components:test:ci     # CI mode (CI=true, no watch)

# Run all tests via Turborepo
pnpm turbo:test

# IMPORTANT: utils must be built before running tests
# (Jest moduleNameMapper points to dist/cjs/index.js)
pnpm utils:build && pnpm components:test
```

---

## Build Commands

```bash
pnpm components:build   # full component build: types + ESM/CJS/UMD + CSS
pnpm utils:build        # utils build: ESM + CJS via tsc
pnpm docs:build         # static Storybook build
pnpm turbo:build        # build all packages in dependency order
```

---

## Lint & Typecheck

```bash
pnpm turbo:lint           # ESLint across all packages
pnpm turbo:typecheck      # TypeScript check across all packages
pnpm stylelint            # Stylelint for SCSS/CSS
pnpm format:check         # Prettier check (used in CI)
```

---

## Pre-release Pipeline

```bash
pnpm release
# Runs in order:
# utils:typecheck → utils:build → components:typecheck
# → components:test:ci → components:lint → components:build
```

---

## Key Rules for Agents

### 1. Single-package changes — use filter

```bash
pnpm --filter @aozi6666/bee-design <script>
pnpm --filter @aozi6666/bee-utils <script>
```

### 2. New component checklist

Every new component needs **all three**:

- `src/components/<Name>/<Name>.tsx` — implementation
- `src/components/<Name>/__tests__/<Name>.test.tsx` — Jest + Testing Library tests
- `src/components/<Name>/<Name>.stories.tsx` — Storybook story
- Export from `src/index.ts`

### 3. Rollup externals — never bundle these

All packages in `dependencies` must appear in Rollup `external` arrays  
(`rollup/rollup.esm.config.js`, `rollup.cjs.config.js`, `rollup.umd.config.js`):

```
react, react-dom, axios, classnames, lodash,
@aozi6666/bee-utils, react-transition-group,
@fortawesome/*
```

Adding a new `dependency`? → update all three Rollup configs.

### 4. Cross-package changes → OpenSpec first

For any change that touches public APIs, package exports, or multiple workspaces:

1. Create `openspec/changes/<change-name>/proposal.md`
2. Follow: `proposal.md` → `design.md` → `specs/` → `tasks.md`
3. Implement by checking off tasks, then archive

### 5. Commit message format (commitlint enforced)

```
feat(button): add loading state
fix(input): align prefix icon correctly
docs(menu): update Storybook story
chore(build): upgrade rollup to 4.x
test(upload): add drag-and-drop unit tests
```

Pattern: `<type>(<scope>): <description>`  
Scopes: component name in lowercase, or `utils` / `components` / `docs` / `build`

### 6. Style conventions

- Styles live in `packages/components/src/styles/` (SCSS)
- Aggregated in `src/styles/index.scss` → compiled to `dist/index.css`
- Use `classnames` library for conditional class merging
- CSS variables/tokens follow existing naming in `src/styles/`

### 7. i18n / ConfigProvider

- Locale files: `packages/components/src/config-provider/locales/`
- New user-facing strings must be added to all locale files (zh-CN, en-US at minimum)

---

## CI Overview

| File                                       | Trigger              | What it does                             |
| ------------------------------------------ | -------------------- | ---------------------------------------- |
| `.github/workflows/ci.yml`                 | push / PR → main     | `pnpm release` + `docs:build`            |
| `.github/workflows/deploy-docs.yml`        | push → main / manual | Build & deploy Storybook to GitHub Pages |
| `.github/workflows/publish-components.yml` | manual / tag         | Publish to npm                           |

---

## File Reference

| Path                                    | Purpose                                        |
| --------------------------------------- | ---------------------------------------------- |
| `CLAUDE.md`                             | Claude Code–specific instructions (same rules) |
| `docs/架构说明.md`                      | Full architecture reference (Chinese)          |
| `openspec/config.yaml`                  | Change proposal rules & AI context             |
| `turbo.json`                            | Turborepo task graph                           |
| `packages/components/rollup/`           | Rollup build configs (ESM/CJS/UMD)             |
| `packages/components/src/setupTests.ts` | Jest global setup                              |
