import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMemo } from 'react';
import classNames from 'classnames';
import Icon from '../Icon/icon';
export const Input = (props) => {
    const { disabled, size, icon, prepend, append, style, onChange, ...restProps } = props;
    const classes = useMemo(() => classNames('viking-input-wrapper', {
        [`input-size-${size}`]: size,
        'input-group': prepend || append,
        'input-group-prepend': !!prepend,
        'input-group-append': !!append,
    }), [append, prepend, size]);
    const inputClasses = classNames('viking-input-inner', {
        'is-disabled': disabled,
    });
    const handleChange = (e) => {
        if (onChange)
            onChange(e);
    };
    const renderPrepend = () => {
        if (!prepend)
            return null;
        return _jsx("div", { className: "viking-input-group-prepend", children: prepend });
    };
    const renderAppend = () => {
        if (!append && !icon)
            return null;
        return (_jsxs("div", { className: "viking-input-group-append", children: [append, icon ? (_jsx("div", { className: "icon-wrapper", children: _jsx(Icon, { icon: icon }) })) : null] }));
    };
    return (_jsxs("div", { className: classes, style: style, children: [renderPrepend(), _jsx("input", { className: inputClasses, disabled: disabled, onChange: handleChange, ...restProps }), renderAppend()] }));
};
export default Input;
