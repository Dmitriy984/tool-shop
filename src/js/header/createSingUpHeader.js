export const formContainer = document.createElement("div");
export const form = document.createElement("form");

export default function createSingUpHeader() {
  formContainer.setAttribute('id', 'registration-form-container');
  form.setAttribute('id', 'registration-form')
  formContainer.append(form);

  const formH1 = document.createElement("h1");
  formH1.textContent = "Registration";
  form.append(formH1);

  const formFieldsData = [
    { id: "reg-login", text: "E-mail", name: "login", type: "text" },
    {
      id: "reg-password",
      text: "Password",
      name: "password",
      type: "password",
    },
  ];

  formFieldsData.forEach(({ id, text, name, type }) => {
    const div = document.createElement("div");
    const label = document.createElement("label");
    label.setAttribute("for", `${id}`);
    label.textContent = `${text}`;
    div.append(label);
    const input = document.createElement("input");
    input.setAttribute("id", `${id}`);
    input.setAttribute("name", `${name}`);
    input.setAttribute("type", `${type}`);
    div.append(input);
    form.append(div);
  });

  const formButtonsDiv = document.createElement("div");
  form.append(formButtonsDiv);

  const buttonsData = [
    { type: "submit", name: "ok", value: "Ok" },
    { type: "button", name: "cancel", value: "Cancel" },
  ];

  buttonsData.forEach(({ type, name, value }) => {
    const input = document.createElement("input");
    input.setAttribute("type", `${type}`);
    input.setAttribute("name", `${name}`);
    input.setAttribute("value", `${value}`);
    formButtonsDiv.append(input);
  });

  return formContainer;
}
