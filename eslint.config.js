// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import js from "@eslint/js";
import globals from "globals";
// 检查 React Hook 使用
import reactHooks from "eslint-plugin-react-hooks";
// 检查 React 组件生命周期方法
import reactRefresh from "eslint-plugin-react-refresh";
// 让 ESLint 支持 TypeScript
import tseslint from "typescript-eslint";
// 忽略检查
import { defineConfig, globalIgnores } from "eslint/config";

// 忽略检查 dist 目录
export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    // 启用这些推荐规则
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite, // Vite 热更新
    ],
    // 使用 ES2020 语法
    languageOptions: {
      ecmaVersion: 2020,
      // globals.browser：代码运行在浏览器 =》 ESLint 允许 window/document
      globals: globals.browser,
    },
  },
  ...storybook.configs["flat/recommended"],
]);
