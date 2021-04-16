import { deleteCookie, reloadPage } from "../utils/helpers";
import ToolsShopApi from "../api/toolsShopApi";

export const headerLogin = document.querySelector(".header__login");

export function displayLogoutBlock(login, id) {
  const toolsShopApi = new ToolsShopApi();

  headerLogin.style.display = "none";
  let div = document.createElement("div");
  div.classList.add("header__logout");
  let span = document.createElement("span");
  let btn = document.createElement("button");
  let pOrders = document.createElement("p");
  let cartHeader = document.querySelector(".header__cart");
  cartHeader.before(div);
  div.append(span);
  span.textContent = `${login}`;
  div.append(btn);
  btn.textContent = "Sing Out";
  pOrders.innerHTML = `<a href="orders.html">Orders</a>`;
  div.append(pOrders);

  btn.addEventListener("click", () => {
    deleteCookie("email");
    toolsShopApi.patchData(id, { isLoggied: false });
    displayLoginBlock();
    reloadPage();
  });
}

export function displayLoginBlock() {
  let headerLogout = document.querySelector(".header__logout");
  headerLogin.style.display = "";
  headerLogout.remove();
}
