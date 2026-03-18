import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// @zhangAo_换入自己写的样式文件
import "./styles/index.scss";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
