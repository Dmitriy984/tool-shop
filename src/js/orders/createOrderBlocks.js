import ToolsShopApi from "../api/toolsShopApi";
import { login } from "../auth/checkLoggied";
import displayMessage from "../common/displayMessage";
import displayTotal from "../common/displayTotal";
import {logoHeaderA} from "../header/createHeader";

export default function createOrderBlocks() {
  const toolsShopApi = new ToolsShopApi();

  if (login && document.querySelector(".order__blocks")) {
    const orderBlock = document.querySelector(".order__blocks");
    logoHeaderA.setAttribute('href', 'index.html');

    toolsShopApi.checkEmail(login).then(([user]) => {
      if (typeof user != "undefined" && user.isLoggied === true) {
        const {
          currentOrders,
          totalOrders,
          currentOrderNumbers,
          currentOrderDates,
        } = user;
        if (currentOrders.length === 0) {
          displayMessage("No Orders", "order__blocks_message", orderBlock);
        } else {
          const title = document.createElement("p");
          title.classList.add("order__blocks_title");
          title.textContent = "Orders";
          orderBlock.prepend(title);

          for (let i = 0; i < currentOrders.length; i++) {
            const orderBlock = document.createElement("div");
            orderBlock.classList.add("order__grid");
            orderBlock.setAttribute("id", `${currentOrderNumbers[i]}`);
            const orderNumber = document.createElement("div");
            orderNumber.classList.add("order__grid_number");
            const pOrderNumber = document.createElement("div");
            const listOfOrderItems = document.createElement("div");
            listOfOrderItems.classList.add("order__grid_list");
            const plistOfOrderItems = document.createElement("div");

            pOrderNumber.innerHTML = `Order ${
              currentOrderNumbers[i]
            } from ${currentOrderDates[i]}`;
            plistOfOrderItems.innerHTML = `${currentOrders[i]
              .map((item) => item.title)
              .join(",  ")}`;

            title.after(orderBlock);
            orderBlock.append(orderNumber);
            orderNumber.append(pOrderNumber);
            displayTotal(pOrderNumber, totalOrders[i], "order__blocks_total");
            orderBlock.append(listOfOrderItems);
            listOfOrderItems.append(plistOfOrderItems);

            orderBlock.addEventListener("click", () => {
              window.location.href = `order-details.html#${currentOrderNumbers[i]}`;
            });
          }
        }
      }
    });
  }
  return null;
}
