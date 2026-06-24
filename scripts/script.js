let shoppingCart = {};
let subtotal = 0;
let total = 0;

function init() {
    renderDishes();
    renderCart();
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
    document.getElementById('shopping-cart').classList.remove("cart--mobile");
    openDialoge();
}

function closeAllDialoge() {
    document.getElementById('shopping-cart').classList.remove("cart--mobile");
    shoppingCart = {};
    renderCart();
    calculateSum();
    resetAddButtons();
    document.getElementById('dialog-input').close();
}

function resetAddButtons() {
    for (let i = 0; i < dishes.length; i++) {
        const btn = document.getElementById(`active-button${i}`);
        btn.innerHTML = "Add to Cart";
        btn.classList.remove("btn-add--active");
    }
}

function mobileShoppingCart() {
    document.getElementById('shopping-cart').classList.toggle('cart--mobile');
}
