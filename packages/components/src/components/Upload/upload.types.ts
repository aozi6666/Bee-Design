// Upload 组件相关的 TS 类型定义
// 独立成文件，方便在多个子组件之间复用

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";

// 改造浏览器原生 File， 原始 File 包一层 UI 上传状态信息
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent: number;
  raw?: File;
  response?: unknown;
  error?: unknown;
}

export interface UploadProps {
  /** 必选参数, 上传的地址 */
  action: string;
  /** 上传的文件列表 */
  defaultFileList?: UploadFile[];
  /** 上传文件之前的钩子，返回 false 或 Promise 可以阻止上传 */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /** 文件上传时的钩子 */
  onProgress?: (percentage: number, file: UploadFile) => void;
  /** 文件上传成功时的钩子 */
  onSuccess?: (data: unknown, file: UploadFile) => void;
  /** 文件上传失败时的钩子 */
  onError?: (err: unknown, file: UploadFile) => void;
  /** 文件状态改变时的钩子，上传成功或者失败时都会被调用 */
  onChange?: (file: UploadFile) => void;
  /** 文件列表移除文件时的钩子 */
  onRemove?: (file: UploadFile) => void;
  /** 设置上传的请求头部 */
  headers?: Record<string, string>;
  /** 上传的文件字段名 */
  name?: string;
  /** 上传时附带的额外参数 */
  data?: Record<string, string>;
  /** 是否发送 cookie 凭证信息 */
  withCredentials?: boolean;
  /** 可选参数, 接受上传的文件类型 */
  accept?: string;
  /** 是否支持多选文件 */
  multiple?: boolean;
  /** 是否支持拖拽上传 */
  drag?: boolean;
  children?: React.ReactNode;
}
