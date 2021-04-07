document.addEventListener('DOMContentLoaded', () => {
    const inputEmail = document.querySelectorAll('.header__login_input')[0];
    inputEmail.onblur = function() {
        if (!this.value.includes('@')) {
            this.classList.add("error");
            inputEmail.focus();
        } else {
            this.classList.remove("error");
        }
    }
    const formLogin = document.forms[0];
    formLogin.addEventListener("focus", (e) => formLogin.elements.login.classList.add('focused'), true);
    formLogin.addEventListener("blur", (e) => formLogin.elements.login.classList.remove('focused'), true);
});