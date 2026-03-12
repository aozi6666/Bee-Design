import { useState, useEffect, useRef } from 'react'
import type { ChangeEvent, KeyboardEvent } from 'react'
import Input from '../Input/input'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import type { AutoCompleteProps, DataSourceType } from './autoComplete.types'
import AutoCompleteDropdown from './autoCompleteDropdown'
export type { AutoCompleteProps, DataSourceType } from './autoComplete.types'

/**
 * 输入框自动完成功能。当输入值需要自动完成时使用，支持同步和异步两种方式
 * 支持 Input 组件的所有属性 支持键盘事件选择
 * ### 引用方法
 * 
 * ~~~js
 * import { AutoComplete } from 'vikingship'
 * ~~~
 */
export const AutoComplete = (props: AutoCompleteProps) => {
  const {
    fetchSuggestions,
    onSelect,
    onChange,
    value,
    renderOption,
    ...restProps
  } = props
  // 输入框当前显示的文本
  const [ inputValue, setInputValue ] = useState((value as string) || '')
  // 下拉建议列表的数据源（渲染 `<li>` 就靠它）
  const [ suggestions, setSugestions ] = useState<DataSourceType[]>([])
  // 异步请求进行中就显示 loading
  const [ loading, setLoading ] = useState(false)
  // 是否展示下拉（配合 `Transition` 动画）
  const [ showDropdown, setShowDropdown] = useState(false)
  // 键盘上下选择时，哪一项高亮（对应 class `is-active`）
  const [ highlightIndex, setHighlightIndex] = useState(-1)

  // 两个关键 ref：
  // 用来区分“用户打字触发搜索” vs “用户选中后把值塞回去（不应该再搜一次）”
  const triggerSearch = useRef(false)
  // 挂到最外层 div 上，给 `useClickOutside` 判断“点击是否发生在组件外”
  const componentRef = useRef<HTMLDivElement>(null)
    
  // 防抖Hook：把“频繁输入”变成“停顿后再触发一次”
  const debouncedValue = useDebounce(inputValue, 300)

  // 自定义Hook：点击组件外部时关闭下拉
  /* 在 `document` 上挂一个 `click` 监听
   * @param componentRef 组件的 ref
   * @param callback 点击外部时执行的回调
   */
  useClickOutside(componentRef, () => {
    setSugestions([])
    setShowDropdown(false)
  })

  // 监听 `debouncedValue` 变化
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      setSugestions([])
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSugestions(data)
          setShowDropdown(data.length > 0)
        })
      } else {
        setSugestions(results)
        setShowDropdown(results.length > 0)
      }
    } else {
      setShowDropdown(false)
    }
    setHighlightIndex(-1)
  }, [debouncedValue, fetchSuggestions])
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38:
        highlight(highlightIndex - 1)
        break
      case 40:
        highlight(highlightIndex + 1)
        break
      case 27:
        setShowDropdown(false)
        break
      default:
        break
    }
  }
  // 回调：消息框内容发生变化
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 获取 输入框内容 （去掉首尾空格）
    const value = e.target.value.trim()
    // 更新 输入框内容
    // `inputValue` 变化 → 经过 `useDebounce` 得到 `debouncedValue`
    setInputValue(value)
    // 组件使用者传来的回调：消息框内容发生变化
    if (onChange) {
      onChange(value)
    }
    // 告诉后面“这次是用户输入，应当触发搜索”
    triggerSearch.current = true
  }

  // 回调：用户选中某一项
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setShowDropdown(false)
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }
  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        {...restProps}
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      {/* 下拉列表UI组件 */}
      <AutoCompleteDropdown
        loading={loading}
        showDropdown={showDropdown}
        suggestions={suggestions}
        highlightIndex={highlightIndex}
        onSelect={handleSelect}
        renderOption={renderOption}
        onExited={() => {
          setSugestions([])
        }}
      />
    </div>
  )
}

export default AutoComplete;

