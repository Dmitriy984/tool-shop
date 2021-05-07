export default function changeCartHeader(cart, total) {
  let cartItems = 0;
  cart.forEach((item) => (cartItems += item.quantity));
  let countItems = document.querySelector(".fa-shopping-cart");
  countItems.innerHTML = `${cartItems} items`;
  let totalCart = document.querySelector(".header__cart p");
  totalCart.innerHTML = `Total: &euro;${total}`;
}
