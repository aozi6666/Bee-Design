import React, { FC, useState, DragEvent, ReactNode } from 'react'
import classNames from 'classnames'

interface DraggerProps {
  onFile: (files: FileList) => void;
  children?: ReactNode
}

export const Dragger: FC<DraggerProps> = (props) => {
  const { onFile, children } = props
  const [ dragOver, setDragOver ] = useState(false)

  // 使用 `classNames` 拼 `className`：
  const klass = classNames('viking-uploader-dragger', {
    // 如果 `dragOver === true` 时，再加一个：`is-dragover`
    'is-dragover': dragOver
  })
  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault()
    setDragOver(false)
    console.log('inside drag', e.dataTransfer.files)
    onFile(e.dataTransfer.files)
  }
  const handleDrag = (e: DragEvent<HTMLElement>, over: boolean) => {
    e.preventDefault()
    setDragOver(over)
  }
  return (
    <div 
      className={klass}
      onDragOver={e => { handleDrag(e, true)}}
      onDragLeave={e => { handleDrag(e, false)}}
      onDrop={handleDrop}
    >
      {children}
    </div>
  )
}

export default Dragger;