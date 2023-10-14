import styled from "styled-components";

import { ColorOptions } from "./ColorOptions";
import { ColorPreview } from "./ColorPreview";
import { ProgressBar } from "./ProgessBar";
import { ScoreHistory } from "./ScoreHistory";

export const Game = () => {
  return (
    <GameWrapper>
      <Title>Guess the color</Title>
      <ScoreHistory
        timeRemaining={13}
        score={13}
        highScore={13}
        onReset={() => {}}
      />
      <div>
        <ProgressBar progress={50} />
        <ColorPreview color={"#FFBA5C"} onStart={() => {}} started={false} />
      </div>
      <ColorOptions
        options={["#FFF55C", "#AF85C", "#FFBA5C"]}
        onSelect={() => {}}
      />
      <ResetDataButton onClick={() => {}}>Reset all data</ResetDataButton>
    </GameWrapper>
  );
};

const GameWrapper = styled.main`
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 1.5rem;
  width: 25rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 800;
  text-align: center;
`;

const ResetDataButton = styled.a`
  position: absolute;
  bottom: 1rem;
  right: 1rem;

  text-decoration: underline;
  cursor: pointer;
`;
