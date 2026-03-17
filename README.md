## Bee Design

React UI Component Library inspired by Honeycomb 🐝  
一个基于 React + TypeScript 的轻量级组件库，用来练习和演示现代前端工程化（组件开发、单元测试、Storybook、CI 等）实践。

### GitHub

`https://github.com/aozi6666/Bee-Design`

### Install

```bash
npm install @aozi6666/bee-design
# or
yarn add @aozi6666/bee-design
```

### Quick Start

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { Button } from "@aozi6666/bee-design";
import "@aozi6666/bee-design/build/index.css";

const App = () => (
  <div style={{ padding: 24 }}>
    <Button>Bee Design Button</Button>
  </div>
);

createRoot(document.getElementById("root")!).render(<App />);
```

> **提示**：推荐在业务项目中从包入口导入组件（如 `import { Button } from "@aozi6666/bee-design"`）。样式可按需引入 `@aozi6666/bee-design/build/index.css`。

---

## Features

- **基于 React + TypeScript**：完整的类型定义，开发体验友好。
- **现代工程化**：使用 Vite 开发体验、本地 Storybook 文档、Jest + Testing Library 单元测试、ESLint 规范代码。
- **常用基础组件**：涵盖表单、导航、反馈等常见场景。
- **渐进式学习**：代码中包含一定注释，适合学习组件封装、hooks 抽离以及 TS 类型设计。

---

## Components

Bee Design 当前提供以下组件（持续扩展中）：

- **Button 按钮**
  - 类型：`primary` / `default` / `danger` / `link`
  - 支持 `href` / `target`、禁用状态等
- **Input 输入框**
  - 支持前后缀图标、禁用状态、清空等能力
- **AutoComplete 自动完成**
  - 根据输入关键字异步 / 同步返回候选项
  - 支持自定义下拉项渲染（`renderOption`）
- **Upload 上传**
  - 支持点击上传、拖拽上传（`drag`）、上传进度展示、文件列表
  - 提供原生表单上传示例和 `axios` 上传方式
- **Menu 菜单**
  - 水平 / 垂直导航菜单
  - 支持子菜单展开、选中高亮
- **Icon 图标**
  - 基于 Font Awesome 封装
  - 支持主题颜色、尺寸、旋转动画等
- **Progress 进度条**
  - 支持不同主题颜色和高度
- **Transition 动画**
  - 对 `react-transition-group` 的简单封装，用于出入场动画
- **Hooks**
  - `useClickOutside`：点击组件外区域的处理
  - `useDebounce`：防抖输入处理

具体用法可以查看 `src/components` 下各个组件的 `*.stories.tsx` 示例和测试用例。

---

## Usage Example

以 `AutoComplete` 为例：

```tsx
import React, { useCallback } from "react";
import AutoComplete, {
  type DataSourceType,
} from "@aozi6666/bee-design/build/components/AutoComplete";
import "@aozi6666/bee-design/build/index.css";

interface LakerPlayer {
  value: string;
  number: number;
}

const players: Array<DataSourceType<LakerPlayer>> = [
  { value: "bradley", number: 11 },
  { value: "james", number: 23 },
  // ...
];

const Demo = () => {
  const fetchSuggestions = useCallback(
    (query: string) => players.filter((p) => p.value.toLowerCase().includes(query.toLowerCase())),
    [],
  );

  return (
    <AutoComplete fetchSuggestions={fetchSuggestions} placeholder="输入湖人队球员英文名试试" />
  );
};
```

> **建议**：`fetchSuggestions` 推荐使用 `useCallback` 包裹，避免在父组件重复渲染时创建新函数，从而触发不必要的副作用或额外请求。

更多示例请参考仓库中的 `src/App.tsx` 和 Storybook 故事文件。

---

## Local Development

克隆仓库：

```bash
git clone https://github.com/aozi6666/Bee-Design.git
cd Bee-Design
npm install
```

本地开发预览：

```bash
npm run dev
```

运行 Storybook：

```bash
npm run storybook
```

运行单元测试：

```bash
npm run test
# CI 模式（用于 prepublish）
npm run test:ci
```

构建组件库（打包到 `build/` 目录）：

```bash
npm run build
```

发布前检查脚本（测试 + lint + build）：

```bash
npm run prepublishOnly
```

---

## Scripts

- **`npm run dev`**: 使用 Vite 启动开发服务器
- **`npm run build`**: 构建 TypeScript 和样式到 `build/`
- **`npm run lint`**: 使用 ESLint 检查 `src` 下的代码
- **`npm run test` / `npm run test:ci`**: 使用 Jest + Testing Library 运行单元测试
- **`npm run storybook` / `npm run build-storybook`**: 启动或构建 Storybook 文档站点

---

## Roadmap

- [ ] 完善文档站点与在线 Demo
- [ ] 增加更多表单组件（`Select` / `Checkbox` / `Radio` 等）
- [ ] 增加 Layout、Modal 等业务常用组件
- [ ] 打包为更符合行业习惯的 API 形式（`import { Button } from '@aozi6666/bee-design'`）

欢迎在 GitHub 上提 issue 或 PR，一起完善 Bee Design 🐝。
