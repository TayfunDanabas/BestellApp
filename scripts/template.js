function getTemplateDishes(i) {
    return `
    <section class="dish-card">
        <img class="dish-img" src="${dishes[i].image}" alt="${dishes[i].name}">
        <section class="dish-body">
            <div class="dish-info">
                <h3>${dishes[i].name}</h3>
                <p>${dishes[i].ingredients.join(", ")}</p>
            </div>
            <div class="dish-footer">
                <p>${dishes[i].price.toFixed(2).replace(".", ",")} €</p>
                <button id="active-button${i}" onclick="addDishes(${i})" class="btn-add">Add to Cart</button>
            </div>
        </section>
    </section>`;
}

function getCartTemplate(key) {
    return `
    <section class="cart-item">
        <p>${shoppingCart[key]} x ${dishes[key].name}</p>
        <section class="cart-item-footer">
            <section class="cart-item-controls">
                <button onclick="changeAmount(${key}, -1)">-</button>
                ${shoppingCart[key]}
                <button onclick="changeAmount(${key}, +1)">+</button>
            </section>
            <p>${(shoppingCart[key] * dishes[key].price).toFixed(2).replace(".", ",")}€</p>
        </section>
    </section>`;
}

function getDialogTemplate() {
    return `
    <section class="dialog-content">
        <button class="x-btn" onclick="closeAllDialoge()">x</button>
        <img src="./assets/icons/DeliveryTruckLogo.png" alt="">
        <h3>Order Confirmed!</h3>
        <p>Your food is on it's way!</p>
    </section>`;
}
