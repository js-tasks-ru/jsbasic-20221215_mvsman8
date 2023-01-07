import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  _card = null;
  constructor(product) {
    this._card = createCard(product);
  }
  get elem() {
    return this._card;
  }
}

const createCard = ({ name, price, image, id }) => {
  const card = createElement('<div class="card"></div>');

  card.append(createCardTop(image, price), createCardBody(name, id));

  card.addEventListener("click", function (e) {
    if (e.target.closest(".card__button")) {
      this.dispatchEvent(
        new CustomEvent("product-add", {
          detail: id,
          bubbles: true,
        })
      );
    }
  });

  return card;
};

const createCardTop = (image, price) => {
  const div = createElement('<div class="card__top"></div>');

  const img = createElement(
    `<img class="card__image" src="/assets/images/products/${image}" alt="product">`
  );

  const span = createElement(
    `<span class="card__price">€${price.toFixed(2)}</span>`
  );

  div.append(img, span);

  return div;
};

const createCardBody = (name) => {
  const div = createElement('<div class="card__body"></div>');

  const title = createElement(`<div class="card__title">${name}</div>`);

  const button = createElement(
    `<button type="button" class="card__button"></button>`
  );
  const buttonImg = createElement(
    '<img src="/assets/images/icons/plus-icon.svg" alt="icon">'
  );

  button.append(buttonImg);

  div.append(title, button);

  return div;
};
