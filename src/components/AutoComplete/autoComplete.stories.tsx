import React from 'react'
import type { Meta, StoryFn } from '@storybook/react-vite'
import { AutoComplete } from './autoComplete'
import type { DataSourceType } from './autoComplete.types'

interface LakerPlayerProps {
  value: string
  number: number
}
interface GithubUserProps {
  login: string
  url: string
  avatar_url: string
}

const meta = {
  title: 'AutoComplete 组件',
  component: AutoComplete,
  id: 'AutoComplete',
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
} satisfies Meta<typeof AutoComplete>

export default meta

const Template: StoryFn<typeof AutoComplete> = (args) => <AutoComplete {...args} />

const lakers = [
  'bradley', 'pope', 'caruso', 'cook', 'cousins',
  'james', 'AD', 'green', 'howard', 'kuzma', 'McGee', 'rando'
]
const handleFetchSimple = (query: string) => {
  return lakers.filter(name => name.includes(query)).map(name => ({ value: name }))
}

export const ASimpleComplete = Template.bind({})
ASimpleComplete.args = {
  fetchSuggestions: handleFetchSimple,
  placeholder: '输入湖人队球员英文名试试',
}
ASimpleComplete.storyName = '1 基本的搜索'

const lakersWithNumber = [
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
const handleFetchCustom = (query: string) => {
  return lakersWithNumber.filter(player => player.value.includes(query))
}
const renderOptionCustom = (item: DataSourceType) => {
  const itemWithNumber = item as DataSourceType<LakerPlayerProps>
  return (
    <>
      <b>名字: {itemWithNumber.value}</b>
      <span>球衣号码: {itemWithNumber.number}</span>
    </>
  )
}

export const BCustomComplete = Template.bind({})
BCustomComplete.args = {
  fetchSuggestions: handleFetchCustom,
  placeholder: '输入湖人队球员英文,自定义下拉模版',
  renderOption: renderOptionCustom,
}
BCustomComplete.storyName = '2 自定义搜索结果模版'

const handleFetchAjax = (query: string) => {
  return fetch(`https://api.github.com/search/users?q=${query}`)
    .then(res => res.json())
    .then((data: { items: GithubUserProps[] }) => {
      return data.items.slice(0, 10).map((item) => ({ value: item.login, ...item }))
    })
}
const renderOptionAjax = (item: DataSourceType) => {
  const itemWithGithub = item as DataSourceType<GithubUserProps>
  return (
    <>
      <b>Name: {itemWithGithub.value}</b>
      <span>url: {itemWithGithub.url}</span>
    </>
  )
}

export const CAjaxComplete = Template.bind({})
CAjaxComplete.args = {
  fetchSuggestions: handleFetchAjax,
  placeholder: '输入 Github 用户名试试',
  renderOption: renderOptionAjax,
}
CAjaxComplete.storyName = '3 支持异步搜索'
