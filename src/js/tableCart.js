import ToolsShopApi from "./toolsShopApi";
import changeCartBlock from "./changeCartBlock";
import { login } from "./auth/checkLoggied";
import { reloadPage } from "./helpers";
import displayMessage from "./displayMessage";
import removeItemFromCart from "./removeItemFromCart";
import updateQuantityItem from "./updateQuantityItem";

export default function createTableCart() {
  const toolsShopApi = new ToolsShopApi();

  if (document.querySelector(".cart__table")) {
    let blockCart = document.querySelector(".cart__table");
    let tableCart = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let trTitle = document.createElement("tr");
    let titles = [
      "Id",
      "Product name",
      "Price",
      "Quantity",
      "Total cost",
      "Action",
    ];

    titles.forEach((title) => {
      let th = document.createElement("th");
      th.textContent = title;
      trTitle.append(th);
    });

    if (login) {
      toolsShopApi.checkEmail(login).then(([user]) => {
        const { id, cart, total, currentOrders, totalOrders } = user;
        if (
          typeof user != "undefined" &&
          user.email === login &&
          user.isLoggied === true
        ) {
          let cartItems = 0;
          cart.forEach((item) => (cartItems += item.quantity));
          changeCartBlock(cartItems, total);
          if (cart.length === 0) {
            displayMessage("No goods", "cart__table_message", blockCart);
          } else {
            blockCart.append(tableCart);
            tableCart.append(thead);
            tableCart.append(tbody);
            thead.append(trTitle);
            cart.map((item, idx) => {
              const { title, price, quantity } = item;
              let tr = document.createElement("tr");
              let quantityElement =
                '<i data-subtraction class="far fa-minus-square"></i>' +
                "  <span>" +
                quantity +
                "</span>  " +
                '<i data-addition class="far fa-plus-square"></i>';
              let deleteElement = `<button class="cart__table_delete" data-action>Delete</button>`;
              let cells = [
                idx + 1,
                title,
                price,
                quantityElement,
                `&euro;${price * quantity}`,
                deleteElement,
              ];
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
            let btnOrder = document.createElement("button");
            btnOrder.classList.add("cart__table_order");
            btnOrder.textContent = "To Order";
            totalCart.after(btnOrder);

            tableCart.addEventListener("click", (e) => {
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
                    totalCart
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
                    totalCart
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
                      totalCart
                    );
                  } else {
                    removeItemFromCart(
                      toolsShopApi,
                      id,
                      newCart,
                      newTotal,
                      tr,
                      idxTr,
                      totalCart
                    );
                  }
                });
              }
            });

            btnOrder.addEventListener("click", () => {
              toolsShopApi
                .patchData(id, {
                  currentOrders: [...currentOrders, ...[cart]],
                  totalOrders: [...totalOrders, total],
                  cart: [],
                  total: 0,
                })
                .then(() => {
                  alert("Your order has been sent to the manager!");
                  reloadPage();
                });
            });
          }
        }
      });
    } else {
      displayMessage(
        "Log in to add items to your cart!",
        "cart__table_message",
        blockCart
      );
    }
  }
  return null;
}
