import { reloadPage } from "../utils/helpers";
import changeCartHeader from "../header/changeCartHeader";

export default function removeItemFromCart(
  api,
  id,
  cart,
  total,
  row,
  rowId,
  elemTotal
) {
  api
    .patchData(id, {
      cart: [...cart.slice(0, rowId), ...cart.slice(rowId + 1)],
      total: total,
    })
    .then(({ cart }) => {
      row.parentElement.removeChild(row);
      if (cart.length === 0) {
        reloadPage();
      }
      elemTotal.innerHTML = `Total: &euro;${total}`;
      changeCartHeader(cart, total);
    });
}
