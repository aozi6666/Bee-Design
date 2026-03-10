import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonSize, ButtonType } from './button'
import type { ButtonProps } from './button'

const defaultProps = {
  onClick: jest.fn(),
}

const testProps: ButtonProps = {
  btnType: ButtonType.Primary,
  size: ButtonSize.Large,
  className: 'klass',
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}

test('第一个 React 按钮测试用例', () => {
  // render对象
  const wrapper = render(<Button {...defaultProps}>测试</Button>)
  const element = wrapper.queryByText('测试')

  expect(element).toBeTruthy()

  // 枚举一些方法:前提 已经安装好 jest-dom 依赖
  expect(element).toBeInTheDocument()
})

describe('测试 Button 组件', () => {
  it('渲染默认样式的按钮', () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
  it('根据不同 props 渲染不同样式', () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>)
    const element = wrapper.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })
  it('当 btnType 为 link 且提供 href 时渲染为链接', () => {
    const wrapper = render(
      <Button btnType="link" href="http://dummyurl">
        Link
      </Button>,
    )
    const element = wrapper.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('btn btn-link')
  })
  it('当 disabled 为 true 时渲染禁用按钮', () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>)
    const element = wrapper.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})

