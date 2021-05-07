import ToolsShopApi from "../api/toolsShopApi";
import changeCartHeader from "../header/changeCartHeader";
import { login } from "../auth/checkLoggied";
import displayMessage from "../common/displayMessage";
import { buildTable, renderRow, fillRowCells } from "../common/buildTable";
import displayTotal from "../common/displayTotal";
import displaySendButton from "../common/displaySendButton";
import removeItemFromCart from "./removeItemFromCart";
import updateQuantityItem from "./updateQuantityItem";
import patchUpdateOrder from "../common/patchUpdateOrder";
import {logoHeaderA} from "../header/createHeader";

export default function createCartTable() {
  const toolsShopApi = new ToolsShopApi();

  if (document.querySelector(".cart__table")) {
    let cartBlock = document.querySelector(".cart__table");
    logoHeaderA.setAttribute('href', 'index.html');
    if (login) {
      toolsShopApi.checkEmail(login).then(([user]) => {
        if (typeof user != "undefined" && user.isLoggied === true) {
          const { id, cart, total } = user;
          changeCartHeader(cart, total);
          if (cart.length === 0) {
            displayMessage("No goods", "cart__table_message", cartBlock);
          } else {
            let titles = [
              "Id",
              "Product name",
              "Price",
              "Quantity",
              "Total cost",
              "Action",
            ];
            const deleteElem = `<button class="cart__table_delete" data-action>Delete</button>`;
            const cartTable = buildTable(
              cartBlock,
              titles,
              cart,
              renderRow,
              fillRowCells,
              deleteElem,
              true
            );
            const cartTotal = displayTotal(cartTable, total, "cart__table_total");
            const btnOrder = displaySendButton(cartTotal, "To Order");

            cartTable.addEventListener("click", (e) => {
              let action = e.target.dataset.action;
              let subtraction = e.target.dataset.subtraction;
              let addition = e.target.dataset.addition;

              if (action !== undefined) {
                let tr = e.target.closest("tr");
                let idxTr = tr.rowIndex - 1;
                toolsShopApi.getGoodsFromCart(id).then(({ cart, total }) => {
                  let newTotal =
                    total - cart[idxTr].quantity * cart[idxTr].price;
                  removeItemFromCart(
                    toolsShopApi,
                    id,
                    cart,
                    newTotal,
                    tr,
                    idxTr,
                    cartTotal
                  );
                });
              }

              if (addition !== undefined) {
                let countItem = e.target.previousElementSibling;
                let tr = e.target.closest("tr");
                let tdTotalCost = e.target.closest("td").nextElementSibling;
                let idxTr = tr.rowIndex - 1;
                toolsShopApi.getGoodsFromCart(id).then(({ cart, total }) => {
                  let newQuantity = cart[idxTr].quantity + 1;
                  let newPrice = cart[idxTr].price * newQuantity;
                  tdTotalCost.innerHTML = `&euro;${newPrice}`;
                  const newCartItem = { ...cart[idxTr], quantity: newQuantity };
                  const newCart = cart.map((item) => {
                    if (item.id === newCartItem.id) {
                      return newCartItem;
                    }
                    return item;
                  });
                  let newTotal = total + cart[idxTr].price;
                  updateQuantityItem(
                    toolsShopApi,
                    id,
                    newCart,
                    newTotal,
                    newQuantity,
                    countItem,
                    cartTotal
                  );
                });
              }

              if (subtraction !== undefined) {
                let countItem = e.target.nextElementSibling;
                let tr = e.target.closest("tr");
                let tdTotalCost = e.target.closest("td").nextElementSibling;
                let idxTr = tr.rowIndex - 1;
                toolsShopApi.getGoodsFromCart(id).then(({ cart, total }) => {
                  let newQuantity = cart[idxTr].quantity - 1;
                  let newPrice = cart[idxTr].price * newQuantity;
                  tdTotalCost.innerHTML = `&euro;${newPrice}`;
                  const newCartItem = { ...cart[idxTr], quantity: newQuantity };
                  const newCart = cart.map((item) => {
                    if (item.id === newCartItem.id) {
                      return newCartItem;
                    }
                    return item;
                  });
                  let newTotal = total - cart[idxTr].price;
                  if (newQuantity !== 0) {
                    updateQuantityItem(
                      toolsShopApi,
                      id,
                      newCart,
                      newTotal,
                      newQuantity,
                      countItem,
                      cartTotal
                    );
                  } else {
                    removeItemFromCart(
                      toolsShopApi,
                      id,
                      newCart,
                      newTotal,
                      tr,
                      idxTr,
                      cartTotal
                    );
                  }
                });
              }
            });

            btnOrder.addEventListener("click", () => {
              toolsShopApi
                .getGoodsFromCart(id)
                .then(
                  ({
                    cart,
                    total,
                    currentOrders,
                    totalOrders,
                    currentOrderNumbers,
                    currentOrderDates,
                  }) => {
                    let newCurrentOrders = [...currentOrders, ...[cart]];
                    let newTotalOrders = [...totalOrders, total];
                    let newCart = [];
                    let newTotal = 0;
                    let newCurrentOrderNumbers = [
                      ...currentOrderNumbers,
                      Date.now(),
                    ];
                    let newCurrentOrderDates = [
                      ...currentOrderDates,
                      new Date().toString(),
                    ];
                    patchUpdateOrder(
                      id,
                      toolsShopApi,
                      newCart,
                      newTotal,
                      newCurrentOrders,
                      newTotalOrders,
                      newCurrentOrderNumbers,
                      newCurrentOrderDates,
                      "orders.html"
                    );
                  }
                );
            });
          }
        }
      });
    } else {
      displayMessage(
        "Log in to add items to your cart!",
        "cart__table_message",
        cartBlock
      );
    }
  }
  return null;
}
