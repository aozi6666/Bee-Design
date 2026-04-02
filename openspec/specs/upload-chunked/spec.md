# upload-chunked Specification

## Purpose

TBD - created by archiving change upload-chunked-upload. Update Purpose after archive.

## Requirements

### Requirement: Optional chunked upload triggering

当启用分片上传能力且待上传文件满足分片触发条件时，系统 SHALL 使用分片上传流程；否则 SHALL 使用现有的整体上传流程。

#### Scenario: Enabled and file exceeds threshold

- **WHEN** 用户在 `Upload` 上启用分片上传（例如通过 `chunkSize` 或显式启用开关）且待上传文件大小大于触发阈值
- **THEN** 系统 SHALL 将该文件切分为多个 chunk，并依次发起 chunk 上传请求

### Requirement: beforeUpload integration with chunking

系统 SHALL 在分片上传开始前执行 `beforeUpload`，并基于 `beforeUpload` 的结果确定最终要上传的文件内容。

#### Scenario: beforeUpload returns false

- **WHEN** `beforeUpload(file)` 返回 `false`
- **THEN** 系统 SHALL 不发起任何 chunk 上传请求，且该文件不会进入 uploading/success 状态

#### Scenario: beforeUpload returns processed file

- **WHEN** `beforeUpload(file)` 返回 `Promise<File>`，且 Promise 解析为 `processedFile`
- **THEN** 系统 SHALL 使用 `processedFile` 进行切分与分片上传

### Requirement: Chunk upload request protocol

系统 SHALL 为每个 chunk 构建请求载荷，并在请求中携带分片元信息，以便服务端识别同一次上传的分片集合与分片顺序。

#### Scenario: Upload each chunk with metadata

- **WHEN** 系统对一个文件切分为 `totalChunks` 个 chunk，并开始上传第 `chunkIndex` 个 chunk
- **THEN** 系统 SHALL 在该 chunk 的请求中包含 `chunkIndex` 与 `totalChunks` 字段，并包含可用于服务端归组的 `uploadId/chunkUid` 标识

### Requirement: Overall progress aggregation

系统 SHALL 以整体进度汇总驱动 `Upload` 现有的 `fileList` UI 进度条与 `onProgress` 回调。

#### Scenario: Overall percent increases with chunk completion

- **WHEN** 系统按顺序完成第 `i` 个 chunk（1-based）
- **THEN** 系统 SHALL 计算 `overallPercent`，并通过更新 `fileList.percent` 与触发 `onProgress(overallPercent, file)` 让进度条反映整体上传进度

### Requirement: Retry and error handling

当单个 chunk 上传失败时，系统 SHALL 按配置执行有限次重试；若重试仍失败，系统 SHALL 将文件状态更新为 error，并调用现有错误回调。

#### Scenario: Chunk fails and retries exhausted

- **WHEN** 系统上传某个 chunk 时发生错误，并在达到最大重试次数后仍未成功
- **THEN** 系统 SHALL 将该文件的 `status` 设置为 `error`，并调用 `onError(err, file)` 与 `onChange(file)`（error 状态下的同一 file 对象）

### Requirement: Success handling after final chunk

当最后一个 chunk 成功后，系统 SHALL 根据服务端响应更新该文件状态为 success，并调用现有成功回调。

#### Scenario: Last chunk succeeds

- **WHEN** 系统成功上传最后一个 chunk，并从服务端获得合并确认响应
- **THEN** 系统 SHALL 将该文件 `status` 更新为 `success`，设置 `response` 字段，并触发 `onSuccess(data, file)` 与 `onChange(file)`
