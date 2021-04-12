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
  let cartHeader = document.querySelector(".header__cart");
  cartHeader.before(div);
  div.append(span);
  span.textContent = `${login}`;
  div.append(btn);
  btn.textContent = "Sing Out";

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

/***/ "./src/js/cartBlock.js":
/*!*****************************!*\
  !*** ./src/js/cartBlock.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ createCartBlock)
/* harmony export */ });
function createCartBlock() {
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

        div.append(imageItem);
        div.append(titleItem);
        div.append(priceItem);
        div.append(btnAddCart);
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
                } else {
                  newCart = [...newCart, item];
                }
                newTotal += price;
                let cartItems = 0;
                cart.forEach(item => cartItems += item.quantity);
                toolsShopApi.patchData(id, { cart: newCart, total: newTotal }).then(({cart}) => {
                  console.log(cart);
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




function createTableCart() {
  const toolsShopApi = new _toolsShopApi__WEBPACK_IMPORTED_MODULE_0__.default();

  if (document.querySelector(".cart__table")) {
    let blockCart = document.querySelector(".cart__table");
    let tableCart = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let trTitle = document.createElement("tr");
    let titles = ["Id", "Product name", "Quantity", "Price", "Action"];

    titles.forEach((title) => {
      let th = document.createElement("th");
      th.textContent = title;
      trTitle.append(th);
    });

    function displayMessage(text) {
      let message = document.createElement("p");
      message.classList.add("cart__table_message");
      message.textContent = text;
      blockCart.append(message);
    }

    if (_auth_checkLoggied__WEBPACK_IMPORTED_MODULE_2__.login) {
      toolsShopApi.checkEmail(_auth_checkLoggied__WEBPACK_IMPORTED_MODULE_2__.login).then(([user]) => {
        const { cart, total } = user;
        if (
            typeof user != "undefined" &&
            user.email === _auth_checkLoggied__WEBPACK_IMPORTED_MODULE_2__.login &&
            user.isLoggied === true
        ) {
          let cartItems = 0;
          cart.forEach(item => cartItems += item.quantity);
          (0,_changeCartBlock__WEBPACK_IMPORTED_MODULE_1__.default)(cartItems, total);
          if (cart.length === 0) {
            displayMessage("No goods");
          } else {
            blockCart.append(tableCart);
            tableCart.append(thead);
            tableCart.append(tbody);
            thead.append(trTitle);
            cart.map((item, idx) => {
              const {title, price, quantity} = item;
              let tr = document.createElement("tr");
              let quantityElement =
                  '<button class="cart__table_add"><i class="fas fa-minus"></i></button>' +
                  " " +
                  quantity +
                  " " +
                  '<button class="cart__table_subtract"><i class="fas fa-plus"></i></button>';
              let deleteElement = `<button class="cart__table_delete">Delete</button>`;
              let cells = [idx + 1, title, quantityElement, price, deleteElement];
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
          }
        }
      });
    } else {
      displayMessage("Log in to add items to your cart!");
    }
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
/* harmony import */ var _cartBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./cartBlock */ "./src/js/cartBlock.js");
/* harmony import */ var _auth_checkLoggied__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth/checkLoggied */ "./src/js/auth/checkLoggied.js");
/* harmony import */ var _auth_passSingIn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./auth/passSingIn */ "./src/js/auth/passSingIn.js");
/* harmony import */ var _auth_passSingUp__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./auth/passSingUp */ "./src/js/auth/passSingUp.js");
/* harmony import */ var _gridGoods__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gridGoods */ "./src/js/gridGoods.js");
/* harmony import */ var _tableCart__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tableCart */ "./src/js/tableCart.js");







document.addEventListener("DOMContentLoaded", () => {

  (0,_cartBlock__WEBPACK_IMPORTED_MODULE_0__.default)();
  (0,_auth_checkLoggied__WEBPACK_IMPORTED_MODULE_1__.default)();
  (0,_auth_passSingIn__WEBPACK_IMPORTED_MODULE_2__.default)();
  (0,_auth_passSingUp__WEBPACK_IMPORTED_MODULE_3__.default)();
  (0,_gridGoods__WEBPACK_IMPORTED_MODULE_4__.default)();
  (0,_tableCart__WEBPACK_IMPORTED_MODULE_5__.default)();

});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map