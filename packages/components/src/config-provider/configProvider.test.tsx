import React from "react";
import { render, screen } from "@testing-library/react";
import { ConfigProvider } from "./ConfigProvider";
import { useLocale } from "./useLocale";
import { enUS } from "./locales/en-US";

const LocaleConsumer = () => {
  const locale = useLocale();
  return (
    <div>
      <div data-testid="global-empty">{locale.global.empty}</div>
      <div data-testid="upload-remove">{locale.upload.removeFile}</div>
    </div>
  );
};

describe("ConfigProvider", () => {
  test("uses zh-CN by default", () => {
    render(<LocaleConsumer />);
    expect(screen.getByTestId("global-empty")).toHaveTextContent("暂无数据");
    expect(screen.getByTestId("upload-remove")).toHaveTextContent("移除文件");
  });

  test("merges custom locale over defaults", () => {
    render(
      <ConfigProvider locale={{ upload: { removeFile: "删除" } }}>
        <LocaleConsumer />
      </ConfigProvider>,
    );
    expect(screen.getByTestId("global-empty")).toHaveTextContent("暂无数据");
    expect(screen.getByTestId("upload-remove")).toHaveTextContent("删除");
  });

  test("supports switching to a built-in locale pack", () => {
    render(
      <ConfigProvider locale={enUS}>
        <LocaleConsumer />
      </ConfigProvider>,
    );
    expect(screen.getByTestId("global-empty")).toHaveTextContent("No data");
    expect(screen.getByTestId("upload-remove")).toHaveTextContent("Remove file");
  });
});
