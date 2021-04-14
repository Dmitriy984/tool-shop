/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/auth/checkLoggied.js":
/*!*************************************!*\
  !*** ./src/js/auth/checkLoggied.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "login": () => (/* binding */ login),
/* harmony export */   "default": () => (/* binding */ checkLoggied)
/* harmony export */ });
/* harmony import */ var _changeCartBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../changeCartBlock */ "./src/js/changeCartBlock.js");
/* harmony import */ var _toolsShopApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toolsShopApi */ "./src/js/toolsShopApi.js");
/* harmony import */ var _displayAuthBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./displayAuthBlock */ "./src/js/auth/displayAuthBlock.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../helpers */ "./src/js/helpers.js");





let login = (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.readCookie)("email");

function checkLoggied() {
  const toolsShopApi = new _toolsShopApi__WEBPACK_IMPORTED_MODULE_1__.default();

  if (login) {
    toolsShopApi.checkEmail(login).then(([user]) => {
      const { id, email, isLoggied, cart, total } = user;
      if (typeof user != "undefined" && email === login && isLoggied === true) {
        (0,_displayAuthBlock__WEBPACK_IMPORTED_MODULE_2__.displayLogoutBlock)(email, id);
        let cartItems = 0;
        cart.forEach(item => {
          cartItems += item.quantity;
          toolsShopApi.getGoods().then(goods => {
            let goodCart = goods.find((good) => good.id === item.id);
            const goodCartIndex = goods.findIndex((good) => good.id === item.id);
            if (goodCart && document.getElementById(`${goodCartIndex + 1}`)) {
              let btnIsGoodCart = document.getElementById(`${goodCartIndex + 1}`);
              btnIsGoodCart.nextElementSibling.innerHTML = `${item.quantity}`;
              btnIsGoodCart.textContent = "Added to Cart";
              btnIsGoodCart.classList.add("good_item_added");
            }
          })
        });
        (0,_changeCartBlock__WEBPACK_IMPORTED_MODULE_0__.default)(cartItems, total);
      }
    });
  }
}


/***/ }),

/***/ "./src/js/auth/displayAuthBlock.js":
/*!*****************************************!*\
  !*** ./src/js/auth/displayAuthBlock.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "headerLogin": () => (/* binding */ headerLogin),
/* harmony export */   "displayLogoutBlock": () => (/* binding */ displayLogoutBlock),
/* harmony export */   "displayLoginBlock": () => (/* binding */ displayLoginBlock)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/js/helpers.js");
/* harmony import */ var _toolsShopApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toolsShopApi */ "./src/js/toolsShopApi.js");



const headerLogin = document.querySelector(".header__login");

function displayLogoutBlock(login, id) {
  const toolsShopApi = new _toolsShopApi__WEBPACK_IMPORTED_MODULE_1__.default();

  headerLogin.style.display = "none";
  let div = document.createElement("div");
  div.classList.add("header__logout");
  let span = document.createElement("span");
  let btn = document.createElement("button");
  let pOrders = document.createElement("p");
  let cartHeader = document.querySelector(".header__cart");
  cartHeader.before(div);
  div.append(span);
  span.textContent = `${login}`;
  div.append(btn);
  btn.textContent = "Sing Out";
  pOrders.innerHTML = `<a href="orders.html">Your Orders</a>`;
  div.append(pOrders);

  btn.addEventListener("click", () => {
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.deleteCookie)("email");
    toolsShopApi.patchData(id, { isLoggied: false });
    displayLoginBlock();
    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.reloadPage)();
  });
}

function displayLoginBlock() {
  let headerLogout = document.querySelector(".header__logout");
  headerLogin.style.display = "";
  headerLogout.remove();
}


/***/ }),

/***/ "./src/js/auth/passSingIn.js":
/*!***********************************!*\
  !*** ./src/js/auth/passSingIn.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ passSingIn)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ "./src/js/helpers.js");
/* harmony import */ var _toolsShopApi__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toolsShopApi */ "./src/js/toolsShopApi.js");
/* harmony import */ var _changeCartBlock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../changeCartBlock */ "./src/js/changeCartBlock.js");
/* harmony import */ var _displayAuthBlock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./displayAuthBlock */ "./src/js/auth/displayAuthBlock.js");

// import checkEmailField from "./checkEmailField";




function passSingIn() {
  const toolsShopApi = new _toolsShopApi__WEBPACK_IMPORTED_MODULE_1__.default();

  // const inputEmail = document.querySelectorAll(".header__login_input")[0];
  const formLogin = document.forms[0];

  // inputEmail.addEventListener("blur", () => checkEmailField(inputEmail));

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    let emailEntered = formLogin.elements.login.value;
    let passwordEntered = formLogin.elements.password.value;

    if (emailEntered === "" || passwordEntered === "") {
      alert("Fill in the fields");
      return false;
    }

    toolsShopApi.checkEmail(emailEntered).then(([user]) => {
      const { id, email, password, cart, total } = user;
      if (typeof user == "undefined") {
        alert("User with this E-mail does not exist");
      } else {
        if (password === passwordEntered) {
          (0,_displayAuthBlock__WEBPACK_IMPORTED_MODULE_3__.displayLogoutBlock)(email, id);
          let cartItems = 0;
          cart.forEach(item => cartItems += item.quantity);
          (0,_changeCartBlock__WEBPACK_IMPORTED_MODULE_2__.default)(cartItems, total);
          toolsShopApi.patchData(id, { isLoggied: true });
          document.cookie = `email=${email}`;
          (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.reloadPage)();
        } else {
          alert("Wrong password entered");
        }
      }
    });
  });

  return null;
}


/***/ }),

/***/ "./src/js/auth/passSingUp.js":
/*!***********************************!*\
  !*** ./src/js/auth/passSingUp.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ passSingUp)
/* harmony export */ });
/* harmony import */ var _toolsShopApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../toolsShopApi */ "./src/js/toolsShopApi.js");


function passSingUp() {
  const toolsShopApi = new _toolsShopApi__WEBPACK_IMPORTED_MODULE_0__.default();
  const { checkEmail, postUserData } = toolsShopApi;

  const form = document.getElementById("registration-form");
  const container = document.getElementById("registration-form-container");

  function showCover() {
    let coverDiv = document.createElement("div");
    coverDiv.id = "cover-div";
    document.body.style.overflowY = "hidden";
    document.body.append(coverDiv);
    container.style.display = "block";
  }

  function hideCover() {
    document.getElementById("cover-div").remove();
    document.body.style.overflowY = "";
    container.style.display = "none";
    document.onkeydown = null;
  }

  document.getElementById("show-register").addEventListener("click", () => {
    showCover();
    form.elements.login.focus();
    // form.elements.login.onblur = checkEmailField;

    form.addEventListener('submit', () => {
      let valueLogin = form.login.value;
      let valuePassword = form.password.value;

      if (valueLogin === "" || valuePassword === "") {
        alert("Fill in the fields");
        return false;
      }

      let newUser = {
        id: Date.now(),
        email: valueLogin,
        password: valuePassword,
        cart: [],
        currentOrders: [],
        completedOrders: [],
        totalOrders: [],
        total: 0,
        isLoggied: false,
      };

      checkEmail(valueLogin).then(([user]) => {
        if (user && user.email === valueLogin) {
          alert("User with this E-mail does exist");
        } else {
          postUserData(newUser).then((user) =>
            alert(
              `You are registered! Sign in to your account using your email ${user.email}`
            )
          );
        }
      });

      hideCover();
      return false;
    });

    form.cancel.addEventListener('click', () => hideCover());

    document.addEventListener('keydown', e => {
      if (e.key === "Escape") {
        hideCover();
      }
    });

    let lastElem = form.elements[form.elements.length - 1];
    let firstElem = form.elements[0];

    lastElem.addEventListener('keydown', (e) => {
      if (e.key === "Tab" && !e.shiftKey) {
        firstElem.focus();
        return false;
      }
    });

    firstElem.addEventListener('keydown', (e) => {
      if (e.key === "Tab" && e.shiftKey) {
        lastElem.focus();
        return false;
      }
    });
  });

  return null;
}


/***/ }),

/***/ "./src/js/cartHearderBlock.js":
/*!************************************!*\
  !*** ./src/js/cartHearderBlock.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createCartHeaderBlock)
/* harmony export */ });
function createCartHeaderBlock() {
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


/***/ }),

/***/ "./src/js/changeCartBlock.js":
/*!***********************************!*\
  !*** ./src/js/changeCartBlock.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ changeCartBlock)
/* harmony export */ });
function changeCartBlock(count, total) {
    let countItems = document.querySelector('.fa-shopping-cart');
    countItems.innerHTML = `${count} items`;
    let totalCart = document.querySelector('.header__cart p');
    totalCart.innerHTML = `Total: &euro;${total}`;

    return null;
}

/***/ }),

/***/ "./src/js/displayMessage.js":
/*!**********************************!*\
  !*** ./src/js/displayMessage.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ displayMessage)
/* harmony export */ });

function displayMessage(text, selector, elem) {
    let message = document.createElement("p");
    message.classList.add(selector);
    message.textContent = text;
    elem.append(message);
}

/***/ }),

/***/ "./src/js/gridGoods.js":
/*!*****************************!*\
  !*** ./src/js/gridGoods.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createGridGoods)
/* harmony export */ });
/* harmony import */ var _toolsShopApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toolsShopApi */ "./src/js/toolsShopApi.js");
/* harmony import */ var _changeCartBlock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./changeCartBlock */ "./src/js/changeCartBlock.js");
/* harmony import */ var _auth_checkLoggied__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/checkLoggied */ "./src/js/auth/checkLoggied.js");




function createGridGoods() {
  const toolsShopApi = new _toolsShopApi__WEBPACK_IMPORTED_MODULE_0__.default();

  if (document.getElementById("grid")) {
    const goodsGrid = document.getElementById("grid");

    toolsShopApi.getGoods().then((goods) => {
      goods.map((item) => {
        const { id, title, image, price } = item;
        let div = document.createElement("div");
        div.classList.add("goods_item");
        let imageItem = document.createElement("img");
        imageItem.setAttribute("src", image);
        imageItem.setAttribute("alt", title);
        let titleItem = document.createElement("span");
        titleItem.textContent = `${title}`;
        let priceItem = document.createElement("p");
        priceItem.innerHTML = `Price: &euro;${price}`;
        let btnAddCart = document.createElement("button");
        btnAddCart.setAttribute('id', `${id}`);
        btnAddCart.textContent = "Add to Cart";
        let countItem = document.createElement("span");
        countItem.classList.add('goods_item_count');
        countItem.textContent = '';

        div.append(imageItem);
        div.append(titleItem);
        div.append(priceItem);
        div.append(btnAddCart);
        div.append(countItem);
        goodsGrid.append(div);

        btnAddCart.addEventListener("click", () => {
          if (_auth_checkLoggied__WEBPACK_IMPORTED_MODULE_2__.login) {
            toolsShopApi.checkEmail(_auth_checkLoggied__WEBPACK_IMPORTED_MODULE_2__.login).then(([user]) => {
              const { id, email, isLoggied, cart, total } = user;
              let newCart = [...cart];
              let newTotal = total;
              if (
                typeof user != "undefined" &&
                email === _auth_checkLoggied__WEBPACK_IMPORTED_MODULE_2__.login &&
                isLoggied === true
              ) {
                let good = cart.find(el => el.id === item.id);
                const goodIndex = cart.findIndex((el) => el.id === item.id);
                if (good) {
                  cart[goodIndex].quantity += 1;
                  countItem.textContent = `${cart[goodIndex].quantity}`;
                } else {
                  item.quantity = 1;
                  countItem.textContent = `${item.quantity}`;
                  newCart = [...newCart, item];
                }
                newTotal += price;
                toolsShopApi.patchData(id, { cart: newCart, total: newTotal }).then(({cart}) => {
                  let cartItems = 0;
                  cart.forEach(item => cartItems += item.quantity);
                  (0,_changeCartBlock__WEBPACK_IMPORTED_MODULE_1__.default)(cartItems, newTotal);
                  btnAddCart.textContent = "Added to Cart";
                  btnAddCart.classList.add("good_item_added");
                });
              } else {
                alert("You are not logged in!");
              }
            });
          } else {
            alert("You are not logged in!");
          }
        });
      });
    });
  }

  return null;
}


/***/ }),

/***/ "./src/js/helpers.js":
/*!***************************!*\
  !*** ./src/js/helpers.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "reloadPage": () => (/* binding */ reloadPage),
/* harmony export */   "readCookie": () => (/* binding */ readCookie),
/* harmony export */   "deleteCookie": () => (/* binding */ deleteCookie)
/* harmony export */ });
function reloadPage() {
  window.location.reload();
}

function readCookie(name) {
  const searchName = name + "=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];

    while (c.charAt(0) === " ") {
      c = c.substring(1, c.length);
    }

    if (c.indexOf(searchName) === 0) {
      return c.substring(searchName.length, c.length);
    }
  }

  return null;
}

function deleteCookie(name) {
  const domain = window.location.hostname,
    path = "/"; // root path

  document.cookie = [
    name,
    "=",
    "; expires=" + new Date(0).toUTCString(),
    "; path=" + path,
    "; domain=" + domain,
  ].join("");
}


/***/ }),

/***/ "./src/js/removeItemFromCart.js":
/*!**************************************!*\
  !*** ./src/js/removeItemFromCart.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ removeItemFromCart)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/js/helpers.js");
/* harmony import */ var _changeCartBlock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./changeCartBlock */ "./src/js/changeCartBlock.js");



function removeItemFromCart(
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
        (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.reloadPage)();
      }
      elemTotal.innerHTML = `Total: &euro;${total}`;
      let cartItems = 0;
      cart.forEach((item) => (cartItems += item.quantity));
      (0,_changeCartBlock__WEBPACK_IMPORTED_MODULE_1__.default)(cartItems, total);
    });
}


/***/ }),

/***/ "./src/js/tableCart.js":
/*!*****************************!*\
  !*** ./src/js/tableCart.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createTableCart)
/* harmony export */ });
/* harmony import */ var _toolsShopApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toolsShopApi */ "./src/js/toolsShopApi.js");
/* harmony import */ var _changeCartBlock__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./changeCartBlock */ "./src/js/changeCartBlock.js");
/* harmony import */ var _auth_checkLoggied__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/checkLoggied */ "./src/js/auth/checkLoggied.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./helpers */ "./src/js/helpers.js");
/* harmony import */ var _displayMessage__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./displayMessage */ "./src/js/displayMessage.js");
/* harmony import */ var _removeItemFromCart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./removeItemFromCart */ "./src/js/removeItemFromCart.js");
/* harmony import */ var _updateQuantityItem__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./updateQuantityItem */ "./src/js/updateQuantityItem.js");








function createTableCart() {
  const toolsShopApi = new _toolsShopApi__WEBPACK_IMPORTED_MODULE_0__.default();

  if (document.querySelector(".cart__table")) {
    let blockCart = document.querySelector(".cart__table");
    let tableCart = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let trTitle = document.createElement("tr");
    let titles = [
      "Id",
      "Product name",
      "Price",
      "Quantity",
      "Total cost",
      "Action",
    ];

    titles.forEach((title) => {
      let th = document.createElement("th");
      th.textContent = title;
      trTitle.append(th);
    });

    if (_auth_checkLoggied__WEBPACK_IMPORTED_MODULE_2__.login) {
      toolsShopApi.checkEmail(_auth_checkLoggied__WEBPACK_IMPORTED_MODULE_2__.login).then(([user]) => {
        const { id, cart, total, currentOrders, totalOrders } = user;
        if (
          typeof user != "undefined" &&
          user.email === _auth_checkLoggied__WEBPACK_IMPORTED_MODULE_2__.login &&
          user.isLoggied === true
        ) {
          let cartItems = 0;
          cart.forEach((item) => (cartItems += item.quantity));
          (0,_changeCartBlock__WEBPACK_IMPORTED_MODULE_1__.default)(cartItems, total);
          if (cart.length === 0) {
            (0,_displayMessage__WEBPACK_IMPORTED_MODULE_4__.default)("No goods", "cart__table_message", blockCart);
          } else {
            blockCart.append(tableCart);
            tableCart.append(thead);
            tableCart.append(tbody);
            thead.append(trTitle);
            cart.map((item, idx) => {
              const { title, price, quantity } = item;
              let tr = document.createElement("tr");
              let quantityElement =
                '<i data-subtraction class="far fa-minus-square"></i>' +
                "  <span>" +
                quantity +
                "</span>  " +
                '<i data-addition class="far fa-plus-square"></i>';
              let deleteElement = `<button class="cart__table_delete" data-action>Delete</button>`;
              let cells = [
                idx + 1,
                title,
                price,
                quantityElement,
                `&euro;${price * quantity}`,
                deleteElement,
              ];
              cells.forEach((cell) => {
                let td = document.createElement("td");
                td.innerHTML = cell;
                tr.append(td);
              });
              tbody.append(tr);
            });
            let totalCart = document.createElement("p");
            totalCart.classList.add("cart__table_total");
            totalCart.innerHTML = `Total: &euro;${total}`;
            tableCart.after(totalCart);
            let btnOrder = document.createElement("button");
            btnOrder.classList.add("cart__table_order");
            btnOrder.textContent = "To Order";
            totalCart.after(btnOrder);

            tableCart.addEventListener("click", (e) => {
              let action = e.target.dataset.action;
              let subtraction = e.target.dataset.subtraction;
              let addition = e.target.dataset.addition;

              if (action !== undefined) {
                let tr = e.target.closest("tr");
                let idxTr = tr.rowIndex - 1;
                toolsShopApi.getGoodsFromCart(id).then(({ cart, total }) => {
                  let newTotal =
                    total - cart[idxTr].quantity * cart[idxTr].price;
                  (0,_removeItemFromCart__WEBPACK_IMPORTED_MODULE_5__.default)(
                    toolsShopApi,
                    id,
                    cart,
                    newTotal,
                    tr,
                    idxTr,
                    totalCart
                  );
                });
              }

              if (addition !== undefined) {
                let countItem = e.target.previousElementSibling;
                let tr = e.target.closest("tr");
                let tdTotalCost = e.target.closest("td").nextElementSibling;
                let idxTr = tr.rowIndex - 1;
                toolsShopApi.getGoodsFromCart(id).then(({ cart, total }) => {
                  let newQuantity = cart[idxTr].quantity + 1;
                  let newPrice = cart[idxTr].price * newQuantity;
                  tdTotalCost.innerHTML = `&euro;${newPrice}`;
                  const newCartItem = { ...cart[idxTr], quantity: newQuantity };
                  const newCart = cart.map((item) => {
                    if (item.id === newCartItem.id) {
                      return newCartItem;
                    }
                    return item;
                  });
                  let newTotal = total + cart[idxTr].price;
                  (0,_updateQuantityItem__WEBPACK_IMPORTED_MODULE_6__.default)(
                    toolsShopApi,
                    id,
                    newCart,
                    newTotal,
                    newQuantity,
                    countItem,
                    totalCart
                  );
                });
              }

              if (subtraction !== undefined) {
                let countItem = e.target.nextElementSibling;
                let tr = e.target.closest("tr");
                let tdTotalCost = e.target.closest("td").nextElementSibling;
                let idxTr = tr.rowIndex - 1;
                toolsShopApi.getGoodsFromCart(id).then(({ cart, total }) => {
                  let newQuantity = cart[idxTr].quantity - 1;
                  let newPrice = cart[idxTr].price * newQuantity;
                  tdTotalCost.innerHTML = `&euro;${newPrice}`;
                  const newCartItem = { ...cart[idxTr], quantity: newQuantity };
                  const newCart = cart.map((item) => {
                    if (item.id === newCartItem.id) {
                      return newCartItem;
                    }
                    return item;
                  });
                  let newTotal = total - cart[idxTr].price;
                  if (newQuantity !== 0) {
                    (0,_updateQuantityItem__WEBPACK_IMPORTED_MODULE_6__.default)(
                      toolsShopApi,
                      id,
                      newCart,
                      newTotal,
                      newQuantity,
                      countItem,
                      totalCart
                    );
                  } else {
                    (0,_removeItemFromCart__WEBPACK_IMPORTED_MODULE_5__.default)(
                      toolsShopApi,
                      id,
                      newCart,
                      newTotal,
                      tr,
                      idxTr,
                      totalCart
                    );
                  }
                });
              }
            });

            btnOrder.addEventListener("click", () => {
              toolsShopApi
                .patchData(id, {
                  currentOrders: [...currentOrders, ...[cart]],
                  totalOrders: [...totalOrders, total],
                  cart: [],
                  total: 0,
                })
                .then(() => {
                  alert("Your order has been sent to the manager!");
                  (0,_helpers__WEBPACK_IMPORTED_MODULE_3__.reloadPage)();
                });
            });
          }
        }
      });
    } else {
      (0,_displayMessage__WEBPACK_IMPORTED_MODULE_4__.default)(
        "Log in to add items to your cart!",
        "cart__table_message",
        blockCart
      );
    }
  }
  return null;
}


/***/ }),

/***/ "./src/js/tableOrder.js":
/*!******************************!*\
  !*** ./src/js/tableOrder.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createTableOrder)
/* harmony export */ });
/* harmony import */ var _toolsShopApi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toolsShopApi */ "./src/js/toolsShopApi.js");
/* harmony import */ var _auth_checkLoggied__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth/checkLoggied */ "./src/js/auth/checkLoggied.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./helpers */ "./src/js/helpers.js");
/* harmony import */ var _displayMessage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./displayMessage */ "./src/js/displayMessage.js");





function createTableOrder() {
  const toolsShopApi = new _toolsShopApi__WEBPACK_IMPORTED_MODULE_0__.default();

  if (_auth_checkLoggied__WEBPACK_IMPORTED_MODULE_1__.login && document.querySelector(".order__tables")) {
    const blockOrder = document.querySelector(".order__tables");

    toolsShopApi.checkEmail(_auth_checkLoggied__WEBPACK_IMPORTED_MODULE_1__.login).then(([user]) => {
      const { id, currentOrders, totalOrders } = user;
      if (
        typeof user != "undefined" &&
        user.email === _auth_checkLoggied__WEBPACK_IMPORTED_MODULE_1__.login &&
        user.isLoggied === true
      ) {
        if (currentOrders.length === 0) {
          (0,_displayMessage__WEBPACK_IMPORTED_MODULE_3__.default)("No Orders", "order__tables_message", blockOrder);
        } else {
          for (let i = 0; i < currentOrders.length; i++) {
            let tableOrder = document.createElement("table");
            let thead = document.createElement("thead");
            let tbody = document.createElement("tbody");
            let trTitle = document.createElement("tr");
            let titles = ['Id', 'Product name', 'Price', 'Quantity', 'Total coast'];

            titles.forEach((title) => {
              let th = document.createElement("th");
              th.textContent = title;
              trTitle.append(th);
            });

            blockOrder.append(tableOrder);
            tableOrder.append(thead);
            tableOrder.append(tbody);
            thead.append(trTitle);
            currentOrders[i].map((item, idx) => {
              const { title, price, quantity } = item;
              let tr = document.createElement("tr");
              let cells = [
                idx + 1,
                title,
                `&euro;${price}`,
                quantity,
                `&euro;${price * quantity}`,
              ];
              cells.forEach((cell) => {
                let td = document.createElement("td");
                td.innerHTML = cell;
                tr.append(td);
              });
              tbody.append(tr);
            });
            let totalCart = document.createElement("p");
            totalCart.classList.add("order__tables_total");
            totalCart.innerHTML = `Total: &euro;${totalOrders[i]}`;
            tableOrder.after(totalCart);
            let btnOrder = document.createElement("button");
            btnOrder.classList.add("cart__table_order");
            btnOrder.textContent = "Cancel the order";
            totalCart.after(btnOrder);

            btnOrder.addEventListener("click", () => {
              toolsShopApi
                .patchData(id, {
                  currentOrders: [
                    ...currentOrders.slice(0, i),
                    ...currentOrders.slice(i + 1),
                  ],
                  totalOrders: [
                    ...totalOrders.slice(0, i),
                    ...totalOrders.slice(i + 1),
                  ],
                  cart: [],
                  total: 0,
                })
                .then(() => {
                  alert("Your order has been canceled!");
                  (0,_helpers__WEBPACK_IMPORTED_MODULE_2__.reloadPage)();
                });
            });
          }
        }
      }
    });
  }
  return null;
}


/***/ }),

/***/ "./src/js/toolsShopApi.js":
/*!********************************!*\
  !*** ./src/js/toolsShopApi.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ToolsShopApi)
/* harmony export */ });
class ToolsShopApi {
  constructor() {
    this._apiBase = `http://localhost:3000/`;
    this.getResource = this.getResource.bind(this);
    this.checkResource = this.checkResource.bind(this);
  }

  async getResource(url) {
    const response = await fetch(`${this._apiBase}${url}`);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  }

  getGoods() {
    return this.getResource(`goods`);
  }

  getGoodsFromCart(id) {
    return this.getResource(`users/${id}`);
  }

  async checkResource(url) {
    let response = await fetch(`${this._apiBase}${url}`);

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, status: ${response.status}`);
    }

    return await response.json();
  }

  checkEmail(email) {
    return this.checkResource(`users?email=${email}`);
  }

  async patchData(id, data) {
    let response = await fetch(`${this._apiBase}users/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Could not fetch users/${id}, status: ${response.status}`
      );
    }

    return await response.json();
  }

  async postUserData(data) {
    let response = await fetch(`${this._apiBase}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      return response.json();
    } else {
      alert("Error HTTP: " + response.status);
    }
  }
}


/***/ }),

/***/ "./src/js/updateQuantityItem.js":
/*!**************************************!*\
  !*** ./src/js/updateQuantityItem.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ updateQuantityItem)
/* harmony export */ });
/* harmony import */ var _changeCartBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./changeCartBlock */ "./src/js/changeCartBlock.js");


function updateQuantityItem(
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
      let cartItems = 0;
      cart.forEach((item) => (cartItems += item.quantity));
      (0,_changeCartBlock__WEBPACK_IMPORTED_MODULE_0__.default)(cartItems, total);
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _cartHearderBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cartHearderBlock */ "./src/js/cartHearderBlock.js");
/* harmony import */ var _auth_checkLoggied__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth/checkLoggied */ "./src/js/auth/checkLoggied.js");
/* harmony import */ var _auth_passSingIn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/passSingIn */ "./src/js/auth/passSingIn.js");
/* harmony import */ var _auth_passSingUp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/passSingUp */ "./src/js/auth/passSingUp.js");
/* harmony import */ var _gridGoods__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gridGoods */ "./src/js/gridGoods.js");
/* harmony import */ var _tableCart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tableCart */ "./src/js/tableCart.js");
/* harmony import */ var _tableOrder__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./tableOrder */ "./src/js/tableOrder.js");








document.addEventListener("DOMContentLoaded", () => {

  (0,_cartHearderBlock__WEBPACK_IMPORTED_MODULE_0__.default)();
  (0,_auth_checkLoggied__WEBPACK_IMPORTED_MODULE_1__.default)();
  (0,_auth_passSingIn__WEBPACK_IMPORTED_MODULE_2__.default)();
  (0,_auth_passSingUp__WEBPACK_IMPORTED_MODULE_3__.default)();
  (0,_gridGoods__WEBPACK_IMPORTED_MODULE_4__.default)();
  (0,_tableCart__WEBPACK_IMPORTED_MODULE_5__.default)();
  (0,_tableOrder__WEBPACK_IMPORTED_MODULE_6__.default)();

});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map