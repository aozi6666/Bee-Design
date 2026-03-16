import { jsx as _jsx } from "react/jsx-runtime";
import React, { useContext } from 'react';
import classNames from 'classnames';
import { MenuContext } from './menuContext';
export const MenuItem = (props) => {
    const { index, disabled, className, style, children } = props;
    const context = useContext(MenuContext);
    const classes = classNames('menu-item', className, {
        'is-disabled': disabled,
        'is-active': context.index === index
    });
    const handleClick = () => {
        if (context.onSelect && !disabled && (typeof index === 'string')) {
            context.onSelect(index);
        }
    };
    return (_jsx("li", { className: classes, style: style, onClick: handleClick, children: children }));
};
MenuItem.displayName = 'MenuItem';
export default MenuItem;
