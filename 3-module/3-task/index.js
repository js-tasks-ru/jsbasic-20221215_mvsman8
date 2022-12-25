function camelize(str) {
  // ваш код...
  return str
    .split("-")
    .map((word, idx) =>
      !idx ? word : `${word[0].toUpperCase()}${word.slice(1)}`
    )
    .join("");

  // const splitted = str.split('-')
  // const result = []
  // let i = 0
  // do {
  //   if (!i) {
  //     result.push(splitted[i])
  //   } else {
  //     result.push(`${splitted[i][0].toUpperCase()}${splitted[i].slice(1)}`)
  //   }
  //   i++
  // } while (i < splitted.length)
  // return result.join('')
}
