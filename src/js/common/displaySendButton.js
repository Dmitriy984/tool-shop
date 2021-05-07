export default function displaySendButton(elemLocation, text) {
    const btn = document.createElement("button");
    btn.classList.add("cart__table_order");
    btn.textContent = text;
    elemLocation.after(btn);

    return btn;
}