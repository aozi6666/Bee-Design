import { jsx as _jsx } from "react/jsx-runtime";
const Progress = (props) => {
    const { percent, strokeHeight = 15, showText = true, styles, theme = 'primary', } = props;
    return (_jsx("div", { className: "viking-progress-bar", style: styles, children: _jsx("div", { className: "viking-progress-bar-outer", style: { height: `${strokeHeight}px` }, children: _jsx("div", { className: `viking-progress-bar-inner color-${theme}`, style: { width: `${percent}%` }, children: showText && _jsx("span", { className: "inner-text", children: `${percent}%` }) }) }) }));
};
export default Progress;
