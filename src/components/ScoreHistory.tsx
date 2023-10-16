import styled from "styled-components";

interface ScoreHistoryProps {
  timeRemaining: number;
  score: number;
  highScore: number;
  disabled: boolean;
  onReset: () => void;
}

export const ScoreHistory = ({
  onReset,
  timeRemaining,
  highScore,
  score,
  disabled,
}: ScoreHistoryProps) => (
  <ScoreHistoryWrapper>
    <Box direction="column">
      <span>Remaning Time (s):</span>
      <span>{timeRemaining / 1000}</span>
    </Box>
    <RestartButton
      data-testid="reset-game"
      onClick={onReset}
      disabled={disabled}
    >
      Restart
    </RestartButton>
    <BoxContainer>
      <Box>
        <span>High score:</span>
        <span>{highScore}</span>
      </Box>
      <Box>
        <span>Score:</span>
        <span>{score}</span>
      </Box>
    </BoxContainer>
  </ScoreHistoryWrapper>
);

const ScoreHistoryWrapper = styled.div`
  display: flex;
  width: 100%;
  border-radius: var(--border-radius);
  border: 1px solid var(--border-color);
  background-color: #f5f5f5;

  > *:not(:last-child) {
    border-right: 1px solid var(--border-color);
  }
`;

const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;
  font-weight: 300;
  width: 100%;
`;

interface BoxProps {
  direction?: string;
}

const Box = styled.div<BoxProps>`
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0.2rem 0.5rem;
  font-weight: 400;
  text-align: center;

  :nth-child(2) {
    font-weight: 700;
    font-size: 1.4rem;
  }

  &:nth-child(2) {
    border-top: 1px solid var(--border-color);
  }
`;

const RestartButton = styled.button`
  width: 100%;
  padding: 0.3rem;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  background-color: var(--border-color);

  &:hover:enabled {
    background-color: #fafafa;
  }
`;
