function makeFriendsList(friends) {
  // ваш код...
  const body = document.body;
  const ul = document.createElement("ul");

  for (let i = 0; i < friends.length; i++) {
    const { firstName, lastName } = friends[i];
    const li = `<li>${firstName} ${lastName}</li>`;

    ul.insertAdjacentHTML("beforeend", li);
  }

  body.appendChild(ul);

  return ul;
}
