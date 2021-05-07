import { reloadPage } from "../utils/helpers";

export default function patchUpdateOrder(
  id,
  api,
  cart,
  total,
  currentOrders,
  totalOrders,
  currentOrderNumbers,
  currentOrderDates,
  htmlPage
) {
  api
    .patchData(id, {
      currentOrders,
      totalOrders,
      cart,
      total,
      currentOrderNumbers,
      currentOrderDates
    })
    .then((data) => {
      console.log(data);
      if (cart.length === 0 && htmlPage != null) {
        window.location.href = htmlPage;
      } else {
        reloadPage();
      }
    });
}
