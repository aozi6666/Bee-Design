/* Dragger 是专门处理拖拽上传逻辑的子组件：
  - 只负责获取拖拽的文件
  - 上传文件还是靠 Upload 
监听浏览器拖拽事件 → 拿到拖进来的文件 → 传回 Upload 组件

  浏览器 Drag & Drop API 事件：
    dragenter  → 进入区域
    dragover   → 在区域上方拖动
    dragleave  → 离开区域
    drop       → 松手放下文件（包含拖进来的文件）
*/
import { useState } from "react";
import type { DragEvent, FC, ReactNode } from "react";
import classNames from "classnames";

// Dragger 接收：onFile回调 / children（拖拽区域里面的 UI）
interface DraggerProps {
  onFile: (files: FileList) => void;
  children?: ReactNode;
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props;
  // 负责拖拽样式
  const [dragOver, setDragOver] = useState(false);

  // 使用 `classNames` 拼 `className`：
  const klass = classNames("viking-uploader-dragger", {
    // 如果 `dragOver === true` 时，再加一个：`is-dragover`
    "is-dragover": dragOver,
  });
  // 上传流程
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault(); // 阻止默认行为
    setDragOver(false); // 拖拽结束：改变拖拽样式
    // dataTransfer： 浏览器 drop-API 的对象
    // 包含: files(文件列表FileList)、items、types
    // 通过 onFile回调 传回 Upload 处理
    onFile(e.dataTransfer.files);
  };
  // 回调： 控制拖拽状态（改变样式）
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault();
    setDragOver(over);
  };
  return (
    <div
      className={klass}
      // e： 监听DragEvent拖拽事件对象
      onDragOver={(e) => {
        handleDrag(e, true);
      }}
      onDragLeave={(e) => {
        handleDrag(e, false);
      }}
      onDrop={handleDrop}
    >
      {children}
    </div>
  );
};

export default Dragger;
