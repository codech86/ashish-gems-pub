/*
=========================================================
Ashish Gems
Products Page
Version : v0.2.1
=========================================================
*/

"use strict";

/*=========================================================
Configuration
=========================================================*/

const PRODUCTS_URL = "data/products.json";
const PAGE_SIZE = 12;

/*=========================================================
State
=========================================================*/

let allProducts = [];
let filteredProducts = [];
let visibleProducts = [];

let currentPage = 1;
let currentSearch = "";
let currentCategory = "all";
let currentSort = "default";

/*=========================================================
DOM Elements
=========================================================*/

const productGrid =
    document.getElementById("productGrid");

const productCount =
    document.getElementById("productCount");

const loading =
    document.getElementById("loading");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const sortSelect =
    document.getElementById("sortSelect");

const loadMoreButton =
    document.getElementById("loadMoreBtn");

const modal =
    document.getElementById("productModal");

const modalBody =
    document.getElementById("modalBody");

const closeModalButton =
    document.getElementById("closeModal");

const backToTop =
    document.getElementById("backToTop");

/*=========================================================
Initialize
=========================================================*/

document.addEventListener(

    "DOMContentLoaded",

    initializePage

);

async function initializePage() {

    bindEvents();

    await loadProducts();

}

/*=========================================================
Bind Events
=========================================================*/

function bindEvents() {

    searchInput.addEventListener(

        "input",

        handleSearch

    );

    categoryFilter.addEventListener(

        "change",

        handleCategory

    );

    sortSelect.addEventListener(

        "change",

        handleSorting

    );

    loadMoreButton.addEventListener(

        "click",

        loadMoreProducts

    );

    closeModalButton.addEventListener(

        "click",

        closeModal

    );

    modal.addEventListener(

        "click",

        function (event) {

            if (event.target === modal) {

                closeModal();

            }

        }

    );

    document.addEventListener(

        "keydown",

        function (event) {

            if (event.key === "Escape") {

                closeModal();

            }

        }

    );

    window.addEventListener(

        "scroll",

        toggleBackToTop

    );

    backToTop.addEventListener(

        "click",

        function () {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }

    );

}

/*=========================================================
Load Products
=========================================================*/

async function loadProducts() {

    showLoading(true);

    try {

        const response = await fetch(PRODUCTS_URL);

        if (!response.ok) {

            throw new Error("Unable to load products.");

        }

        allProducts = await response.json();

        filteredProducts = [...allProducts];

        populateCategories();

        renderProducts();

    }

    catch (error) {

        console.error(error);

        showError();

    }

    finally {

        showLoading(false);

    }

}

/*=========================================================
Loading
=========================================================*/

function showLoading(show) {

    loading.style.display =

        show

            ? "block"

            : "none";

}

/*=========================================================
Error
=========================================================*/

function showError() {

    productGrid.innerHTML =

        `

        <div class="no-results">

            <h2>

                Unable to load products

            </h2>

            <p>

                Please refresh the page.

            </p>

        </div>

        `;

}

/*=========================================================
Categories
=========================================================*/

function populateCategories() {

    const categories =

        [

            ...new Set(

                allProducts.map(

                    product => product.category

                )

            )

        ]

        .sort();

    categoryFilter.innerHTML =

        `<option value="all">

            All Categories

        </option>`;

    categories.forEach(category => {

        const option =

            document.createElement("option");

        option.value = category;

        option.textContent = category;

        categoryFilter.appendChild(option);

    });

}

/*=========================================================
Search
=========================================================*/

function handleSearch(event) {

    currentSearch = event.target.value
        .trim()
        .toLowerCase();

    currentPage = 1;

    applyFilters();

}

/*=========================================================
Category
=========================================================*/

function handleCategory(event) {

    currentCategory = event.target.value;

    currentPage = 1;

    applyFilters();

}

/*=========================================================
Sorting
=========================================================*/

function handleSorting(event) {

    currentSort = event.target.value;

    currentPage = 1;

    applyFilters();

}

/*=========================================================
Apply Filters
=========================================================*/

function applyFilters() {

    filteredProducts = allProducts.filter(product => {

        const keywordMatch =

            currentSearch === ""

            ||

            product.name.toLowerCase().includes(currentSearch)

            ||

            product.category.toLowerCase().includes(currentSearch)

            ||

            product.sku.toLowerCase().includes(currentSearch)

            ||

            product.purity.toLowerCase().includes(currentSearch);

        const categoryMatch =

            currentCategory === "all"

            ||

            product.category === currentCategory;

        return keywordMatch && categoryMatch;

    });

    applySorting();

}

/*=========================================================
Sorting Logic
=========================================================*/

function applySorting() {

    switch (currentSort) {

        case "featured":

            filteredProducts.sort((a, b) =>

                Number(b.featured) -

                Number(a.featured)

            );

            break;

        case "name":

            filteredProducts.sort((a, b) =>

                a.name.localeCompare(b.name)

            );

            break;

        case "weight":

            filteredProducts.sort((a, b) =>

                Number(a.weight) -

                Number(b.weight)

            );

            break;

        case "weight-desc":

            filteredProducts.sort((a, b) =>

                Number(b.weight) -

                Number(a.weight)

            );

            break;

        default:

            break;

    }

    renderProducts();

}

/*=========================================================
Pagination
=========================================================*/

function loadMoreProducts() {

    currentPage++;

    renderProducts();

}

/*=========================================================
Render Products
=========================================================*/

function renderProducts() {

    const end = currentPage * PAGE_SIZE;

    visibleProducts =

        filteredProducts.slice(0, end);

    productGrid.innerHTML =

        visibleProducts

        .map(createProductCard)

        .join("");

    updateProductCount();

    updateLoadMoreButton();

}

/*=========================================================
Product Card
=========================================================*/

function createProductCard(product) {

    const image =

        product.images?.[0]

        ||

        "images/placeholders/product-placeholder.svg";

    return `

<article class="product-card">

    <div class="product-image">

        <img

            src="${image}"

            alt="${product.name}"

            loading="lazy">

    </div>

    <div class="product-content">

        <span class="product-category">

            ${product.category}

        </span>

        <h3>

            ${product.name}

        </h3>

        <p>

            Purity :
            ${product.purity}

        </p>

        <p>

            Weight :
            ${product.weight} gm

        </p>

        <div class="product-actions">

            <button
    class="btn btn-outline details-btn"
    data-id="${product.id}">
    View Details
</button>

        </div>

    </div>

</article>

`;

}

/*=========================================================
Product Counter
=========================================================*/

function updateProductCount() {

    const total = filteredProducts.length;

    productCount.textContent =

        `${total} Product${

            total === 1

                ? ""

                : "s"

        } Found`;

}

/*=========================================================
Load More Button
=========================================================*/

function updateLoadMoreButton() {

    if (

        visibleProducts.length

        <

        filteredProducts.length

    ) {

        loadMoreButton.style.display =

            "inline-flex";

    }

    else {

        loadMoreButton.style.display =

            "none";

    }

}

/*=========================================================
Event Delegation
=========================================================*/

document.addEventListener("click", function (event) {

    const detailsButton = event.target.closest(".details-btn");

    if (detailsButton) {

        const id = Number(detailsButton.dataset.id);

        const product = allProducts.find(item => item.id === id);

        if (product) {

            openProduct(product);

        }

        return;

    }

    const whatsappButton = event.target.closest(".whatsapp-btn");

    if (whatsappButton) {

        const id = Number(whatsappButton.dataset.id);

        const product = allProducts.find(item => item.id === id);

        if (product) {

            enquireOnWhatsapp(product);

        }

    }

});

/*=========================================================
Product Modal
=========================================================*/

function openProduct(product) {

    const image = product.images?.[0] || "";

    modalBody.innerHTML = `

<div class="modal-layout">

    <div class="modal-image">

        <img
            src="${image}"
            alt="${product.name}">

    </div>

    <div class="modal-details">

        <h2>${product.name}</h2>

        <p><strong>SKU:</strong> ${product.sku}</p>

        <p><strong>Category:</strong> ${product.category}</p>

        <p><strong>Purity:</strong> ${product.purity}</p>

        <p><strong>Weight:</strong> ${product.weight} gm</p>

        <p><strong>Status:</strong> ${product.availability}</p>

        <p>${product.description || ""}</p>

        <button
            class="btn btn-primary whatsapp-btn"
            data-id="${product.id}">

            Enquire on WhatsApp

        </button>

    </div>

</div>

`;

    modal.classList.add("show");

}

/*=========================================================
Close Modal
=========================================================*/

function closeModal() {

    modal.classList.remove("show");

}

/*=========================================================
WhatsApp
=========================================================*/

function enquireOnWhatsapp(product) {

    const number = "91XXXXXXXXXX";

    const message =
`Hello Ashish Gems,

I am interested in the following product.

Product : ${product.name}

SKU : ${product.sku}

Weight : ${product.weight} gm

Please share more details.`;

    window.open(

        `https://wa.me/${number}?text=${encodeURIComponent(message)}`,

        "_blank"

    );

}

/*=========================================================
Back To Top
=========================================================*/

function toggleBackToTop() {

    if (window.scrollY > 300) {

        backToTop.classList.add("show");

    }

    else {

        backToTop.classList.remove("show");

    }

}

/*=========================================================
Image Error Handling
=========================================================*/

document.addEventListener("error", function (event) {

    if (event.target.tagName === "IMG") {

        event.target.src =
            "images/placeholders/product-placeholder.svg";

    }

}, true);

/*=========================================================
End Of File
=========================================================*/