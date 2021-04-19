import createHeader from "./header/createHeader";
import checkLoggied from "./auth/checkLoggied";
import passSingIn from "./auth/passSingIn";
import passSingUp from "./auth/passSingUp";
import createGoodsGrid from "./goodsGrid/createGoodsGrid";
import createCartTable from "./cart/createCartTable";
import createOrderBlocks from "./orders/createOrderBlocks";
import createOrderDetails from "./orders/orderDetails";
import '../scss/main.scss';

document.addEventListener("DOMContentLoaded", () => {
  createHeader();
  checkLoggied();
  passSingIn();
  passSingUp();
  createGoodsGrid();
  createCartTable();
  createOrderBlocks();
  createOrderDetails();
});
