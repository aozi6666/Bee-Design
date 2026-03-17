import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import sass from "rollup-plugin-sass";

// 只用于打包发布产物，不包含测试 / story / setup
const overrides = {
  compilerOptions: { declaration: true },
  exclude: [
    "src/**/*.test.ts?(x)",
    "src/**/*.stories.ts?(x)",
    "src/**/*.stories.mdx",
    "src/setupTests.ts",
  ],
};

const config = {
  input: "src/index.tsx",
  // 这些依赖在真实项目中会被外部应用自己的打包工具处理
  external: ["react", "react-dom", "axios", "classnames", "lodash"],
  plugins: [
    nodeResolve({
      extensions: [".js", ".jsx", ".ts", ".tsx"],
    }),
    commonjs(),
    json(),
    typescript({ tsconfigOverride: overrides, useTsconfigDeclarationDir: false }),
    sass({ output: "dist/index.css" }),
  ],
};

export default config;
