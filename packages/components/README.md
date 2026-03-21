# @aozi6666/bee-design

A **React** UI component library written in **TypeScript**. It ships **ESM**, **CommonJS**, and **UMD** builds plus a single compiled **CSS** entry for quick integration.

[![npm version](https://img.shields.io/npm/v/@aozi6666/bee-design.svg)](https://www.npmjs.com/package/@aozi6666/bee-design)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

## Features

- **React 18 / 19** as peer dependencies
- **Tree-friendly** named exports
- **Font Awesome**-based `Icon` with a one-time `setupIcons()` registration
- **Compound `Menu`** API (`Menu.Item`, `Menu.SubMenu`)
- **Styles** distributed as `@aozi6666/bee-design/style.css`

## Installation

```bash
npm install @aozi6666/bee-design
```

```bash
pnpm add @aozi6666/bee-design
```

```bash
yarn add @aozi6666/bee-design
```

### Peer dependencies

Install React in your app (versions **18** or **19**):

```bash
npm install react react-dom
```

The package also depends on runtime libraries such as **axios**, **classnames**, **lodash**, and **react-transition-group**; they are installed automatically with the package. Icons use **Font Awesome** packages listed in `dependencies`.

## Quick start

### 1. Import styles once

In your app entry (e.g. `main.tsx` or `App.tsx`):

```tsx
import "@aozi6666/bee-design/style.css";
```

### 2. Register Font Awesome icons (recommended)

Call `setupIcons()` once at startup so `Icon` can resolve solid icons from `@fortawesome/free-solid-svg-icons`:

```tsx
import { setupIcons } from "@aozi6666/bee-design";

setupIcons();
```

### 3. Use components

```tsx
import {
  Button,
  Input,
  Menu,
  AutoComplete,
  Icon,
  Progress,
  Transition,
  Upload,
} from "@aozi6666/bee-design";

function App() {
  return (
    <>
      <Button btnType="primary" size="lg">
        Primary
      </Button>

      <Menu defaultIndex="0" mode="horizontal" onSelect={(index) => console.log(index)}>
        <Menu.Item index="0">Home</Menu.Item>
        <Menu.SubMenu title="Products">
          <Menu.Item index="2-1">Item A</Menu.Item>
          <Menu.Item index="2-2">Item B</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </>
  );
}
```

## Exports

| Export         | Description                                                                        |
| -------------- | ---------------------------------------------------------------------------------- |
| `Button`       | Button with sizes (`lg` / `sm`) and types (`primary`, `default`, `danger`, `link`) |
| `Menu`         | Navigation menu; use `Menu.Item` and `Menu.SubMenu`                                |
| `AutoComplete` | Input with suggestions (sync or async)                                             |
| `Icon`         | Font Awesome icon wrapper with optional `theme`                                    |
| `Input`        | Text input building block                                                          |
| `Progress`     | Progress indicator                                                                 |
| `Transition`   | Transition wrapper (uses `react-transition-group`)                                 |
| `Upload`       | File upload with drag-and-drop and HTTP `action` URL                               |
| `setupIcons`   | Registers solid icon set for `Icon`                                                |

TypeScript types are published alongside the build (`dist/index.d.ts`).

## Bundles

| Entry   | Path / condition                 | Use case                  |
| ------- | -------------------------------- | ------------------------- |
| **ESM** | `import`                         | Vite, modern bundlers     |
| **CJS** | `require`                        | Node / older tooling      |
| **UMD** | `unpkg` / script tag             | Browser without a bundler |
| **CSS** | `@aozi6666/bee-design/style.css` | Global component styles   |

## Upload example

`Upload` expects an `action` URL and supports drag mode via `drag`:

```tsx
<Upload
  action="https://your-api.example.com/upload"
  name="file"
  drag
  onSuccess={(data, file) => console.log("ok", data, file)}
>
  <p>Drop files here or click to upload</p>
</Upload>
```

## TypeScript

The library is authored in TypeScript. Ensure `"moduleResolution": "bundler"` or `"node16"` / `"nodenext"` in your `tsconfig.json` for best compatibility with package `exports`.

## Browser support

Targets modern evergreen browsers supported by **React 18+**. Include the provided **CSS** file for correct layout and theme classes.

## Contributing & source

Source and issues live in the monorepo that contains this package. See the repository linked from [the npm package page](https://www.npmjs.com/package/@aozi6666/bee-design).

## License

License information is defined in the repository / `package.json`. If none is set, clarify terms with the package author before use in production.
