import type { FC } from 'react'

// @zhangAo_换入自己写的样式文件
// import './App.css'
import './styles/index.scss'

import Button from './components/Button/button'
import {
  ButtonSize,
  ButtonType,
} from './components/Button/button.types.ts'

const App: FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <Button>Hello</Button>
        <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>
          Hello
        </Button>
        <Button btnType={ButtonType.Link} href="http://www.baidu.com">
          百度一下
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
