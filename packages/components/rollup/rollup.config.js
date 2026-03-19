import typescript from "rollup-plugin-typescript2";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import sass from "rollup-plugin-sass";
import os from "node:os";
import path from "node:path";

// 只用于打包发布产物，不包含测试 / story / setup
const overrides = {
  // Rollup 阶段只做 JS/CSS bundle；类型声明由 `tsc -p tsconfig.build.json` 单独生成到 build/
  compilerOptions: { declaration: false, declarationMap: false },
  exclude: ["**/*.test.ts?(x)", "**/*.stories.ts?(x)", "**/*.stories.mdx", "**/setupTests.ts"],
};

// 基础公共配置
const config = {
  // 打包 入口文件
  input: "src/index.ts",
  // 这些依赖在真实项目中会被外部应用自己的打包工具处理
  external: ["react", "react-dom", "axios", "classnames", "lodash", "@aozi6666/bee-utils"],
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
    // 显式使用构建用 tsconfig，避免默认读取 tsconfig.json 导致模块解析不一致
    typescript({
      tsconfig: "tsconfig.rollup.json",
      tsconfigOverride: overrides,
      // 打包发布产物时不做全量 type-check（避免 story/test 等非入口文件阻塞构建）
      check: false,
      useTsconfigDeclarationDir: false,
      // Windows 上 node_modules/.cache 的 rename 容易被占用导致 EPERM
      cacheRoot: path.join(os.tmpdir(), "bee-design-rpt2-cache"),
    }),
    // 兼容：若入口仍有样式导入，可继续产出 dist/index.css
    // 推荐改为使用 `pnpm build:css` 单独生成（避免默认入口引入全局样式产生隐式副作用）
    sass({ output: "dist/index.css" }),
  ],
};

export default config;
