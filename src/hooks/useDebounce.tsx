/* 
防抖（debounce）Hook:
  -频繁触发的操作 → 只在最后一次停顿后执行
  - 只要输入还在继续，就一直取消定时器；
  - 只有用户停下来 delay 毫秒，才把值更新出去。

  若后续常用于对象 / 数组：
  可以配合 useMemo 或 useCallback 使用，减少下游无谓重渲
*/
import { useState, useEffect } from "react";

function useDebounce<T>(value: T, delay = 300): T {
  // 初始值为 value
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  // 当 value值与 delay改变时，执行
  useEffect(() => {
    // 启动一个定时器，300ms后执行
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    // 清理函数：value 又变了，就取消上一次定时器
    // 只要一直触发，就一直取消；直到停下来，才执行最后一次。
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}

export default useDebounce;
