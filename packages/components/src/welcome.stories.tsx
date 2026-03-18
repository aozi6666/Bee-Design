import React from "react";

const meta = {
  title: "Welcome",
};

export default meta;

export const Welcome = () => {
  return (
    <div style={{ padding: "24px", lineHeight: 1.6 }}>
      <h1>欢迎来到 Bee Design 组件库</h1>
      <p>
        Bee Design 是一个基于 React + TypeScript 的组件库项目， 用来练习和示范从零构建 UI
        组件、打包并发布到 npm 的完整流程。
      </p>
      <h3>安装试用</h3>
      <pre
        style={{
          background: "#1e1e1e",
          color: "#d4d4d4",
          padding: "12px 16px",
          borderRadius: 4,
          overflowX: "auto",
        }}
      >
        <code>npm install @aozi6666/bee-design --save</code>
      </pre>
      <h3>快速上手</h3>
      <pre
        style={{
          background: "#1e1e1e",
          color: "#d4d4d4",
          padding: "12px 16px",
          borderRadius: 4,
          overflowX: "auto",
        }}
      >
        <code>{`import { Button } from '@aozi6666/bee-design'

function App() {
  return <Button btnType="primary">Hello Bee</Button>
}`}</code>
      </pre>
    </div>
  );
};
