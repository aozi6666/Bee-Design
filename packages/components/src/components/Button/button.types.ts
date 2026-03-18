/* 定义 Button 组件可以接收哪些 props（组件 API） */

// 导入了 3 个 React 内置类型
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

// TS 导出 两个固定值 'lg' / 'sm'
/*
as const: 把 ButtonSize对象的值 变成不可修改的 字面量类型
  - 如果没有 as const: Large: string
  - 如果有 as const: Large: "lg"

不写 as const: Large: 'lg' 会被 TS 自动推导为 string 类型
*/
export const ButtonSize = {
  Large: "lg",
  Small: "sm",
} as const;

// typeof: 取出某个 变量/对象 的“类型”
// keyof： 拿到一个对象类型的“所有键名-属性名 keys”
//         -> 变成联合类型 "Large" | "Small"

/* 
  (某个类型)[某些键]：从这个类型里，取这些 key 对应的 value 类型
  -> 最终变成 type ButtonSize = "lg" | "sm"
*/
export type ButtonSize = (typeof ButtonSize)[keyof typeof ButtonSize];

export const ButtonType = {
  Primary: "primary",
  Default: "default",
  Danger: "danger",
  Link: "link",
} as const;

// 最终生成的类型: type ButtonType = "primary" | "default" | "danger" | "link"
export type ButtonType = (typeof ButtonType)[keyof typeof ButtonType];

// 定义了 Button 支持的 属性Props
// className: 自定义的 class
export interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children?: ReactNode;
  href?: string;
}

/*
 &：合并两个类型   |: 交叉
 NativeButtonProps = BaseButtonProps + button 所有原生属性（onClick={handleClick}）
*/
export type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;

// Button 渲染成 <a>
export type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;

// ButtonProps（最终类型）：NativeButtonProps & AnchorButtonProps
// TypeScript 内置工具类型Partial<>：把所有属性变成可选
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;
