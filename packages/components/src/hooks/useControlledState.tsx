import type { Dispatch, SetStateAction } from "react";
import { useCallback, useState } from "react";

/* 
useControlledState Hook:
  - 受控模式：当 `controlledValue` 不为 undefined 时，状态来自外部 props
  - 非受控模式：当 `controlledValue` 为 undefined 时，状态内部维护
  - 状态更新时：
    - 受控模式：调用 `onChange(nextValue)` 通知外部更新
    - 非受控模式：更新内部 state（同时如果提供了 onChange 也会同步通知）
*/
function useControlledState<T>(
  controlledValue: T | undefined,
  defaultValue: T,
  onChange?: (value: T) => void,
): [T, Dispatch<SetStateAction<T>>] {
  const [uncontrolledValue, setUncontrolledValue] = useState<T>(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const setValue = useCallback<Dispatch<SetStateAction<T>>>(
    (next) => {
      if (isControlled) {
        const resolved = typeof next === "function" ? (next as (prevState: T) => T)(value) : next;
        onChange?.(resolved);
      } else {
        if (typeof next === "function") {
          setUncontrolledValue((prev) => {
            const resolved = (next as (prevState: T) => T)(prev);
            onChange?.(resolved);
            return resolved;
          });
        } else {
          setUncontrolledValue(next);
          onChange?.(next);
        }
      }
    },
    [isControlled, onChange, value],
  );

  return [value, setValue];
}

export default useControlledState;
