function ucFirst(str) {
  // ваш код...
  if (!str) {
    return "";
  }

  return str.length === 1
    ? str.toUpperCase()
    : `${str[0].toUpperCase()}${str.slice(1)}`;
}
