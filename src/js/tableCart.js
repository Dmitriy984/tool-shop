import ToolsShopApi from './toolsShopApi';
import changeCartBlock from './changeCartBlock';
import { login } from './auth/checkLoggied';

export default function createTableCart() {
  const toolsShopApi = new ToolsShopApi();

  if (document.querySelector(".cart__table")) {
    let blockCart = document.querySelector(".cart__table");
    let tableCart = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let trTitle = document.createElement("tr");
    let titles = ["Id", "Product name", "Quantity", "Price", "Action"];

    titles.forEach((title) => {
      let th = document.createElement("th");
      th.textContent = title;
      trTitle.append(th);
    });

    function displayMessage(text) {
      let message = document.createElement("p");
      message.classList.add("cart__table_message");
      message.textContent = text;
      blockCart.append(message);
    }

    if (login) {
      toolsShopApi.checkEmail(login).then(([user]) => {
        const { cart, total } = user;
        if (
            typeof user != "undefined" &&
            user.email === login &&
            user.isLoggied === true
        ) {
          let cartItems = 0;
          cart.forEach(item => cartItems += item.quantity);
          changeCartBlock(cartItems, total);
          if (cart.length === 0) {
            displayMessage("No goods");
          } else {
            blockCart.append(tableCart);
            tableCart.append(thead);
            tableCart.append(tbody);
            thead.append(trTitle);
            cart.map((item, idx) => {
              const {title, price, quantity} = item;
              let tr = document.createElement("tr");
              let quantityElement =
                  '<button class="cart__table_add"><i class="fas fa-minus"></i></button>' +
                  " " +
                  quantity +
                  " " +
                  '<button class="cart__table_subtract"><i class="fas fa-plus"></i></button>';
              let deleteElement = `<button class="cart__table_delete">Delete</button>`;
              let cells = [idx + 1, title, quantityElement, price, deleteElement];
              cells.forEach((cell) => {
                let td = document.createElement("td");
                td.innerHTML = cell;
                tr.append(td);
              });
              tbody.append(tr);
            });
            let totalCart = document.createElement("p");
            totalCart.classList.add("cart__table_total");
            totalCart.innerHTML = `Total: &euro;${total}`;
            tableCart.after(totalCart);
          }
        }
      });
    } else {
      displayMessage("Log in to add items to your cart!");
    }
  }
  return null;
}
