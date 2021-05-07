import ToolsShopApi from "../api/toolsShopApi";
import changeCartHeader from "../header/changeCartHeader";
import { login } from "../auth/checkLoggied";

export default function createGoodsGrid() {
  const toolsShopApi = new ToolsShopApi();

  if (document.getElementById("grid")) {
    const goodsGrid = document.getElementById("grid");

    toolsShopApi.getGoods().then((goods) => {
      goods.forEach(item => {
        const { id, title, image, price } = item;
        let div = document.createElement("div");
        div.classList.add("goods_item");
        let imageItem = document.createElement("img");
        imageItem.setAttribute("src", image);
        imageItem.setAttribute("alt", title);
        let titleItem = document.createElement("span");
        titleItem.textContent = `${title}`;
        let priceItem = document.createElement("p");
        priceItem.innerHTML = `Price: &euro;${price}`;
        let btnAddCart = document.createElement("button");
        btnAddCart.setAttribute("id", `${id}`);
        btnAddCart.textContent = "Add to Cart";
        let countItem = document.createElement("span");
        countItem.classList.add("goods_item_count");
        countItem.textContent = "";

        div.append(imageItem);
        div.append(titleItem);
        div.append(priceItem);
        div.append(btnAddCart);
        div.append(countItem);
        goodsGrid.append(div);

        btnAddCart.addEventListener("click", () => {
          if (login) {
            toolsShopApi.checkEmail(login).then(([user]) => {
              const { id, isLoggied, cart, total } = user;
              let newCart = [...cart];
              let newTotal = total;
              if (
                typeof user != "undefined" &&
                isLoggied === true
              ) {
                let good = cart.find((el) => el.id === item.id);
                const goodIndex = cart.findIndex((el) => el.id === item.id);
                if (good) {
                  cart[goodIndex].quantity += 1;
                  countItem.textContent = `${cart[goodIndex].quantity}`;
                } else {
                  item.quantity = 1;
                  countItem.textContent = `${item.quantity}`;
                  newCart = [...newCart, item];
                }
                newTotal += price;
                toolsShopApi
                  .patchData(id, { cart: newCart, total: newTotal })
                  .then(({ cart }) => {
                    changeCartHeader(cart, newTotal);
                    btnAddCart.textContent = "Added to Cart";
                    btnAddCart.classList.add("good_item_added");
                  });
              } else {
                alert("You are not logged in!");
              }
            });
          } else {
            alert("You are not logged in!");
          }
        });
      });
    });
  }

  return null;
}
