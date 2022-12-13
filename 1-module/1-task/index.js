function factorial(n) {
  // ваш код...
  if (n === 1 || n === 0) {
    return 1;
  }

  let result = 1;

  for (let i = n; i > 0; i--) {
    result *= i;
  }

  return result;
}
