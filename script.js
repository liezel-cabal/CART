const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

// Open and close cart
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

// Select all "Add to Cart" buttons
const addCartButtons = document.querySelectorAll(".add-cart");

addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});

const cartContent = document.querySelector(".cart-content");

// Function to add item to cart
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;
    
    // Check if the product already exists in the cart
    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("This item is already in the cart.");
            return;
        }
    }
    
    // Create cart item element
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button class="decrement">-</button>
                <span class="number">1</span>
                <button class="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    // Remove item from cart
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();
    });

    // Quantity increment/decrement
    const numberElement = cartBox.querySelector(".number");
    const decrementButton = cartBox.querySelector(".decrement");
    const incrementButton = cartBox.querySelector(".increment");

    decrementButton.addEventListener("click", () => {
        let quantity = parseInt(numberElement.textContent);
        if (quantity > 1) {
            quantity--;
            numberElement.textContent = quantity;
            updateTotalPrice();  // Call updateTotal after decrement
        }
    });

    incrementButton.addEventListener("click", () => {
        let quantity = parseInt(numberElement.textContent);
        quantity++;
        numberElement.textContent = quantity;
        updateTotalPrice();  
    });

    updateCartCount(1);

    updateTotalPrice();
};


const updateTotalPrice = () => {
    const cartBoxes = document.querySelectorAll(".cart-box");
    let total = 0;

    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = parseFloat(priceElement.textContent.replace("$", ""));
        const quantity = parseInt(quantityElement.textContent);

        total += price * quantity;
    });

    document.querySelector(".total-price").textContent = `$${total.toFixed(2)}`;
};

let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }    
    };

    const buyNowButton = document.querySelector(".btn-buy");
    buyNowButton.addEventListener("click", () => {
        const cartBoxes = cartContent.querySelectorAll(".cart-box");
        if (cartBoxes.length === 0) {
            alert("Your cart is empty. Please add items toyour cart before buying.");
            return;
        }

        cartBoxes.forEach(cartBox => cartBox.remove());

        cartItemCount = 0;
        updateCartCount(0);

        updateTotalPrice();

        alert("Thank you for your purchase!");
    });
    


