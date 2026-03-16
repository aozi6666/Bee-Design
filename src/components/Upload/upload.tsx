// Upload = Form + FormData + Ajax
import type { ChangeEvent, FC } from 'react'
import { useRef, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Dragger from './dragger'
import type { UploadFile, UploadProps } from './upload.types'

/**
 * 通过点击或者拖拽上传文件
 * ### 引用方法
 * 
 * ~~~js
 * import { Upload } from 'vikingship'
 * ~~~
 */
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
  // 文件输入框 ref 引用
  const fileInput = useRef<HTMLInputElement>(null)
  // （子组件）页面上 正在显示 的 上传文件列表
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])

  //  **`UploadList`** 子组件: 从 上传文件列表fileList 渲染一堆 列表项 class
  // 上传列表状态更新器
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      return prevList.map(file => {
        // 在列表里找到同一个 uid 文件
        if (file.uid === updateFile.uid) {
          // 更新部分字段
          return { ...file, ...updateObj }
        } else {
          return file
        }
      })
    })
  }

  // 点击上传回调：用户点击 上传文件 输入框
  const handleClick = () => {
    // 用 ref 拿到“隐藏的” input元素
    if (fileInput.current) {
      // 调用浏览器的原生能力： 弹出 系统级文件选择框
      fileInput.current.click()
    }
  }
  // 文件上传回调：当有文件传来的时候触发
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    // 获取文件列表：类型为 FileList
    const files = e.target.files
    if(!files) {
      return
    }

    // 调用 上传文件函数（含发送请求）：决定 每个/不同文件 怎么处理
    uploadFiles(files)

    // 清空 文件输入框
    if (fileInput.current) {
      fileInput.current.value = ''
    }
  }

  // 传递给 UploadList 子组件的 回调函数
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter(item => item.uid !== file.uid)
    })
    if (onRemove) {
      onRemove(file)
    }
  }
  // 函数： 上传文件： 决定 每个文件 上传
  // （beforeUpload： “上传前钩子”）
  const uploadFiles = (files: FileList, test?: boolean) => {
    // 传来的文件列表 FileList类型，不是数组  =》 转为数组
    const postFiles = Array.from(files)
    // 
    if (test) {
      console.log('drag', postFiles[0])
    }

    // 遍历 数组 每一项
    postFiles.forEach(file => {
      // 没有配置 beforeUpload，直接上传
      if (!beforeUpload) {
        post(file)
      } else {
        // 用户使用了 beforeUpload => 需要等待 用户的异步处理结果（例如压缩图片）
        // beforeUpload(file)用户在钩子里写的回调： 会返回 Promise<newFile> 
        // 获取  Promise<newFile> 用这个处理完的 File 对象发送
        // 执行用户传进来的回调函数，并把它的返回值接住，放进 result
        const result = beforeUpload(file)
        // 
        if (result && result instanceof Promise) {
          // 获取 异步回调 reslove(newFile)后的 newFile
          result.then(processedFile => {
            post(processedFile)  // 发送用户异步处理完的 新File文件
          })
        } else if (result !== false) {
          // 用户使用了拦截：return false ==> 永远不会触发 post， 不上传
          // 返回 true → 上传原文件
          post(file)
        }
      }
    })
  }

  // 函数： 发axios请求
  const post = (file: File) => {
    // 改造浏览器原生File，创建 内部文件对象 `_file` （文件本体 + 上传状态）
    const _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file
    }
    // 请求发送之前放进 fileList，列表先显示出来
    setFileList(prevList => {
      return [_file, ...prevList]
    })

    // 2) 构建 `FormData` 
    const formData = new FormData()
    formData.append(name || 'file', file)

    // 如果传了 `data`， 额外字段也 append 进 FormData
    // （例如 `userId`、`token`）
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key])
      })
    } 
    // 使用 axios 发送 POST 请求
    axios.post(action, formData, {
      headers: {
        ...headers,
        'Content-Type': 'multipart/form-data'
      },
      // 跨域请求 凭证信息（Cookie）
      // 需要 后端 允许跨域携带凭证： Access-Control-Allow-Credentials: true
      withCredentials,
      // axios 提供的 请求配置回调（“系统回调”）
      // （不需要手动调用）上传过程中，axios 内部自动不断触发 onUploadProgress
      onUploadProgress: (e) => {
        // 把字节进度算成百分比
        const total = e.total ?? 0
        const percentage = total ? Math.round((e.loaded * 100) / total) : 0
        // 更新 fileList 中这条文件的 percent/status
        if (percentage < 100) {
          // 更新 React state（驱动UI）：让 UploadList 子组件重新渲染
          updateFileList(_file, { percent: percentage, status: 'uploading'})
          // 更新当前 _file 对象，保证传给回调的值是新的
          _file.status = 'uploading'
          _file.percent = percentage
          // 将 axios 的 onUploadProgress 得到的上传进度结果，包装一层
          // 提供给 Upload 组件的外部使用者 外部钩子onProgress：给组件外部使用
          if (onProgress) {
            onProgress(percentage, _file)
          }
        }
      }
    }).then(resp => {
      // 成功时：更新React UI内部状态
      updateFileList(_file, {status: 'success', response: resp.data})
      // 更新当前 _file 对象，保证传给回调的值是新的
      _file.status = 'success'
      _file.response = resp.data
      // 通知外部 onSuccess  / onChange 钩子
      if (onSuccess) {
        onSuccess(resp.data, _file)
      }
      if (onChange) {
        onChange(_file)
      }
    }).catch(err => {
      // 失败时：更新React UI内部状态
      updateFileList(_file, { status: 'error', error: err})
      // 更新当前 _file 对象，保证传给回调的值是新的
      _file.status = 'error'
      _file.error = err
      // 
      if (onError) {
        onError(err, _file)
      }
      if (onChange) {
        onChange(_file)
      }
    })
  }

  return (
    <div 
      className="viking-upload-component"
    >
      {/* {children}: 外部传进来的 UI(文本、组件、按钮) */}
      <div className="viking-upload-input"
        style={{display: 'inline-block'}}
        onClick={handleClick}>
        {children}
        {/* 如果 drag = true，使用 Dragger 组件(拖拽模式) */}
          {drag ? 
            // 传给 Dragger子组件回调函数 onFile
            // 当用户拖拽文件，Dragger 的onDrop状态触发 onFile(files)
            <Dragger onFile={(files) => {uploadFiles(files, true)}}>
              {/* 把 children 传给 Dragger组件 使用 */}
              {children}
            </Dragger>:

             // 如果 drag = false, 直接渲染 children(普通模式)
            children
          }
        <input
          className="viking-file-input"
          style={{display: 'none'}}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>
      
      {/* 子组件：展示文件列表 */}
      <UploadList 
        fileList={fileList}
        onRemove={handleRemove}
      />
    </div>
  )
}

export default Upload;

export type { UploadProps };