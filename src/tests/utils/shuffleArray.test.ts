import { shuffleArray } from "../../utils/shuffleArray";

describe("shuffleArray function", () => {
  test("should return an array with the same length as the input array", () => {
    const inputArray = ["a", "b", "c", "d", "e"];
    const shuffledArray = shuffleArray(inputArray);
    expect(shuffledArray).toHaveLength(inputArray.length);
  });

  test("should contain the same elements as the input array", () => {
    const inputArray = ["a", "b", "c", "d", "e"];
    const shuffledArray = shuffleArray(inputArray);
    inputArray.forEach((element) => {
      expect(shuffledArray).toContain(element);
    });
  });
});
