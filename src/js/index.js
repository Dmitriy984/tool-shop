document.addEventListener("DOMContentLoaded", () => {

  const API = `http://localhost:3000/`;

  //-------------------------------Authentication---------------------------

  const headerLogin = document.querySelector(".header__login");
  const inputEmail = document.querySelectorAll(".header__login_input")[0];
  const formLogin = document.forms[0];

  const form = document.getElementById("registration-form");
  const container = document.getElementById("registration-form-container");

  const headerCart = document.querySelector(".header__cart");
  let spanCart = document.createElement("span");
  let pTotal = document.createElement("p");
  pTotal.style.fontWeight = "bold";
  headerCart.append(spanCart);
  headerCart.append(pTotal);

  let login = readCookie("email");

  function changeCartBlock(count = 0, total = 0) {
    spanCart.innerHTML = `<a href="cart.html"><i class="fas fa-shopping-cart"> ${count} items</i></a>`;
    pTotal.innerHTML = `Total: &euro;${total}`;
  }

  changeCartBlock();

  checkLoggied();

  function checkEmailField() {
    if (!this.value.includes("@")) {
      this.classList.add("error");
      inputEmail.focus();
    } else {
      this.classList.remove("error");
    }
  }

  inputEmail.addEventListener("blur", checkEmailField);

  async function checkEmailInDb(url, email) {
    let response = await fetch(`${url}users?email=${email}`);
    return await response.json();
  }

  async function patchData(url, id, data) {
    let response = await fetch(`${url}users/${id}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  }

  function reloadPage() {
    window.location.reload();
  }

  formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    let emailEntered = formLogin.elements.login.value;
    let passwordEntered = formLogin.elements.password.value;

    if (emailEntered === "" || passwordEntered === "") {
      alert("Fill in the fields");
      return false;
    }

    checkEmailInDb(API, emailEntered).then(([user]) => {
      const { id, email, password } = user;
      if (typeof user == "undefined") {
        alert("User with this E-mail does not exist");
      } else {
        if (password === passwordEntered) {
          displayLogoutBlock(email, id);
          getGoodsFromCart(id).then(({ cart, total }) => {
            changeCartBlock(cart.length, total);
          });
          patchData(API, id, { isLoggied: true });
          document.cookie = `email=${email}`;
          reloadPage();
        } else {
          alert("Wrong password entered");
        }
      }
    });
  });

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

  function displayLogoutBlock(login, id) {
    headerLogin.style.display = "none";
    let div = document.createElement("div");
    div.classList.add("header__logout");
    let span = document.createElement("span");
    let btn = document.createElement("button");
    headerCart.before(div);
    div.append(span);
    span.textContent = `${login}`;
    div.append(btn);
    btn.textContent = "Logout";

    btn.addEventListener("click", () => {
      deleteCookie("email");
      patchData(API, id, { isLoggied: false });
      displayLoginBlock();
      reloadPage();
    });
  }

  function displayLoginBlock() {
    let headerLogout = document.querySelector(".header__logout");
    headerLogin.style.display = "";
    headerLogout.remove();
  }

  function checkLoggied() {
    if (login) {
      checkEmailInDb(API, login).then(([user]) => {
        const { id, email, isLoggied } = user;
        if (
          typeof user != "undefined" &&
          email === login &&
          isLoggied === true
        ) {
          displayLogoutBlock(email, id);
          getGoodsFromCart(id).then(({ cart, total }) => new Promise(function(resolve) {
            changeCartBlock(cart.length, total);
            resolve(cart);
          })).then(cart => {
            getGoods().then((goods) => {
              goods.map((item) => {
                if (cart.includes(item)) {
                  console.log(`${item.id} in the cart`);
                } else {
                  console.log('No goods in cart');
                }
              });
            });
          });
        }
      });
    }
  }

  // -------------------------Registration------------------------

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
    form.elements.login.onblur = checkEmailField;

    form.onsubmit = function () {
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

      async function postUserData(data) {
        let response = await fetch(`${API}users`, {
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

      checkEmailInDb(API, valueLogin).then(([user]) => {
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
    };

    form.cancel.onclick = function () {
      hideCover();
    };

    document.onkeydown = function (e) {
      if (e.key === "Escape") {
        hideCover();
      }
    };

    let lastElem = form.elements[form.elements.length - 1];
    let firstElem = form.elements[0];

    lastElem.onkeydown = function (e) {
      if (e.key === "Tab" && !e.shiftKey) {
        firstElem.focus();
        return false;
      }
    };

    firstElem.onkeydown = function (e) {
      if (e.key === "Tab" && e.shiftKey) {
        lastElem.focus();
        return false;
      }
    };
  });

  //-------------------------Goods Grid----------------------------------------

  async function getGoods() {
    let response = await fetch(`${API}goods`);
    return await response.json();
  }

  async function getGoodsFromCart(id) {
    let response = await fetch(`${API}users/${id}`);
    return await response.json();
  }

  if (document.getElementById("grid")) {
    const goodsGrid = document.getElementById("grid");

    getGoods().then((goods) => {
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
        btnAddCart.textContent = "Add to Cart";

        div.append(imageItem);
        div.append(titleItem);
        div.append(priceItem);
        div.append(btnAddCart);
        goodsGrid.append(div);

        btnAddCart.addEventListener("click", () => {
          if (login) {
            checkEmailInDb(API, login).then(([user]) => {
              const { id, email, isLoggied } = user;
              if (
                typeof user != "undefined" &&
                email === login &&
                isLoggied === true
              ) {
                getGoodsFromCart(id).then(({ cart, total }) => {
                  cart = [...cart, item];
                  total += price;
                  patchData(API, id, { cart, total }).then(() => {
                    btnAddCart.textContent = 'Added to Cart';
                    btnAddCart.classList.add('good_item_added');
                    changeCartBlock(cart.length, total);
                  });
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

  //    --------------------------CartTable-----------------------------

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

    if (login) {
      checkEmailInDb(API, login).then(([user]) => {
        if (
          typeof user != "undefined" &&
          user.email === login &&
          user.isLoggied === true
        ) {
          getGoodsFromCart(user.id).then(({ cart, total }) => {
            if (cart.length === 0) {
              displayMessage("No goods");
            } else {
              blockCart.append(tableCart);
              tableCart.append(thead);
              tableCart.append(tbody);
              thead.append(trTitle);
              cart.map((item, idx) => {
                const { title, price, quantity } = item;
                let tr = document.createElement("tr");
                let quantityElement = '<button id="add"><i class="fas fa-minus"></i></button>'
                    + ' ' + quantity + ' '
                    + '<button id="subtract"><i class="fas fa-plus"></i></button>';
                let cells = [idx + 1, title, quantityElement, price, "actions"];
                cells.forEach((cell) => {
                  let td = document.createElement("td");
                  td.innerHTML = cell;
                  tr.append(td);
                });
                changeCartBlock(cart.length, total);
                tbody.append(tr);
              });
              // document.getElementById('add').addEventListener('click', () => {
              //   console.log('Add');
              // })
              let totalCart = document.createElement("p");
              totalCart.classList.add("cart__table_total");
              totalCart.innerHTML = `Total: &euro;${total}`;
              tableCart.after(totalCart);
            }
          });
        }
      });
    } else {
      displayMessage("Log in to add items to your cart!");
    }
  }
});
