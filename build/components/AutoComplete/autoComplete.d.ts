import type { AutoCompleteProps } from "./autoComplete.types";
export type { AutoCompleteProps, DataSourceType } from "./autoComplete.types";
/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 *
 * ~~~js
 * import { AutoComplete } from 'vikingship'
 * ~~~
 */
export declare const AutoComplete: (props: AutoCompleteProps) => import("react/jsx-runtime").JSX.Element;
export default AutoComplete;
