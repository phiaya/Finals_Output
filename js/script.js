console.log("script loaded");
// ==========================================
// DARK MODE
// ==========================================

const themeBtn = document.getElementById("theme-btn");

if (themeBtn) {
    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        const icon = themeBtn.querySelector("i");

        if (document.body.classList.contains("dark")) {
            icon.classList.replace("fa-moon", "fa-sun");
        } else {
            icon.classList.replace("fa-sun", "fa-moon");
        }
    });
}


// ==========================================
// PRODUCT MODAL
// ==========================================

const modal = document.getElementById("product-modal");
const modalImg = document.getElementById("modal-image");
const modalName = document.getElementById("modal-name");
const modalDesc = document.getElementById("modal-description");
const modalPrice = document.getElementById("modal-price");
const closeModal = document.querySelector(".close");

let currentProduct = {};

if (modal) {

    document.querySelectorAll(".card").forEach(card => {

        card.addEventListener("click", (e) => {

            if (e.target.classList.contains("cart-btn")) return;

            const img = card.querySelector("img");

            currentProduct = {
                name: card.querySelector("h3").innerText,
                price: parseInt(card.querySelector("h4").innerText.replace(/[₱,]/g, "")),
                image: img.src
            };

            modalImg.src = img.src;
            modalName.innerText = currentProduct.name;
            modalDesc.innerText = img.dataset.description || "";
            modalPrice.innerText = card.querySelector("h4").innerText;

            modal.classList.add("active");

        });

    });

    if (closeModal) {
        closeModal.addEventListener("click", () => {
            modal.classList.remove("active");
        });
    }

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.remove("active");
        }
    });

}


// ==========================================
// SHOPPING CART
// ==========================================

let cart = [];

const cartBtn = document.getElementById("cart-btn");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.getElementById("close-cart");

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");

const modalCartBtn = document.getElementById("modal-cart");
const clearCartBtn = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout-btn");


// Open Cart

if (cartBtn && cartPanel) {

    cartBtn.addEventListener("click", () => {
        cartPanel.classList.add("active");
    });

}

// Close Cart

if (closeCart && cartPanel) {

    closeCart.addEventListener("click", () => {
        cartPanel.classList.remove("active");
    });

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    if (!cartItems || !cartTotal || !cartCount) return;

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    if (cart.length === 0) {

        cartItems.innerHTML = "<p>Your cart is empty.</p>";

    }

    cart.forEach((item, index) => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong><br>
                    ₱${item.price.toLocaleString()}<br>
                    Qty: ${item.quantity}
                </div>

                <button onclick="removeItem(${index})">
                    Remove
                </button>
            </div>
        `;

    });

    cartTotal.innerText = "₱" + total.toLocaleString();
    cartCount.innerText = count;

}


// ==========================================
// REMOVE ITEM
// ==========================================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}

window.removeItem = removeItem;


// ==========================================
// ADD TO CART (CARD BUTTON)
// ==========================================

document.querySelectorAll(".card .cart-btn").forEach(button => {

    button.addEventListener("click", (e) => {

        e.stopPropagation();

        const card = button.closest(".card");

        const product = {

            name: card.querySelector("h3").innerText,

            price: parseInt(
                card.querySelector("h4").innerText.replace(/[₱,]/g, "")
            ),

            image: card.querySelector("img").src,

            quantity: 1

        };

        const existing = cart.find(item => item.name === product.name);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push(product);
        }

        updateCart();

    });

});


// ==========================================
// ADD TO CART (MODAL BUTTON)
// ==========================================

if (modalCartBtn) {

    modalCartBtn.addEventListener("click", () => {

        const existing = cart.find(item => item.name === currentProduct.name);

        if (existing) {
            existing.quantity++;
        } else {

            cart.push({
                ...currentProduct,
                quantity: 1
            });

        }

        updateCart();

        if (modal) {
            modal.classList.remove("active");
        }

    });

}


// ==========================================
// CLEAR CART
// ==========================================

if (clearCartBtn) {

    clearCartBtn.addEventListener("click", () => {

        cart = [];

        updateCart();

    });

}


// ==========================================
// CHECKOUT
// ==========================================

if (checkoutBtn) {

    checkoutBtn.addEventListener("click", () => {

        if (cart.length === 0) {

            alert("🛒 Your cart is empty!");

            return;

        }

        alert(
            "🎉 Thank you for your order!\n\nYour order has been placed successfully."
        );

        cart = [];

        updateCart();

        if (cartPanel) {
            cartPanel.classList.remove("active");
        }

    });

}


// ==========================================
// GREETING
// ==========================================

const greeting = document.getElementById("greeting");

if (greeting) {

    const hour = new Date().getHours();

    if (hour < 12) {
        greeting.innerText = "Good Morning! ☀️";
    } else if (hour < 18) {
        greeting.innerText = "Good Afternoon! 🌤️";
    } else {
        greeting.innerText = "Good Evening! 🌙";
    }

}


// ==========================================
// DATE & TIME
// ==========================================

function updateDateTime() {

    const dateTime = document.getElementById("datetime");

    if (!dateTime) return;

    const now = new Date();

    dateTime.textContent = now.toLocaleString();

}

updateDateTime();
setInterval(updateDateTime, 1000);


const buttons = document.querySelectorAll(".filter-btn");
const sections = document.querySelectorAll(".category-section");

buttons.forEach(button => {
    button.addEventListener("click", () => {

        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const target = button.dataset.target;

        sections.forEach(section => {

            if (target === "all") {
                section.style.display = "block";
            } else {
                section.style.display =
                    section.id === target ? "block" : "none";
            }

        });

    });
});
