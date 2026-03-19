const OVERFLOW_RE = /(auto|scroll|overlay)/;

function getComputedStyleSafe(el: Element) {
  return window.getComputedStyle(el);
}

function isScrollable(el: Element) {
  const style = getComputedStyleSafe(el);
  return (
    OVERFLOW_RE.test(style.overflow + style.overflowY + style.overflowX) &&
    el.scrollHeight > el.clientHeight
  );
}

export function getScrollParent(
  el: Element | null | undefined,
  boundary: Element | Document = document,
): Element | Window {
  if (!el) return window;

  let parent: Element | null = el.parentElement;
  while (parent && parent !== boundary) {
    if (isScrollable(parent)) return parent;
    parent = parent.parentElement;
  }

  return window;
}
