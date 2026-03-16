import axios from 'axios'
import { render, fireEvent, waitFor } from '@testing-library/react'
import type { RenderResult } from '@testing-library/react'

import { Upload } from './upload'
import type { UploadProps } from './upload'

// 测试环境准备
// 1. mock axios请求
jest.mock('../Icon/icon', () => {
  return (props: { onClick?: () => void; icon?: React.ReactNode }) => {
    return <span onClick={props.onClick}>{props.icon}</span>
  }
})
jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

// Upload 组件测试
// 1) 用到的 props
const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true
}
let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement

// testFile: 测试文件(模拟一个用户选择的文件)
const testFile = new File(['xyz'], 'test.png', {type: 'image/png'})


describe('测试 Upload 组件', () => {
  // beforeEach: 每个测试前都 重新创建组件
  beforeEach(() => {
    // 渲染 Upload 组件
    wrapper = render(<Upload {...testProps}>点击上传</Upload>)
    // 获取 <input type="file"> 输入框
    fileInput = wrapper.container.querySelector('.viking-file-input') as HTMLInputElement
    // 获取上传区域(通过拖拽区域的 class)
    uploadArea = wrapper.container.querySelector('.viking-uploader-dragger') as HTMLElement
  })
  it('1.普通上传流程应正常工作', async () => {
    const { queryByText, getByText } = wrapper
    // 模拟 axios post 请求成功,返回 Promise.resolve({ data: "cool" })
    mockedAxios.post.mockResolvedValue({'data': 'cool'})
    // 上传区域存在
    expect(uploadArea).toBeInTheDocument()
    // 确认 input 是隐藏的： 点击按钮 → 触发隐藏 input
    expect(fileInput).not.toBeVisible()

    // 模拟用户选择文件： <input type="file">
    fireEvent.change(fileInput, { target: { files: [testFile ]}})
    // 确认 spinner 图标出现： 检查 上传中 状态
    expect(queryByText('spinner')).toBeInTheDocument()
    // 等待上传完成
    await waitFor(() => {
      expect(queryByText('test.png')).toBeInTheDocument()
      expect(queryByText('check-circle')).toBeInTheDocument()
    })
    // 验证 onSuccess 是否被调用
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png'
    }))
    // 验证 onChange
    expect(testProps.onChange).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png'
    }))

    //测试删除功能
    expect(queryByText('times')).toBeInTheDocument()
    // 模拟用户点击： 删除按钮
    fireEvent.click(getByText('times'))
    // 检查 文件从列表移除
    expect(queryByText('test.png')).not.toBeInTheDocument()
    // 验证 onRemove 是否被调用
    expect(testProps.onRemove).toHaveBeenCalledWith(expect.objectContaining({
      raw: testFile,
      status: 'success',
      name: 'test.png'
    }))
  })
  it('2.拖拽上传流程应正常工作', async () => {
    mockedAxios.post.mockResolvedValue({'data': 'cool'})
    // 模拟用户 拖拽文件 进入区域
    fireEvent.dragOver(uploadArea)
    // 验证 拖拽样式 生效
    expect(uploadArea).toHaveClass('is-dragover')

    // 用户拖拽 离开区域
    fireEvent.dragLeave(uploadArea)
    // 验证 拖拽样式 移除，样式恢复
    expect(uploadArea).not.toHaveClass('is-dragover')
   
    // 模拟用户 拖拽的文件 松手放下文件
    fireEvent.drop(uploadArea, {
      // 浏览器真实行为： 浏览器真实行为
      dataTransfer: {
        files: [testFile]
      }
    })
    // 等待上传完成
    await waitFor(() => {
      // 文件成功上传并显示
      expect(wrapper.queryByText('test.png')).toBeInTheDocument()
    })
    expect(testProps.onSuccess).toHaveBeenCalledWith('cool', expect.objectContaining({
      raw: testFile,
      status: 'success',
      response: 'cool',
      name: 'test.png'
    }))
  })
})