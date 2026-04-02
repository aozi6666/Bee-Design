## 1. Types & Upload Helpers

- 1.1 扩展 `UploadProps`：新增分片上传相关可选 props（例如 `chunkSize`/启用开关/并发与重试配置）与必要回调（如需要）
- 1.2 在 `upload.types.ts` 补齐相关类型（chunk 进度/上传标识字段等），并保证非分片路径的向后兼容
- 1.3 在 `upload.tsx` 中加入最小的工具逻辑：文件切分为 chunks、生成 `uploadId/chunkUid`、计算整体 `overallPercent`

## 2. Core Chunk Upload Implementation & Tests

- 2.1 在 `upload.tsx` 中实现分片上传分支：触发条件满足时按 chunks 上传；否则沿用现有整体上传逻辑
- 2.2 将 `beforeUpload` 预处理接入分片流程：`beforeUpload` 返回 `false` 时不上传；返回 `Promise<File>` 时对处理后的文件再切分
- 2.3 实现 chunk 请求载荷协议：每个 chunk 的请求携带 `chunkIndex`、`totalChunks` 与上传标识（`uploadId/chunkUid`），并将 chunk blob 放入原有 `name` 对应的 FormData 字段
- 2.4 实现进度与状态更新：按块完成/上传进度汇总计算 `percent`，驱动 `fileList` 的 uploading 状态与进度条；最后成功时设置 `success` 并写入 `response`
- 2.5 实现单 chunk 失败重试与错误收敛：重试耗尽后将文件 `status` 设置为 `error`，并触发现有 `onError` 与 `onChange`
- 2.6 更新/新增 Jest 测试：在 `packages/components/src/components/Upload/upload.test.tsx` 中 mock `axios.post`，覆盖至少一个分片成功路径与一个分片失败路径
