## 先用一句话串起来 AutoComplete 这条线

你在输入框里打字 → `AutoComplete` 把输入值存进状态 → `useDebounce` 把“频繁输入”变成“停顿后再触发一次” → 调用 `fetchSuggestions` 拿到建议列表（同步数组或异步 Promise）→ 把建议列表渲染成一堆带 class 的 `<li>` → `_style.scss` 里根据这些 class 画出“下拉框 / 高亮项 / loading”。

---

## 你先认清楚：这个组件由哪些文件组成？

组件目录：`myDesign/src/components/AutoComplete/`

- **`autoComplete.tsx`**：主逻辑（props → state → 事件 → DOM 结构 → className）
- **`autoComplete.types.ts`**：TypeScript 类型（告诉你必须传什么、回调拿到什么）
- **`_style.scss`**：样式（依赖 className：`viking-auto-complete` / `viking-suggestion-list` / `suggestion-item` / `is-active` 等）
- **`index.tsx`**：导出（给外部 `import` 用）
- **`autoComplete.stories.tsx`**：Storybook 示例（同步/自定义模板/异步）
- **`autoComplete.test.tsx`**：测试（输入、点击、键盘、点击外部、异步）

另外它还用到了两个自定义 Hook（在 `myDesign/src/hooks/`）：

- **`useDebounce.tsx`**：防抖（控制触发频率）
- **`useClickOutside.tsx`**：点击组件外部时关闭下拉

---

## 1) AutoComplete 的“对外接口”：props（你怎么用它）

类型定义在 `myDesign/src/components/AutoComplete/autoComplete.types.ts`：

### 1.1 你必须传的：`fetchSuggestions`

```ts
fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>
```

它的意思是：我给你一个字符串 `str`（当前输入），你给我建议列表：

- **同步**：直接返回数组 `[{ value: 'xxx' }, ...]`
- **异步**：返回 `Promise`（比如你要请求接口）

### 1.2 你可以选传的：`onSelect` / `onChange` / `renderOption`

- **`onSelect(item)`**：用户点中/回车选中某一项时触发
- **`onChange(value)`**：输入框文字变化时触发（注意：这里传的是字符串，不是原生事件）
- **`renderOption(item)`**：自定义每一行建议项怎么渲染（返回 ReactElement）

### 1.3 `DataSourceType` 是什么？

```ts
interface DataSourceObject { value: string }
export type DataSourceType<T = {}> = T & DataSourceObject
```

小白理解版：

- 每一条建议项 **至少**要有 `value: string`
- 你可以把别的数据“拼”在 item 上（比如 number、url、avatar）

---

## 2) 主组件：从 props → 状态 → 关键 ref

核心代码在 `myDesign/src/components/AutoComplete/autoComplete.tsx`。

### 2.1 内部状态（state）分别管什么？

```tsx
const [inputValue, setInputValue] = useState((value as string) || '')
const [suggestions, setSugestions] = useState<DataSourceType[]>([])
const [loading, setLoading] = useState(false)
const [showDropdown, setShowDropdown] = useState(false)
const [highlightIndex, setHighlightIndex] = useState(-1)
```

把它们记成 5 个“开关/数据源”：

- **`inputValue`**：输入框当前显示的文本
- **`suggestions`**：下拉建议列表的数据源（渲染 `<li>` 就靠它）
- **`loading`**：异步请求进行中就显示 loading
- **`showDropdown`**：是否展示下拉（配合 `Transition` 动画）
- **`highlightIndex`**：键盘上下选择时，哪一项高亮（对应 class `is-active`）

### 2.2 两个关键 ref：一个管“是否触发搜索”，一个管“点击外部关闭”

```tsx
const triggerSearch = useRef(false)
const componentRef = useRef<HTMLDivElement>(null)
```

- **`triggerSearch`**：用来区分“用户打字触发搜索” vs “用户选中后把值塞回去（不应该再搜一次）”
- **`componentRef`**：挂到最外层 div 上，给 `useClickOutside` 判断“点击是否发生在组件外”

---

## 3) 两个自定义 Hook：它们怎么参与这条链路？

### 3.1 `useDebounce`：把“每次输入都触发”变成“停顿后触发一次”

位置：`myDesign/src/hooks/useDebounce.tsx`

AutoComplete 里这样用：

```tsx
const debouncedValue = useDebounce(inputValue, 300)
```

小白理解版：

- 你每次敲键盘，`inputValue` 都在变
- 但我们不想每次都立刻 `fetchSuggestions`（太频繁、浪费请求）
- `useDebounce` 的做法是：
  - 每次 value 变化就设置一个 `setTimeout`
  - 在 delay（默认 300ms）内如果又变化了，就把上一次 timer 清掉
  - 最终你停下来一会儿，才把“稳定后的值”更新成 `debouncedValue`

### 3.2 `useClickOutside`：点到组件外面就关闭下拉

位置：`myDesign/src/hooks/useClickOutside.tsx`

AutoComplete 里这样用：

```tsx
useClickOutside(componentRef, () => {
  setSugestions([])
  setShowDropdown(false)
})
```

小白理解版：

- Hook 会在 `document` 上挂一个 `click` 监听
- 每次点击时判断：
  - 如果 `componentRef.current.contains(event.target)`，说明点在组件里 → 什么都不做
  - 否则就是点在外面 → 执行你传进去的 `handler`（这里就是清空并关闭）

---

## 4) 关键链路（小白版）：从输入到下拉列表怎么“走起来”？

### 第一步：输入框内容变化，触发 `handleChange`

```tsx
const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value.trim()
  setInputValue(value)
  onChange?.(value)
  triggerSearch.current = true
}
```

注意两个点：

- **`trim()`**：把首尾空格去掉（因此“只输入空格”会变成空字符串）
- **`triggerSearch.current = true`**：告诉后面“这次是用户输入，应当触发搜索”

### 第二步：`inputValue` 变化 → 经过 `useDebounce` 得到 `debouncedValue`

你可以把它理解成：“输入停下来 300ms 之后，才算一个有效查询词”。

### 第三步：`useEffect` 监听 `debouncedValue`，决定要不要拉数据

```tsx
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
```

把它拆开看：

- **什么时候会触发搜索？**
  - `debouncedValue` 不是空（有内容）
  - 并且 `triggerSearch.current` 为 true（确实是“打字”触发）
- **同步建议**：直接 `setSugestions(results)`、决定 `showDropdown`
- **异步建议**：
  - 先 `setLoading(true)` → 下拉里出现 loading
  - Promise resolve 后：
    - `setSugestions(data)`
    - `setShowDropdown(data.length > 0)`
    - `setLoading(false)`
- **每次搜索都把高亮重置**：`setHighlightIndex(-1)`

### 第四步：渲染下拉列表（DOM + className）

下拉部分由 `generateDropdown()` 生成，核心结构是：

```tsx
<Transition in={showDropdown || loading} animation="zoom-in-top" timeout={300}>
  <ul className="viking-suggestion-list">
    {loading && (
      <div className="suggstions-loading-icon">
        <Icon icon="spinner" spin />
      </div>
    )}
    {suggestions.map((item, index) => {
      const cnames = classNames('suggestion-item', {
        'is-active': index === highlightIndex,
      })
      return (
        <li key={index} className={cnames} onClick={() => handleSelect(item)}>
          {renderOption ? renderOption(item) : item.value}
        </li>
      )
    })}
  </ul>
</Transition>
```

你需要记住的 class 就这几个：

- **`viking-suggestion-list`**：整个下拉列表 `<ul>`
- **`suggstions-loading-icon`**：loading 容器（注意：这里单词拼写是 `suggstions`，少了一个 `e`，样式文件也是同样拼写）
- **`suggestion-item`**：每一行 `<li>`
- **`is-active`**：当前高亮行（键盘上下切换时会加上）

---

## 5) 键盘支持：高亮与选中怎么做的？

事件在 `handleKeyDown`：

- **Enter（13）**：选中当前高亮项
- **Up（38）/ Down（40）**：改变 `highlightIndex`（并做边界处理）
- **Esc（27）**：直接关闭下拉

对应到 UI 的变化是：

- `highlightIndex` 变了 → 某一个 `<li>` 会多一个 class `is-active` → 样式改变（背景色、文字色）

---

## 6) 点击选中：为什么选中后不会立刻又触发一次搜索？

```tsx
const handleSelect = (item: DataSourceType) => {
  setInputValue(item.value)
  setShowDropdown(false)
  onSelect?.(item)
  triggerSearch.current = false
}
```

关键是最后一行：

- 用户点中某一项后，确实会把 `inputValue` 改掉
- 但这次改动是“选中导致的回填”，不是“用户在继续输入”
- 所以 `triggerSearch.current = false`，后面的 `useEffect` 就不会再去 `fetchSuggestions`

---

## 7) 从 React 到 CSS：AutoComplete 的“样式链路”怎么对上？

### 7.1 React 产出的 DOM 结构（和样式强相关）

AutoComplete 最外层：

```tsx
<div className="viking-auto-complete" ref={componentRef}>
  <Input ... />
  {generateDropdown()}
</div>
```

下拉列表：

```tsx
<ul className="viking-suggestion-list">
  <li className="suggestion-item is-active">...</li>
  <li className="suggestion-item">...</li>
</ul>
```

### 7.2 `_style.scss` 里写了什么规则？

位置：`myDesign/src/components/AutoComplete/_style.scss`

- **`.viking-auto-complete`**：`position: relative;`
  - 目的：让下拉 `<ul>` 的 `position: absolute` 以它为定位参考
- **`.viking-suggestion-list`**：绝对定位 + 白底 + 边框 + 阴影 + 宽度 100%
- **`.suggestion-item`**：padding / hover / active
- **`.suggestion-item.is-active`**：高亮背景、文字变白（键盘上下时最明显）
- **`.suggstions-loading-icon`**：让 loading 居中并给一个最小高度

### 7.3 这份 SCSS 是怎么“进到页面里”的？

总入口在 `myDesign/src/styles/index.scss`，它用 Sass 模块系统集中引入各组件样式，例如：

```scss
@use "../components/Input/style" as *;
```

对于 AutoComplete，目前文件里是注释状态：

```scss
// @use "../components/AutoComplete/style";
```

小白提示：

- `@use "../components/AutoComplete/style"` 会自动找到 `AutoComplete/_style.scss`
- 如果你在页面里用 `AutoComplete`，但没有把这行打开（或没有单独引入它的样式），你就会看到“功能有了、但下拉框样式可能很朴素/不对”

---

## 8) 用一句话总结 AutoComplete 的“样式链路思维模型”

**AutoComplete 的核心模型是：**

> **“React 负责把状态（输入值、loading、当前高亮项）翻译成 DOM + className；  
> SCSS 负责根据这些 class 画出下拉框和高亮效果；  
> Hook（防抖/点外部关闭）负责让交互变得‘像真的组件’。”**

