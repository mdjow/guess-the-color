import { GameContextType } from "../../contexts/GameContext";

export const createMockGameContext = (): GameContextType => {
  return {
    state: {
      started: false,
      timeGameRemaining: 30000,
      currentColor: "",
      colorOptions: [],
      score: 0,
      highScore: 0,
      answers: [],
    },
    startGame: jest.fn(),
    startNewRound: jest.fn(),
    pickColor: jest.fn(),
    decrementTime: jest.fn(),
    endGame: jest.fn(),
    resetGame: jest.fn(),
    resetData: jest.fn(),
  };
};
