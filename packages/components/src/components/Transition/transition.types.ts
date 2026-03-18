import type { ReactNode } from "react";
import type { CSSTransitionProps } from "react-transition-group/CSSTransition";

export type AnimationName = "zoom-in-top" | "zoom-in-left" | "zoom-in-bottom" | "zoom-in-right";

export type TransitionProps = Omit<CSSTransitionProps<HTMLElement>, "timeout"> & {
  animation?: AnimationName;
  wrapper?: boolean;
  children?: ReactNode;
  timeout: NonNullable<CSSTransitionProps<HTMLElement>["timeout"]>;
};
