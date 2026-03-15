import type { FC } from 'react';
import { type MenuProps } from './menu';
import { type SubMenuProps } from './subMenu';
import { type MenuItemProps } from './menuItem';
export type IMenuComponent = FC<MenuProps> & {
    Item: FC<MenuItemProps>;
    SubMenu: FC<SubMenuProps>;
};
declare const TransMenu: IMenuComponent;
export default TransMenu;
