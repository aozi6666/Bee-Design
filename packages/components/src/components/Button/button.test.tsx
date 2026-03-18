import { render, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button, { ButtonSize, ButtonType } from "./button";
import type { ButtonProps } from "./button";

// 测试数据
const defaultProps = {
  // 一个假的函数，当点击按钮时，Jest 可以记录它有没有被调用
  onClick: jest.fn(),
};

// 测试样式 数据
// 验证：传这些 props 后，class 有没有变成你想要的样子
const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: "klass",
};

// 测试 禁用状态 数据
// 按钮被禁用后，再点它，不应该触发点击函数
const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

test("第一个 React 按钮测试用例", () => {
  // render对象：测试环境里把这个 React 组件渲染到 测试页面DOM中 “画出来”
  // 可以 找元素、点元素、检查 class
  const wrapper = render(<Button {...defaultProps}>测试</Button>);
  // element： 拿到页面中 文字内容 为 "测试" 的元素
  const element = wrapper.queryByText("测试");
  // 验证：这个元素存在吗？
  expect(element).toBeTruthy();

  // 枚举一些方法:前提 已经安装好 jest-dom 依赖
  // 验证：这个元素在页面上吗？
  expect(element).toBeInTheDocument();
});

// 测可访问语义
test("用户点击 React 按钮测试用例", async () => {
  const wrapper = render(<Button {...defaultProps}>测试</Button>);
  // element： 拿到页面中 文字内容 为 "测试" 的元素
  const button = wrapper.getByRole("button", { name: "测试" });
  // 验证：这个元素存在吗？
  expect(button).toBeTruthy();
  // 验证：这个元素在页面上吗？
  expect(button).toBeInTheDocument();
  // 模拟用户点击按钮
  const user = userEvent.setup();
  await user.click(button);
  expect(defaultProps.onClick).toHaveBeenCalled();
});

// describe一个组织结构： 给测试分组
describe("测试 Button 组件", () => {
  // 这个按钮默认长什么样？
  it("渲染默认样式的按钮", () => {
    const wrapper = render(<Button {...defaultProps}>测试</Button>);
    // as HTMLButtonElement： 告诉 TS：这个元素是 button 类型
    // 按照 button 类型 类型找
    const element = wrapper.getByText("测试") as HTMLButtonElement;
    expect(element).toBeInTheDocument(); // 元素存在
    expect(element.tagName).toEqual("BUTTON"); // 标签名是 BUTTON
    expect(element).toHaveClass("btn btn-default"); // class 包含 btn btn-default
    expect(element.disabled).toBeFalsy(); // disabled 是 false
    // fireEvent： 模拟用户点击按钮
    fireEvent.click(element);
    expect(defaultProps.onClick).toHaveBeenCalled(); // 点击后 onClick 被调用
  });
  // 传不同 props 会不会变样？
  it("根据不同 props 渲染不同样式", () => {
    const wrapper = render(<Button {...testProps}>测试</Button>);
    const element = wrapper.getByText("测试");
    expect(element).toBeInTheDocument();
    expect(element).toHaveClass("btn-primary btn-lg klass");
  });
  // link 类型会不会变成 <a>？
  it("当 btnType 为 link 且提供 href 时渲染为链接", () => {
    const wrapper = render(
      <Button btnType="link" href="http://www.baidu.com">
        Link
      </Button>,
    );
    const element = wrapper.getByText("Link");
    expect(element).toBeInTheDocument();
    expect(element.tagName).toEqual("A");
    expect(element).toHaveClass("btn btn-link");
  });
  // disabled 会不会真的禁用？
  it("当 disabled 为 true 时渲染禁用按钮", () => {
    const wrapper = render(<Button {...disabledProps}>测试</Button>);
    const element = wrapper.getByText("测试") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
