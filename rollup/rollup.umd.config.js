import basicConfig from "./rollup.config";
import { terser } from "rollup-plugin-terser";
import replace from "@rollup/plugin-replace";

const config = {
  ...basicConfig,
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
      plugins: [terser()],
      sourcemap: true,
    },
  ],
  plugins: [
    replace({
      preventAssignment: true,
      "process.env.NODE_ENV": JSON.stringify("production"),
    }),
    ...basicConfig.plugins,
  ],
};

export default config;
