document.addEventListener('DOMContentLoaded', () => {

    //-------------------------------Authentication---------------------------

    const headerCart = document.querySelector('.header__cart');
    const headerLogin = document.querySelector('.header__login');
    const inputEmail = document.querySelectorAll('.header__login_input')[0];
    const formLogin = document.forms[0];
    const form = document.getElementById('registration-form');
    const container = document.getElementById('registration-form-container');
    const API = `http://localhost:3000/`;
    let spanCart = document.createElement('span');
    let pTotal = document.createElement('p');
    pTotal.style.fontWeight = 'bold';
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
        if (!this.value.includes('@')) {
            this.classList.add("error");
            inputEmail.focus();
        } else {
            this.classList.remove("error");
        }
    }

    inputEmail.addEventListener('blur', checkEmailField);

    async function checkEmailInDb(email) {
        let response = await fetch(`${API}users?email=${email}`);
        return await response.json();
    }

    function reloadPage() {
        window.location.reload();
    }

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        let email = formLogin.elements.login.value;
        let password = formLogin.elements.password.value;

        if (email === '' || password === '') {
            alert('Fill in the fields');
            return false;
        }

        checkEmailInDb(email).then(([user]) => {
            if (typeof user == "undefined") {
                alert('User with this E-mail does not exist');
            } else {
                if (user.password === password) {
                    displayLogoutBlock(user.email, user.id);
                    getGoodsFromCart(user.id).then(({cart, total}) => {
                        changeCartBlock(cart.length, total);
                    });
                    (async () => {
                        await fetch(`${API}users/${user.id}`, {
                            method: 'PATCH',
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ isLoggied: true })
                        });
                    })();
                    document.cookie = `email=${user.email}`;
                    reloadPage();
                } else {
                    alert('Wrong password entered');
                }
            }
        });
    })

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
            path = '/'; // root path

        document.cookie = [
            name, '=',
            '; expires=' + new Date(0).toUTCString(),
            '; path=' + path,
            '; domain=' + domain
        ].join('');
    }

    function displayLogoutBlock(login, id) {
        headerLogin.style.display = 'none';
        let div = document.createElement('div');
        div.classList.add('header__logout');
        let span = document.createElement('span');
        let btn = document.createElement('button');
        headerCart.before(div);
        div.append(span);
        span.textContent = `${login}`;
        div.append(btn);
        btn.textContent = 'Logout';

        btn.addEventListener('click', () => {
            deleteCookie('email');
            (async () => {
                await fetch(`${API}users/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ isLoggied: false })
                });
            })();
            displayLoginBlock();
            reloadPage();
        });
    }

    function displayLoginBlock() {
        let headerLogout = document.querySelector('.header__logout');
        headerLogin.style.display = '';
        headerLogout.remove();
    }

    function checkLoggied() {
        if (login) {
            checkEmailInDb(login).then(([user]) => {
                if (typeof user != "undefined"
                    && user.email === login
                    && user.isLoggied === true) {
                    displayLogoutBlock(user.email, user.id);
                    getGoodsFromCart(user.id).then(({cart, total}) => {
                        changeCartBlock(cart.length, total);
                    });
                }
            });
        }
    }


    // -------------------------Registration------------------------

    function showCover() {
        let coverDiv = document.createElement('div');
        coverDiv.id = 'cover-div';
        document.body.style.overflowY = 'hidden';
        document.body.append(coverDiv);
        container.style.display = 'block';
    }

    function hideCover() {
        document.getElementById('cover-div').remove();
        document.body.style.overflowY = '';
        container.style.display = 'none';
        document.onkeydown = null;
    }

     document.getElementById('show-register').addEventListener('click', () => {
        showCover();
        form.elements.login.focus();
        form.elements.login.onblur = checkEmailField;

        form.onsubmit = function() {
            let valueLogin = form.login.value;
            let valuePassword = form.password.value;

            if (valueLogin === '' || valuePassword === '') {
                alert('Fill in the fields');
                return false;
            }

            let newUser = {
                id: Date.now(),
                email: valueLogin,
                password: valuePassword,
                cart: [],
                total: 0,
                isLoggied: false
            };

            async function postUserData(data) {
                let response = await fetch(`${API}users`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(data)
                });

                if (response.ok) {
                    alert('You are registered!');
                } else {
                    alert("Error HTTP: " + response.status);
                }
            }

            checkEmailInDb(valueLogin).then(user => {
                if (user[0] && user[0].email === valueLogin) {
                    alert('User with this E-mail does exist');
                } else {
                    postUserData(newUser);
                }
            });

            hideCover();
            return false;
        };

        form.cancel.onclick = function() {
            hideCover();
        };

        document.onkeydown = function(e) {
            if (e.key === 'Escape') {
                hideCover();
            }
        };

        let lastElem = form.elements[form.elements.length - 1];
        let firstElem = form.elements[0];

        lastElem.onkeydown = function(e) {
            if (e.key === 'Tab' && !e.shiftKey) {
                firstElem.focus();
                return false;
            }
        };

        firstElem.onkeydown = function(e) {
            if (e.key === 'Tab' && e.shiftKey) {
                lastElem.focus();
                return false;
            }
        };
    });


//-------------------------Goods Grid----------------------------------------

    async function getGoodsFromCart(id) {
        let response = await fetch(`${API}users/${id}`);
        return await response.json();
    }

    if ( document.getElementById('grid') ) {
        const goodsGrid = document.getElementById('grid');

        async function getGoods() {
            let response = await fetch(`${API}goods`);
            return await response.json();
        }

        getGoods().then(goods => {
            goods.map(item => {
                let div = document.createElement('div');
                div.classList.add('goods_item');
                let imageItem = document.createElement('img');
                imageItem.setAttribute('src', item.image);
                imageItem.setAttribute('alt', item.title);
                let titleItem = document.createElement('span');
                titleItem.textContent = `${item.title}`;
                let priceItem = document.createElement('p');
                priceItem.innerHTML = `Price: &euro;${item.price}`;
                let btnAddCart = document.createElement('button');
                btnAddCart.textContent = 'Add to Cart';
                div.append(imageItem);
                div.append(titleItem);
                div.append(priceItem);
                div.append(btnAddCart);
                goodsGrid.append(div);

                btnAddCart.addEventListener('click', () => {
                    if (login) {
                        checkEmailInDb(login).then(([user]) => {
                            if (typeof user != "undefined"
                                && user.email === login
                                && user.isLoggied === true) {
                                getGoodsFromCart(user.id).then(({cart, total}) => {
                                    cart = [...cart, item];
                                    total += item.price;
                                    (async () => {
                                        await fetch(`${API}users/${user.id}`, {
                                            method: 'PATCH',
                                            headers: {
                                                'Accept': 'application/json',
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({ cart, total })
                                        });
                                    })();
                                    changeCartBlock(cart.length, total);
                                    console.log(cart);
                                    console.log(total);
                                });
                            } else {
                                alert ('You are not logged in!');
                            }
                        });
                    } else {
                        alert ('You are not logged in!');
                    }
                })
            });
        });
    }


//    --------------------------CartTable-----------------------------

    if (document.querySelector('.cart__table')) {
        let blockCart = document.querySelector('.cart__table');
        let tableCart = document.createElement('table');
        let trTitle = document.createElement('tr');
        let titles = ['Id', 'Product name', 'Quantity', 'Price', 'Actions'];

        titles.forEach(title => {
            let th = document.createElement('th');
            th.textContent = title;
            trTitle.append(th);
        });

        if (login) {
            checkEmailInDb(login).then(([user]) => {
                if (typeof user != "undefined"
                    && user.email === login
                    && user.isLoggied === true) {
                    getGoodsFromCart(user.id).then(({cart, total}) => {
                        if (cart.length === 0) {
                            console.log("No goods");
                        } else {
                            blockCart.append(tableCart);
                            tableCart.append(trTitle);
                            cart.map((item, idx, ) => {
                                total += item.price;
                                let tr = document.createElement('tr');
                                let cells = [idx + 1, item.title, 1, item.price, 'actions'];
                                cells.forEach(cell => {
                                    let td = document.createElement('td');
                                    td.textContent = cell;
                                    tr.append(td);
                                });
                                changeCartBlock(cart.length, total);
                                tableCart.append(tr);
                            });
                            let totalCart = document.createElement('p');
                            totalCart.classList.add('cart__table_total');
                            totalCart.innerHTML = `Total: &euro;${total}`;
                            tableCart.after(totalCart);
                            console.log(cart);
                        }
                    });
                }
            });
        } else {
            let message = document.createElement('p');
            message.classList.add('cart__table_message');
            message.textContent = 'Log in to add items to your cart!';
            blockCart.append(message);
        }
    }

});