import { calculateTextColor } from "../../utils/calculateTextColor";

describe("calculateTextColor function", () => {
  test("should return black for light background color", () => {
    const lightColor = "#FFFFFF";
    const textColor = calculateTextColor(lightColor);
    expect(textColor).toBe("#000000");
  });

  test("should return white for dark background color", () => {
    const darkColor = "#000000";
    const textColor = calculateTextColor(darkColor);
    expect(textColor).toBe("#ffffff");
  });

  test("should handle medium brightness background color", () => {
    const color = "#888888";
    const textColor = calculateTextColor(color);
    expect(textColor).toBe("#000000");
  });
});
