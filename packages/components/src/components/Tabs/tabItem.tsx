import type { FC } from "react";
import type { TabItemProps } from "./tabs.types";

export const TabItem: FC<TabItemProps> = ({ children }) => {
  return <div className="viking-tab-panel">{children}</div>;
};

export default TabItem;
