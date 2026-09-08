function addToCart(name, price, size, quantity) {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    quantity = Number(quantity) || 1;

    let existingProduct = cart.find(function(product) {

        return (
            product.name === name &&
            product.size === (size || "Not selected")
        );

    });

    if (existingProduct) {

        existingProduct.quantity += quantity;

        if (existingProduct.quantity > 10) {

            existingProduct.quantity = 10;

            alert("Maximum quantity is 10.");

        }

    } else {

        cart.push({

            name: name,

            price: price,

            size: size || "Not selected",

            quantity: Math.min(quantity, 10)

        });

    }

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

    updateCartCount();

    alert(
        quantity +
        " × " +
        name +
        " has been added to your cart!"
    );

}


function searchProducts() {

    let searchInput =
        document.getElementById("searchInput");

    if (!searchInput) {
        return;
    }

    let searchText =
        searchInput.value.toLowerCase();

    let products =
        document.querySelectorAll(".product");

    let found = false;

    products.forEach(function(product) {

        let heading =
            product.querySelector("h3");

        if (!heading) {
            return;
        }

        let productName =
            heading.textContent.toLowerCase();

        if (productName.includes(searchText)) {

            product.style.display = "flex";

            found = true;

        } else {

            product.style.display = "none";

        }

    });

    let noProducts =
        document.getElementById("noProducts");

    if (noProducts) {

        if (found) {

            noProducts.style.display = "none";

        } else {

            noProducts.style.display = "block";

        }

    }

}


function filterProducts(category) {

    let products =
        document.querySelectorAll(".product");

    products.forEach(function(product) {

        if (
            category === "all" ||
            product.dataset.category === category
        ) {

            product.style.display = "flex";

        } else {

            product.style.display = "none";

        }

    });

}


function updateCartCount() {

    let cart =
        JSON.parse(localStorage.getItem("cart")) || [];

    let count = 0;

    cart.forEach(function(product) {

        count =
            count + (Number(product.quantity) || 1);

    });

    let cartCount =
        document.getElementById("cartCount");

    if (cartCount) {

        cartCount.textContent =
            "(" + count + ")";

    }

}


function buyNow(name, price, size, quantity) {

    quantity = Number(quantity) || 1;

    addToCart(
        name,
        price,
        size,
        quantity
    );

    window.location.href = "cart.html";

}


updateCartCount();
function toggleTheme() {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        localStorage.setItem("theme", "dark");

    } else {

        localStorage.setItem("theme", "light");

    }

    updateThemeButton();

}


function updateThemeButton() {

    let button =
        document.getElementById("themeToggle");

    if (!button) {
        return;
    }

    if (document.body.classList.contains("dark-mode")) {

        button.textContent = "☀️ Bright Mode";

    } else {

        button.textContent = "🌙 Dark Mode";

    }

}


if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark-mode");

}


updateThemeButton();
function toggleMenu() {

    let nav =
        document.querySelector("nav");

    nav.classList.toggle("menu-open");

}