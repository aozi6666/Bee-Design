import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import classNames from 'classnames';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
export const AutoCompleteDropdown = (props) => {
    const { loading, showDropdown, suggestions, highlightIndex, onSelect, renderOption, onExited, } = props;
    const renderTemplate = (item) => {
        return renderOption ? renderOption(item) : item.value;
    };
    return (_jsx(Transition, { in: showDropdown || loading, animation: "zoom-in-top", timeout: 300, onExited: onExited, children: _jsxs("ul", { className: "viking-suggestion-list", children: [loading && (_jsx("div", { className: "suggestions-loading-icon", children: _jsx(Icon, { icon: "spinner", spin: true }) })), suggestions.map((item, index) => {
                    const cnames = classNames('suggestion-item', {
                        'is-active': index === highlightIndex,
                    });
                    return (_jsx("li", { className: cnames, onClick: () => onSelect(item), children: renderTemplate(item) }, index));
                })] }) }));
};
export default AutoCompleteDropdown;
