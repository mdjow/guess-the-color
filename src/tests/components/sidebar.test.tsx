import "jest-styled-components";

import { render } from "@testing-library/react";

import { GameContext } from "../../contexts/GameContext";
import { Sidebar } from "../../components/Sidebar";
import { createMockGameContext } from "../mocks/game.mock";

describe("Sidebar component", () => {
  test("should render component matches snapshot", () => {
    const mockContext = createMockGameContext();

    const mockState = {
      ...mockContext.state,
      answers: [
        { pick: "#FC2703", color: "#FC2703", score: 5 },
        { pick: "#337FF2", color: "#9F22E0", score: -1 },
        { pick: "", color: "#FD6D4A", score: -2 },
      ],
    };

    const { container } = render(
      <GameContext.Provider value={{ ...mockContext, state: mockState }}>
        <Sidebar />
      </GameContext.Provider>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
