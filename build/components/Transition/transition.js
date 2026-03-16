import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
const Transition = (props) => {
    const { children, classNames: classNamesProp, animation, wrapper = false, unmountOnExit = true, appear = true, timeout, ...restProps } = props;
    const cls = animation ? animation : classNamesProp;
    const nodeRef = useRef(null);
    return (_jsx(CSSTransition, { nodeRef: nodeRef, classNames: cls, unmountOnExit: unmountOnExit, appear: appear, timeout: timeout, ...restProps, children: _jsx("div", { ref: nodeRef, "data-transition-wrapper": wrapper ? 'true' : 'false', children: children }) }));
};
export default Transition;
