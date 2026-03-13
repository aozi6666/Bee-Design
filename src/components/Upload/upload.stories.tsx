import React from 'react'
import type { Meta, StoryFn } from '@storybook/react-vite'
import { Upload } from './upload'
import Button from '../Button/button'
import Icon from '../Icon/icon'

// Meta = storybook 组件说明的类型
// typeof Upload：Upload 这个组件函数的类型
// Meta<typeof Upload>：Upload 组件的 storybook meta 类型
const meta = {
  title: 'Upload（文件选择上传+拖拽）',
  id: 'Upload',
  component: Upload,
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} satisfies Meta<typeof Upload>

export default meta

// 用 Template 复用渲染逻辑，再用 bind({}) 生成具体 story
// args : 组件默认 props
const Template: StoryFn<typeof Upload> = (args) => <Upload {...args} />

// 1. 普通上传
export const ASimpleUpload = Template.bind({})
ASimpleUpload.args = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  children: (
    <Button size="lg" btnType="primary">
      <Icon icon="upload" />
      点击上传
    </Button>
  ),
}
ASimpleUpload.storyName = '普通的 Upload 组件'

// 2. 上传前检查文件大小
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    alert('file too big')
    return false
  }
  return true
}

export const BCheckUpload = Template.bind({})
BCheckUpload.args = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  beforeUpload: checkFileSize,
  children: (
    <Button size="lg" btnType="primary">
      <Icon icon="upload" /> 不能传大于50Kb！
    </Button>
  ),
}
BCheckUpload.storyName = '上传前检查文件大小'

// 3. 拖拽上传
export const CDragUpload = Template.bind({})
CDragUpload.args = {
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  name: 'fileName',
  multiple: true,
  drag: true,
  children: (
    <>
      <Icon icon="upload" size="5x" theme="secondary" />
      <br />
      <p>点击或者拖动到此区域进行上传</p>
    </>
  ),
}
CDragUpload.storyName = '拖动上传'
