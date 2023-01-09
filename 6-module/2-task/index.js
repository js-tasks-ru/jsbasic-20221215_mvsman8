import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  _card = null;

  constructor(product) {
    this.product = product;
    this._render(product);
    this._handler(product.id);
  }

  get elem() {
    return this._card;
  }

  _render({ name, price, image }) {
    const card = createElement(`
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${image}" class="card__image" alt="product">
          <span class="card__price">€${price.toFixed(2)}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);

    this._card = card;
  }

  _handler(id) {
    this.elem.onclick = function (e) {
      if (e.target.closest(".card__button")) {
        this.dispatchEvent(
          new CustomEvent("product-add", {
            detail: id,
            bubbles: true,
          })
        );
      }
    };
  }
}
