import styled from "styled-components";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = styled.div<ProgressBarProps>`
  position: relative;
  height: 0.6rem;
  background-color: #f5f5f5;

  &::after {
    content: "";
    display: flex;
    width: ${(props) => props.progress}%;
    height: 100%;
    background-color: #4caf50;
    transition: width 1s linear;
    background-color: 0.2s ease;
  }
`;
