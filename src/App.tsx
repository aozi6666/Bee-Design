import type { FC } from 'react'

// @zhangAo_换入自己写的样式文件
// import './App.css'
import './styles/index.scss'

import Button from './components/Button/button'
import { ButtonType } from './components/Button/button.types.ts'

const App: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ marginBottom: 24, fontWeight: 500 }}>Button 组件演示</h1>
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
          <Button btnType={ButtonType.Link} href="#">
            Link Button
          </Button>
          <Button btnType={ButtonType.Link} href="#" target="_blank">
            Link Button("新窗口打开")
          </Button>
        </div>
      </header>
    </div>
  )
}

export default App
