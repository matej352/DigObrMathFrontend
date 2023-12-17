import styled from "styled-components";

type ProgressBarProps = {
  progress: number;
};

const getProgressColor = (progress: number) => {
  if (progress < 50) {
    return "red";
  }
  if (progress < 80) {
    return "orange";
  }
  return "green";
};

export const ProgressBar = styled.div<ProgressBarProps>`
  border-radius: 8px;
  background-color: #e0e0e0;
  width: 212px;
  height: 5px;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 8px;
    border-radius: 8px;
    background-color: ${({ progress }) => getProgressColor(progress)};
    width: ${({ progress }) => progress}%;
  }
`;
