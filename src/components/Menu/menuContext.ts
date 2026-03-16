import { createContext } from 'react'

type MenuMode = 'horizontal' | 'vertical'

export interface IMenuContext {
  index: string
  onSelect?: (selectedIndex: string) => void
  mode?: MenuMode
  defaultOpenSubMenus?: string[]
}

export const MenuContext = createContext<IMenuContext>({ index: '0' })

