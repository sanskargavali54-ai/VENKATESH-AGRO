// Add your JavaScript code here

// Product Data
const products = [
    { category: "Milking Machines", name: "Single Bucket Machine", price: 15000, description: "Efficient single bucket milking machine." },
    { category: "Milking Machines", name: "Double Bucket Machine", price: 28000, description: "Double bucket for increased capacity." },
    { category: "Milking Machines", name: "Four Bucket Machine", price: 45000, description: "Four bucket system for large farms." },
    { category: "Milking Machines", name: "Multi Bucket System", price: 75000, description: "Advanced multi-bucket milking system." },
    { category: "Vacuum Systems", name: "Vacuum Pump", price: 18000, description: "High-performance vacuum pump." },
    { category: "Vacuum Systems", name: "Pulsator", price: 5000, description: "Reliable pulsator for milking." },
    { category: "Vacuum Systems", name: "Milking Claw", price: 4000, description: "Durable milking claw." },
    { category: "Farm Equipment", name: "Chaff Cutter", price: 25000, description: "Efficient chaff cutter for fodder." },
    { category: "Farm Equipment", name: "Grass Cutter", price: 12000, description: "Portable grass cutter." },
    { category: "Dairy Accessories", name: "Milk Cans", price: 2000, description: "Stainless steel milk cans." },
    { category: "Dairy Accessories", name: "Teat Dip Cup", price: 500, description: "Hygienic teat dip cup." },
    { category: "Dairy Accessories", name: "Milk Separator", price: 8000, description: "Efficient milk separator." },
    { category: "Animal Care", name: "Cow Rubber Mat", price: 3000, description: "Comfortable rubber mat for cows." },
    { category: "Animal Care", name: "Cow Brush", price: 6000, description: "Durable cow brush." }
];

// Render Products
const productList = document.querySelector(".product-list");

function renderProducts() {
    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: ₹${product.price}</p>
            <p>${product.description}</p>
            <button class="add-to-cart">Add to Cart</button>
            <button class="pay-advance">Pay Advance ₹1500</button>
            <button class="whatsapp-inquiry">WhatsApp Inquiry</button>
        `;
        productList.appendChild(productCard);
    });
}

renderProducts();

// Cart System
let cart = [];

function updateCartCount() {
    const cartCount = document.querySelector(".cart-count");
    cartCount.textContent = cart.length;
}

function addToCart(product) {
    cart.push(product);
    updateCartCount();
    alert(`${product.name} added to cart!`);
}

function handleAdvancePayment() {
    alert("Advance payment of ₹1500 submitted");
}

// Event Listeners
productList.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) {
        const productName = e.target.parentElement.querySelector("h3").textContent;
        const product = products.find(p => p.name === productName);
        addToCart(product);
    }

    if (e.target.classList.contains("pay-advance")) {
        handleAdvancePayment();
    }
});

// Admin Panel
const adminLoginButton = document.querySelector(".admin-login");

function adminLogin() {
    const username = prompt("Enter username:");
    const password = prompt("Enter password:");

    if (username === "admin" && password === "1234") {
        alert("Login successful!");
        showAdminPanel();
    } else {
        alert("Invalid credentials!");
    }
}

function showAdminPanel() {
    const newProduct = {
        name: prompt("Enter product name:"),
        price: parseInt(prompt("Enter product price:"), 10),
        description: prompt("Enter product description:"),
        category: prompt("Enter product category:")
    };

    products.push(newProduct);
    localStorage.setItem("products", JSON.stringify(products));
    alert("Product added successfully!");
    renderProducts();
}

adminLoginButton.addEventListener("click", adminLogin);