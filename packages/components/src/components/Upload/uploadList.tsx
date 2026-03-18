/* 
显示文件列表（UI）
  把 Upload 组件里的 fileList 状态渲染成一个文件列表 UI 
*/
import type { FC } from "react";
import type { UploadFile } from "./upload.types";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";
interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = (props) => {
  // 从 Prop 中取出 fileList 文件列表 和 回调
  const { fileList, onRemove } = props;
  console.log("firelist", fileList);
  return (
    <ul className="viking-upload-list">
      {/* map 遍历 fileList数组 -> 每个文件生成一个 li */}
      {fileList.map((item) => {
        return (
          <li className="viking-upload-list-item" key={item.uid}>
            {/* 文件名 */}
            {/* class 会根据状态变化 */}
            <span className={`file-name file-name-${item.status}`}>
              <Icon icon="file-alt" theme="secondary" />
              {item.name}
            </span>
            {/* 状态图标 */}
            <span className="file-status">
              {/* 根据状态显示不同图标 */}
              {(item.status === "uploading" || item.status === "ready") && (
                <Icon icon="spinner" spin theme="primary" />
              )}
              {item.status === "success" && <Icon icon="check-circle" theme="success" />}
              {item.status === "error" && <Icon icon="times-circle" theme="danger" />}
            </span>
            {/* 删除按钮 */}
            <span className="file-actions">
              {/* 点击 删除 图标，点击事件回调 传来的 onRemove 回调 */}
              <Icon
                icon="times"
                onClick={() => {
                  onRemove(item);
                }}
              />
            </span>
            {/* 进度条 */}
            {item.status === "uploading" && <Progress percent={item.percent || 0} />}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
