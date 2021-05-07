import changeCartHeader from "../header/changeCartHeader";

export default function updateQuantityItem(
  api,
  id,
  cart,
  total,
  quantity,
  elemCount,
  elemTotal
) {
  api
    .patchData(id, {
      cart: cart,
      total: total,
    })
    .then(({ cart }) => {
      elemCount.textContent = `${quantity}`;
      elemTotal.innerHTML = `Total: &euro;${total}`;
      changeCartHeader(cart, total);
    });
}
