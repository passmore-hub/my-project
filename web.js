
const products = [
    {
        id: 1,
        name: "Classic Men's Suit",
        category: "men",
        price: 85000,
        image: ""
    },
    {
        id: 2,
        name: "Men's Casual Shirt",
        category: "men",
        price: 18000,
        image: ""
    },
    {
        id: 3,
        name: "Men's Fashion Jacket",
        category: "men",
        price: 35000,
        image: ""
    },
    {
        id: 4,
        name: "Women's Elegant Dress",
        category: "women",
        price: 32000,
        image: ""
    },
    {
        id: 5,
        name: "Women's Summer Outfit",
        category: "women",
        price: 25000,
        image: ""
    },
    {
        id: 6,
        name: "Women's Handbag",
        category: "women",
        price: 28000,
        image: ""
    },
    {
        id: 7,
        name: "Baby Romper",
        category: "baby",
        price: 10000,
        image: ""
    },
    {
        id: 8,
        name: "Baby Casual Outfit",
        category: "baby",
        price: 12000,
        image: ""
    }
];

let cart = [];
let currentCategory = "all";

const formatPrice = price =>
    new Intl.NumberFormat("en-RW").format(price);

function displayProducts(category = "all") {
    currentCategory = category;

    const container = document.getElementById("products");

    const filtered = category === "all"
        ? products
        : products.filter(product => product.category === category);

    container.innerHTML = filtered.map(product => `
        <article class="product-card">
            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
                onerror="this.onerror=null;this.src='https://placehold.co/600x500?text=Clothing';"
            >

            <div class="product-info">
                <span class="category">${product.category}</span>
                <h3>${product.name}</h3>
                <p class="price">${formatPrice(product.price)} RWF</p>

                <button class="buy-button"
                    onclick="addToCart(${product.id})">
                    🛒 Add to Cart
                </button>
            </div>
        </article>
    `).join("");
}

function filterProducts(category, button) {
    displayProducts(category);

    document.querySelectorAll(".filter").forEach(item => {
        item.classList.remove("active");
    });

    button.classList.add("active");
}

function addToCart(id) {
    const product = products.find(item => item.id === id);
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById("cart-items");
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    document.getElementById("cart-count").textContent = count;
    document.getElementById("cart-total").textContent = formatPrice(total);

    if (cart.length === 0) {
        cartItems.innerHTML = "<p>Your cart is empty. Start shopping!</p>";
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img
                src="${item.image}"
                alt="${item.name}"
                onerror="this.onerror=null;this.src='https://placehold.co/100x100?text=Clothing';"
            >

            <div class="cart-item-info">
                <h4>${item.name}</h4>
                <p>${formatPrice(item.price * item.quantity)} RWF</p>

                <div class="quantity-controls">
                    <button onclick="changeQuantity(${item.id}, -1)">−</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
            </div>

            <button class="remove-button"
                aria-label="Remove ${item.name}"
                onclick="removeFromCart(${item.id})">✕</button>
        </div>
    `).join("");
}

function changeQuantity(id, amount) {
    const item = cart.find(product => product.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== id);
    }

    updateCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function toggleCart() {
    document.getElementById("cart-panel").classList.toggle("open");
    document.getElementById("overlay").classList.toggle("show");
}

function checkout() {
    if (cart.length === 0) {
        alert("Your shopping cart is empty!");
        return;
    }

    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    const order = cart.map(item =>
        `${item.name} x ${item.quantity}`
    ).join("\n");

    alert(
        "YOUR ORDER SUMMARY\n\n" +
        order +
        "\n\nTotal: " + formatPrice(total) + " RWF" +
        "\n\nThank you for shopping with StyleHub!"
    );

    // This demo displays an order summary.
    // Connect a backend and payment provider to accept real orders.
}

displayProducts();
updateCart();
