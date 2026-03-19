import type { StorybookConfig } from "@storybook/react-vite";
import path from "node:path";

const config: StorybookConfig = {
  stories: [
    "../../components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../components/src/**/*.stories.mdx",
  ],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-vitest",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],
  framework: "@storybook/react-vite",
  async viteFinal(viteConfig) {
    const workspaceRoot = path.resolve(__dirname, "..", "..", "..");
    const componentsRoot = path.resolve(__dirname, "..", "..", "components");

    viteConfig.server ??= {};
    viteConfig.server.fs ??= {};
    viteConfig.server.fs.allow = Array.from(
      new Set([...(viteConfig.server.fs.allow ?? []), workspaceRoot, componentsRoot]),
    );

    return viteConfig;
  },
};
export default config;
