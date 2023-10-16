// Ref: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

export function shuffleArray(array: string[]) {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
