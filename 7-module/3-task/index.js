export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.initValues();
    this.listeners();
  }

  #createComponent(node, elem) {
    const component = document.createElement(node);
    component.className = `slider${elem}`;

    return component;
  }

  #ref(el) {
    return this.elem.querySelector(`.slider__${el}`);
  }

  render() {
    const slider = this.#createComponent("div", "");

    slider.append(
      this.thumbComponent(),
      this.progressComponent(),
      this.stepsComponent()
    );

    this.elem = slider;
  }

  thumbComponent() {
    const thumb = this.#createComponent("div", "__thumb");

    thumb.innerHTML = `<span class="slider__value">${this.value}</span>`;

    return thumb;
  }

  progressComponent() {
    const progress = this.#createComponent("div", "__progress");

    return progress;
  }

  stepsComponent() {
    const steps = this.#createComponent("div", "__steps");

    [...Array(this.steps).keys()].forEach((_) => {
      steps.insertAdjacentHTML("beforeend", "<span></span>");
    });

    return steps;
  }

  initValues() {
    this.#ref("steps").children[0].className = "slider__step-active";
    this.#ref("progress").style.width = "0%";
  }

  listeners() {
    this.elem.onclick = ({ offsetX }) => {
      this.updateValue(offsetX);
      this.event();
      this.updateStep();
      this.updateStyles();
    };
  }

  updateValue(x) {
    this.value = Math.round((x / this.elem.clientWidth) * (this.steps - 1));

    this.#ref("value").textContent = this.value;
  }

  updateStep() {
    this.#ref("steps").childNodes.forEach((step, index) => {
      if (index === this.value) {
        step.classList.add("slider__step-active");
      } else {
        step.classList.remove("slider__step-active");
      }
    });
  }

  updateStyles() {
    const percent = `${(this.value * 100) / (this.steps - 1)}%`;

    this.#ref("thumb").style.left = percent;
    this.#ref("progress").style.width = percent;
  }

  event() {
    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  }
}
