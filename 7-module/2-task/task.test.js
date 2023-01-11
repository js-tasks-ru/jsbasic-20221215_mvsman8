import Modal from './index.js';

describe('7-module-2-task', () => {
  let modal;

  beforeEach(() => {
    modal = new Modal();
  });

  afterEach(() => {
    modal.close();
  });

  describe('метод open()', () => {
    beforeEach(() => {
      modal.open();
    });

    afterEach(() => {
      modal.close();
    });

    it('должна создавать основной элемент модального окна', () => {
      let modalElement = document.body.querySelector('.modal');

      expect(modalElement).toBeTruthy();
    });

    it('должна создавать прозрачный фон', () => {
      let modalElement = document.body.querySelector('.modal .modal__overlay');

      expect(modalElement).toBeTruthy();
    });

    it('должна добавлять класс "is-modal-open" элементу body', () => {
      let hasIsModalOpenClass = document.body.classList.contains('is-modal-open');

      expect(hasIsModalOpenClass).toBe(true);
    });
  });

  describe(`метод setTitle('modal title')`, () => {
    it('должен задавать заголовок модального окна', () => {
      let title = 'Я главное модальное окно';

      modal.setTitle(title);
      modal.open();

      let titleElement = document.querySelector('.modal__title');

      expect(titleElement.textContent.trim()).toBe(title);

      modal.close();
    });

    it('должен задавать заголовок модального окна после его открытия', () => {
      let title = 'Я главное модальное окно';

      modal.open();

      modal.setTitle(title);

      let titleElement = document.querySelector('.modal__title');

      expect(titleElement.textContent.trim()).toBe(title);

      modal.close();
    });
  });

  describe(`метод setBody(node)`, () => {
    const createModalBody = (text) => {
      let node = document.createElement('div');
      node.className = 'test-node-class';
      node.innerHTML = `<h4>${text}</h4>`;

      return node;
    };

    const selectInnerTitle = () => {
      let modalBody = document.querySelector('.modal .modal__body');
      let nodeFromModal = modalBody.querySelector('.test-node-class');
      let innerTitle = nodeFromModal && nodeFromModal.querySelector('h4');

      return innerTitle.textContent;
    };

    afterEach(() => {
      modal.close();
    });

    it('должен вставлять содержимое модального окна в элемента с классом "modal__body"', () => {
      let innerTitleText = 'Внутренний заголовок содержимого';
      const node = createModalBody(innerTitleText);

      modal.setBody(node);

      modal.open();

      expect(selectInnerTitle()).toBe(innerTitleText);
    });

    it('должен вставлять содержимое модального окна в элемента с классом "modal__body" после его открытия', () => {
      modal.open();

      let innerTitleText = 'Внутренний заголовок содержимого';
      const node = createModalBody(innerTitleText);

      modal.setBody(node);

      expect(selectInnerTitle()).toBe(innerTitleText);
    });
  });

  describe('закрытие', () => {
    let clickEvent;
    let closeButton;

    beforeEach(() => {
      modal.open();

      clickEvent = new MouseEvent('click', { bubbles: true });
      closeButton = document.body.querySelector('.modal .modal__close');
    });

    it('при вызове метода close(), вёрстка модального окна должна удаляться из body', () => {
      modal.close();

      let modalElement = document.querySelector('.modal');

      expect(modalElement).toBeNull();
    });

    it('при вызове метода close(), должен удаляться класс "is-modal-open" с элемента body', () => {
      modal.close();

      let hasIsModalOpenClass = document.body.classList.contains('is-modal-open');

      expect(hasIsModalOpenClass).toBe(false);
    });

    it('при клике по [X], вёрстка модального окна должна удаляться из body', () => {
      closeButton.dispatchEvent(clickEvent);

      let modalElement = document.querySelector('.modal');

      expect(modalElement).toBeNull();
    });

    it('при клике по [X], должен удаляться класс "is-modal-open" с элемента body', () => {
      closeButton.dispatchEvent(clickEvent);

      let hasIsModalOpenClass = document.body.classList.contains('is-modal-open');

      expect(hasIsModalOpenClass).toBe(false);
    });

    describe('если была нажата клавиша ESC', () => {
      let escKeyDownEvent;

      beforeEach(() => {
        escKeyDownEvent = new KeyboardEvent('keydown', { code: 'Escape', key: 'Escape', bubbles: true });
      });

      it('вёрстка модального окна должна удаляться из body', () => {
        document.body.dispatchEvent(escKeyDownEvent);

        let modalElement = document.querySelector('.modal');

        expect(modalElement).toBeNull();
      });

      it('должен удаляться класс "is-modal-open" с элемента body', () => {
        document.body.dispatchEvent(escKeyDownEvent);

        let hasIsModalOpenClass = document.body.classList.contains('is-modal-open');

        expect(hasIsModalOpenClass).toBe(false);
      });
    });

    describe('если была нажата любая другая клавиша кроме ESC', () => {
      let spaceButtonKeyDownEvent;

      beforeEach(() => {
        spaceButtonKeyDownEvent = new KeyboardEvent('keydown', { code: ' ', key: 'Space', bubbles: true });
      });

      it('вёрстка модального окна НЕ должна удаляться из body', () => {
        document.body.dispatchEvent(spaceButtonKeyDownEvent);

        let modalElement = document.querySelector('.modal');

        expect(modalElement).not.toBeNull();
      });

      it('НЕ должен удаляться класс "is-modal-open" с элемента body', () => {
        document.body.dispatchEvent(spaceButtonKeyDownEvent);

        let hasIsModalOpenClass = document.body.classList.contains('is-modal-open');

        expect(hasIsModalOpenClass).toBe(true);
      });
    });

  });
});
