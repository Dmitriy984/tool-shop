export const loginHeader = document.createElement("div");

export default function createLoginHeader() {
  loginHeader.classList.add("header__login");
  const singInForm = document.createElement("form");
  loginHeader.append(singInForm);

  const formFieldData = [
    {
      id: "login",
      text: "E-mail",
      type: "text",
      name: "login",
      className: "header__login_input",
      tabindex: "1",
      autocomplete: "username",
    },
    {
      id: "password",
      text: "Password",
      type: "password",
      name: "password",
      className: "header__login_input",
      tabindex: "2",
      autocomplete: "current-password",
    },
  ];

  formFieldData.forEach(
    ({ id, text, type, name, className, tabindex, autocomplete }) => {
      const div = document.createElement("div");
      const label = document.createElement("label");
      label.setAttribute("for", `${id}`);
      label.textContent = `${text}`;
      div.append(label);
      const input = document.createElement("input");
      input.setAttribute("id", `${id}`);
      input.setAttribute("type", `${type}`);
      input.setAttribute("name", `${name}`);
      input.setAttribute("class", `${className}`);
      input.setAttribute("tabindex", `${tabindex}`);
      input.setAttribute("autocomplete", `${autocomplete}`);
      div.append(input);
      singInForm.append(div);
    }
  );

  const singInInput = document.createElement("input");
  singInInput.setAttribute("type", "submit");
  singInInput.setAttribute("value", "Sing In");
  singInInput.classList.add("header__login_input");
  singInForm.append(singInInput);

  const singUpButton = document.createElement("button");
  singUpButton.setAttribute("id", "show-register");
  singUpButton.textContent = "Sing Up";
  loginHeader.append(singUpButton);

  return loginHeader;
}
