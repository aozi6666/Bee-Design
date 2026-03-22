// Tabs 组件相关的 TS 类型定义
// 独立成文件，方便在多个子组件之间复用

import type { ReactElement, ReactNode } from "react";

/** Tabs 组件样式变体 */
export type TabsType = "line" | "card";

export interface TabsProps {
  /**
   * 受控：当前激活 tab 的下标。传入后由父组件通过 state 持有，切换时需在 onSelect 里更新。
   * 不传则为非受控，配合 defaultIndex 使用内部状态。
   */
  activeIndex?: number;
  /** 非受控：初始激活下标，默认为 0 */
  defaultIndex?: number;
  /** 可以扩展的 className */
  className?: string;
  /** 点击 Tab 触发的回调函数 */
  onSelect?: (selectedIndex: number) => void;
  /** Tabs 的样式，两种可选，默认为 line */
  type?: TabsType;
  children?: ReactNode;
}

export interface TabItemProps {
  /** Tab 选项上面的文字 */
  label: string | ReactElement;
  /** Tab 选项是否被禁用 */
  disabled?: boolean;
  children?: ReactNode;
}
