import { fireEvent, render } from "@testing-library/react";

import { ScoreHistory } from "../../components/ScoreHistory";

describe("ScoreHistory component", () => {
  const mockOnReset = jest.fn();

  const mockProps = {
    onReset: mockOnReset,
    timeRemaining: 30000,
    highScore: 100,
    score: 50,
    disabled: false,
  };

  test("should render component matches snapshot", () => {
    const { container } = render(<ScoreHistory {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  test("should not trigger event onReset if disabled", () => {
    const { getByText } = render(
      <ScoreHistory {...mockProps} disabled={true} />
    );

    fireEvent.click(getByText("Restart"));

    expect(mockOnReset).not.toHaveBeenCalled();
  });

  test("should trigger event onReset when called", () => {
    const { getByText } = render(<ScoreHistory {...mockProps} />);

    fireEvent.click(getByText("Restart"));

    expect(mockOnReset).toHaveBeenCalled();
  });
});
