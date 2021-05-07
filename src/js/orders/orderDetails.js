import ToolsShopApi from "../api/toolsShopApi";
import { login } from "../auth/checkLoggied";
import displayMessage from "../common/displayMessage";
import displayTotal from "../common/displayTotal";
import displaySendButton from "../common/displaySendButton";
import { buildTable, fillRowCells, renderRow } from "../common/buildTable";
import patchUpdateOrder from "../common/patchUpdateOrder";
import {logoHeaderA} from "../header/createHeader";

export default function createOrderDetails() {
  const toolsShopApi = new ToolsShopApi();

  if (document.querySelector(".order__details")) {
    const orderBlock = document.querySelector(".order__details");
    logoHeaderA.setAttribute('href', 'index.html');

    toolsShopApi.checkEmail(login).then(([user]) => {
      if (typeof user != "undefined" && user.isLoggied === true) {
        const {
          id,
          cart,
          total,
          currentOrders,
          totalOrders,
          currentOrderNumbers,
          currentOrderDates,
        } = user;
        if (currentOrders.length === 0) {
          displayMessage(
            "Order not found",
            "order__details_message",
            orderBlock
          );
        } else {
          const orderNumber = +window.location.hash.substr(1);
          const orderIndex = currentOrderNumbers.findIndex(
            (num) => num === orderNumber
          );
          const titles = [
            "Id",
            "Product name",
            "Price",
            "Quantity",
            "Total coast",
          ];
          const orderTable = buildTable(
            orderBlock,
            titles,
            currentOrders[orderIndex],
            renderRow,
            fillRowCells
          );
          const orderTotal = displayTotal(
            orderTable,
            totalOrders[orderIndex],
            "order__details_total"
          );
          const orderBtn = displaySendButton(orderTotal, "Cancel the order");

          orderBtn.addEventListener("click", () => {
            function updateOrdersDetails(details) {
              return [
                ...details.slice(0, orderIndex),
                ...details.slice(orderIndex + 1),
              ];
            }

            patchUpdateOrder(
              id,
              toolsShopApi,
              cart,
              total,
              updateOrdersDetails(currentOrders),
              updateOrdersDetails(totalOrders),
              updateOrdersDetails(currentOrderNumbers),
              updateOrdersDetails(currentOrderDates),
              "orders.html"
            );
          });
        }
      } else {
        displayMessage(
          "Log in to see order details",
          "order__details_message",
          orderBlock
        );
      }
    });
  }
  return null;
}
