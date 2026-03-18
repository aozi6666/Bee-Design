// Icon 组件的类型定义拆分到单独文件

import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

// 主题类型：决定使用哪种主题色（对应 .icon-primary 等样式）
export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

// Icon 组件对外暴露的 Props
export interface IconProps extends FontAwesomeIconProps {
  /** 支持框架主题，根据主题显示不同的颜色 */
  theme?: ThemeProps;
}
