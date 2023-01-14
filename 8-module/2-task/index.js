import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.products.forEach((product) => {
      const { elem } = new ProductCard(product);

      this.elem.firstElementChild.append(elem);
    });
  }

  updateFilter(filters) {
    this.mergeFilters(filters);
    this.updateCards();
  }

  mergeFilters(filters) {
    for (const key in filters) {
      if (filters[key]) {
        this.filters[key] = filters[key];
      } else {
        delete this.filters[key];
      }
    }
  }

  updateCards() {
    const cardsContainer = this.elem.firstElementChild;
    cardsContainer.innerHTML = "";

    const { noNuts, vegeterianOnly, maxSpiciness, category } = this.filters;

    for (const product of this.products) {
      if (noNuts && product.nuts) continue;

      if (vegeterianOnly && !product.vegeterian) continue;

      if (maxSpiciness && product.spiciness > maxSpiciness) continue;

      if (category && product.category !== category) continue;

      const { elem } = new ProductCard(product);
      cardsContainer.append(elem);
    }
  }
}
