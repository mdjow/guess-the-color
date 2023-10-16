import "jest-styled-components";

import { render } from "@testing-library/react";

import { ProgressBar } from "../../components/ProgessBar";

describe("ProgressBar component", () => {
  test("Should render component matches snapshot", () => {
    const { container } = render(<ProgressBar progress={50} />);
    expect(container).toMatchSnapshot();
  });
});
