import { getRandomColor } from "../utils/getRandomColor";
import { shuffleArray } from "../utils/shuffleArray";
import { ScoreEnum } from "../enum/score";
import { GameState, initialState } from "./GameContext";

type GameAction =
  | { type: "START_GAME" }
  | { type: "START_NEW_ROUND" }
  | { type: "PICK_COLOR"; color: string }
  | { type: "DECREMENT_TIME" }
  | { type: "RESET_GAME" }
  | { type: "END_GAME" }
  | { type: "RESET_DATA" };

export const gameReducer = (
  state: GameState,
  action: GameAction
): GameState => {
  switch (action.type) {
    case "START_GAME": {
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
      return {
        ...state,
        timeGameRemaining: Math.max(0, state.timeGameRemaining - 1000),
      };
    case "RESET_GAME": {
      return {
        ...initialState,
        answers: [],
        highScore: state.highScore,
      };
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
      localStorage.removeItem("highScore");
      localStorage.removeItem("answers");
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
