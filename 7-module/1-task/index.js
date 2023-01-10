import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.listeners();
  }

  render() {
    this.elem = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

    const ribbonItems = this.categories.map(({ id, name }) =>
      createElement(`
        <a href="#" class="ribbon__item" data-id=${id}>${name}</a>
      `)
    );

    this.#ref("inner").append(...ribbonItems);
    this.update();
  }

  update() {
    this.#ref("item").classList.add("ribbon__item_active");
    this.#ref("arrow_right").classList.add("ribbon__arrow_visible");
  }

  #ref(el) {
    return this.elem.querySelector(`.ribbon__${el}`);
  }

  listeners() {
    this.categoryHandler();
    this.scrollHandler();
  }

  categoryHandler() {
    const categories = this.#ref("inner");

    categories.onclick = (e) => {
      e.preventDefault();

      for (const item of categories.children) {
        if (item === e.target) {
          item.classList.add("ribbon__item_active");
          this.ribbonSelectHandler(item);
        } else {
          item.classList.remove("ribbon__item_active");
        }
      }
    };
  }

  ribbonSelectHandler(item) {
    const { id } = item.dataset;

    if (!id) return;

    this.elem.dispatchEvent(
      new CustomEvent("ribbon-select", {
        detail: id,
        bubbles: true,
      })
    );
  }

  scrollHandler() {
    const categories = this.#ref("inner");
    const prevBtn = this.#ref("arrow_left");
    const nextBtn = this.#ref("arrow_right");

    categories.addEventListener("scroll", () => {
      const { scrollLeft, clientWidth, scrollWidth } = categories;

      switch (true) {
        case scrollLeft === 0:
          prevBtn.classList.remove("ribbon__arrow_visible");
          break;
        case scrollLeft !== 0 && scrollLeft + clientWidth < scrollWidth:
          prevBtn.classList.add("ribbon__arrow_visible");
          nextBtn.classList.add("ribbon__arrow_visible");
          break;
        case scrollLeft + clientWidth === scrollWidth:
          nextBtn.classList.remove("ribbon__arrow_visible");
          break;
      }
    });

    this.arrowsHandler(categories);
  }

  arrowsHandler(categories) {
    this.elem.onclick = (e) => {
      if (e.target.closest(".ribbon__arrow_right")) {
        categories.scrollBy(350, 0);
      }

      if (e.target.closest(".ribbon__arrow_left")) {
        categories.scrollBy(-350, 0);
      }
    };
  }
}
