function sumSalary(salaries) {
  // ваш код...
  let sum = 0;

  for (const key in salaries) {
    const value = salaries[key];

    if (typeof value === "number" && isFinite(value)) {
      sum += value;
    }
  }

  return sum;
}
