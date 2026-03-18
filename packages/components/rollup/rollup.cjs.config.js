/* 打 CommonJS 版本产物（用于 require 兼容） */
import basicConfig from "./rollup.config.js";

const config = {
  ...basicConfig,
  output: [
    {
      file: "dist/index.cjs",
      format: "cjs",
      exports: "named",
      sourcemap: true,
    },
  ],
};

export default config;
