import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title">
            </h3>
          </div>
          <div class="modal__body">
          </div>
        </div>
      </div>
    `);
  }

  #el(el) {
    return document.querySelector(`${el}`);
  }

  #modal(el) {
    return this.elem.querySelector(`.modal__${el}`);
  }

  setTitle(string) {
    this.#modal("title").textContent = string;
  }

  setBody(node) {
    this.#modal("body").innerHTML = node.outerHTML;
  }

  open() {
    this.handleOpen();
  }

  handleOpen() {
    this.#el("body").append(this.elem);
    this.#el("body").classList.add("is-modal-open");

    this.events();
  }

  close() {
    this.handleClose();
  }

  handleClose() {
    this.elem.remove();
    this.#el("body").classList.remove("is-modal-open");

    this.removeEvents();
  }

  events() {
    this.#modal("close").onclick = this.handleClose.bind(this);

    const onKeydownCloseHandler = ({ code }) => {
      if (code === "Escape") {
        this.handleClose();
      }
    };

    document.onkeydown = onKeydownCloseHandler;
  }

  removeEvents() {
    document.onkeydown = null;
    this.#modal("close").onclick = null;
  }
}
