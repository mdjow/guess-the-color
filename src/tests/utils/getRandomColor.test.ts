import { getRandomColor } from "../../utils/getRandomColor";

describe("getRandomColor function", () => {
  test("should return a valid hex color", () => {
    const color = getRandomColor();
    const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;

    expect(color).toMatch(hexColorRegex);
  });

  test("should return a different color on each invocation", () => {
    const color1 = getRandomColor();
    const color2 = getRandomColor();

    expect(color1).not.toBe(color2);
  });
});
