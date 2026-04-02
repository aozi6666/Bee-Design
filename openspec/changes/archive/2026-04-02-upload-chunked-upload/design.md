## Context

当前仓库的 `Upload` 组件（`packages/components/src/components/Upload/`）使用 `axios.post + FormData` 对单个文件进行整体上传。组件内部使用 `fileList` 来驱动 UI 状态（ready/uploading/success/error）与进度条，并通过 `beforeUpload / onProgress / onSuccess / onError / onChange` 等回调对外暴露事件。

在大文件场景下，整体上传容易因网络波动、传输超时或中断导致失败后需要从头重传；同时上传进度粒度较粗，难以对用户提供更细致的反馈与更稳健的传输行为。

本设计为 `Upload` 增加“分片上传（chunked upload）”实现路径：将文件切分为多个 chunk，并按约定的协议对每个 chunk 发起请求，最后合并为完整文件。

## Goals / Non-Goals

**Goals:**

- 在不破坏现有非分片上传用法的前提下，为 `Upload` 提供可选的分片上传能力。
- 能够为大文件提供更稳定的上传体验：允许分片失败重试（可配置）、并能对整体进度进行汇总展示。
- 保持与现有组件事件/状态模型一致：分片上传完成后仍然通过 `fileList` 状态流转到 `success/error`，并调用现有回调。

**Non-Goals:**

- 不在前端实现“服务端文件合并”的真实能力；服务端必须按约定支持分片接收与最终合并/确认。
- 不在本次变更中强制实现断点续传（resume），仅预留必要的上传标识与协议字段。

## Decisions

1. 触发分片上传的机制

- 决策：新增可选 props（例如 `chunkSize`、`enableChunkUpload` 或以 `chunkSize` 是否存在/超过阈值作为触发条件）。
- 依据：保持非分片默认路径不变，避免无意的行为改变；同时让业务可显式控制策略。

2. 分片粒度与元信息协议

- 决策：对每个 chunk 的请求携带最小元信息字段：`chunkIndex`、`totalChunks`、以及一个 `uploadId/chunkUid`（用于服务端识别同一次上传的分片集合）。
- 依据：这是服务端进行分片存储与最终合并所必需的最小信息；也利于后续扩展断点续传。

3. 上传策略（顺序 vs 并发）

- 决策：默认采用“顺序上传”（concurrency=1），以简化重试与进度汇总逻辑；并提供可选的并发参数用于后续增强。
- 依据：顺序上传更易保证 UI 进度与状态更新一致性，且对服务端的分片写入顺序依赖较少。

4.  进度计算

- 决策：整体进度以“chunk 完成比例”或“chunk 上传字节比例”汇总得到的 `overallPercent` 表示；对现有 `fileList` 的 `percent` 更新保持兼容。
- 依据：组件 UI 已依赖 `percent` 作为唯一数值驱动进度条；分片汇总是最小改动。

5.  与 `beforeUpload` 的关系

- 决策：先执行 `beforeUpload` 得到最终待上传 `File`，再基于该结果进行分片；`beforeUpload` 的返回 `false` 仍然阻止上传。
- 依据：保持现有语义，避免用户在 `beforeUpload` 中做的预处理（压缩/转换）与分片逻辑脱节。

## Risks / Trade-offs

- [Risk] 服务端未实现 chunk 协议或合并确认接口，导致分片上传后无法得到 `success`。
  - [Mitigation] 在规格中明确最小字段与流程；在文档/示例中给出服务端配合要求，并在前端对服务端响应进行校验（例如最后一次 chunk 成功后返回合并确认结果）。

- [Risk] 并发上传引入进度回退或状态错序。
  - [Mitigation] 默认顺序上传；当支持并发时，通过对 chunk 完成计数与状态机处理保证单调递增的 `overallPercent`。

- [Risk] 重试机制可能导致服务端重复写入同一 chunk。
  - [Mitigation] `uploadId` + `chunkIndex` 作为幂等键；服务端需保证覆盖/去重能力；前端重试间隔可配置。

- [Risk] 大文件分片增加请求次数，可能带来额外开销。
  - [Mitigation] 提供合理的默认 `chunkSize`；允许通过 props 自定义，以在稳定性与开销之间平衡。

## Migration Plan

该能力为新增且默认关闭，不会影响现有业务。

- 使用非分片：无需任何改动。
- 开启分片：业务方通过新增 props（例如 `chunkSize` 或 `enableChunkUpload`）启用；并确保后端按规格支持分片接收与最终合并确认。
- 回滚策略：如遇到服务端不兼容，可移除启用 props 回到非分片路径。

## Open Questions

- 服务端分片接收接口与元信息字段名约定：`uploadId/chunkUid` 字段具体名称与落到 FormData 的 key。
- 最终合并确认的返回值结构：前端是否需要额外字段来判定 `success`。
- 是否需要在本次实现中加入断点续传的“已上传分片列表”查询接口（若需要，则会引入额外协议与更多前端状态）。
