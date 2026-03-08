import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'

export const ButtonSize = {
  Large: 'lg',
  Small: 'sm',
} as const

export type ButtonSize =
  (typeof ButtonSize)[keyof typeof ButtonSize]

export const ButtonType = {
  Primary: 'primary',
  Default: 'default',
  Danger: 'danger',
  Link: 'link',
} as const

export type ButtonType =
  (typeof ButtonType)[keyof typeof ButtonType]

export interface BaseButtonProps {
  className?: string
  disabled?: boolean
  size?: ButtonSize
  btnType?: ButtonType
  children?: ReactNode
  href?: string
}

export type NativeButtonProps = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement>

export type AnchorButtonProps = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement>

export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>


