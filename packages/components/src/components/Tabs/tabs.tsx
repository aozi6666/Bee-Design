import type { FC, FunctionComponentElement } from "react";
import { Children, useState } from "react";
import classNames from "classnames";
import TabItem from "./tabItem";
import type { TabItemProps, TabsProps } from "./tabs.types";

type TabsWithItem = FC<TabsProps> & { Item: FC<TabItemProps> };

/**
 * 选项卡切换组件。
 * 提供平级的区域将大块内容进行收纳和展现，保持界面整洁。
 * ### 引用方法
 *
 * ~~~js
 * import { Tabs } from 'vikingship'
 * ~~~
 */
const TabsBase: FC<TabsProps> = (props) => {
  const { defaultIndex = 0, className = "", onSelect, children, type = "line" } = props;
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const handleClick = (index: number, disabled: boolean | undefined) => {
    if (!disabled) {
      setActiveIndex(index);
      onSelect?.(index);
    }
  };

  const navClass = classNames("viking-tabs-nav", {
    "nav-line": type === "line",
    "nav-card": type === "card",
  });

  const renderNavLinks = () => {
    return Children.map(children, (child, index) => {
      const childElement = child as FunctionComponentElement<TabItemProps>;
      const { label, disabled } = childElement.props;
      const classes = classNames("viking-tabs-nav-item", {
        "is-active": activeIndex === index,
        disabled,
      });
      return (
        <li
          className={classes}
          key={`nav-item-${index}`}
          onClick={() => {
            handleClick(index, disabled);
          }}
        >
          {label}
        </li>
      );
    });
  };

  const renderContent = () => {
    return Children.map(children, (child, index) => {
      if (index === activeIndex) {
        return child;
      }
    });
  };

  return (
    <div className={classNames("viking-tabs", className)}>
      <ul className={navClass}>{renderNavLinks()}</ul>
      <div className="viking-tabs-content">{renderContent()}</div>
    </div>
  );
};

export const Tabs = Object.assign(TabsBase, { Item: TabItem }) as TabsWithItem;

export default Tabs;

export type { TabsProps, TabItemProps };
