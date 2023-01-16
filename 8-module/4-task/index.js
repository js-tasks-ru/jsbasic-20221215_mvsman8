import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return;

    const { id } = product;

    let cartItem = this.cartItems.find(({ product }) => product.id === id);

    if (cartItem) {
      cartItem.count += 1;
    } else {
      cartItem = {
        product,
        count: 1,
      };

      this.cartItems.push(cartItem);
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(
      ({ product }) => product.id === productId
    );

    if (!cartItem) return;

    cartItem.count += amount;

    if (!cartItem.count) {
      this.cartItems = this.cartItems.filter(
        ({ product: { id } }) => productId !== id
      );
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    return this.cartItems.reduce((acc, { count }) => acc + count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (acc, { product: { price }, count }) => acc + price * count,
      0
    );
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderProductCards() {
    return this.cartItems.map(({ product, count }) =>
      this.renderProduct(product, count)
    );
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderSuccessContent() {
    return createElement(`
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img src="/assets/images/delivery.gif">
        </p>
      </div>
    `);
  }

  renderModal() {
    const modal = new Modal();
    this.modal = modal;

    this.initModalContent();
    this.onChangeCount();

    const form = document.forms[0];

    form.onsubmit = (e) => this.onSubmit(e, form);
  }

  onChangeCount() {
    const body = document.querySelector(".modal__body");

    body.onclick = ({ target }) => {
      const card = target.closest("[data-product-id]");

      if (!card) return;

      const { productId } = card.dataset;

      if (target.closest(".cart-counter__button_plus")) {
        this.updateProductCount(productId, 1);
      }

      if (target.closest(".cart-counter__button_minus")) {
        this.updateProductCount(productId, -1);
      }
    };
  }

  updateTextCount(item, { count }) {
    if (!count) {
      item.remove();
    }

    if (item) {
      item.querySelector(".cart-counter__count").textContent = count;
    }
  }

  updateTextPrice(item, { product: { price }, count }) {
    const text = `€${(price * count).toFixed(2)}`;

    item.querySelector(".cart-product__price").textContent = text;
  }

  updateTextTotalPrice() {
    const infoPrice = document.querySelector(".cart-buttons__info-price");
    const total = `€${this.getTotalPrice().toFixed(2)}`;

    infoPrice.textContent = total;
  }

  initModalContent() {
    const div = document.createElement("div");

    div.append(...this.renderProductCards(), this.renderOrderForm());

    this.modal.open();
    this.modal.setTitle("Your order");
    this.modal.setBody(div);
  }

  updateModalContent(modal, cartItem) {
    const { id } = cartItem.product;
    const item = modal.querySelector(`[data-product-id="${id}"]`);

    this.updateTextCount(item, cartItem);
    this.updateTextPrice(item, cartItem);
    this.updateTextTotalPrice();

    if (this.isEmpty()) {
      modal.remove();
    }
  }

  initSuccessModalContent() {
    this.modal.setTitle("Success!");
    this.modal.setBody(this.renderSuccessContent());
    this.cartItems = [];
    this.cartIcon.elem.classList.remove("cart-icon_visible");
  }

  onProductUpdate(cartItem) {
    const modal = document.querySelector(".modal");

    if (modal) {
      this.updateModalContent(modal, cartItem);
    }

    this.cartIcon.update(this);
  }

  onSubmit(e, form) {
    e.preventDefault();
    const btn = document.querySelector('button[type="submit"]');
    btn.classList.add("is-loading");

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: new FormData(form),
    }).then((response) => {
      if (response.ok) {
        this.initSuccessModalContent();
      }
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
