import axios from "axios";
import { render, fireEvent, waitFor } from "@testing-library/react";
import type { RenderResult } from "@testing-library/react";

import { Upload } from "./upload";
import type { UploadProps } from "./upload";

// 测试环境准备
// 1. mock axios请求
jest.mock("../Icon/icon", () => {
  return (props: { onClick?: () => void; icon?: React.ReactNode }) => {
    return <span onClick={props.onClick}>{props.icon}</span>;
  };
});
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Upload 组件测试
// 1) 用到的 props
const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;

// testFile: 测试文件(模拟一个用户选择的文件)
const testFile = new File(["xyz"], "test.png", { type: "image/png" });

// bigFile: 分片上传测试文件（确保文件大小大于 chunkSize）
const bigFile = new File([new Uint8Array(1024 * 10)], "big.png", { type: "image/png" });

describe("测试 Upload 组件", () => {
  // beforeEach: 每个测试前都 重新创建组件
  beforeEach(() => {
    // 渲染 Upload 组件
    wrapper = render(<Upload {...testProps}>点击上传</Upload>);
    // 获取 <input type="file"> 输入框
    fileInput = wrapper.container.querySelector(".viking-file-input") as HTMLInputElement;
    // 获取上传区域(通过拖拽区域的 class)
    uploadArea = wrapper.container.querySelector(".viking-uploader-dragger") as HTMLElement;
  });
  it("1.普通上传流程应正常工作", async () => {
    const { queryByText, getByText } = wrapper;
    // 模拟 axios post 请求成功,返回 Promise.resolve({ data: "cool" })
    mockedAxios.post.mockResolvedValue({ data: "cool" });
    // 上传区域存在
    expect(uploadArea).toBeInTheDocument();
    // 确认 input 是隐藏的： 点击按钮 → 触发隐藏 input
    expect(fileInput).not.toBeVisible();

    // 模拟用户选择文件： <input type="file">
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    // 确认 spinner 图标出现： 检查 上传中 状态
    expect(queryByText("spinner")).toBeInTheDocument();
    // 等待上传完成
    await waitFor(() => {
      expect(queryByText("test.png")).toBeInTheDocument();
      expect(queryByText("check-circle")).toBeInTheDocument();
    });
    // 验证 onSuccess 是否被调用
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      "cool",
      expect.objectContaining({
        raw: testFile,
        status: "success",
        response: "cool",
        name: "test.png",
      }),
    );
    // 验证 onChange
    expect(testProps.onChange).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: "success",
        response: "cool",
        name: "test.png",
      }),
    );

    //测试删除功能
    expect(queryByText("times")).toBeInTheDocument();
    // 模拟用户点击： 删除按钮
    fireEvent.click(getByText("times"));
    // 检查 文件从列表移除
    expect(queryByText("test.png")).not.toBeInTheDocument();
    // 验证 onRemove 是否被调用
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: "success",
        name: "test.png",
      }),
    );
  });
  it("2.拖拽上传流程应正常工作", async () => {
    mockedAxios.post.mockResolvedValue({ data: "cool" });
    // 模拟用户 拖拽文件 进入区域
    fireEvent.dragOver(uploadArea);
    // 验证 拖拽样式 生效
    expect(uploadArea).toHaveClass("is-dragover");

    // 用户拖拽 离开区域
    fireEvent.dragLeave(uploadArea);
    // 验证 拖拽样式 移除，样式恢复
    expect(uploadArea).not.toHaveClass("is-dragover");

    // 模拟用户 拖拽的文件 松手放下文件
    fireEvent.drop(uploadArea, {
      // 浏览器真实行为： 浏览器真实行为
      dataTransfer: {
        files: [testFile],
      },
    });
    // 等待上传完成
    await waitFor(() => {
      // 文件成功上传并显示
      expect(wrapper.queryByText("test.png")).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith(
      "cool",
      expect.objectContaining({
        raw: testFile,
        status: "success",
        response: "cool",
        name: "test.png",
      }),
    );
  });

  it("3.分片上传流程应正常工作", async () => {
    const onSuccess = jest.fn();
    const onChange = jest.fn();
    const onRemove = jest.fn();
    const onError = jest.fn();

    const chunkSize = 1024 * 2; // 2KB，保证至少 5 个 chunk
    const expectedChunks = Math.ceil(bigFile.size / chunkSize);

    mockedAxios.post.mockClear();
    mockedAxios.post.mockResolvedValue({ data: "cool" });

    const { container, queryByText, unmount } = render(
      <Upload
        action="fakeurl.com"
        onSuccess={onSuccess}
        onChange={onChange}
        onError={onError}
        onRemove={onRemove}
        drag={true}
        enableChunkUpload={true}
        chunkSize={chunkSize}
        chunkRetryCount={0}
      >
        点击上传
      </Upload>,
    );

    const fileInput = container.querySelector(".viking-file-input") as HTMLInputElement;

    // 模拟用户选择文件： <input type="file">
    fireEvent.change(fileInput, { target: { files: [bigFile] } });

    // 确认 spinner 图标出现： 检查 上传中 状态
    expect(queryByText("spinner")).toBeInTheDocument();

    // 等待上传完成
    await waitFor(() => {
      expect(queryByText("big.png")).toBeInTheDocument();
      expect(queryByText("check-circle")).toBeInTheDocument();
    });

    // 验证 axios post 被调用次数（每个 chunk 一次）
    expect(mockedAxios.post).toHaveBeenCalledTimes(expectedChunks);

    // 验证 onSuccess 是否被调用
    expect(onSuccess).toHaveBeenCalledWith(
      "cool",
      expect.objectContaining({
        raw: bigFile,
        status: "success",
        response: "cool",
        name: "big.png",
      }),
    );

    // 验证 onError 不应被调用
    expect(onError).not.toHaveBeenCalled();

    unmount();
  });

  it("4.分片上传失败应正确进入 error 状态", async () => {
    const onSuccess = jest.fn();
    const onChange = jest.fn();
    const onRemove = jest.fn();
    const onError = jest.fn();

    const chunkSize = 1024 * 2; // 2KB
    mockedAxios.post.mockClear();
    mockedAxios.post.mockRejectedValueOnce(new Error("chunk upload failed"));

    const { container, queryByText, unmount } = render(
      <Upload
        action="fakeurl.com"
        onSuccess={onSuccess}
        onChange={onChange}
        onError={onError}
        onRemove={onRemove}
        drag={true}
        enableChunkUpload={true}
        chunkSize={chunkSize}
        chunkRetryCount={0}
      >
        点击上传
      </Upload>,
    );

    const fileInput = container.querySelector(".viking-file-input") as HTMLInputElement;

    // 模拟用户选择文件： <input type="file">
    fireEvent.change(fileInput, { target: { files: [bigFile] } });

    // 等待上传失败完成并显示 error 图标
    await waitFor(() => {
      expect(queryByText("big.png")).toBeInTheDocument();
      expect(queryByText("times-circle")).toBeInTheDocument();
    });

    // 失败后只应尝试第一个 chunk
    expect(mockedAxios.post).toHaveBeenCalledTimes(1);

    // 验证 onError 被调用
    expect(onError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        raw: bigFile,
        status: "error",
        name: "big.png",
      }),
    );

    // 验证 onSuccess 不应被调用
    expect(onSuccess).not.toHaveBeenCalled();

    unmount();
  });
});
