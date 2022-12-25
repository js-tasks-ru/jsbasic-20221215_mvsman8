function getMinMax(str) {
  // ваш код...
  const numbers = str
    .split(" ")
    .filter((num) => !isNaN(num) && parseFloat(num));

  return {
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}
