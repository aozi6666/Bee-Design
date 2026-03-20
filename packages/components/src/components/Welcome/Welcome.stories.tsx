import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

const meta = {
  title: "Welcome",
  parameters: {
    layout: "padded",
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Introduction: Story = {
  name: "介绍",
  render: () => (
    <div style={{ maxWidth: 720, fontFamily: "system-ui, sans-serif", lineHeight: 1.6 }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
        使用 React + TypeScript 从零到一打造一套你自己的组件库
      </h1>
      <p>
        Bee-Design 是一套使用 React Hooks 与 TypeScript 的组件库，便于从零到一、由浅入深地提升 React
        与 TypeScript 能力。
      </p>
      <h3 style={{ marginTop: "1.5rem" }}>安装</h3>
      <pre
        style={{
          background: "#f6f8fa",
          padding: "12px 16px",
          borderRadius: 8,
          overflow: "auto",
        }}
      >
        <code>npm install @aozi6666/bee-design --save</code>
      </pre>
      <h3 style={{ marginTop: "1.5rem" }}>使用</h3>
      <pre
        style={{
          background: "#f6f8fa",
          padding: "12px 16px",
          borderRadius: 8,
          overflow: "auto",
        }}
      >
        <code>{`import "@aozi6666/bee-design/style.css";
import { Button } from "@aozi6666/bee-design";`}</code>
      </pre>
      <h3 style={{ marginTop: "1.5rem" }}>特性</h3>
      <ul>
        <li>TypeScript + React Hooks</li>
        <li>单元测试（Testing Library）</li>
        <li>Storybook 文档与本地调试</li>
        <li>Sass 样式组织</li>
      </ul>
    </div>
  ),
};
