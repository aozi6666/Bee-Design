import type { FC } from 'react'

import './styles/index.scss'

import Button from './components/Button/button'
import { ButtonType } from './components/Button/button.types'
import Upload from './components/Upload'
import type { UploadFile } from './components/Upload/upload.types'
import Icon from './components/Icon'
import Progress from './components/Progress'
import AutoComplete from './components/AutoComplete'
import type { DataSourceType } from './components/AutoComplete'

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

  interface LakerPlayerProps {
    [key: string]: unknown
    value: string
    number: number
  }
  const lakersWithNumber: Array<DataSourceType<LakerPlayerProps>> = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
  ]
  const handleAutoCompleteFetch = (query: string) => {
    return lakersWithNumber.filter((player) => player.value.toLowerCase().includes(query.toLowerCase()))
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '40px 24px 80px',
        background:
          'radial-gradient(circle at top left, #f0f5ff 0, transparent 50%), radial-gradient(circle at bottom right, #fff1f0 0, transparent 55%)',
        fontFamily:
          '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif',
      }}
    >
      <div
        style={{
          maxWidth: 960,
          margin: '0 auto',
        }}
      >
        <header
          style={{
            marginBottom: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div>
            <h1 style={{ margin: 0, fontSize: 28 }}>Cream Design 组件库</h1>
            <p style={{ margin: '8px 0 0', color: '#595959', fontSize: 14 }}>
              一套用来练习 React + TypeScript 的轻量组件示例。
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <Button btnType={ButtonType.Primary}>查看文档</Button>
            <Button btnType={ButtonType.Default}>Git 仓库</Button>
          </div>
        </header>

        <main
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
            gap: 24,
            alignItems: 'flex-start',
          }}
        >
          {/* 左侧：按钮 + 上传 */}
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            <div
              style={{
                padding: 24,
                borderRadius: 12,
                background: '#ffffff',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
              }}
            >
              <h2 style={{ margin: 0, marginBottom: 16, fontSize: 18 }}>Button 组件演示</h2>
              <p style={{ margin: '0 0 16px', color: '#8c8c8c', fontSize: 13 }}>
                不同类型按钮和链接按钮，适合作为页面主操作、次要操作和文本链接。
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 12,
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
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: 12,
                background: '#ffffff',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
              }}
            >
              <h2 style={{ margin: 0, marginBottom: 16, fontSize: 18 }}>Upload 组件演示</h2>
              <p style={{ margin: '0 0 16px', color: '#8c8c8c', fontSize: 13 }}>
                支持点击选择、拖拽上传、上传进度显示和文件列表管理。
              </p>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 16,
                  alignItems: 'stretch',
                }}
              >
                <Upload
                  action="https://jsonplaceholder.typicode.com/posts"
                  defaultFileList={defaultUploadList}
                >
                  <Button btnType={ButtonType.Primary}>点击上传</Button>
                </Upload>

                <Upload action="https://jsonplaceholder.typicode.com/posts" drag>
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
            </div>
          </section>

          {/* 右侧：Icon + Progress 预览 */}
          <section
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 24,
            }}
          >
            <div
              style={{
                padding: 24,
                borderRadius: 12,
                background: '#ffffff',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
              }}
            >
              <h2 style={{ margin: 0, marginBottom: 16, fontSize: 18 }}>Icon 组件演示</h2>
              <p style={{ margin: '0 0 16px', color: '#8c8c8c', fontSize: 13 }}>
                基于 Font Awesome 的图标组件，支持主题色和所有原生属性。
              </p>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 20,
                  alignItems: 'center',
                }}
              >
                <Icon icon="coffee" size="2x" />
                <Icon icon="check-circle" size="2x" theme="success" />
                <Icon icon="times" size="2x" theme="danger" />
                <Icon icon="spinner" size="2x" spin theme="primary" />
              </div>
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: 12,
                background: '#ffffff',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
              }}
            >
              <h2 style={{ margin: 0, marginBottom: 16, fontSize: 18 }}>Progress 组件演示</h2>
              <p style={{ margin: '0 0 16px', color: '#8c8c8c', fontSize: 13 }}>
                展示任务完成进度，支持不同主题颜色和高度。
              </p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                }}
              >
                <Progress percent={30} />
                <Progress percent={65} theme="success" />
                <Progress percent={90} theme="danger" strokeHeight={10} />
              </div>
            </div>

            <div
              style={{
                padding: 24,
                borderRadius: 12,
                background: '#ffffff',
                boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
              }}
            >
              <h2 style={{ margin: 0, marginBottom: 16, fontSize: 18 }}>AutoComplete 组件演示</h2>
              <p style={{ margin: '0 0 16px', color: '#8c8c8c', fontSize: 13 }}>
                输入内容自动给出候选项，支持键盘选择与自定义下拉渲染。
              </p>
              <AutoComplete
                fetchSuggestions={handleAutoCompleteFetch}
                placeholder="输入湖人队球员英文名试试（如：ja / co）"
                renderOption={(item) => {
                  const player = item as DataSourceType<LakerPlayerProps>
                  return (
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                      <b>{player.value}</b>
                      <span style={{ color: '#8c8c8c' }}>#{player.number}</span>
                    </div>
                  )
                }}
              />
            </div>
          </section>
        </main>

        {/* 传统表单方式的文件上传示例 */}
        <div
          style={{
            marginTop: 40,
            padding: 24,
            borderRadius: 12,
            background: '#ffffff',
            boxShadow: '0 8px 24px rgba(15, 23, 42, 0.06)',
          }}
        >
          <h2 style={{ margin: 0, marginBottom: 16, fontSize: 18 }}>原生表单上传示例</h2>
          <p style={{ margin: '0 0 16px', color: '#8c8c8c', fontSize: 13 }}>
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
            style={{ marginTop: 8 }}
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
              style={{
                marginLeft: 12,
                padding: '4px 12px',
                borderRadius: 4,
                border: '1px solid #1677ff',
                background: '#1677ff',
                color: '#fff',
                cursor: 'pointer',
              }}
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
