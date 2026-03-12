import type { FC } from 'react'

import './styles/index.scss'
import './App.scss'

import Button from './components/Button/button'
import { ButtonType } from './components/Button/button.types.ts'
import Upload from './components/Upload'
import type { UploadFile } from './components/Upload/upload.types'
import Icon from './components/Icon'
import Progress from './components/Progress'

const App: FC = () => {
  const defaultUploadList: UploadFile[] = [
    {
      uid: '1',
      size: 1024,
      name: '已上传文件.png',
      status: 'success',
      percent: 100,
    },
    {
      uid: '2',
      size: 2048,
      name: '上传中文件.jpg',
      status: 'uploading',
      percent: 40,
    },
  ]

  return (
    <div className="app-shell">
      <div className="app-container">
        <header className="app-header">
          <div>
            <h1 className="app-title">Cream Design 组件库</h1>
            <p className="app-subtitle">
              一套用来练习 React + TypeScript 的轻量组件示例。
            </p>
          </div>
          <div className="app-headerActions">
            <Button btnType={ButtonType.Primary}>查看文档</Button>
            <Button btnType={ButtonType.Default}>Git 仓库</Button>
          </div>
        </header>

        <main className="app-mainGrid">
          {/* 左侧：按钮 + 上传 */}
          <section className="app-stack">
            <div className="app-card">
              <h2 className="app-cardTitle">Button 组件演示</h2>
              <p className="app-cardDesc">
                不同类型按钮和链接按钮，适合作为页面主操作、次要操作和文本链接。
              </p>
              <div className="app-rowWrap">
                <Button btnType={ButtonType.Primary}>Primary Button</Button>
                <Button btnType={ButtonType.Default}>Default Button</Button>
                <Button btnType={ButtonType.Danger}>Danger Button</Button>
                <Button btnType={ButtonType.Link} href="https://www.baidu.com/">
                  Link 百度
                </Button>
                <Button btnType={ButtonType.Link} href="https://www.baidu.com/" target="_blank">
                  Link 百度("新窗口打开")
                </Button>
              </div>
            </div>

            <div className="app-card">
              <h2 className="app-cardTitle">Upload 组件演示</h2>
              <p className="app-cardDesc">
                支持点击选择、拖拽上传、上传进度显示和文件列表管理。
              </p>

              <div className="app-colGap">
                <Upload
                  action="https://jsonplaceholder.typicode.com/posts"
                  defaultFileList={defaultUploadList}
                >
                  <Button btnType={ButtonType.Primary}>点击上传</Button>
                </Upload>

                <Upload action="https://jsonplaceholder.typicode.com/posts" drag>
                  <div className="app-dropzoneMock">
                    拖拽文件到此处，或点击上传
                  </div>
                </Upload>
              </div>
            </div>
          </section>

          {/* 右侧：Icon + Progress 预览 */}
          <section className="app-stack">
            <div className="app-card">
              <h2 className="app-cardTitle">Icon 组件演示</h2>
              <p className="app-cardDesc">
                基于 Font Awesome 的图标组件，支持主题色和所有原生属性。
              </p>
              <div className="app-iconRow">
                <Icon icon="coffee" size="2x" />
                <Icon icon="check-circle" size="2x" theme="success" />
                <Icon icon="times" size="2x" theme="danger" />
                <Icon icon="spinner" size="2x" spin theme="primary" />
              </div>
            </div>

            <div className="app-card">
              <h2 className="app-cardTitle">Progress 组件演示</h2>
              <p className="app-cardDesc">
                展示任务完成进度，支持不同主题颜色和高度。
              </p>
              <div className="app-progressStack">
                <Progress percent={30} />
                <Progress percent={65} theme="success" />
                <Progress percent={90} theme="danger" strokeHeight={10} />
              </div>
            </div>
          </section>
        </main>

        {/* 传统表单方式的文件上传示例 */}
        <div className="app-card app-formDemo">
          <h2 className="app-cardTitle">原生表单上传示例</h2>
          <p className="app-cardDesc">
            使用原生 <code>&lt;form&gt;</code> 提交到后端接口的文件上传方式。
          </p>
          {/* 
          浏览器读取文件 
            -> 打包成  multipart/form-data 文件类型 (文件是二进制数据)
            -> 通过 action: URL 发送 HTTP POST 请求  
           */}
          <form
            method="post"
            encType="multipart/form-data"
            action="https://jsonplaceholder.typicode.com/posts"
            className="app-formActions"
          >
            {/* 
              当 input 选择 "type="file"
               -> 用户可以选择 本地文件
               -> 得到 File 对象

               name="myFile" 是浏览器接收file数据的 key
               例如：{ myFile:  avatar.png }
            */}
            <input type="file" name="myFile" />
            {/* 
            当Button 选择 type="submit"，用户点击 按钮
               -> 浏览器 自动执行 form.submit()
               -> 浏览器：
                 --> 浏览器扫描 form 里的 input 找到  File 对象
                 --> 构造 FormData 
                 --> 发送 HTTP POST 请求
            */}
            <button
              type="submit"
              className="app-nativeSubmit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default App
