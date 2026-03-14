// React 组件组合模式（Compound Component Pattern）
import type { FC } from 'react'
import Menu, { type MenuProps } from './menu'
import SubMenu, { type SubMenuProps } from './subMenu'
import MenuItem, { type MenuItemProps } from './menuItem'

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>,
  SubMenu: FC<SubMenuProps>
}
const TransMenu = Menu as IMenuComponent

TransMenu.Item = MenuItem
TransMenu.SubMenu = SubMenu

export default TransMenu;