# Storybook Docs highlight.js Integration Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** In `@bee-design/docs-site` (Storybook Docs + MDX), unify code block highlighting with `highlight.js` while keeping “real-time preview” as Storybook HMR-driven Canvas/Story updates.

**Architecture:** Override Storybook Docs’ code rendering at the preview layer (via `parameters.docs.components`) to render `<pre><code>` blocks with a small React component that calls `hljs.highlightElement()` and applies a theme stylesheet.

**Tech Stack:** Storybook 10 (react-vite), React 19, `highlight.js` (runtime highlighter + CSS theme).

---

## File Structure / Touch Points

- **Modify:** `apps/docs-site/package.json`
  - Add `highlight.js` dependency (docs-site only).
- **Create:** `apps/docs-site/.storybook/HighlightedCodeBlock.tsx`
  - React component that renders `<pre><code>` and calls `hljs.highlightElement()` in an effect.
- **Create:** `apps/docs-site/.storybook/highlight-theme.css`
  - Import/copy a `highlight.js` theme CSS (minimal, self-contained).
- **Modify:** `apps/docs-site/.storybook/preview.ts`
  - Provide `parameters.docs.components` overrides for `pre` and/or `code` to route fenced blocks to `HighlightedCodeBlock`.

---

### Task 1: Add highlight.js dependency (docs-site only)

**Files:**

- Modify: `apps/docs-site/package.json`

- [ ] **Step 1: Add dependency**
  - Add `"highlight.js": "^11.11.1"` to `dependencies`.

- [ ] **Step 2: Install**

Run: `pnpm -C apps/docs-site install`
Expected: lockfile updates and `highlight.js` installed under `apps/docs-site/node_modules`.

---

### Task 2: Implement a safe highlighted code block component

**Files:**

- Create: `apps/docs-site/.storybook/HighlightedCodeBlock.tsx`

- [ ] **Step 1: Create component**
  - Props: `code: string`, optional `language?: string`, optional `className?: string`
  - Render:
    - `<pre className={className}><code ref=... className={language ? "language-"+language : undefined}>{code}</code></pre>`
  - Effect:
    - Call `hljs.highlightElement(codeEl)` after mount and on `code/language` change
    - Ensure it is idempotent (clear dataset if needed before re-highlighting)

- [ ] **Step 2: Quick smoke check**
  - Ensure TS compiles in Storybook (no missing types).

---

### Task 3: Wire into Storybook Docs rendering

**Files:**

- Modify: `apps/docs-site/.storybook/preview.ts`
- Create: `apps/docs-site/.storybook/highlight-theme.css`

- [ ] **Step 1: Add theme CSS**
  - Keep it local to Storybook preview layer.

- [ ] **Step 2: Override Docs components**
  - In `preview.ts`, add `parameters.docs.components` mapping:
    - `pre`: detect when child is a `<code>` element, extract its string content and language from `className` like `language-ts`, and render `HighlightedCodeBlock`
    - fallback to default rendering for non-code `pre`

- [ ] **Step 3: Manual verification**

Run: `pnpm -C apps/docs-site storybook`
Expected:

- Docs pages show syntax-highlighted code blocks (from MDX + source panels).
- Stories still render and update via HMR when editing story/component files.
