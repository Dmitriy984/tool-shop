import ToolsShopApi from "../api/toolsShopApi";
import checkEmailField from "./checkEmailField";

export default function passSingUp() {
  const toolsShopApi = new ToolsShopApi();
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
    form.elements.login.addEventListener("blur", () => checkEmailField(form.elements.login));

    form.addEventListener("submit", () => {
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

      toolsShopApi.checkEmail(valueLogin).then(([user]) => {
        if (user && user.email === valueLogin) {
          alert("User with this E-mail does exist");
        } else {
          toolsShopApi
            .postUserData(newUser)
            .then((user) =>
              alert(
                `You are registered! Sign in to your account using your email ${user.email}`
              )
            );
        }
      });

      hideCover();
      return false;
    });

    form.cancel.addEventListener("click", () => hideCover());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        hideCover();
      }
    });

    let lastElem = form.elements[form.elements.length - 1];
    let firstElem = form.elements[0];

    lastElem.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && !e.shiftKey) {
        firstElem.focus();
        return false;
      }
    });

    firstElem.addEventListener("keydown", (e) => {
      if (e.key === "Tab" && e.shiftKey) {
        lastElem.focus();
        return false;
      }
    });
  });

  return null;
}
