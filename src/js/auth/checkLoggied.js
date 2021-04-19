import changeCartHeader from "../header/changeCartHeader";
import ToolsShopApi from "../api/toolsShopApi";
import { displayLogoutBlock } from "./displayAuthBlock";
import { readCookie } from "../utils/helpers";

export let login = readCookie("email");

export default function checkLoggied() {
  const toolsShopApi = new ToolsShopApi();

  if (login) {
    toolsShopApi.checkEmail(login).then(([user]) => {
      const { id, email, isLoggied, cart, total } = user;
      if (typeof user != "undefined" && isLoggied === true) {
        displayLogoutBlock(email, id);
        cart.forEach((item) => {
          toolsShopApi.getGoods().then((goods) => {
            let goodCart = goods.find((good) => good.id === item.id);
            const goodCartIndex = goods.findIndex(
              (good) => good.id === item.id
            );
            if (goodCart && document.getElementById(`${goodCartIndex + 1}`)) {
              let btnIsGoodCart = document.getElementById(
                `${goodCartIndex + 1}`
              );
              btnIsGoodCart.nextElementSibling.innerHTML = `${item.quantity}`;
              btnIsGoodCart.textContent = "Added to Cart";
              btnIsGoodCart.classList.add("good_item_added");
            }
          });
        });
        changeCartHeader(cart, total);
      }
    });
  }

  return null;
}
