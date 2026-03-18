import type { FC } from "react";
import type { ProgressProps } from "./progress.types";

const Progress: FC<ProgressProps> = (props) => {
  const { percent, strokeHeight = 15, showText = true, styles, theme = "primary" } = props;
  return (
    <div className="viking-progress-bar" style={styles}>
      <div className="viking-progress-bar-outer" style={{ height: `${strokeHeight}px` }}>
        <div
          className={`viking-progress-bar-inner color-${theme}`}
          style={{ width: `${percent}%` }}
        >
          {showText && <span className="inner-text">{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

export default Progress;
