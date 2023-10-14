import styled from "styled-components";

type ScoreHistoryProps = {
  timeRemaining: number;
  score: number;
  highScore: number;
  onReset: () => void;
};

export const ScoreHistory = (props: ScoreHistoryProps) => (
  <ScoreHistoryWrapper>
    <BoxRow>
      <span>Remaning Time (s):</span>
      <span>{props.timeRemaining}</span>
    </BoxRow>
    <RestartButton onClick={props.onReset}>Restart</RestartButton>
    <BoxColumn>
      <BoxRow>
        <span>High score:</span>
        <span>{props.highScore}</span>
      </BoxRow>
      <BoxRow>
        <span>Score:</span>
        <span>{props.score}</span>
      </BoxRow>
    </BoxColumn>
  </ScoreHistoryWrapper>
);

const ScoreHistoryWrapper = styled.div`
  display: flex;
  width: 100%;
  background-color: #f5f5f5;
  border: 1px solid #e0e0e0;
  border-radius: 0.2rem;

  > *:not(:last-child) {
    border-right: 1px solid #e0e0e0;
  }
`;

const BoxColumn = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 300;
  width: 100%;
`;

const BoxRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;

  width: 100%;
  padding: 0.2rem 0.5rem;
  font-weight: 400;

  :nth-child(2) {
    font-weight: 700;
    font-size: 1.4rem;
  }

  &:nth-child(2) {
    border-top: 1px solid #e0e0e0;
  }
`;

const RestartButton = styled.button`
  width: 100%;
  padding: 0.3rem;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  background-color: #e0e0e0;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
