import type { ReactElement } from 'react'
import type { InputProps } from '../Input/input.types'

// 每一条item 建议项 至少有 `value: string`
interface DataSourceObject {
  value: string
}
// 别的字段数据T，“拼”在 item 上
// 泛型 <>: 制作 泛型模板，给“类型”留位置(类似 函数参数是给“值”留位置)
// <T = Record<string, unknown>>， 没传 T，那默认 T 就是一个“对象”形状
// & 交叉类型（Intersection Type）：类型要 同时满足左边和右边
export type DataSourceType<T = Record<string, unknown>> = T & DataSourceObject

// Omit<,>从一个类型里，删掉某些属性
// extends: 继承（直接使用）
// | 联合类型：要么是左边，要么是右边
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect' | 'onChange'> {
  /**
   * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
   */

  // 函数类型： (参数: 参数类型) => 返回值类型
  // DataSourceType[]：类型的数组

  // 返回 同步的数组 或者 是异步的 Promise 数组
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
  /** 点击 选中建议项(点中/回车) 时触发的回调 */

  // void：不需要返回结果
  onSelect?: (item: DataSourceType) => void
  /** 文本框发生改变 的时候触发的事件 */
  onChange?: (value: string) => void
  /** 支持自定义 渲染 下拉项 的 UI，返回 ReactElement类型 */
  renderOption?: (item: DataSourceType) => ReactElement
}

