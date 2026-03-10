## 先用一句话串起来 Upload 这条线

**整体思路其实和 Button 一样：**

- **React（`upload.tsx`、`uploadList.tsx`、`dragger.tsx`）负责：**
  - 把“上传过程的状态”（准备中 / 上传中 / 成功 / 失败）  
  - 变成各种 `className`（`viking-upload-list-item`、`file-name-error`、`is-dragover` 等）。
- **SCSS（`Upload/_style.scss` + `styles/_variables.scss`）负责：**
  - 定义这些 class 最终长什么样：背景、边框、hover、拖拽高亮、错误红色等。
- **浏览器负责：**
  - 拿 React 渲染出来的 HTML + class  
  - 去匹配 SCSS 编译后的 CSS 规则，并把样式画在页面上。

你只要抓住这条主线：**“状态 → className → CSS 规则”**，Upload 的细节就不会迷路。

---

## 1) 从“怎么用”开始：看 Stories 里面的用法

先看 `upload.stories.tsx` 里最简单的用法（`ASimpleUpload`）：

```tsx
export const ASimpleUpload = (args) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
  >
    <Button size="lg" btnType="primary">
      <Icon icon="upload" /> 点击上传
    </Button>
  </Upload>
)
```

对小白来说，这一行信息很重要：

- **`<Upload ...> 按钮内容 </Upload>`**：Upload 外面一层是组件，里面包着任意“触发上传”的内容（这里是一个 Button + Icon）。
- **关键 props：**
  - **`action`**：上传地址（后端接口 URL）。
  - 其他像 `beforeUpload`、`onSuccess`、`drag` 等是“进阶功能”，后面再看。

再看支持拖拽的用法（`CDragUpload`）：

```tsx
export const CDragUpload = (args) => (
  <Upload
    {...args}
    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    name="fileName"
    multiple
    drag
  >
    <Icon icon="upload" size="5x" theme="secondary" />
    <br/>
    <p>点击或者拖动到此区域进行上传</p>
  </Upload>
)
```

信息点：

- **`drag` 为 `true` 时**，Upload 内部不会直接渲染 children，而是包一层 `Dragger` 组件（后面会看到）。
- 视觉上就会变成一个**灰色虚线框区域**，鼠标拖进来会高亮，这就是 `Dragger + .viking-uploader-dragger + .is-dragover` 联合实现的。

---

## 2) TypeScript 类型：`upload.types.ts` 在这里扮演什么角色？

`upload.types.ts` 和 Button 那一套很像，本质是**“写代码阶段的护栏 + 状态描述”**。

### 2.1 `UploadFile`：每一个文件在 React 状态里长什么样

```ts
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid: string
  size: number
  name: string
  status?: UploadFileStatus
  percent: number
  raw?: File
  response?: any
  error?: any
}
```

- **`status`**：这一个字段非常关键，后面会直接参与生成样式相关的 class：
  - `'ready'` / `'uploading'` / `'success'` / `'error'`
- **`percent`**：上传进度，给 `Progress` 组件用。

可以把它理解成：**“Upload 组件内部维护的文件状态对象结构”**。

### 2.2 `UploadProps`：Upload 组件的“API 说明书”

```ts
export interface UploadProps {
  action: string
  defaultFileList?: UploadFile[]
  beforeUpload?: (file: File) => boolean | Promise<File>
  onProgress?: (percentage: number, file: UploadFile) => void
  onSuccess?: (data: any, file: UploadFile) => void
  onError?: (err: any, file: UploadFile) => void
  onChange?: (file: UploadFile) => void
  onRemove?: (file: UploadFile) => void
  headers?: { [key: string]: any }
  name?: string
  data?: { [key: string]: any }
  withCredentials?: boolean
  accept?: string
  multiple?: boolean
  drag?: boolean
  children?: React.ReactNode
}
```

这里和 Button 的 `button.types.ts` 一样：

- **只在编译期/开发期生效**（帮你写对 props）。
- 浏览器运行时不会去“检查这个文件”。

---

## 3) Upload 主组件：从 props → 状态 → className

核心代码在 `upload.tsx` 里：

### 3.1 组件签名和内部状态

```tsx
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name = 'file',
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props

  const fileInput = useRef<HTMLInputElement>(null)
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
  ...
}
```

- **`fileList` 这一坨状态**：就是“当前页面上所有上传记录”的数据来源。
- 所有和 UI 有关的东西（文件名、进度、成功/失败图标）都**从 `fileList` 里读**，而不是直接去读 DOM。

### 3.2 关键 DOM 结构：和样式强相关的 className

```tsx
return (
  <div className="viking-upload-component">
    <div
      className="viking-upload-input"
      style={{ display: 'inline-block' }}
      onClick={handleClick}
    >
      {drag ? (
        <Dragger onFile={(files) => { uploadFiles(files, true) }}>
          {children}
        </Dragger>
      ) : (
        children
      )}
      <input
        className="viking-file-input"
        style={{ display: 'none' }}
        ref={fileInput}
        onChange={handleFileChange}
        type="file"
        accept={accept}
        multiple={multiple}
      />
    </div>

    <UploadList
      fileList={fileList}
      onRemove={handleRemove}
    />
  </div>
)
```

和样式相关的几个 class：

- **`viking-upload-component`**：Upload 整个组件外层包裹。
- **`viking-upload-input`**：包裹触发区域（按钮 / 拖拽框）。
- **`viking-file-input`**：
  - 真正的 `<input type="file" />`。
  - 被内联样式 `display: 'none'` 隐藏掉，只负责**弹系统文件选择框**。
- **`UploadList`** 子组件里会再渲染一堆列表项 class（见下一节）。

> 注意：`viking-upload-component` 和 `viking-upload-input` 在当前 `_style.scss` 里**没有专门的样式规则**，它们更多是语义性包裹。真正明显的视觉样式集中在：
> - 拖拽区域：`viking-uploader-dragger`
> - 上传列表：`viking-upload-list`、`viking-upload-list-item` 等。

---

## 4) UploadList：状态 → 不同样式的文件列表项

`uploadList.tsx` 核心结构：

```tsx
return (
  <ul className="viking-upload-list">
    {fileList.map(item => {
      return (
        <li className="viking-upload-list-item" key={item.uid}>
          <span className={`file-name file-name-${item.status}`}>
            <Icon icon="file-alt" theme="secondary" />
            {item.name}
          </span>
          <span className="file-status">
            {(item.status === 'uploading' || item.status === 'ready') && (
              <Icon icon="spinner" spin theme="primary" />
            )}
            {item.status === 'success' && (
              <Icon icon="check-circle" theme="success" />
            )}
            {item.status === 'error' && (
              <Icon icon="times-circle" theme="danger" />
            )}
          </span>
          <span className="file-actions">
            <Icon icon="times" onClick={() => { onRemove(item)}}/>
          </span>
          {item.status === 'uploading' &&
            <Progress percent={item.percent || 0} />
          }
        </li>
      )
    })}
  </ul>
)
```

这里把“状态 → className”的思想用得很典型：

- **列表结构：**
  - 外层是 `ul.viking-upload-list`。
  - 每个文件一行：`li.viking-upload-list-item`。
- **根据状态切 class：**
  - 文件名 span：`className="file-name file-name-${item.status}"`。
    - 如果出错：`file-name file-name-error`。
  - 右侧状态图标区域：`span.file-status`。
    - 根据 `status` 决定显示 spinner / check-circle / times-circle。
- **操作区：**
  - `span.file-actions` 默认隐藏，只在 hover 时出现（由 SCSS 控制）。

**关键点：** 这里没有直接写任何 `style={{ ... }}` 来控制颜色/背景，**全部交给 class + SCSS 处理**。  
React 只负责“根据文件状态切 class”。

---

## 5) Dragger：拖拽高亮是怎么从状态变成样式的？

`dragger.tsx`：

```tsx
const [ dragOver, setDragOver ] = useState(false)
const klass = classNames('viking-uploader-dragger', {
  'is-dragover': dragOver
})
```

- 这里使用 `classNames` 帮你拼 `className`：
  - 默认一定有：`viking-uploader-dragger`。
  - 如果 `dragOver === true` 时，再加一个：`is-dragover`。
- 对应 DOM:

```tsx
<div
  className={klass}
  onDragOver={e => { handleDrag(e, true) }}
  onDragLeave={e => { handleDrag(e, false) }}
  onDrop={handleDrop}
>
  {children}
</div>
```

拖拽时发生的事（逻辑角度）：

- 拖进来/悬停在上面：`onDragOver` → `handleDrag(e, true)` → `setDragOver(true)` → 多了一个 class：`is-dragover`。
- 拖离开：`onDragLeave` → `setDragOver(false)` → `class` 变回只有 `viking-uploader-dragger`。
- 放手：`onDrop`，顺便触发 `onFile(e.dataTransfer.files)`，走上传流程。

**样式层面**：`is-dragover` 在 `_style.scss` 中被单独写了规则，实现“高亮边框 + 背景”。

---

## 6) 看 SCSS：`Upload/_style.scss` 怎样定义这些 class 的样子？

文件头部先引入变量：

```scss
@use '../../styles/variables' as *;
```

这一步和 Button 的思路一模一样：**把颜色等基础 token 拿进来用**。

### 6.1 拖拽区域 `.viking-uploader-dragger` + `.is-dragover`

```scss
.viking-uploader-dragger {
  background: $gray-100;
  border: 1px dashed $gray-300;
  border-radius: 4px;
  cursor: pointer;
  padding: 20px;
  width: 360px;
  height: 180px;
  text-align: center;

  &:hover {
    border: 1px dashed $primary;
  }

  &.is-dragover {
    border: 2px dashed $primary;
    background: rgba($primary, .2);
  }
}
```

把它对应回 React：

- React 把 `className` 变成：
  - 默认：`class="viking-uploader-dragger"`
  - 拖拽中：`class="viking-uploader-dragger is-dragover"`
- 浏览器匹配 CSS：
  - `.viking-uploader-dragger { ... }`：浅灰背景 + 灰色虚线框。
  - `.viking-uploader-dragger:hover { ... }`：鼠标移上去边框变成主题色。
  - `.viking-uploader-dragger.is-dragover { ... }`：
    - 虚线框变粗（2px）+ 主色+淡主色背景。

**这里的关键点：**

- **“拖拽中变高亮”不是写死在 JS 里的**，而是：
  1. JS 改变 `className` → 加上 `is-dragover`。
  2. SCSS 提前写好 `.viking-uploader-dragger.is-dragover` 的样式。
  3. 浏览器自动生效。

### 6.2 上传列表整体 `.viking-upload-list` + 每一行 `.viking-upload-list-item`

```scss
.viking-upload-list {
  margin: 0;
  padding: 0;
  list-style-type: none;
}
```

这只是把默认的 `ul` 样式（圆点、默认 margin、padding）清掉。

然后是列表项：

```scss
.viking-upload-list-item {
  transition: all .5s cubic-bezier(.55,0,.1,1);
  font-size: 14px;
  line-height: 1.8;
  margin-top: 5px;
  box-sizing: border-box;
  border-radius: 4px;
  min-width: 200px;
  position: relative;

  &:first-child {
    margin-top: 10px;
  }

  .file-name {
    margin-left: 5px;
    margin-right: 40px;

    svg {
      margin-right: 5px;
      color: $gray-500;
    }
  }

  .file-name-error {
    color: $danger;

    svg {
      color: $danger;
    }
  }

  .file-status {
    display: block;
    position: absolute;
    right: 5px;
    top: 0;
    line-height: inherit;
  }

  .file-actions {
    display: none;
    position: absolute;
    right: 7px;
    top: 0;
    line-height: inherit;
    cursor: pointer;
  }

  &:hover {
    background-color: $gray-200;

    .file-status {
      display: none;
    }

    .file-actions {
      display: block;
    }
  }
}
```

**逐行连回 React：**

- React 里：

  ```tsx
  <li className="viking-upload-list-item" ...>
    <span className={`file-name file-name-${item.status}`}>
      ...
    </span>
    <span className="file-status">...</span>
    <span className="file-actions">...</span>
  </li>
  ```

  如果出错：`class="file-name file-name-error"`。

- SCSS 里：

  - `.file-name`：整体左右留一点间距，内部 `svg`（文件图标）的颜色是 `$gray-500`（灰色）。
  - `.file-name-error`：当 `status === 'error'` 时，整个文件名和图标颜色变 `danger` 红。
  - `.file-status`：绝对定位在右上角（小图标：转圈 / 勾 / 叉）。
  - `.file-actions`：默认 `display: none`，hover 时才显示。
  - `&:hover`：
    - 整行背景变 `gray-200`。
    - `.file-status` 隐藏、`.file-actions` 显示 → 鼠标一靠近，右边就从“状态图标”变成“关闭叉号”。

**总结一下 UploadList 的“状态到样式链路”：**

1. **React 决定：**
   - 哪些元素有 `file-name` / `file-name-error`。
   - 当前显示 `file-status` 还是 `file-actions`（这里是通过 hover 交给 CSS 控制）。
2. **SCSS 决定：**
   - `file-name-error` 是红色。
   - hover 时，哪个 span 显示/隐藏。
3. **浏览器做的就是匹配这些 class**，把颜色和布局画出来。

---

## 7) SCSS 和变量的关系：颜色从哪儿来？

一开始的：

```scss
@use '../../styles/variables' as *;
```

说明当前文件直接使用 `styles/_variables.scss` 里定义的变量，比如：

- `$gray-100` / `$gray-200` / `$gray-300` / `$gray-500`
- `$primary`
- `$danger`

好处：

- 想统一换一套主题色，只需要改变量文件，不需要改 Upload 的 SCSS。
- Upload 的 `_style.scss` 更专注在“**结构和状态**”上，而不是关注具体颜色值。

对你来说，理解上可以借用 Button 那句话：

> **“Upload 组件的 SCSS 负责‘根据状态 class’，从全局变量里拿颜色和尺寸，决定最终长什么样。”**

---

## 8) 从 React 到 CSS：再画一遍 Upload 的“调用链”

结合上面所有内容，把 Upload 的链路再按顺序梳理一遍：

### 第一步：你在页面里写用法（`App.tsx` / Stories）

```tsx
<Upload action="...">
  <Button size="lg" btnType="primary">
    <Icon icon="upload" /> 点击上传
  </Button>
</Upload>
```

或者拖拽版：

```tsx
<Upload action="..." multiple drag>
  <Icon icon="upload" size="5x" theme="secondary" />
  <p>点击或者拖动到此区域进行上传</p>
</Upload>
```

此时你只是表达需求：“我要一个可以上传的区域”。

### 第二步：TypeScript 用 `UploadProps` / `UploadFile` 帮你写对代码

- 检查你有没有传 `action`。
- 提示你 `beforeUpload`、`onSuccess` 等的参数类型。
- 规定内部 `fileList` 的结构。

它们是**开发时**的辅助，不会参与浏览器运行。

### 第三步：React 运行 Upload 组件逻辑（`upload.tsx`）

- 生成 `fileList` 状态，每个 `UploadFile` 记录 name、size、status、percent 等。
- 渲染出 HTML 结构：

  - 有点击触发的按钮区域 / 拖拽区域。
  - 隐藏的 `<input type="file" />`。
  - 根据 `fileList` 渲染出 `<ul class="viking-upload-list">` 及每行 `<li>`。

- 在拖拽过程中，根据 `dragOver` 切换 `class="viking-uploader-dragger is-dragover"`。
- 在上传不同阶段，更新 `UploadFile.status` / `percent`，从而让 React 重新渲染不同的图标和类名（`file-name-error` 等）。

### 第四步：浏览器拿到 DOM + class，匹配 SCSS 编译后的 CSS

- 对拖拽框：

  - `class="viking-uploader-dragger"` → 应用基础灰底虚线框样式。
  - 多一个 `is-dragover` → 应用高亮加粗边框、淡主色背景。

- 对上传列表：

  - `ul.viking-upload-list` → 去掉默认圆点。
  - `li.viking-upload-list-item` → 设置行高、圆角、hover 背景。
  - `.file-name-error` → 文字 + 图标变红。
  - hover 时：`.file-status` 隐藏、`.file-actions` 显示。

### 第五步：SCSS 从哪里来？`_style.scss` 被总入口 `index.scss` 引入

和 Button 一样，你最终会在 `styles/index.scss` 里统一 import 所有组件的 `_style.scss`，然后在应用入口（比如 `App.tsx`）里引入这个 index，让全部 CSS 生效。

---

## 9) 用一句话总结 Upload 的“样式链路思维模型”

**Upload 样式链路的核心模型是：**

> **“Upload（React）用状态驱动 className：`viking-xxx` / `file-name-error` / `is-dragover`；  
> Upload 的 `_style.scss` 用这些 class + 全局变量 `$primary` 等定义视觉；  
> 浏览器只是按照 class 匹配 CSS，把‘上传过程’这套状态画出来。”**

以后你再做别的复杂组件（比如步骤条、通知、表单校验信息），其实都可以沿用这套思路：

- **用 TypeScript 类型把组件 API 和内部状态描述清楚；**
- **用 React 把“状态 → className”这一层写清楚；**
- **用 SCSS（变量 + 局部 `_style.scss`）决定每种 class 的外观；**
- **最后统一由 `styles/index.scss` 接入应用。**

这样看，Upload 虽然功能上更复杂，但整体“从 React 到 CSS 的路径”其实和 Button 完全是一套模式。

