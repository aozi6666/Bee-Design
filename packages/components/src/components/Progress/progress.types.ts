// Progress 组件的类型定义，单独拆分成文件，便于复用

import type { CSSProperties } from "react";
import type { ThemeProps } from "../Icon/icon.types";

export interface ProgressProps {
  percent: number;
  strokeHeight?: number;
  showText?: boolean;
  styles?: CSSProperties;
  theme?: ThemeProps;
}
