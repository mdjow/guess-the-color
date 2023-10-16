/* eslint-disable react-refresh/only-export-components */
import { ReactNode, createContext, useReducer } from "react";

import { gameReducer } from "./gameReducer";

const TIME_GAME_REMAINING = 30000;

export interface GameAnswer {
  pick: string;
  color: string;
  score: number;
}

export interface GameState {
  started: boolean;
  timeGameRemaining: number;
  currentColor: string;
  colorOptions: string[];
  score: number;
  highScore: number;
  answers: GameAnswer[];
}

export interface GameContextType {
  state: GameState;
  startGame: () => void;
  startNewRound: () => void;
  pickColor: (color: string) => void;
  decrementTime: () => void;
  endGame: () => void;
  resetGame: () => void;
  resetData: () => void;
}

export const initialState: GameState = {
  started: false,
  timeGameRemaining: TIME_GAME_REMAINING,
  currentColor: "#eeeeee",
  colorOptions: ["#######", "#######", "######"],
  score: 0,
  highScore: parseInt(localStorage.getItem("highScore") || "0"),
  answers: JSON.parse(localStorage.getItem("answers") || "[]"),
};

export const GameContext = createContext<GameContextType>({
  state: initialState,
  startGame: () => {
    throw new Error("not Implemented");
  },
  startNewRound: () => {
    throw new Error("not Implemented");
  },
  pickColor: () => {
    throw new Error("not Implemented");
  },
  decrementTime: () => {
    throw new Error("not Implemented");
  },
  endGame: () => {
    throw new Error("not Implemented");
  },
  resetGame: () => {
    throw new Error("not Implemented");
  },
  resetData: () => {
    throw new Error("not Implemented");
  },
});

export const GameProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const startGame = () => {
    dispatch({ type: "START_GAME" });
    dispatch({ type: "START_NEW_ROUND" });
  };

  const startNewRound = () => {
    dispatch({ type: "START_NEW_ROUND" });
  };

  const pickColor = (color: string) => {
    dispatch({ type: "PICK_COLOR", color });
    dispatch({ type: "START_NEW_ROUND" });
  };

  const decrementTime = () => {
    dispatch({ type: "DECREMENT_TIME" });
  };

  const resetGame = () => {
    dispatch({ type: "RESET_GAME" });
  };

  const endGame = () => {
    dispatch({ type: "END_GAME" });
  };

  const resetData = () => {
    dispatch({ type: "RESET_DATA" });
  };

  return (
    <GameContext.Provider
      value={{
        state,
        startGame,
        startNewRound,
        pickColor,
        decrementTime,
        endGame,
        resetGame,
        resetData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
