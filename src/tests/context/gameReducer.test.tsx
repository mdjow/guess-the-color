import { useReducer } from "react";

import { act, renderHook } from "@testing-library/react";

import { gameReducer } from "../../contexts/GameReducer";

const initialState = {
  started: false,
  timeGameRemaining: 30000,
  currentColor: "#eeeeee",
  colorOptions: ["#######", "#######", "######"],
  score: 0,
  highScore: parseInt(localStorage.getItem("highScore") || "0"),
  answers: JSON.parse(localStorage.getItem("answers") || "[]"),
};

describe("GameProvider", () => {
  test("startGame method should set started to true and reset score and answers", () => {
    const { result } = renderHook(() => useReducer(gameReducer, initialState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: "START_GAME" });
    });

    const [state] = result.current;
    expect(state.started).toBe(true);
    expect(state.score).toBe(0);
    expect(state.answers).toEqual([]);
  });

  test("startNewRound method should change currentColor and colorOptions", () => {
    const { result } = renderHook(() => useReducer(gameReducer, initialState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: "START_NEW_ROUND" });
    });

    const [state] = result.current;
    expect(state.currentColor).not.toBeNull();
    expect(state.colorOptions).toHaveLength(3);
  });

  test("pickColor method should update score and answers based on the picked color", () => {
    const { result } = renderHook(() => useReducer(gameReducer, initialState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: "PICK_COLOR", color: "#eeeeee" }); // score 5
      dispatch({ type: "PICK_COLOR", color: "#681313" }); // score 4
      dispatch({ type: "PICK_COLOR", color: "" }); // score 2
    });

    const [state] = result.current;

    expect(state.score).toBe(2);
    expect(state.answers.length).toBe(3);
  });

  test("decrementTime method should decrease timeGameRemaining by 1000 milliseconds", () => {
    const { result } = renderHook(() => useReducer(gameReducer, initialState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: "DECREMENT_TIME" });
    });

    const [state] = result.current;

    expect(state.timeGameRemaining).toBe(29000);
  });

  test("resetGame method should reset the game state except for highScore", () => {
    const { result } = renderHook(() => useReducer(gameReducer, initialState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: "RESET_GAME" });
    });

    const [state] = result.current;

    expect(state.started).toBe(false);
    expect(state.score).toBe(0);
    expect(state.answers).toEqual([]);
    expect(state.currentColor).toBe("#eeeeee");
    expect(state.colorOptions).toEqual(["#######", "#######", "######"]);
  });

  test("endGame method should update highScore and answers in localStorage", () => {
    const { result } = renderHook(() => useReducer(gameReducer, initialState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: "END_GAME" });
    });

    const [state] = result.current;

    expect(state.started).toBe(false);

    expect(localStorage.getItem("highScore")).toEqual(
      state.highScore.toString()
    );
    expect(localStorage.getItem("answers")).toEqual(
      JSON.stringify(state.answers)
    );
  });

  test("resetData method should remove highScore and answers from localStorage", () => {
    localStorage.setItem("highScore", "100");
    localStorage.setItem(
      "answers",
      JSON.stringify([{ pick: "#ffffff", color: "#ffffff", score: 1 }])
    );

    const { result } = renderHook(() => useReducer(gameReducer, initialState));
    const [, dispatch] = result.current;

    act(() => {
      dispatch({ type: "RESET_DATA" });
    });

    const [state] = result.current;

    expect(state).toStrictEqual(initialState);

    expect(localStorage.getItem("highScore")).toBeNull();
    expect(localStorage.getItem("answers")).toBeNull();
  });
});
