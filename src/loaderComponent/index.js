import React, { memo, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { render, unmountComponentAtNode } from "react-dom";
import CircleProgressBar from "../circleProgressBar/circleProgressBar";

const PercentLoaderStyled = styled.div`
  /* left: 0; */
  /* top: 0; */
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  background-clip: padding-box;
  /* position: fixed; */
  overflow: hidden;
  width: 100%;
  height: 200px;
  z-index: 999999;
`;

const PercentLoader = memo(({ targetId, percentage, speed }) => {
  const onUnmountComponent = useCallback(() => {
    unmountComponentAtNode(document.getElementById(targetId));
  }, [targetId]);

  useEffect(() => {
    return () => {
      onUnmountComponent();
    };
  }, [onUnmountComponent]);

  useEffect(() => {
    if (percentage === 100) {
      onUnmountComponent();
    }
  }, [percentage, onUnmountComponent]);

  return (
    <PercentLoaderStyled>
      <CircleProgressBar percentage={percentage} speed={speed} />
    </PercentLoaderStyled>
  );
});

PercentLoader.propTypes = {
  percentage: PropTypes.number,
  speed: PropTypes.number,
  targetId: PropTypes.string
};

const percentLoader = {
  close: (id) => {
    const comId = id || "percent-container";
    const doc = document.getElementById(comId);
    if (doc) unmountComponentAtNode(doc);
  },
  open: ({ children, percentage, speed, options }) => {
    const targetId = "percent-container";
    const speedData = speed || 50;
    return render(
      <PercentLoader
        targetId={targetId}
        percentage={percentage}
        speed={speedData}
      >
        {children}
      </PercentLoader>,
      document.getElementById(targetId)
    );
  }
};
export const LoaderPercentProgressContainer = ({ id }) => (
  <div id={id || "percent-container"} className="percent-container" />
);

LoaderPercentProgressContainer.propTypes = {
  id: PropTypes.string
};

export default percentLoader;
