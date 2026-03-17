import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import sass from "rollup-plugin-sass";

// 只用于打包发布产物，不包含测试 / story / setup
const overrides = {
  // 打开：生成类型声明文件 .d.ts
  compilerOptions: { declaration: true },
  exclude: [
    "src/**/*.test.ts?(x)",
    "src/**/*.stories.ts?(x)",
    "src/**/*.stories.mdx",
    "src/setupTests.ts",
  ],
};

// 基础公共配置
const config = {
  // 打包 入口文件
  input: "src/index.tsx",
  // 这些依赖在真实项目中会被外部应用自己的打包工具处理
  external: ["react", "react-dom", "axios", "classnames", "lodash"],
  // 配置插件
  plugins: [
    // 依赖解析：让 Rollup 能找到 node_modules 里的包
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    // 把 CommonJS 模块转成 Rollup 能处理的形式
    commonjs(),
    // 允许导入 json 文件
    json(),
    // 处理 TS / TSX，并生成声明文件相关能力
    typescript({ tsconfigOverride: overrides, useTsconfigDeclarationDir: false }),
    // 把scss样式打成 dist/index.css
    sass({ output: "dist/index.css" }),
  ],
};

export default config;
