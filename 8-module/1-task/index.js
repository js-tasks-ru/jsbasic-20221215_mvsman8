import createElement from "../../assets/lib/create-element.js";

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add("cart-icon_visible");

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart
            .getTotalPrice()
            .toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add("shake");
      this.elem.addEventListener(
        "transitionend",
        () => {
          this.elem.classList.remove("shake");
        },
        { once: true }
      );
    } else {
      this.elem.classList.remove("cart-icon_visible");
    }
  }

  addEventListeners() {
    document.addEventListener("scroll", () => this.updatePosition());
    window.addEventListener("resize", () => this.updatePosition());
  }

  updatePosition() {
    // ваш код ...
    const { offsetWidth } = this.elem;

    if (!offsetWidth) return;

    if (window.scrollY > 50 && window.innerWidth > 767) {
      const container = document.querySelector(".container");
      const { clientWidth } = document.documentElement;
      const { right } = container.getBoundingClientRect();

      const offset =
        clientWidth - 10 > right + 20 + offsetWidth
          ? right + 20
          : clientWidth - offsetWidth - 10;

      this.elem.style.position = "fixed";
      this.elem.style.zIndex = "1000";
      this.elem.style.top = "50px";
      this.elem.style.left = `${offset}px`;
    } else {
      this.elem.style = "";
    }
  }
}
