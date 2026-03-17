/* 打 ES Module 版本产物 */
import basicConfig from "./rollup.config";
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";

const config = {
  // 继承基础配置
  ...basicConfig,
  // 输出 ES 格式文件
  output: [
    {
      file: "dist/index.esm.js",
      format: "es",
      sourcemap: true,
    },
  ],
  // 使用基础配置的插件，并添加排除依赖插件
  // 不把 dependencies 打进包里
  plugins: [...basicConfig.plugins, excludeDependenciesFromBundle()],
};

export default config;
