import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  _carousel = null;
  _currentSlide = 1;
  _carouselShift = 0;

  constructor(slides) {
    this._slides = slides;
    this._createCarousel();
    this._handleCarousel();
  }

  get elem() {
    return this._carousel;
  }

  _createCarousel() {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
      </div>
    `);
    const carouselInner = createElement(`<div class="carousel__inner"></div>`);

    carousel.append(carouselInner);

    this._slides.forEach((slide) => {
      const slideCard = this._createCarouselCard(slide);
      carouselInner.append(slideCard);
      this._handleProductAdd(slideCard);
    });

    this._carousel = carousel;
  }

  _createCarouselCard(slide) {
    const { id, name, price, image } = slide;

    return createElement(`
      <div class="carousel__slide" data-id=${id}>
        <img src="/assets/images/carousel/${image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${price}</span>
          <div class="carousel__title">${name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `);
  }

  _handleCarousel() {
    const [nextBtn, prevBtn] = this.elem.children;

    prevBtn.style.display = "none";

    prevBtn.addEventListener("click", () => {
      this._handleChangeSlide("prev");
    });

    nextBtn.addEventListener("click", () => {
      this._handleChangeSlide("next");
    });
  }

  _handleChangeSlide(direction) {
    const slidesWrapper = this.elem.lastChild;

    if (direction === "prev") {
      this._currentSlide -= 1;
      this._carouselShift -= slidesWrapper.offsetWidth;
    } else {
      this._currentSlide += 1;
      this._carouselShift += slidesWrapper.offsetWidth;
    }

    slidesWrapper.style.transform = `translateX(-${this._carouselShift}px)`;
    this._updateArrowsState();
  }

  _updateArrowsState() {
    const [nextBtn, prevBtn] = this.elem.children;

    switch (true) {
      case this._currentSlide === 1:
        prevBtn.style.display = "none";
        break;
      case this._currentSlide > 1 && this._currentSlide < this._slides.length:
        prevBtn.style.display = "";
        nextBtn.style.display = "";
        break;
      case this._currentSlide === this._slides.length:
        nextBtn.style.display = "none";
        break;
    }
  }

  _handleProductAdd(card) {
    card.onclick = function (e) {
      if (e.target.closest(".carousel__button")) {
        const { id } = this.dataset;
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
