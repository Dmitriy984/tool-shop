import createCartHeader from "./cart/createCartHeader";
import checkLoggied from "./auth/checkLoggied";
import passSingIn from "./auth/passSingIn";
import passSingUp from "./auth/passSingUp";
import createGridGoods from "./createGridGoods";
import createCartTable from "./cart/createCartTable";
import createOrderTable from "./orders/createOrderTable";

document.addEventListener("DOMContentLoaded", () => {
  createCartHeader();
  checkLoggied();
  passSingIn();
  passSingUp();
  createGridGoods();
  createCartTable();
  createOrderTable();
});
