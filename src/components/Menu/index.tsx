/* 
  导出增强版 Menu
    - 之前使用：
      <MenuItem/>
      <SubMenu/>
    - 修改后：
      <Menu.Item/>
      <Menu.SubMenu/>
*/
// React 组件组合模式（Compound Component Pattern）
import type { FC } from 'react'
import Menu, { type MenuProps } from './menu'
import SubMenu, { type SubMenuProps } from './subMenu'
import MenuItem, { type MenuItemProps } from './menuItem'

// 定义 组合组件类型
/* IMenuComponent = 一个 React 组件 +带两个静态属性（Item、SubMenu）*/
export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>,
  SubMenu: FC<SubMenuProps>
}
// Menu 做类型转换
const TransMenu = Menu as IMenuComponent

// 把子组件挂到 Menu 上
TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu; 0