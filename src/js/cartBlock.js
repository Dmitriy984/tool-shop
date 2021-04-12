export default function createCartBlock() {
  const headerCart = document.querySelector(".header__cart");
  let spanCart = document.createElement("span");
  let pTotal = document.createElement("p");
  pTotal.classList.add(".header__cart_total");
  pTotal.style.fontWeight = "bold";
  headerCart.append(spanCart);
  headerCart.append(pTotal);
  spanCart.innerHTML = `<a href="cart.html"><i class="fas fa-shopping-cart"> 0 items</i></a>`;
  pTotal.innerHTML = `Total: &euro;0`;

  return null;
}
