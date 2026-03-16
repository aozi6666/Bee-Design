import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useContext, useState } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menuContext';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
export const SubMenu = ({ index, title, children, className }) => {
    const context = useContext(MenuContext);
    const openedSubMenus = (context.defaultOpenSubMenus ?? []);
    const isOpend = (index && context.mode === 'vertical') ? openedSubMenus.includes(index) : false;
    const [menuOpen, setOpen] = useState(isOpend);
    const classes = classNames('menu-item submenu-item', className, {
        'is-active': context.index === index,
        'is-opened': menuOpen,
        'is-vertical': context.mode === 'vertical'
    });
    const handleClick = (e) => {
        e.preventDefault();
        setOpen(!menuOpen);
    };
    let timer;
    const handleMouse = (e, toggle) => {
        if (timer)
            clearTimeout(timer);
        e.preventDefault();
        timer = setTimeout(() => {
            setOpen(toggle);
        }, 300);
    };
    const clickEvents = context.mode === 'vertical' ? {
        onClick: handleClick
    } : {};
    const hoverEvents = context.mode !== 'vertical' ? {
        onMouseEnter: (e) => { handleMouse(e, true); },
        onMouseLeave: (e) => { handleMouse(e, false); }
    } : {};
    const renderChildren = () => {
        const subMenuClasses = classNames('viking-submenu', {
            'menu-opened': menuOpen
        });
        const childrenComponent = React.Children.map(children, (child, i) => {
            const childElement = child;
            if (childElement.type.displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index: `${index}-${i}`
                });
            }
            else {
                console.error("Warning: SubMenu has a child which is not a MenuItem component");
            }
        });
        return (_jsx(Transition, { in: menuOpen, timeout: 300, animation: "zoom-in-top", children: _jsx("ul", { className: subMenuClasses, children: childrenComponent }) }));
    };
    return (_jsxs("li", { className: classes, ...hoverEvents, children: [_jsxs("div", { className: "submenu-title", ...clickEvents, children: [title, _jsx(Icon, { icon: "angle-down", className: "arrow-icon" })] }), renderChildren()] }, index));
};
SubMenu.displayName = 'SubMenu';
export default SubMenu;
