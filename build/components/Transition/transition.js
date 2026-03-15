import { jsx as _jsx } from "react/jsx-runtime";
import { useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
const Transition = (props) => {
    const { children, classNames: classNamesProp, animation, wrapper = false, unmountOnExit = true, appear = true, addEndListener, ...restProps } = props;
    const cls = animation ? animation : classNamesProp;
    const nodeRef = useRef(null);
    const transitionProps = {
        classNames: cls,
        unmountOnExit,
        appear,
        ...restProps,
    };
    if (addEndListener)
        transitionProps.addEndListener = addEndListener;
    return (_jsx(CSSTransition, { nodeRef: nodeRef, ...transitionProps, children: _jsx("div", { ref: nodeRef, "data-transition-wrapper": wrapper ? 'true' : 'false', children: children }) }));
};
export default Transition;
