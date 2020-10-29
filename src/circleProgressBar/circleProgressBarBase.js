import React, { useState, useEffect, useRef } from "react";
import { string, number, bool } from "prop-types";

const INITIAL_OFFSET = 25;
const circleConfig = {
  viewBox: "0 0 38 38",
  x: "19",
  y: "19",
  radio: "15.91549430918954"
};

const CircleProgressBarBase = ({
  className,
  strokeColor,
  strokeWidth,
  loadingText,
  innerText,
  legendText,
  percentage,
  trailStrokeWidth,
  trailStrokeColor,
  trailSpaced,
  speed
}) => {
  const [progressBar, setProgressBar] = useState(0);
  const timoutRef = useRef(null);
  const pace = percentage / speed;
  const updatePercentage = () => {
    timoutRef.current = setTimeout(() => {
      setProgressBar(progressBar + 1);
    }, pace);
  };

  useEffect(() => {
    if (percentage > 0) updatePercentage();
    if (percentage === 100) clearTimeout(timoutRef);
  }, [percentage]);

  useEffect(() => {
    if (progressBar < percentage) updatePercentage();
  }, [progressBar]);

  useEffect(() => {
    return () => {
      clearTimeout(timoutRef);
    };
  }, []);
  return (
    <figure className={className}>
      <svg viewBox={circleConfig.viewBox}>
        <circle
          className="donut-ring"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={trailStrokeColor}
          strokeWidth={trailStrokeWidth}
          strokeDasharray={trailSpaced ? 1 : 0}
        />

        <circle
          className="donut-segment"
          cx={circleConfig.x}
          cy={circleConfig.y}
          r={circleConfig.radio}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${progressBar} ${100 - progressBar}`}
          strokeDashoffset={INITIAL_OFFSET}
        />

        <g className="chart-text">
          <text x="50%" y="50%" className="chart-number">
            {progressBar}%
          </text>
          <text x="50%" y="50%" className="chart-label">
            {progressBar < 100 ? loadingText : innerText}
          </text>
        </g>
      </svg>
      {legendText && (
        <figcaption className="figure-key">
          <ul
            className="figure-key-list"
            aria-hidden="true"
            role="presentation"
          >
            <li>
              <span className="shape-circle" />
              <span>{legendText}</span>
            </li>
          </ul>
        </figcaption>
      )}
    </figure>
  );
};

CircleProgressBarBase.propTypes = {
  className: string.isRequired,
  strokeColor: string,
  strokeWidth: number,
  loadingText: string,
  innerText: string,
  legendText: string,
  percentage: number,
  trailStrokeWidth: number,
  trailStrokeColor: string,
  trailSpaced: bool,
  speed: number
};

CircleProgressBarBase.defaultProps = {
  strokeColor: "blueviolet",
  strokeWidth: 3,
  loadingText: "Loading...",
  innerText: "Completed",
  legendText: "",
  percentage: 0,
  trailStrokeWidth: 4,
  trailStrokeColor: "#eee",
  trailSpaced: false,
  speed: 1
};

export default CircleProgressBarBase;
