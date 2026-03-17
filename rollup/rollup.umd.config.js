/* 
  打 UMD 版本产物
  - UMD 是一种“兼容性更广”的打包格式，
  - 适合 script 标签、老环境、CDN 直接挂全局变量的场景 
*/
import basicConfig from "./rollup.config";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";

const config = {
  ...basicConfig,
  // 输出 UMD 格式文件
  output: [
    {
      name: "BeeDesign",
      file: "dist/index.umd.js",
      format: "umd",
      exports: "named",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        axios: "Axios",
        classnames: "classNames",
        lodash: "lodash",
      },
      // 压缩代码
      plugins: [terser()],
      sourcemap: true,
    },
  ],
  plugins: [
    replace({
      preventAssignment: true,
      // 把 生产环境变量 替换掉
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    ...basicConfig.plugins,
  ],
};

export default config;
