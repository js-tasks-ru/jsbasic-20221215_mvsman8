function showSalary(users, age) {
  // ваш код...
  return users
    .filter((user) => user.age <= age)
    .map(({ name, balance }) => `${name}, ${balance}`)
    .join("\n");
}
