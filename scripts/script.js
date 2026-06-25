let shoppingCart = {};
let subtotal = 0;
let total = 0;

function init() {
    renderDishes();
    renderCart();

    document.getElementById('dialog-input')
        .addEventListener('close', DialogClose);

    document.addEventListener('click', closeCartOnOutsideClick);
}

function closeCartOnOutsideClick(event) {
    const cartRef = document.getElementById('shopping-cart');

    if (!cartRef.classList.contains('cart--mobile')) {
        return;
    }

    const clickedInsideCart = cartRef.contains(event.target);
    const clickedCartToggleButton = event.target.closest('.nav-bar button:last-child');

    if (!clickedInsideCart && !clickedCartToggleButton) {
        mobileShoppingCart();
    }
}
function DialogClose() {
    shoppingCart = {};
    renderCart();
    calculateSum();
    resetAddButtons();
}

function renderDishes() {
    const menuRef = document.getElementById('menu');
    menuRef.innerHTML = "";
    for (let i = 0; i < dishes.length; i++) {
        menuRef.innerHTML += getTemplateDishes(i);
    }
}

function addDishes(i) {
    shoppingCart[i] = (shoppingCart[i] || 0) + 1;
    const btn = document.getElementById(`active-button${i}`);
    btn.innerHTML = "Added to Cart";
    btn.classList.add("btn-add--active");
    calculateSum();
    renderCart();
}

function renderCart() {
    const cartRef = document.getElementById('shopping-cart-content');
    const cartSumRef = document.querySelector('.cart-sum');
    const buyButtonRef = document.getElementById('total-price-button');

    if (Object.keys(shoppingCart).length === 0) {
        cartRef.innerHTML = `
            <div class="empty-cart">
                <p>Nothing here yet.<br>Go ahead and choose something delicious!</p>
                <img src="./assets/icons/ShoppingCartLogo.svg" alt="Shopping Cart">
            </div>
        `;
        cartSumRef.style.display = "none";
        buyButtonRef.style.display = "none";
        return;
    }

    cartSumRef.style.display = "flex";
    buyButtonRef.style.display = "block";

    cartRef.innerHTML = "";

    for (const key of Object.keys(shoppingCart)) {
        cartRef.innerHTML += getCartTemplate(key);
    }
}

function calculateSum() {
    subtotal = 0;
    let amount = 0;
    for (const key of Object.keys(shoppingCart)) {
        subtotal += shoppingCart[key] * dishes[key].price;
        amount += shoppingCart[key];
    }
    total = subtotal > 0 ? subtotal + 5.99 : 0;
    document.getElementById('sub-total-price').innerHTML = subtotal.toFixed(2).replace(".", ",") + " €";
    document.getElementById('total-price').innerHTML = total.toFixed(2).replace(".", ",") + " €";
    document.getElementById('total-price-button').innerHTML = "Buy Now (" + total.toFixed(2).replace(".", ",") + "€)";
    document.getElementById('cart-amount').innerHTML = amount;
}

function changeAmount(key, value) {
    shoppingCart[key] += value;
    if (shoppingCart[key] <= 0) {
        delete shoppingCart[key];
        const btn = document.getElementById(`active-button${key}`);
        btn.innerHTML = "Add to Cart";
        btn.classList.remove("btn-add--active");
    }
    calculateSum();
    renderCart();
}

function openDialoge() {
    const dialogRef = document.getElementById('dialog-input');
    dialogRef.innerHTML = getDialogTemplate();
    dialogRef.showModal();
}

function buyNow() {
    if (Object.keys(shoppingCart).length === 0) {
        return;
    }

    document.getElementById('shopping-cart').classList.remove("cart--mobile");
    unlockScroll();
    openDialoge();
}

function closeAllDialoge() {
    document.getElementById('shopping-cart').classList.remove("cart--mobile");
    unlockScroll();
    document.getElementById('dialog-input').close();
}

function resetAddButtons() {
    for (let i = 0; i < dishes.length; i++) {
        const btn = document.getElementById(`active-button${i}`);
        btn.innerHTML = "Add to Cart";
        btn.classList.remove("btn-add--active");
    }
}

let scrollPosition = 0;

function lockScroll() {
    scrollPosition = window.scrollY;
    document.body.style.top = `-${scrollPosition}px`;
    document.body.classList.add("no-scroll");
}

function unlockScroll() {
    if (!document.body.classList.contains("no-scroll")) {
        return;
    }
    document.body.classList.remove("no-scroll");
    document.body.style.top = "";
    window.scrollTo({ top: scrollPosition, behavior: "instant" });
}

function mobileShoppingCart() {
    const isOpen = document.getElementById('shopping-cart').classList.toggle('cart--mobile');
    if (isOpen) {
        lockScroll();
    } else {
        unlockScroll();
    }
}
