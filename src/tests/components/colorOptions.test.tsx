import "jest-styled-components";

import { render, fireEvent } from "@testing-library/react";

import { ColorOptions } from "../../components/ColorOptions";

describe("ColorOptions component", () => {
  const mockOnSelect = jest.fn();

  const mockProps = {
    onSelect: mockOnSelect,
    options: ["#10367c", "#ff5733", "#ff33cc"],
    disabled: false,
  };

  test("should render component matches snapshot", () => {
    const { container } = render(<ColorOptions {...mockProps} />);

    expect(container).toMatchSnapshot();
  });

  test("should not trigger event onSelect if disabled", () => {
    const { getByText } = render(
      <ColorOptions {...mockProps} disabled={true} />
    );

    fireEvent.click(getByText(mockProps.options[0]));

    expect(mockOnSelect).not.toHaveBeenCalled();
  });

  test("should trigger event onSelect when called", () => {
    const { getByText } = render(<ColorOptions {...mockProps} />);

    fireEvent.click(getByText(mockProps.options[0]));

    expect(mockOnSelect).toHaveBeenCalled();
  });
});
