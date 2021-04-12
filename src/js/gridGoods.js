import ToolsShopApi from "./toolsShopApi";
import changeCartBlock from "./changeCartBlock";
import { login } from "./auth/checkLoggied";

export default function createGridGoods() {
  const toolsShopApi = new ToolsShopApi();

  if (document.getElementById("grid")) {
    const goodsGrid = document.getElementById("grid");

    toolsShopApi.getGoods().then((goods) => {
      goods.map((item) => {
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
        btnAddCart.setAttribute('id', `${id}`);
        btnAddCart.textContent = "Add to Cart";

        div.append(imageItem);
        div.append(titleItem);
        div.append(priceItem);
        div.append(btnAddCart);
        goodsGrid.append(div);

        btnAddCart.addEventListener("click", () => {
          if (login) {
            toolsShopApi.checkEmail(login).then(([user]) => {
              const { id, email, isLoggied, cart, total } = user;
              let newCart = [...cart];
              let newTotal = total;
              if (
                typeof user != "undefined" &&
                email === login &&
                isLoggied === true
              ) {
                let good = cart.find(el => el.id === item.id);
                const goodIndex = cart.findIndex((el) => el.id === item.id);
                if (good) {
                  cart[goodIndex].quantity += 1;
                } else {
                  newCart = [...newCart, item];
                }
                newTotal += price;
                let cartItems = 0;
                cart.forEach(item => cartItems += item.quantity);
                toolsShopApi.patchData(id, { cart: newCart, total: newTotal }).then(({cart}) => {
                  console.log(cart);
                  changeCartBlock(cartItems, newTotal);
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
