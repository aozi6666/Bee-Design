import basicConfig from "./rollup.config";
import excludeDependenciesFromBundle from "rollup-plugin-exclude-dependencies-from-bundle";

const config = {
  ...basicConfig,
  output: [
    {
      file: "dist/index.esm.js",
      format: "es",
      sourcemap: true,
    },
  ],
  plugins: [...basicConfig.plugins, excludeDependenciesFromBundle()],
};

export default config;
