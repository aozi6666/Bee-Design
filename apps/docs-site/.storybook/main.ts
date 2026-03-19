/*
  apps/docs-site，本质是把“组件库本体”和“文档展示应用”分开了
  docs-site 是一个真实应用，不作为附属脚本
  - 可以配置自己的展示设置 ：比如 controls 和 a11y 参数
  - 单独处理文档站：
      = 组件包最终想输出 库文件，给别人 安装使用
      = docs-site 最终想输出一个站点，给别人访问文档
*/
import type { StorybookConfig } from "@storybook/react-vite";
import path from "node:path";

const config: StorybookConfig = {
  stories: [
    "../../../packages/components/src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../../../packages/components/src/**/*.stories.mdx",
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
    const componentsRoot = path.resolve(__dirname, "..", "..", "..", "packages", "components");

    viteConfig.server ??= {};
    viteConfig.server.fs ??= {};
    viteConfig.server.fs.allow = Array.from(
      new Set([...(viteConfig.server.fs.allow ?? []), workspaceRoot, componentsRoot]),
    );

    return viteConfig;
  },
};
export default config;
