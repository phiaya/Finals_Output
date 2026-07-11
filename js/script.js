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

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("click", (e) => {

        if (e.target.classList.contains("cart-btn")) return;

        const img = card.querySelector("img");
        const name = card.querySelector("h3").innerText;
        const desc = img.dataset.description;
        const price = card.querySelector("h4").innerText;

        modalImg.src = img.src;
        modalName.innerText = name;
        modalDesc.innerText = desc;
        modalPrice.innerText = price;

        modal.classList.add("active");

    });

});

closeModal.onclick = () => {
    modal.classList.remove("active");
};

window.onclick = (e) => {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
};


// ==========================================
// SHOPPING CART
// ==========================================

const cartBtn = document.getElementById("cart-btn");
const cartPanel = document.getElementById("cart-panel");
const closeCart = document.getElementById("close-cart");

cartBtn.addEventListener("click", () => {
    cartPanel.classList.add("active");
});

closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("active");
});

// ==========================================
// SHOPPING CART LOGIC
// ==========================================

let cart = [];

const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const cartCount = document.getElementById("cart-count");
const modalCartBtn = document.getElementById("modal-cart");
const clearCartBtn = document.getElementById("clear-cart");

let currentProduct = {};


// ==========================================
// SAVE CURRENT PRODUCT WHEN MODAL OPENS
// ==========================================

document.querySelectorAll(".card").forEach(card => {

    card.addEventListener("click",(e)=>{

        if(e.target.classList.contains("cart-btn")) return;

        currentProduct = {

            name: card.querySelector("h3").innerText,

            price: parseInt(
                card.querySelector("h4").innerText.replace(/[₱,]/g,"")
            ),

            image: card.querySelector("img").src

        };

    });

});


// ==========================================
// ADD TO CART FROM MODAL
// ==========================================

modalCartBtn.addEventListener("click",()=>{

    const existing = cart.find(item=>item.name===currentProduct.name);

    if(existing){

        existing.quantity++;

    }else{

        cart.push({

            ...currentProduct,

            quantity:1

        });

    }

    updateCart();

    modal.classList.remove("active");

});


// ==========================================
// UPDATE CART
// ==========================================

function updateCart(){

    cartItems.innerHTML="";

    let total=0;

    let count=0;

    if(cart.length===0){

        cartItems.innerHTML="<p>Your cart is empty.</p>";

    }

    cart.forEach((item,index)=>{

        total+=item.price*item.quantity;

        count+=item.quantity;

        cartItems.innerHTML+=`

        <div class="cart-item">

            <div>

                <strong>${item.name}</strong>

                <br>

                ₱${item.price.toLocaleString()}

                <br>

                Qty: ${item.quantity}

            </div>

            <button onclick="removeItem(${index})">

                Remove

            </button>

        </div>

        `;

    });

    cartTotal.innerText="₱"+total.toLocaleString();

    cartCount.innerText=count;

}


// ==========================================
// REMOVE ITEM
// ==========================================

function removeItem(index){

    cart.splice(index,1);

    updateCart();

}


// ==========================================
// CLEAR CART
// ==========================================

clearCartBtn.addEventListener("click",()=>{

    cart=[];

    updateCart();

});


// ==========================================
// ADD TO CART BUTTON ON PRODUCT CARD
// ==========================================

document.querySelectorAll(".card .cart-btn").forEach(button=>{

    button.addEventListener("click",(e)=>{

        e.stopPropagation();

        const card=button.closest(".card");

        const product={

            name:card.querySelector("h3").innerText,

            price:parseInt(

                card.querySelector("h4").innerText.replace(/[₱,]/g,"")

            ),

            image:card.querySelector("img").src,

            quantity:1

        };

        const existing=cart.find(item=>item.name===product.name);

        if(existing){

            existing.quantity++;

        }else{

            cart.push(product);

        }

        updateCart();

    });

});


// ==========================================
// INITIALIZE CART
// ==========================================

updateCart();

// ==========================================
// CHECKOUT
// ==========================================

const checkoutBtn = document.getElementById("checkout-btn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click",()=>{

        if(cart.length===0){

            alert("🛒 Your cart is empty!");

            return;

        }

        alert(
            "🎉 Thank you for your order!\n\n" +
            "Your order has been placed successfully."
        );

        cart=[];

        updateCart();

        cartPanel.classList.remove("active");

    });

}