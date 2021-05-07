export default function displayTotal(elemLocation, total, selector) {
    const totalElem = document.createElement("div");
    totalElem.classList.add(selector);
    totalElem.innerHTML = `Total: &euro;${total}`;
    elemLocation.after(totalElem);

    return totalElem;
}