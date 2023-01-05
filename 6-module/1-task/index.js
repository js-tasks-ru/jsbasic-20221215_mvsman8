/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.getElem();
  }
  getElem() {
    return createTable(this.rows);
  }
}

const theadNames = {
  name: "Имя",
  age: "Возраст",
  salary: "Зарплата",
  city: "Город",
};

const createTable = (rows) => {
  const table = document.createElement("table");

  const thead = createTableHead();
  const tbody = createTableBody(rows);

  table.append(thead);
  table.append(tbody);

  table.onclick = function (e) {
    const row = e.target.closest("tr");
    if (e.target.closest("button")) {
      row.remove();
    }
  };

  return table;
};

const createTableHead = () => {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  Object.values(theadNames).forEach((title) => {
    const th = `<th>${title}</th>`;

    tr.insertAdjacentHTML("beforeend", th);
  });

  thead.append(tr);

  return thead;
};

const createTableBody = (rows) => {
  const tbody = document.createElement("tbody");
  const removeBtn = "<td><button>X</button></td>";

  rows.forEach((row) => {
    const tr = document.createElement("tr");

    const field = Object.values(row).map((value) => `<td>${value}</td>`);

    const td = [...field, removeBtn].join("");

    tr.insertAdjacentHTML("beforeend", td);
    tbody.insertAdjacentElement("beforeend", tr);
  });

  return tbody;
};
