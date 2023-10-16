import { ReactNode, createContext, useReducer } from "react";

import { getRandomColor } from "../utils/getRandomColor";
import { shuffleArray } from "../utils/shuffleArray";
import { ScoreEnum } from "../enum/score";

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
  startGame?: () => void;
  startNewRound?: () => void;
  pickColor?: (color: string) => void;
  decrementTime?: () => void;
  endGame?: () => void;
  resetGame?: () => void;
  resetData?: () => void;
}

const initialState: GameState = {
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

type GameAction =
  | { type: "START_GAME" }
  | { type: "START_NEW_ROUND" }
  | { type: "PICK_COLOR"; color: string }
  | { type: "DECREMENT_TIME" }
  | { type: "RESET_GAME" }
  | { type: "END_GAME" }
  | { type: "RESET_DATA" };

const clearLocalStorage = () => {
  localStorage.removeItem("highScore");
  localStorage.removeItem("answers");
};

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case "START_GAME": {
      clearLocalStorage();
      return {
        ...state,
        answers: [],
        started: true,
        score: 0,
      };
    }
    case "START_NEW_ROUND": {
      const currentColor = getRandomColor();

      return {
        ...state,
        currentColor,
        colorOptions: shuffleArray([
          currentColor,
          getRandomColor(),
          getRandomColor(),
        ]),
      };
    }
    case "PICK_COLOR": {
      const { currentColor, score } = state;
      const { color: pickedColor } = action;

      let roundScore = 0;

      if (!pickedColor) {
        roundScore = ScoreEnum.TIME_OUT;
      } else if (currentColor === pickedColor) {
        roundScore = ScoreEnum.SUCCESS;
      } else {
        roundScore = ScoreEnum.ERROR;
      }

      return {
        ...state,
        score: Math.max(0, score + roundScore),
        answers: [
          { pick: pickedColor, color: currentColor, score: roundScore },
          ...state.answers,
        ],
      };
    }
    case "DECREMENT_TIME":
      if (state.timeGameRemaining > 0) {
        return {
          ...state,
          timeGameRemaining: state.timeGameRemaining - 1000,
        };
      }

      return {
        ...state,
        timeGameRemaining: 0,
      };
    case "RESET_GAME": {
      return { ...initialState };
    }
    case "END_GAME": {
      const { highScore, score, answers } = state;
      const highScoreFinal = Math.max(highScore, score);

      localStorage.setItem("highScore", highScoreFinal.toString());
      localStorage.setItem("answers", JSON.stringify(answers));

      return {
        ...initialState,
        started: false,
        answers,
        score,
        highScore: highScoreFinal,
      };
    }
    case "RESET_DATA":
      clearLocalStorage;
      return {
        ...initialState,
        started: false,
        answers: [],
        score: 0,
        highScore: 0,
      };
    default:
      return state;
  }
};
