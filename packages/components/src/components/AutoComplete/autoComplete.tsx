// AutoComplete 组件： 带搜索建议的 Input
import { useState, useEffect, useRef } from "react";
import type { ChangeEvent, KeyboardEvent } from "react";
import { clamp } from "@aozi6666/bee-utils";
import Input from "../Input/input";
import useDebounce from "../../hooks/useDebounce";
import useClickOutside from "../../hooks/useClickOutside";
import type { AutoCompleteProps, DataSourceType } from "./autoComplete.types";
import AutoCompleteDropdown from "./autoCompleteDropdown";
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
export const AutoComplete = (props: AutoCompleteProps) => {
  const { fetchSuggestions, onSelect, onChange, value, renderOption, ...restProps } = props;
  // 输入框当前显示的文本
  const [inputValue, setInputValue] = useState((value as string) || "");
  // 候选项列表:下拉建议列表的数据源（渲染 `<li>` 就靠它）
  const [suggestions, setSugestions] = useState<DataSourceType[]>([]);
  // 加载状态:异步请求进行中就显示 loading
  const [loading, setLoading] = useState(false);
  // 是否展示下拉（配合 `Transition` 动画）
  const [showDropdown, setShowDropdown] = useState(false);
  // 高亮索引:键盘上下选择时，哪一项高亮（对应 class `is-active`）
  const [highlightIndex, setHighlightIndex] = useState(-1);

  // 两个关键 ref：
  // 用来区分“用户打字触发搜索” vs “用户选中后把值塞回去（不应该再搜一次）”
  // 用户打字时:true，用户选中：false
  const triggerSearch = useRef(false);
  // 挂到最外层 div 上，给 `useClickOutside` 判断“点击是否发生在组件外”
  const componentRef = useRef<HTMLDivElement>(null);

  // 防抖Hook：把“频繁输入”变成“停顿后再触发一次”
  const debouncedValue = useDebounce(inputValue, 300);

  // 自定义Hook：点击组件外部时,触发自定义的回调
  /* 在 `document` 上挂一个 `click` 监听
   * @param componentRef 组件的 ref
   * @param callback 点击外部时执行的回调
   */
  // componentRef： 指向 AutoComplete 最外层 DOM
  useClickOutside(componentRef, () => {
    setSugestions([]);
    setShowDropdown(false);
  });

  // 监听 `debouncedValue防抖后的值` 变化
  // fetchSuggestions这个函数本身的引用地址变没变，改变时，监听变化
  // 因为：React在 effect 里用到了这个函数，避免：闭包拿到旧函数
  useEffect(() => {
    // 调度函数: 把 函数 放入微任务队列（执行）
    // 页面更新等逻辑处理完再更新 UI，减少闪烁、时序混乱的问题
    const schedule = (fn: () => void) => {
      queueMicrotask(fn);
    };
    /* 停止搜索，关闭下拉框
     * 两种情况：
     * 1. 输入框为空（防抖后的值为空）
     * 2. 用户选中下拉建议某一项后，输入框值会变为选中项的值（不应该再搜一次）
     */
    if (!debouncedValue || !triggerSearch.current) {
      // 调用 调度函数: 把函数放入微任务队列（执行）
      schedule(() => {
        setShowDropdown(false); // 关闭下拉框 展示
        setHighlightIndex(-1); // 重置高亮索引
      });
      return;
    }

    // 搜索执行
    // 1. 拿当前输入内容，获取 建议项
    const results = fetchSuggestions(debouncedValue);

    // 异步返回：
    if (results instanceof Promise) {
      schedule(() => {
        setLoading(true); // 显示“加载中”
        setHighlightIndex(-1); // 不高亮任何项
      });
      // 异步返回： 拿到数据后，更新状态
      results.then((data) => {
        setLoading(false); // 关闭 “加载中”
        setSugestions(data); // 更新建议项列表
        setShowDropdown(data.length > 0); // 有数据，就显示下拉框
      });
    } else {
      // 同步返回： 本地有个数组，直接筛选
      schedule(() => {
        setLoading(false); // 关闭 “加载中”
        setSugestions(results);
        setShowDropdown(results.length > 0);
        setHighlightIndex(-1);
      });
    }
  }, [debouncedValue, fetchSuggestions]);

  const highlight = (index: number) => {
    const nextIndex = clamp(index, 0, suggestions.length - 1);
    setHighlightIndex(nextIndex);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38:
        highlight(highlightIndex - 1);
        break;
      case 40:
        highlight(highlightIndex + 1);
        break;
      case 27:
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };
  // 回调：消息框内容发生变化
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 获取 输入框内容 （去掉首尾空格）
    const value = e.target.value.trim();
    // 更新 输入框内容
    // `inputValue` 变化 → 经过 `useDebounce` 得到 `debouncedValue`
    setInputValue(value);
    // 组件使用者传来的回调：消息框内容发生变化
    if (onChange) {
      onChange(value);
    }
    // 告诉后面“这次是用户输入，应当触发搜索”
    triggerSearch.current = true;
  };

  // 回调：用户选中某一项
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false;
  };
  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input {...restProps} value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} />

      {/* 下拉列表UI组件 */}
      <AutoCompleteDropdown
        loading={loading}
        showDropdown={showDropdown}
        suggestions={suggestions}
        highlightIndex={highlightIndex}
        onSelect={handleSelect}
        renderOption={renderOption}
        onExited={() => {
          setSugestions([]);
        }}
      />
    </div>
  );
};

export default AutoComplete;
