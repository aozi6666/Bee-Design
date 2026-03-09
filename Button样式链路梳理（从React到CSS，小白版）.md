## 先回答你那句“这样吗？”

你的理解**大方向是对的**：`App.tsx` 用 Button → Button 组件根据 props **生成 class** → 浏览器拿 class 去匹配 CSS → 这些 CSS 在开发时是由 SCSS（`_style.scss` + `_mixin.scss` + `_variables.scss`）**编译展开**出来的。

但有两个小细节需要纠正一下（小白最容易卡在这里）：

- **`App.tsx` 不会“先检查” `button.types.ts`**  
  `button.types.ts` 的作用主要是 **TypeScript 编译期**帮助你写代码时有提示/约束；运行时（浏览器里）不会真的去“检查文件”。  
  真实的运行时链路是：`App.tsx` 渲染 `<Button />` → 执行 `button.tsx` 函数组件 → 生成 class → 输出 HTML。

- **HTML 里有没有 `btn-lg` 取决于你有没有传 `size="lg"`**  
  你给的例子 `<button class="btn btn-primary btn-lg"></button>` 是“传了大号 size”才会出现的。  
  例如：`<Button btnType={Primary} size={Large} />` 才会得到 `btn btn-primary btn-lg`。

---

## 1) 如果不用 SCSS（纯 CSS），Button 最原始要写成什么样？

先假设我们没有变量（tokens）、没有 mixin、没有复用能力，想实现：

- 基础按钮 `.btn`
- 主题按钮 `.btn-primary`
- 大按钮 `.btn-lg`
- 禁用态 `.btn[disabled]` 和 `.btn.disabled`（给 `<a>` 的）

最“原始”的写法大概是这种（**完全硬编码**，没有任何复用）：

```css
/* 基础按钮 */
.btn {
  position: relative;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  white-space: nowrap;
  text-align: center;
  vertical-align: middle;
  background-image: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.075);
  cursor: pointer;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

/* 大小：大号 */
.btn-lg {
  padding: 0.5rem 1rem;
  font-size: 1.25rem;
  border-radius: 0.3rem;
}

/* 类型：Primary */
.btn-primary {
  color: #fff;
  background: #0d6efd;
  border-color: #0d6efd;
}
.btn-primary:hover,
.btn-primary:focus,
.btn-primary.focus {
  /* hover/focus 的颜色你要手动算/手动挑 */
  color: #fff;
  background: #2b7bff;
  border-color: #3a86ff;
}
.btn-primary:disabled,
.btn-primary.disabled {
  color: #fff;
  background: #0d6efd;
  border-color: #0d6efd;
}

/* 禁用：button 用 [disabled]，a 用 .disabled */
.btn.disabled,
.btn[disabled] {
  cursor: not-allowed;
  opacity: 0.65;
  box-shadow: none;
}
.btn.disabled > *,
.btn[disabled] > * {
  pointer-events: none;
}
```

### 纯 CSS 写法的问题（你为什么要做“组件库风格”的 SCSS）

- **重复代码会爆炸**：你再加一个 `.btn-danger`，又要写一套 hover/focus/disabled；再加 `.btn-default` 又一套。
- **很难统一风格**：想全局把圆角从 `0.25rem` 改成 `0.5rem`，你可能要全项目搜一堆地方改。
- **hover/focus 颜色难维护**：每个主题色的“变浅多少”都要手算/试出来，团队协作更难。

---

## 2) 你的组件库现在是怎么“构建出这些 CSS”的？

你现在的写法是：**把“可配置的值”放变量，把“重复的规律”放 mixin，把“组件本身的样式”写成少量 SCSS 规则，然后交给 SCSS 编译器展开成大量 CSS。**

把三类文件分清就不迷糊了：

- **`_variables.scss`**：放“值”（颜色、字号、圆角……）  
  例：`$blue: #0d6efd;`，`$primary: $blue;`
- **`_mixin.scss`**：放“规律”（怎么生成 hover/focus/disabled）  
  例：`@mixin button-style($background, $border, $color, ...) { ... }`
- **`Button/_style.scss`**：放“组件样式声明”（我有哪些 class）  
  例：`.btn-primary { @include button-style($primary, $primary, $white); }`

最后由 `styles/index.scss` 把这些东西串成一个入口，`App.tsx` 引入这个入口，让整套 CSS 进入页面。

---

## 3) 从 React 到 CSS：你要的“逐步调用链”（按你说的那条线，重新画清楚）

### 第一步：`App.tsx` 写用法（你在写“我要什么效果”）

你写：

- `<Button btnType={ButtonType.Primary}>Primary Button</Button>`

这一步你表达的是“我要一个 Primary 类型的按钮”。  
**注意**：这时候还没有任何 HTML/CSS，只有 React 组件调用。

### 第二步：TypeScript 用 `button.types.ts` 帮你“写的时候别写错”

`button.types.ts` 的作用是：

- 在你敲 `btnType={...}` 时给你提示 `Primary/Default/Danger/Link`
- 让你少传错字符串、少拼错字段名

它是“写代码阶段”的护栏，不是运行时链路里的某一步。

### 第三步：运行时真正发生的事在 `button.tsx`（生成 class + 生成元素）

当 React 渲染到 `<Button />` 时，会执行 `button.tsx` 的函数组件，计算出：

- 基础 class：永远有 `btn`
- 类型 class：`btn-primary`（因为 `btnType` 是 primary）
- 尺寸 class：只有你传了 `size="lg/sm"` 才会出现

所以结果可能是：

- 你只传了 Primary：`class="btn btn-primary"`
- 你还传了 Large：`class="btn btn-primary btn-lg"`

然后组件会输出一种 HTML：

- 如果是 Link 且有 `href`：输出 `<a class="btn btn-link ...">...</a>`
- 其它：输出 `<button class="btn ...">...</button>`

### 第四步：浏览器只做一件事——“用 class 去匹配 CSS”

浏览器并不懂 SCSS，也不懂 mixin。它只认最终的 CSS 选择器。

当它看到：

- `<button class="btn btn-primary btn-lg">`

它就会去匹配：

- `.btn { ... }`
- `.btn-primary { ... }`
- `.btn-lg { ... }`

### 第五步：为什么会有这些 CSS？因为 SCSS 在构建时被“编译展开”了

你写的：

- `Button/_style.scss` 里的
  - `.btn { @include button-size(...) }`
  - `.btn-primary { @include button-style($primary, $primary, $white) }`

会在 **SCSS 编译阶段**被展开成很多“普通 CSS 声明”。

#### 以 `.btn-primary` 为例（你给的链路）

你写：

- `Button/_style.scss`：
  - `.btn-primary { @include button-style($primary, $primary, $white) }`

SCSS 会去找 mixin 定义：

- `styles/_mixin.scss`：
  - `@mixin button-style($background, $border, $color, $hover-background: lighten(...), ...) { ... }`

然后把你传入的参数代入：

- `$background = $primary`
- `$border = $primary`
- `$color = $white`

接着 SCSS 会继续解析变量的来源：

- `styles/_variables.scss`：
  - `$primary: $blue`
  - `$blue: #0d6efd`
  - `$white: #fff`

最终编译出来的 CSS（概念上）会变成类似：

```css
.btn-primary {
  color: #fff;
  background: #0d6efd;
  border-color: #0d6efd;
}
.btn-primary:hover {
  color: #fff;
  background: /* lighten(#0d6efd, 7.5%) 的结果 */;
  border-color: /* lighten(#0d6efd, 10%) 的结果 */;
}
/* focus/disabled 同理 */
```

你会发现：**浏览器最终拿到的是普通 CSS，只是这些 CSS 是“自动生成的”。**

---

## 4) 用一句话总结你的“整体构建原理”

你的组件库样式体系的核心是：

**“React 负责把状态变成 class；SCSS 负责把变量 + 规律变成 CSS；浏览器负责用 class 匹配 CSS。”**

当你继续做更多组件（Alert/Menu/Input…）时，你其实是在不断重复同一个模式：

- 把**组件 API**（types）定清楚
- 把**状态**映射成可组合的 class（tsx）
- 把**视觉规则**沉淀成 tokens（variables）
- 把**重复规律**沉淀成 mixin（mixin）
- 把**组件差异**写进组件自己的 `_style.scss`，最后统一从 `styles/index.scss` 接入

