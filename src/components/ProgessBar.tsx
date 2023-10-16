import styled from "styled-components";

interface ProgressBarProps {
  progress: number;
}

export const ProgressBar = styled.div<ProgressBarProps>`
  height: 0.6rem;
  border-radius: var(--border-radius);
  background-color: #f5f5f5;

  &::after {
    content: "";
    display: flex;
    width: ${(props) => props.progress}%;
    height: 100%;
    background-color: ${(props) => {
      if (props.progress < 10) {
        return "#f44336";
      }
      if (props.progress < 40) {
        return "#ffeb3b";
      }
      return "#4caf50";
    }};
    transition: width 1s linear;
    border-radius: var(--border-radius);
  }
`;
