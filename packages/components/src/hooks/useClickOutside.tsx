// “点击某个区域外面时，执行一些事情。”
/*监听整个页面点击，
   -如果点击目标不在 ref 指向的 DOM 里，就执行回调。
*/
import { useEffect, useRef } from "react";
import type { RefObject } from "react";

function useClickOutside<T extends HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: MouseEvent) => void,
  eventType: "click" | "mousedown" = "click",
) {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    // 监听 document 的 click 事件

    // 点击回调：页面每次被点击时，要执行的函数
    const listener = (event: MouseEvent) => {
      // 拿到真实 边界DOM
      const el = ref?.current;
      // 空值保护： 当前拿不到 DOM，直接return
      if (!el) return;
      // 点击发生在组件内部, 直接return
      /*
          event.target:  实际点到的元素
          el.contains：DOM 原生 API，判断 el元素是否包含某个节点
      */
      // 复杂场景下如果下拉框通过 portal 渲染到 body 等其他 DOM 树中，单纯依赖 contains 判断可能不够，需要更通用的命中判断策略
      if (el.contains(event.target as Node)) return;
      handlerRef.current(event); // 执行回调函数
    };

    // 监听挂在 document整个页面上
    document.addEventListener(eventType, listener);
    // 清理函数: 卸载组件时，移除监听（防止内存泄漏/重复监听）
    return () => {
      document.removeEventListener(eventType, listener);
    };
  }, [ref, eventType]);
}

export default useClickOutside;
