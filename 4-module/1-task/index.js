function makeFriendsList(friends) {
  // ваш код...
  const ul = document.createElement("ul");

  for (let i = 0; i < friends.length; i++) {
    const { firstName, lastName } = friends[i];
    const li = `<li>${firstName} ${lastName}</li>`;

    ul.insertAdjacentHTML("beforeend", li);
  }

  return ul;
}
