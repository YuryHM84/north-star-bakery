const bakeryProducts = [
    { id: 1, name: "Croissant de Mantequilla", price: "\$3.50" },
    { id: 2, name: "Pastel de Chocolate Star", price: "\$4.50" },
    { id: 3, name: "Pan Artesanal de Masa Madre", price: "\$6.00" }
];

let chosenFavorites = [];

document.addEventListener("DOMContentLoaded", () => {
    displayProducts();
    loadSavedData();
    setupFormValidation();
});

function displayProducts() {
    const container = document.getElementById("products-container");
    if (!container) return;
    container.innerHTML = "";
    bakeryProducts.forEach(product => {
        const card = document.createElement("div");
        card.style.border = "1px solid #ccc";
        card.style.padding = "15px";
        card.style.borderRadius = "8px";
        card.style.backgroundColor = "#fff";
        card.innerHTML = `
            <h3>${product.name}</h3>
            <p>Price: ${product.price}</p>
            <button type="button" onclick="addToOrder('${product.name}')" style="background-color: #d4a373; color: white; border: none; padding: 8px 12px; border-radius: 4px; cursor: pointer;">
                Add to Pre-Order
            </button>
        `;
        container.appendChild(card);
    });
}

function addToOrder(productName) {
    const orderTextArea = document.getElementById("order-items");
    if (!orderTextArea) return;
    if (!chosenFavorites.includes(productName)) {
        chosenFavorites.push(productName);
        if (orderTextArea.value.trim() === "") {
            orderTextArea.value = productName;
        } else {
            orderTextArea.value += `, ${productName}`;
        }
        localStorage.setItem("savedFavorites", JSON.stringify(chosenFavorites));
    }
}

function loadSavedData() {
    const saved = localStorage.getItem("savedFavorites");
    const orderTextArea = document.getElementById("order-items");
    if (saved && orderTextArea) {
        chosenFavorites = JSON.parse(saved);
        orderTextArea.value = chosenFavorites.join(", ");
    }
}

function setupFormValidation() {
    const form = document.querySelector("form");
    if (!form) return;
    form.addEventListener("submit", (event) => {
        event.preventDefault();
        document.getElementById("name-error").textContent = "";
        document.getElementById("email-error").textContent = "";
        const nameInput = document.getElementById("client-name").value.trim();
        const emailInput = document.getElementById("client-email").value.trim();
        let isValid = true;
        if (nameInput.length < 3) {
            document.getElementById("name-error").textContent = "Error: Name must be at least 3 characters long.";
            isValid = false;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput)) {
            document.getElementById("email-error").textContent = "Error: Please enter a valid email address.";
            isValid = false;
        }
        if (isValid) {
            alert(`Thank you, ${nameInput}! Your pre-order request has been validated successfully.`);
            localStorage.removeItem("savedFavorites");
            form.reset();
            chosenFavorites = [];
        }
    });
}
