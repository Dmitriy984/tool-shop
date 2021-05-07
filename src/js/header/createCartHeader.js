export default function createCartHeader() {
  const cartHeader = document.createElement("div");
  cartHeader.classList.add("header__cart");

  let spanCart = document.createElement("span");
  spanCart.innerHTML = `<a href="cart.html"><i class="fas fa-shopping-cart"> 0 items</i></a>`;
  cartHeader.append(spanCart);

  let pTotal = document.createElement("p");
  pTotal.classList.add(".header__cart_total");
  pTotal.style.fontWeight = "bold";
  pTotal.innerHTML = `Total: &euro;0`;
  cartHeader.append(pTotal);

  return cartHeader;
}
