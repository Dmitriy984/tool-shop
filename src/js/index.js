import createCartHeader from "./cart/createCartHeader";
import checkLoggied from "./auth/checkLoggied";
import passSingIn from "./auth/passSingIn";
import passSingUp from "./auth/passSingUp";
import createGridGoods from "./createGridGoods";
import createCartTable from "./cart/createCartTable";
import createOrderBlocks from "./orders/createOrderBlocks";
import createOrderDetails from "./orders/orderDetails";

document.addEventListener("DOMContentLoaded", () => {
  createCartHeader();
  checkLoggied();
  passSingIn();
  passSingUp();
  createGridGoods();
  createCartTable();
  createOrderBlocks();
  createOrderDetails();
});
