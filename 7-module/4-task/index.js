export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.initValues();
    this.mouseEvent();
    this.pointerEvent();
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

  mouseEvent() {
    this.elem.onclick = ({ clientX }) => {
      this.updateValue(clientX);
      this.event();
      this.updateStep();
      this.updateThumb();
    };
  }

  pointerEvent() {
    const thumb = this.#ref("thumb");

    thumb.onpointerdown = (e) => {
      e.preventDefault();

      document.onpointermove = ({ clientX }) => {
        this.elem.classList.add("slider_dragging");
        this.updateValue(clientX);
        this.pointerMove(clientX);
        this.updateStep();
      };

      document.onpointerup = () => {
        this.elem.classList.remove("slider_dragging");
        document.onpointermove = null;
        document.onpointerup = null;
        this.updateThumb();
        this.event();
      };
    };
  }

  pointerMove(clientX) {
    const x = clientX - this.elem.getBoundingClientRect().x;
    let percent = ((x / this.elem.clientWidth) * 100).toFixed(4);

    if (x < 0) {
      percent = 0;
    }

    if (x > this.elem.clientWidth) {
      percent = 100;
    }

    this.setStyles(percent);
  }

  updateValue(clientX) {
    const x = clientX - this.elem.getBoundingClientRect().x;
    this.value = Math.round((x / this.elem.clientWidth) * (this.steps - 1));

    if (x < 0) {
      this.value = 0;
    }

    if (x > this.elem.clientWidth) {
      this.value = this.steps - 1;
    }

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

  updateThumb() {
    const percent = (this.value * 100) / (this.steps - 1);
    this.setStyles(percent);
  }

  setStyles(p) {
    this.#ref("thumb").style.left = `${p}%`;
    this.#ref("progress").style.width = `${p}%`;
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
