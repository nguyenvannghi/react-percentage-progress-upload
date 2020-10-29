import styled from "styled-components";
import { string } from "prop-types";

import CircleProgressBarBase from "./circleProgressBarBase";

const CircleProgressBar = styled(CircleProgressBarBase)`
  max-width: ${(props) => props.maxSize};
  vertical-align: middle;
  margin: 0 auto;
  padding-top: 40px;
  .chart-text {
    fill: ${(props) => props.textColor};
    transform: translateY(0.25em);
  }

  .chart-number {
    font-size: 0.6em;
    line-height: 1;
    text-anchor: middle;
    transform: translateY(-0.25em);
  }
  .chart-label {
    font-size: 0.2em;
    text-transform: uppercase;
    text-anchor: middle;
    transform: translateY(0.7em);
  }
  .figure-key [class*="shape-"] {
    margin-right: 8px;
  }
  .figure-key-list {
    list-style: none;
    display: flex;
    justify-content: space-between;
  }
  .figure-key-list li {
    margin: 5px auto;
  }
  .shape-circle {
    display: inline-block;
    vertical-align: middle;
    width: 21px;
    height: 21px;
    border-radius: 50%;
    background-color: ${(props) => props.strokeColor};
    text-transform: capitalize;
  }
`;

CircleProgressBar.propTypes = {
  textColor: string,
  strokeColor: string,
  maxSize: string
};

CircleProgressBar.defaultProps = {
  textColor: "black",
  strokeColor: "#ff9f00",
  maxSize: "150px"
};

export default CircleProgressBar;
