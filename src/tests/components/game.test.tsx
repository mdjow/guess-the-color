import { render, fireEvent } from "@testing-library/react";

import { Game } from "../../components/Game";
import { GameContext } from "../../contexts/GameContext";
import { createMockGameContext } from "../mocks/game.mock";

const mockContext = createMockGameContext();

afterEach(() => {
  jest.clearAllMocks();
});

describe("Game component", () => {
  test("handleStartGame should call startGame and set timers", () => {
    const setIntervalSpy = jest.spyOn(global, "setInterval");
    const { getByTestId } = render(
      <GameContext.Provider value={{ ...mockContext }}>
        <Game />
      </GameContext.Provider>
    );

    fireEvent.click(getByTestId("start-button"));

    expect(mockContext.startGame).toHaveBeenCalled();
    expect(setIntervalSpy).toHaveBeenCalledTimes(2);
  });

  test("handleResetGame should call resetGame and clear timers", () => {
    const mock = {
      ...mockContext,
      state: {
        ...mockContext.state,
        started: true,
      },
    };

    const clearIntervalSpy = jest.spyOn(global, "clearInterval");
    const { getByTestId } = render(
      <GameContext.Provider value={{ ...mock }}>
        <Game />
      </GameContext.Provider>
    );

    fireEvent.click(getByTestId("reset-game"));

    expect(mock.resetGame).toHaveBeenCalled();
    expect(clearIntervalSpy).toHaveBeenCalledTimes(2);
  });

  test("handleResetData should call resetData and clear timers", () => {
    const clearIntervalSpy = jest.spyOn(global, "clearInterval");
    const { getByTestId } = render(
      <GameContext.Provider value={{ ...mockContext }}>
        <Game />
      </GameContext.Provider>
    );

    fireEvent.click(getByTestId("reset-all-data"));

    expect(mockContext.resetData).toHaveBeenCalled();
    expect(clearIntervalSpy).toHaveBeenCalledTimes(2);
  });

  test("handlePickColor should call pickColor and set timer", () => {
    const setIntervalSpy = jest.spyOn(global, "setInterval");
    const pickColor = "#FF5733";
    const mock = {
      ...mockContext,
      state: {
        ...mockContext.state,
        started: true,
        colorOptions: [pickColor, "#6933ff", "#948e57"],
      },
    };

    const { getByText } = render(
      <GameContext.Provider value={{ ...mock }}>
        <Game />
      </GameContext.Provider>
    );

    fireEvent.click(getByText(pickColor));

    expect(mock.pickColor).toHaveBeenCalledWith(pickColor);
    expect(setIntervalSpy).toHaveBeenCalledTimes(1);
  });
});
