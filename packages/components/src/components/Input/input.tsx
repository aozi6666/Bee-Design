import { useMemo } from "react";
import type { ChangeEvent, FC, InputHTMLAttributes } from "react";
import classNames from "classnames";
import Icon from "../Icon/icon";
import type { InputProps } from "./input.types";
export type { InputProps, InputSize } from "./input.types";

export const Input: FC<InputProps> = (props) => {
  const { disabled, size, icon, prepend, append, style, onChange, ...restProps } = props;

  const classes = useMemo(
    () =>
      classNames("viking-input-wrapper", {
        [`input-size-${size}`]: size,
        "input-group": prepend || append,
        "input-group-prepend": !!prepend,
        "input-group-append": !!append,
      }),
    [append, prepend, size],
  );

  const inputClasses = classNames("viking-input-inner", {
    "is-disabled": disabled,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
  };

  const renderPrepend = () => {
    if (!prepend) return null;
    return <div className="viking-input-group-prepend">{prepend}</div>;
  };

  const renderAppend = () => {
    if (!append && !icon) return null;
    return (
      <div className="viking-input-group-append">
        {append}
        {icon ? (
          <div className="icon-wrapper">
            <Icon icon={icon} />
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <div className={classes} style={style}>
      {renderPrepend()}
      <input
        className={inputClasses}
        disabled={disabled}
        onChange={handleChange}
        {...(restProps as InputHTMLAttributes<HTMLInputElement>)}
      />
      {renderAppend()}
    </div>
  );
};

export default Input;
