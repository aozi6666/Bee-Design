import React from 'react';
import type { FC, ReactNode } from 'react';
export interface MenuItemProps {
    index?: string;
    /**选项是否被禁用 */
    disabled?: boolean;
    /**选项扩展的 className */
    className?: string;
    /**选项的自定义 style */
    style?: React.CSSProperties;
    children?: ReactNode;
}
export declare const MenuItem: FC<MenuItemProps>;
export default MenuItem;
