import type { ReactElement } from 'react';
import type { InputProps } from '../Input/input.types';
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = Record<string, unknown>> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
    /**
     * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
     */
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    /** 点击 选中建议项(点中/回车) 时触发的回调 */
    onSelect?: (item: DataSourceType) => void;
    /** 文本框发生改变 的时候触发的事件 */
    onChange?: (value: string) => void;
    /** 支持自定义 渲染 下拉项 的 UI，返回 ReactElement类型 */
    renderOption?: (item: DataSourceType) => ReactElement;
}
export {};
