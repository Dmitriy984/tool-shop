export default function displayMessage(text, selector, elem) {
  let message = document.createElement("p");
  message.classList.add(selector);
  message.textContent = text;
  elem.append(message);
}
