function highlight(table) {
  // ваш код...
  const THEAD_INDEX = {
    name: 0,
    age: 1,
    gender: 2,
    status: 3,
  };

  const setStatusClassOrHidden = (row, cell) => {
    const { available } = cell.dataset;

    switch (available) {
      case "true":
        row.classList.add("available");
        break;
      case "false":
        row.classList.add("unavailable");
        break;
      default:
        row.hidden = true;
        break;
    }
  };

  const setGenderClass = (row, cell) => {
    const gender = cell.textContent;

    if (gender === "m") {
      row.classList.add("male");
    } else {
      row.classList.add("female");
    }
  };

  const setStyleByAge = (row, cell) => {
    const age = Number(cell.textContent);

    if (age < 18) {
      row.style.textDecoration = "line-through";
    }
  };

  const tbody = table.lastElementChild;

  for (let i = 0; i < tbody.rows.length; i++) {
    const row = tbody.rows[i];
    const statusCell = row.cells[THEAD_INDEX.status];
    const genderCell = row.cells[THEAD_INDEX.gender];
    const ageCell = row.cells[THEAD_INDEX.age];

    setStatusClassOrHidden(row, statusCell);
    setGenderClass(row, genderCell);
    setStyleByAge(row, ageCell);
  }
}
