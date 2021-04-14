import createCartHeaderBlock from './cartHearderBlock';
import checkLoggied from './auth/checkLoggied';
import passSingIn from './auth/passSingIn';
import passSingUp from './auth/passSingUp';
import createGridGoods from './createGridGoods';
import createTableCart from './createTableCart';
import createTableOrder from './createTableOrder';

document.addEventListener("DOMContentLoaded", () => {

  createCartHeaderBlock();
  checkLoggied();
  passSingIn();
  passSingUp();
  createGridGoods();
  createTableCart();
  createTableOrder();

});
