import { useContext, useEffect, useRef } from "react";

import styled from "styled-components";

import { ColorOptions } from "./ColorOptions";
import { ColorPreview } from "./ColorPreview";
import { ProgressBar } from "./ProgessBar";
import { ScoreHistory } from "./ScoreHistory";
import { GameContext } from "../contexts/GameContext";

const TIME_ANSWER_REMAINING = 10000;

export const Game = () => {
  const {
    state,
    startGame,
    resetData,
    resetGame,
    pickColor,
    decrementTime,
    endGame,
  } = useContext(GameContext);

  const {
    started,
    score,
    highScore,
    currentColor,
    colorOptions,
    timeGameRemaining,
  } = state;

  const timerGameRef = useRef<NodeJS.Timeout>();
  const timerAnswerRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (timeGameRemaining === 0) {
      clearInterval(timerGameRef.current);
      clearInterval(timerAnswerRef.current);
      endGame();
    }
  }, [endGame, timeGameRemaining]);

  const setTimerAnswerInterval = () => {
    if (timerAnswerRef.current) {
      clearInterval(timerAnswerRef.current);
    }

    timerAnswerRef.current = setInterval(
      () => pickColor(""),
      TIME_ANSWER_REMAINING
    );
  };

  const handleStartGame = () => {
    startGame();

    timerGameRef.current = setInterval(() => {
      decrementTime();
    }, 1000);

    setTimerAnswerInterval();
  };

  const handleResetGame = () => {
    clearInterval(timerGameRef.current);
    clearInterval(timerAnswerRef.current);

    resetGame();
  };

  const handleResetData = () => {
    clearInterval(timerGameRef.current);
    clearInterval(timerAnswerRef.current);

    resetData();
  };

  const handlePickColor = (color: string) => {
    setTimerAnswerInterval();

    pickColor(color);
  };

  return (
    <GameWrapper>
      <Title>Guess the color</Title>
      <ScoreHistory
        timeRemaining={timeGameRemaining}
        score={score}
        highScore={highScore}
        disabled={!started}
        onReset={handleResetGame}
      />
      <ProgressBar progress={timeGameRemaining / 300} />
      <ColorPreview
        color={currentColor}
        onStart={handleStartGame}
        started={started}
      />
      <ColorOptions
        options={colorOptions}
        disabled={!started}
        onSelect={handlePickColor}
      />
      <ResetDataButton data-testid="reset-all-data" onClick={handleResetData}>
        Reset all data
      </ResetDataButton>
    </GameWrapper>
  );
};

const GameWrapper = styled.main`
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 1.3rem;
  width: 40rem;
  padding: 3rem;
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
  cursor: pointer;
  text-decoration: underline;
`;
