import "jest-styled-components";

import { render, fireEvent } from "@testing-library/react";

import { ColorPreview } from "../../components/ColorPreview";

describe("ColorPreview component", () => {
  test("should render component with started false corresponds to snapshot", () => {
    const { container } = render(
      <ColorPreview color="#ff5733" started={false} onStart={() => {}} />
    );

    expect(container).toMatchSnapshot();
  });

  test("should render component with started true corresponds to snapshot", () => {
    const { container } = render(
      <ColorPreview color="#ff5733" started={true} onStart={() => {}} />
    );

    expect(container).toMatchSnapshot();
  });

  test("should trigger event onStart when called", () => {
    const mockOnStart = jest.fn();

    const { getByText } = render(
      <ColorPreview color="#ff5733" started={false} onStart={mockOnStart} />
    );

    fireEvent.click(getByText("Start"));

    expect(mockOnStart).toHaveBeenCalled();
  });
});
