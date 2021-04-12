import changeCartBlock from "../changeCartBlock";
import ToolsShopApi from "../toolsShopApi";
import { displayLogoutBlock } from "./displayAuthBlock";
import { readCookie } from "../helpers";

export let login = readCookie("email");

export default function checkLoggied() {
  const toolsShopApi = new ToolsShopApi();

  if (login) {
    toolsShopApi.checkEmail(login).then(([user]) => {
      const { id, email, isLoggied, cart, total } = user;
      if (typeof user != "undefined" && email === login && isLoggied === true) {
        displayLogoutBlock(email, id);
        let cartItems = 0;
        cart.forEach(item => {
          cartItems += item.quantity;
          toolsShopApi.getGoods().then(goods => {
            let goodCart = goods.find((good) => good.id === item.id);
            const goodCartIndex = goods.findIndex((good) => good.id === item.id);
            if (goodCart && document.getElementById(`${goodCartIndex + 1}`)) {
              let btnIsGoodCart = document.getElementById(`${goodCartIndex + 1}`);
              btnIsGoodCart.textContent = "Added to Cart";
              btnIsGoodCart.classList.add("good_item_added");
            }
          })
        });
        changeCartBlock(cartItems, total);
      }
    });
  }
}
