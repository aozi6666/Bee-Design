/*
React 函数组件调用:
  - 生成 class ：浏览器 “用 class 去匹配 CSS选择器” 
  - 生成元素 : return <button/> / return <a/>
导出一个 React 组件函数

 外部使用<Button>...</Button>
  -> React 会执行 Button(props) 
  -> 组件 return JSX 
  -> React 把 JSX 变成真实 DOM
  -> 浏览器显示 HTML
*/

// FC 是 React 提供的一个 组件类型（Function Component 函数组件）
import type { FC } from 'react'
// 第三方工具库： 自动智能拼接 class 字符串
import classNames from 'classnames'
import {
  ButtonSize,
  ButtonType,
  type AnchorButtonProps,
  type ButtonProps,
  type NativeButtonProps,
} from './button.types'

const Button: FC<ButtonProps> = ({
  className,
  disabled = false,
  size,
  btnType = ButtonType.Default,
  children,
  href,
  ...restProps
}) => {

  // btn, btn-lg, btn-primary
  // ① classNames 生成 class
  /* 
  用户写：<Button btnType="primary" size="lg">
  组件算出 class：btn btn-primary btn-lg
  */

  // 返回 字符串
  const classes = classNames('btn', className, {
    /*
       外部传来 <Button btnType={ButtonType.Primary}>
         -> 变成 { "btn-primary": true }
         -> classNames 会加上: btn-primary
         -> 最终变为 ： btn btn-primary 
    */
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,

    // 是 link 按钮 &&  disabled === true
    // classNames 会加上: disabled
    disabled: btnType === ButtonType.Link && disabled,
  })

  // ② 根据类型决定渲染：
  /* 
  用户写：<Button btnType="link" href="https://xxx">
  组件算出: <a class="btn btn-link">...</a>
  */
  if (btnType === ButtonType.Link && href) {
    return (
      <a
        className={classes}
        href={href}
        {...(restProps as AnchorButtonProps)}
      >
        {children}
      </a>
    )
  }
  /* 
  用户写：<Button btnType="primary">
  组件算出: <button class="btn btn-primary">
  */
  return (
    <button
      className={classes}
      disabled={disabled}
      {...(restProps as NativeButtonProps)}
    >
      {children}
    </button>
  )
}

// 导出一个 React 组件函数
export default Button

// 重新导出类型和枚举，方便测试等地方从 `./button` 统一导入
export { ButtonSize, ButtonType }
export type { ButtonProps, AnchorButtonProps, NativeButtonProps }
