import type { FC, ReactNode } from 'react';
export interface SubMenuProps {
    index?: string;
    /**下拉菜单选项的文字 */
    title: string;
    /**下拉菜单选型的扩展类名 */
    className?: string;
    children?: ReactNode;
}
export declare const SubMenu: FC<SubMenuProps>;
export default SubMenu;
