import type { FC } from 'react'

// @zhangAo_换入自己写的样式文件
// import './App.css'
import './styles/index.scss'

import Button from './components/Button/button'
import { ButtonType } from './components/Button/button.types.ts'
import Upload from './components/Upload'
import type { UploadFile } from './components/Upload/upload.types'

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
    <div className="App">
      <header className="App-header">
        <h2 style={{ marginBottom: 24, fontWeight: 500 }}>Button 组件演示</h2>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
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

        <h2 style={{ margin: '40px 0 16px', fontWeight: 500 }}>
          Upload 组件演示
        </h2>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            alignItems: 'flex-start',
            maxWidth: 480,
            margin: '0 auto',
          }}
        >
          <Upload
            action="https://jsonplaceholder.typicode.com/posts"
            defaultFileList={defaultUploadList}
          >
            <Button btnType={ButtonType.Primary}>点击上传</Button>
          </Upload>

          <Upload
            action="https://jsonplaceholder.typicode.com/posts"
            drag
          >
            <div
              style={{
                padding: '20px 40px',
                border: '1px dashed #d9d9d9',
                borderRadius: 4,
                textAlign: 'center',
                color: '#595959',
                background: '#fafafa',
              }}
            >
              拖拽文件到此处，或点击上传
            </div>
          </Upload>
        </div>
      </header>
    </div>
  )
}

export default App
