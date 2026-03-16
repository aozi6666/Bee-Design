import { jsx as _jsx } from "react/jsx-runtime";
import React, { useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menuContext';
/**
 * 为网站提供导航功能的菜单。支持横向纵向两种模式，支持下拉菜单。
 *
 * ```javascript
 * import { Menu } from 'vikingship'
 *
 * //然后可以使用 Menu.Item 和 Menu.Submenu 访问选项和子下拉菜单组件
 * ```
 */
export const Menu = ({ className, mode = 'horizontal', style, children, defaultIndex = '0', onSelect, defaultOpenSubMenus = [], }) => {
    const [currentActive, setActive] = useState(defaultIndex);
    const classes = classNames('viking-menu', className, {
        'menu-vertical': mode === 'vertical',
        'menu-horizontal': mode !== 'vertical',
    });
    const handleClick = (index) => {
        setActive(index);
        if (onSelect) {
            onSelect(index);
        }
    };
    const passedContext = {
        index: currentActive ? currentActive : '0',
        onSelect: handleClick,
        mode,
        defaultOpenSubMenus,
    };
    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child;
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem' || displayName === 'SubMenu') {
                return React.cloneElement(childElement, {
                    index: index.toString()
                });
            }
            else {
                console.error("Warning: Menu has a child which is not a MenuItem component");
            }
        });
    };
    return (_jsx("ul", { className: classes, style: style, "data-testid": "test-menu", children: _jsx(MenuContext.Provider, { value: passedContext, children: renderChildren() }) }));
};
export default Menu;
