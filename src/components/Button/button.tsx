import type { FC } from 'react'
import classNames from 'classnames'
import type {
  AnchorButtonProps,
  ButtonProps,
  NativeButtonProps,
} from './button.types.ts'
import { ButtonType } from './button.types.ts'

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
  const classes = classNames('btn', className, {
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
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

export default Button