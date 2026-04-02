## Why

当前 `Upload` 组件是“整体文件一次性请求”的上传方式。对于体积较大的文件，这种模式容易遇到超时、传输中断导致需要重新上传的问题；同时上传进度粒度也较粗，影响用户体验与大文件稳定性。

因此需要为 `Upload` 提供“分片上传（chunked upload）”能力，在网络波动或大文件场景下提升成功率与可观测性，并为后续可能的断点续传/失败重试奠定基础。

## What Changes

- 为 `Upload` 组件新增可选的分片上传能力：当文件超过阈值或启用分片模式时，将文件按 `chunkSize` 切分，并对每个分片逐个（或按策略）发送请求。
- 扩展 `UploadProps`（非破坏性，均为可选参数）以配置分片上传行为（例如分片大小、并发/顺序策略、失败重试策略等）。
- 复用现有 UI 与回调体系：继续使用 `fileList` 驱动进度条与状态（ready/uploading/success/error），并确保 `onProgress` 能反映整体进度（按分片汇总）。
- 保持现有非分片上传路径不变；仅在分片模式启用时走分片逻辑。

## Capabilities

### New Capabilities

- `upload-chunked`: 为 `Upload` 组件提供分片上传能力（按分片发送请求、汇总整体进度，并兼顾失败重试/状态更新）。

### Modified Capabilities

<!-- 当前仓库内仅有 developer-architecture 等既有能力规格，本变更属于新增能力，不涉及改动既有规格要求。 -->

## Impact

- 代码影响范围：`packages/components/src/components/Upload/`（核心逻辑、类型、可能的内部子模块）。
- 对外 API：新增可选 props 与回调（不应破坏现有用法）。
- 运行时依赖：仍以 `axios` + `FormData` 为主要传输机制；如需新增能力可在 design/tasks 中说明。
- 文档/规格：新增 OpenSpec 能力规格（`specs/upload-chunked/spec.md`），并在后续 tasks 中补齐必要测试与 Storybook（如适用）。
