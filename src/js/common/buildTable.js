export function renderRow(rowCells) {
  let tr = document.createElement("tr");
  rowCells.forEach((cell) => {
    if (typeof cell !== "undefined") {
      let td = document.createElement("td");
      td.innerHTML = cell;
      tr.append(td);
    }
  });
  return tr;
}

export function fillRowCells(goodPosition, rowNumber, quantityElem, ...extraCells) {
  const { title, price, quantity } = goodPosition;
  const cells = [
    rowNumber + 1,
    title,
    price,
    quantityElem,
    `&euro;${price * quantity}`
  ];
  if (extraCells.length !== 0) {
    return [...cells, ...extraCells];
  }
  return cells;
}

export function renderCounter(count, changeable) {
  if (changeable) {
    return (
      '<i data-subtraction class="far fa-minus-square"></i>' +
      "  <span>" +
      count +
      "</span>  " +
      '<i data-addition class="far fa-plus-square"></i>'
    );
  }
  return count;
}

export function buildTable(
  elemLocation,
  captions,
  itemDetails,
  renderRow,
  fillRowCells,
  actionCell,
  changeable
) {
  let table = document.createElement("table");
  let thead = document.createElement("thead");
  let tbody = document.createElement("tbody");
  let trTitle = document.createElement("tr");
  captions.forEach((caption) => {
    let th = document.createElement("th");
    th.textContent = caption;
    trTitle.append(th);
  });
  elemLocation.append(table);
  table.append(thead);
  thead.append(trTitle);
  table.append(tbody);
  let rows = itemDetails.map((item, idx) =>
    renderRow(fillRowCells(item, idx, renderCounter(item.quantity, changeable), actionCell))
  );
  rows.forEach((row) => tbody.append(row));

  return table;
}
