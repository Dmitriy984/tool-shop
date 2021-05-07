import createCallPhoneHeader from "./createCallPhoneHeader";
import createLoginHeader from "./createLoginHeader";
import createCartHeader from "./createCartHeader";
import createSingUpHeader from "./createSingUpHeader";

export const logoHeaderA = document.createElement('a');

export default function createHeader() {
  const page = document.querySelector("#page");
  const header = document.createElement("header");

  const logoHeader = document.createElement("div");
  logoHeader.classList.add("header__logo");
  logoHeaderA.setAttribute('href', '#');
  logoHeaderA.textContent = 'TOOL SHOP';
  logoHeader.append(logoHeaderA);
  header.append(logoHeader);

  const addressHeader = document.createElement("div");
  addressHeader.classList.add("header__address");
  addressHeader.textContent = "Address";
  header.append(addressHeader);

  const callPhoneHeader = createCallPhoneHeader();
  header.append(callPhoneHeader);

  const loginHeader = createLoginHeader();
  header.append(loginHeader);

  const cartHeader = createCartHeader();
  header.append(cartHeader);

  const singUpContainer = createSingUpHeader();
  header.append(singUpContainer);

  page.prepend(header);

  return null;
}
