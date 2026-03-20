## Bee Design

React UI Component Library inspired by Honeycomb 🐝  
A lightweight React + TypeScript component library for practicing modern frontend engineering workflows (component development, unit tests, Storybook, and CI).

### GitHub

`https://github.com/aozi6666/Bee-Design`

### Install

```bash
npm install @aozi6666/bee-design
# or
pnpm add @aozi6666/bee-design
# or
yarn add @aozi6666/bee-design
```

### Quick Start

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@aozi6666/bee-design";
import "@aozi6666/bee-design/style.css";

const App = () => (
  <div style={{ padding: 24 }}>
    <Button btnType="primary">Bee Design Button</Button>
  </div>
);

createRoot(document.getElementById("root")!).render(<App />);
```

> **Tip**: In production apps, import components from the package entry (for example, `import { Button } from "@aozi6666/bee-design"`). Import the stylesheet once at your application entry point: `@aozi6666/bee-design/style.css`.

```tsx
import { Button } from "@aozi6666/bee-design";
import "@aozi6666/bee-design/style.css";

export default function Demo() {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "center", padding: 24 }}>
      <Button btnType="primary">Primary</Button>
      <Button btnType="default">Default</Button>
      <Button btnType="danger">Danger</Button>
      <Button btnType="primary" size="lg">
        Large
      </Button>
      <Button btnType="primary" size="sm">
        Small
      </Button>
      <Button btnType="link" href="https://example.com" target="_blank">
        Link
      </Button>
      <Button btnType="primary" disabled>
        Disabled
      </Button>
    </div>
  );
}
```

> **Style note**: `Button` styles are provided by `@aozi6666/bee-design/style.css` (including classes like `.btn`, `.btn-primary`, and `.btn-lg`). Import it once at your app entry.

---

## Features

- **React + TypeScript**: Full type definitions and a great developer experience.
- **Modern engineering workflow**: Vite-powered development, Storybook docs, Jest + Testing Library unit tests, and ESLint for code quality.
- **Common UI primitives**: Covers form, navigation, feedback, and other everyday UI scenarios.
- **Learning-friendly**: Inline annotations make it easier to understand component composition, hook extraction, and TypeScript type design.

---

## Components

Bee Design currently provides the following components (growing over time):

- **Button**
  - `btnType`: `primary` / `default` / `danger` / `link`
  - `size`: `lg` / `sm`
  - `link` type supports `href` / `target` and disabled states
- **Input**
  - Supports prefix/suffix icons, disabled state, and clear behavior
- **AutoComplete**
  - Fetches suggestions synchronously or asynchronously based on the input
  - Supports custom dropdown rendering via `renderOption`
- **Upload**
  - Click-to-upload, drag-and-drop (`drag`), progress UI, and file list management
  - Includes examples for native form upload and `axios`-based upload
- **Menu**
  - Horizontal and vertical navigation menus
  - Supports submenu expansion and active item highlighting
- **Icon**
  - Font Awesome–based icon component
  - Supports themed colors, sizes, and rotation animations
- **Progress**
  - Themed variants with configurable height
- **Transition**
  - A lightweight wrapper around `react-transition-group` for enter/exit animations
- **Hooks**
  - `useClickOutside`: handle clicks outside a component
  - `useDebounce`: debounce input values

For usage examples, see component stories and tests under `packages/components/src/components` (for example, `*.stories.tsx`).

---

## Usage Example

Here is an `AutoComplete` example:

```tsx
import { useCallback, useState } from "react";
import { AutoComplete } from "@aozi6666/bee-design";
import "@aozi6666/bee-design/style.css";

type Player = { value: string; number: number };
const players: Player[] = [
  { value: "bradley", number: 11 },
  { value: "james", number: 23 },
  { value: "cook", number: 2 },
  { value: "cousins", number: 15 },
  { value: "davis", number: 3 },
  { value: "green", number: 14 },
  { value: "howard", number: 39 },
  { value: "kuzma", number: 0 },
  { value: "mcgee", number: 7 },
  { value: "rondo", number: 9 },
];

function App() {
  const [count, setCount] = useState(0);

  const fetchSuggestions = useCallback((query: string) => {
    const q = query.toLowerCase();
    return players.filter((p) => p.value.toLowerCase().includes(q));
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <AutoComplete
        fetchSuggestions={fetchSuggestions}
        placeholder="Try typing (e.g. 'ja' or 'co')"
      />
    </div>
  );
}

export default App;
```

> **Tip**: Wrap `fetchSuggestions` with `useCallback` to avoid creating a new function on every parent re-render, which can trigger unnecessary effects or requests.

More examples can be found in `packages/components/src/App.tsx` and the Storybook stories.

---

## Local Development

### Clone & install

```bash
git clone https://github.com/aozi6666/Bee-Design.git
cd Bee-Design
pnpm install
```

### Start the docs site (Storybook)

```bash
pnpm docs:dev
```

### Run unit tests

```bash
pnpm components:test
```

### CI-mode unit tests

```bash
pnpm components:test:ci
```

### Build the component library

```bash
pnpm components:build
```

This generates build artifacts under `dist/`.

### Pre-release quality checks

```bash
pnpm release
```

---

## Scripts

- **`pnpm lint`**: Run ESLint across `packages/` and `apps/`
- **`pnpm stylelint`**: Run Stylelint for CSS/SCSS
- **`pnpm format` / `pnpm format:check`**: Run Prettier formatting checks
- **`pnpm docs:dev`**: Start the docs site (Storybook) on port `6006`
- **`pnpm docs:build`**: Build the docs site (Storybook) for deployment
- **`pnpm components:test`**: Run component unit tests (Jest)
- **`pnpm components:test:ci`**: Run unit tests with `CI=true`
- **`pnpm components:build`**: Build `packages/components` (outputs to `dist/`)
- **`pnpm turbo:build` / `pnpm turbo:typecheck` / `pnpm turbo:lint` / `pnpm turbo:test`**: Run tasks across the workspace
- **`pnpm release`**: Pre-release quality checks (typecheck + CI tests + lint + build)

---

## Roadmap

- [ ] Improve the docs site and add an online demo
- [ ] Add more form components (`Select`, `Checkbox`, `Radio`, etc.)
- [ ] Add business-friendly UI components (Layout, Modal, etc.)
- [ ] Refine the public API surface for a more conventional experience (for example, `import { Button } from "@aozi6666/bee-design"`)

## Contributing

Contributions are welcome. Please open an issue or PR, and run `pnpm lint` and `pnpm components:test` before submitting.
