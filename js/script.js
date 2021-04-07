document.addEventListener('DOMContentLoaded', () => {
    const inputEmail = document.querySelectorAll('.header__login_input')[0];
    const formLogin = document.forms[0];
    const form = document.getElementById('registration-form');
    const container = document.getElementById('registration-form-container');
    const API = `http://localhost:3000/users`;

    function checkEmailField() {
        if (!this.value.includes('@')) {
            this.classList.add("error");
            inputEmail.focus();
        } else {
            this.classList.remove("error");
        }
    }

    inputEmail.onblur = checkEmailField;

    async function checkEmailInDb(email) {
        let response = await fetch(`${API}?email=${email}`);
        return await response.json();
    }

    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();

        let email = formLogin.elements.login.value;
        let password = formLogin.elements.password.value;

        if (email === '' || password === '') {
            alert('Fill in the fields');
            return false;
        }

        checkEmailInDb(email).then(user => {
            if (user.length === 0) {
                alert('User with this E-mail does not exist');
            } else {
                if (user[0].password === password) {
                    alert('You are authenticated!!!');
                } else {
                    alert('Wrong password entered');
                }
            }
        });
    })

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
                password: valuePassword
            };

            async function postUserData(data) {
                let response = await fetch(API, {
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
});