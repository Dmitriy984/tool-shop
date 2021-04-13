import ToolsShopApi from "./toolsShopApi";
import { login } from "./auth/checkLoggied";
import { reloadPage } from "./helpers";
import displayMessage from "./displayMessage";

export default function createTableOrder() {
  const toolsShopApi = new ToolsShopApi();

  if (login && document.querySelector(".order__tables")) {
    const blockOrder = document.querySelector(".order__tables");

    toolsShopApi.checkEmail(login).then(([user]) => {
      const { id, currentOrders, totalOrders } = user;
      if (
        typeof user != "undefined" &&
        user.email === login &&
        user.isLoggied === true
      ) {
        if (currentOrders.length === 0) {
          displayMessage("No Orders", "order__tables_message", blockOrder);
        } else {
          for (let i = 0; i < currentOrders.length; i++) {
            let tableOrder = document.createElement("table");
            let thead = document.createElement("thead");
            let tbody = document.createElement("tbody");
            let trTitle = document.createElement("tr");
            let titles = ["Id", "Product name", "Quantity", "Price"];

            titles.forEach((title) => {
              let th = document.createElement("th");
              th.textContent = title;
              trTitle.append(th);
            });

            blockOrder.append(tableOrder);
            tableOrder.append(thead);
            tableOrder.append(tbody);
            thead.append(trTitle);
            currentOrders[i].map((item, idx) => {
              const { title, price, quantity } = item;
              let tr = document.createElement("tr");
              let cells = [
                idx + 1,
                title,
                quantity,
                `&euro;${price * quantity}`,
              ];
              cells.forEach((cell) => {
                let td = document.createElement("td");
                td.innerHTML = cell;
                tr.append(td);
              });
              tbody.append(tr);
            });
            let totalCart = document.createElement("p");
            totalCart.classList.add("order__tables_total");
            totalCart.innerHTML = `Total: &euro;${totalOrders[i]}`;
            tableOrder.after(totalCart);
            let btnOrder = document.createElement("button");
            btnOrder.classList.add("cart__table_order");
            btnOrder.textContent = "Cancel the order";
            totalCart.after(btnOrder);

            btnOrder.addEventListener("click", () => {
              toolsShopApi
                .patchData(id, {
                  currentOrders: [
                    ...currentOrders.slice(0, i),
                    ...currentOrders.slice(i + 1),
                  ],
                  totalOrders: [
                    ...totalOrders.slice(0, i),
                    ...totalOrders.slice(i + 1),
                  ],
                  cart: [],
                  total: 0,
                })
                .then((user) => {
                  alert("Your order has been canceled!");
                  reloadPage();
                });
            });
          }
        }
      }
    });
  }
  return null;
}
