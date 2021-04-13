import createCartBlock from './cartBlock';
import checkLoggied from './auth/checkLoggied';
import passSingIn from './auth/passSingIn';
import passSingUp from './auth/passSingUp';
import createGridGoods from './gridGoods';
import createTableCart from './tableCart';
import createTableOrder from './tableOrder';

document.addEventListener("DOMContentLoaded", () => {

  createCartBlock();
  checkLoggied();
  passSingIn();
  passSingUp();
  createGridGoods();
  createTableCart();
  createTableOrder();

});
