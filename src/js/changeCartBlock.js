export default function changeCartBlock(count, total) {
    let countItems = document.querySelector('.fa-shopping-cart');
    countItems.innerHTML = `${count} items`;
    let totalCart = document.querySelector('.header__cart p');
    totalCart.innerHTML = `Total: &euro;${total}`;

    return null;
}